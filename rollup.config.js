import { babel } from "@rollup/plugin-babel"
import { terser } from "rollup-plugin-terser"
import commonjs from "@rollup/plugin-commonjs"
import typescript from "@rollup/plugin-typescript"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import pkg from "./package.json"

const extensions = [".js", ".ts"]

export default {
    external: [
        /@babel\/runtime/,
        "effector",
        /patronum/,
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
        /*
            TODO
            нам следует использовать @rollup/plugin-typescript так как
            мы положили на isolatedModules и экспортируем типы 
            вместе со значениями через *
            в идеале в будущем отказаться от него и ограничиться @babel/preset-typescript. 
            В целом нам этот плагин не нужен
        */
        typescript({ tsconfig: "./tsconfig.json" }),
        babel({
            babelHelpers: "runtime",
            exclude: "node_modules/**",
            extensions,
        }),
        nodeResolve({ extensions }),
        commonjs({ extensions }),
        terser(),
    ]
}

