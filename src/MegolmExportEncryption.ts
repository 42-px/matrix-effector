// Taken from here
// https://github.com/matrix-org/matrix-react-sdk/blob/d835721ae1dd005b7c0ba5b4b2448f5396128e1a/src/utils/MegolmExportEncryption.ts

const subtleCrypto = window?.crypto.subtle

/**
 * Derive the AES and HMAC-SHA-256 keys for the file
 *
 * @param {Unit8Array} salt  salt for pbkdf
 * @param {Number} iterations number of pbkdf iterations
 * @param {String} password  password
 * @return {Promise<[CryptoKey, CryptoKey]>} promise for [aes key, hmac key]
 */
async function deriveKeys(
    salt: Uint8Array, 
    iterations: number, 
    password: string
): Promise<[CryptoKey, CryptoKey]> {
    let key
    try {
        key = await subtleCrypto.importKey(
            "raw",
            new TextEncoder().encode(password),
            { name: "PBKDF2" },
            false,
            ["deriveBits"],
        )
    } catch (e) {
        throw new Error(`subtleCrypto.importKey failed: ${  e}`)
    }

    let keybits
    try {
        keybits = await subtleCrypto.deriveBits(
            {
                name: "PBKDF2",
                salt: salt,
                iterations: iterations,
                hash: "SHA-512",
            },
            key,
            512,
        )
    } catch (e) {
        throw new Error(`subtleCrypto.deriveBits failed: ${  e}`)
    }

    const aesKey = keybits.slice(0, 32)
    const hmacKey = keybits.slice(32)

    const aesProm = subtleCrypto.importKey(
        "raw",
        aesKey,
        { name: "AES-CTR" },
        false,
        ["encrypt", "decrypt"],
    ).catch((e) => {
        throw new Error(`subtleCrypto.importKey failed for AES key: ${  e}`)
    })

    const hmacProm = subtleCrypto.importKey(
        "raw",
        hmacKey,
        {
            name: "HMAC",
            hash: { name: "SHA-256" },
        },
        false,
        ["sign", "verify"],
    ).catch((e) => {
        throw new Error(`subtleCrypto.importKey failed for HMAC key: ${  e}`)
    })

    return Promise.all([aesProm, hmacProm])
}

const HEADER_LINE = "-----BEGIN MEGOLM SESSION DATA-----"
const TRAILER_LINE = "-----END MEGOLM SESSION DATA-----"

/**
 * Encode a typed array of uint8 as base64.
 * @param {Uint8Array} uint8Array The data to encode.
 * @return {string} The base64.
 */
function encodeBase64(uint8Array: Uint8Array): string {
    // Misinterpt the Uint8Array as Latin-1.
    // window.btoa expects a unicode string with codepoints in the range 0-255.
    // @TODO fix me
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const latin1String = String.fromCharCode.apply(null, uint8Array)
    // Use the builtin base64 encoder.
    return window.btoa(latin1String)
}

/**
 * Decode a base64 string to a typed array of uint8.
 * @param {string} base64 The base64 to decode.
 * @return {Uint8Array} The decoded data.
 */
function decodeBase64(base64: string): Uint8Array {
    // window.atob returns a unicode string with codepoints in the range 0-255.
    const latin1String = window.atob(base64)
    // Encode the string as a Uint8Array
    const uint8Array = new Uint8Array(latin1String.length)
    for (let i = 0; i < latin1String.length; i++) {
        uint8Array[i] = latin1String.charCodeAt(i)
    }
    return uint8Array
}

/**
 * ascii-armour a  megolm key file
 *
 * base64s the content, and adds header and trailer lines
 *
 * @param {Uint8Array} data  raw data
 * @return {ArrayBuffer} formatted file
 */
function packMegolmKeyFile(data: Uint8Array): ArrayBuffer {
    // we split into lines before base64ing, because encodeBase64 doesn't deal
    // terribly well with large arrays.
    const LINE_LENGTH = (72 * 4 / 3)
    const nLines = Math.ceil(data.length / LINE_LENGTH)
    const lines = new Array(nLines + 3)
    lines[0] = HEADER_LINE
    let o = 0
    let i
    for (i = 1; i <= nLines; i++) {
        lines[i] = encodeBase64(data.subarray(o, o+LINE_LENGTH))
        o += LINE_LENGTH
    }
    lines[i++] = TRAILER_LINE
    lines[i] = ""
    return (new TextEncoder().encode(lines.join("\n"))).buffer
}

/**
 * Encrypt a megolm key file
 *
 * @param {String} data
 * @param {String} password
 * @param {Object=} options
 * @param {Number=} options.kdf_rounds Number of iterations to perform of the
 *    key-derivation function.
 * @return {Promise<ArrayBuffer>} promise for encrypted output
 */
export async function encryptMegolmKeyFile(
    data: string,
    password: string,
    options?: { kdf_rounds?: number }, // eslint-disable-line camelcase
): Promise<ArrayBuffer> {
    options = options || {}
    const kdfRounds = options.kdf_rounds || 500000

    const salt = new Uint8Array(16)
    window.crypto.getRandomValues(salt)

    const iv = new Uint8Array(16)
    window.crypto.getRandomValues(iv)

    // clear bit 63 of the IV to stop us hitting the 64-bit counter boundary
    // (which would mean we wouldn't be able to decrypt on Android). The loss
    // of a single bit of iv is a price we have to pay.
    iv[8] &= 0x7f

    const [aesKey, hmacKey] = await deriveKeys(salt, kdfRounds, password)
    const encodedData = new TextEncoder().encode(data)

    let ciphertext
    try {
        ciphertext = await subtleCrypto.encrypt(
            {
                name: "AES-CTR",
                counter: iv,
                length: 64,
            },
            aesKey,
            encodedData,
        )
    } catch (e) {
        throw new Error(`subtleCrypto.encrypt failed: ${  e}`)
    }

    const cipherArray = new Uint8Array(ciphertext)
    const bodyLength = (1+salt.length+iv.length+4+cipherArray.length+32)
    const resultBuffer = new Uint8Array(bodyLength)
    let idx = 0
    resultBuffer[idx++] = 1 // version
    resultBuffer.set(salt, idx); idx += salt.length
    resultBuffer.set(iv, idx); idx += iv.length
    resultBuffer[idx++] = kdfRounds >> 24
    resultBuffer[idx++] = (kdfRounds >> 16) & 0xff
    resultBuffer[idx++] = (kdfRounds >> 8) & 0xff
    resultBuffer[idx++] = kdfRounds & 0xff
    resultBuffer.set(cipherArray, idx); idx += cipherArray.length

    const toSign = resultBuffer.subarray(0, idx)

    let hmac
    try {
        hmac = await subtleCrypto.sign(
            { name: "HMAC" },
            hmacKey,
            toSign,
        )
    } catch (e) {
        throw new Error(`subtleCrypto.sign failed: ${  e}`)
    }

    const hmacArray = new Uint8Array(hmac)
    resultBuffer.set(hmacArray, idx)
    return packMegolmKeyFile(resultBuffer)
}

/**
 * Unbase64 an ascii-armoured megolm key file
 *
 * Strips the header and trailer lines, and unbase64s the content
 *
 * @param {ArrayBuffer} data  input file
 * @return {Uint8Array} unbase64ed content
 */
function unpackMegolmKeyFile(data: ArrayBuffer): Uint8Array {
    // parse the file as a great big String. This should be safe, because there
    // should be no non-ASCII characters, and it means that we can do string
    // comparisons to find the header and footer, and feed it into window.atob.
    const fileStr = new TextDecoder().decode(new Uint8Array(data))

    // look for the start line
    let lineStart = 0
    // eslint-disable-next-line no-constant-condition
    while (1) {
        const lineEnd = fileStr.indexOf("\n", lineStart)
        if (lineEnd < 0) {
            throw new Error("Header line not found")
        }
        const line = fileStr.slice(lineStart, lineEnd).trim()

        // start the next line after the newline
        lineStart = lineEnd+1

        if (line === HEADER_LINE) {
            break
        }
    }

    const dataStart = lineStart

    // look for the end line
    // eslint-disable-next-line no-constant-condition
    while (1) {
        const lineEnd = fileStr.indexOf("\n", lineStart)
        const line = fileStr
            .slice(lineStart, lineEnd < 0 ? undefined : lineEnd).trim()
        if (line === TRAILER_LINE) {
            break
        }

        if (lineEnd < 0) {
            throw new Error("Trailer line not found")
        }

        // start the next line after the newline
        lineStart = lineEnd+1
    }

    const dataEnd = lineStart
    return decodeBase64(fileStr.slice(dataStart, dataEnd))
}


/**
 * Decrypt a megolm key file
 *
 * @param {ArrayBuffer} data file to decrypt
 * @param {String} password
 * @return {Promise<String>} promise for decrypted output
 *
 *
 */
export async function decryptMegolmKeyFile(
    data: ArrayBuffer, 
    password: string
): Promise<string> {
    const body = unpackMegolmKeyFile(data)

    // check we have a version byte
    if (body.length < 1) {
        throw new Error("Invalid file: too short")
    }

    const version = body[0]
    if (version !== 1) {
        throw new Error("Unsupported version")
    }

    const ciphertextLength = body.length-(1+16+16+4+32)
    if (ciphertextLength < 0) {
        throw new Error("Invalid file: too short")
    }

    const salt = body.subarray(1, 1+16)
    const iv = body.subarray(17, 17+16)
    const iterations = 
        body[33] << 24 | body[34] << 16 | body[35] << 8 | body[36]
    const ciphertext = body.subarray(37, 37+ciphertextLength)
    const hmac = body.subarray(-32)

    const [aesKey, hmacKey] = await deriveKeys(salt, iterations, password)
    const toVerify = body.subarray(0, -32)

    let isValid
    try {
        isValid = await subtleCrypto.verify(
            { name: "HMAC" },
            hmacKey,
            hmac,
            toVerify,
        )
    } catch (e) {
        throw new Error(`subtleCrypto.verify failed: ${  e}`)
    }
    if (!isValid) {
        throw new Error(
            "hmac mismatch Authentication check failed: incorrect password?"
        )
    }

    let plaintext
    try {
        plaintext = await subtleCrypto.decrypt(
            {
                name: "AES-CTR",
                counter: iv,
                length: 64,
            },
            aesKey,
            ciphertext,
        )
    } catch (e) {
        throw new Error(`subtleCrypto.decrypt failed: ${  e}`)
    }

    return new TextDecoder().decode(new Uint8Array(plaintext))
}
