import { client } from "@/matrix-client"
import { confirmResetCrossSigningFx } from "./public"


confirmResetCrossSigningFx.use(async () => {
    const cl = client()
    let request: (authData: any) => Promise<{}>
    await cl.bootstrapCrossSigning({
        authUploadDeviceSigningKeys: async (makeRequest) => {
            request = makeRequest
            const { finished } = Modal.createDialog(InteractiveAuthDialog, {
                title: _t("Setting up keys"),
                matrixClient: cli,
                makeRequest,
            })
            const [confirmed] = await finished
            if (!confirmed) {
                throw new Error("Cross-signing key upload auth canceled")
            }
        },
        setupNewCrossSigning: true,
    })
    return request
})
