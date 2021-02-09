import babel from "rollup-plugin-babel"
import { terser } from "rollup-plugin-terser"
import typescript from "rollup-plugin-typescript2"
import pkg from "./package.json"

export default {
    external: [
        "effector",
        "matrix-js-sdk",
        "@42px/effector-extra",
        "@42px/custom-errors"
    ],
    input: "src/index.ts",
    output: [
        {
            file: pkg.main,
            format: "cjs",
            sourcemap: true,
        },
        {
            file: pkg.module,
            format: "es",
            sourcemap: true,
        },
        {
            file: pkg["umd:main"],
            format: "umd",
            sourcemap: true,
            name: "MatrixEffector",
        },
        {
            file: pkg["iife:main"],
            format: "iife",
            name: "MatrixEffector",
            sourcemap: true,
        }
    ],
    plugins: [
        terser(),
        babel(),
        typescript(),
    ]
}
