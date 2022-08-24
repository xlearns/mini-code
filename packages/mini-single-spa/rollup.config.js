import nodeResolvePlugin from '@rollup/plugin-node-resolve'
import esbuildPlugin from 'rollup-plugin-esbuild'
import dtsPlugin from 'rollup-plugin-dts'
const name = 'single'
function createConfig({ dts, esm, umd} = {}) {
  let file = 'dist/index.js'
  let format = 'cjs'

  if (dts) {
    file = file.replace('.js', '.d.ts')
    format = 'cjs'
  }
  if (esm) {
    file = file.replace('.js', '.esm.js')
    format = 'esm'
  }
  if (umd) {
    file = file.replace('.js', '.umd.js')
    format = 'umd'
  }

  return {
    input: 'src/index.ts',
    output: {
      format: format,
      file,
      name,
      exports: 'named',
    },
    plugins: [
      nodeResolvePlugin({
        mainFields: dts ? ['types', 'typings'] : ['module', 'main'],
        extensions: dts ? ['.d.ts', '.ts'] : ['.js', '.json', '.mjs'],
        customResolveOptions: {
          moduleDirectories: dts
            ? ['node_modules/@types', 'node_modules']
            : ['node_modules'],
        },
      }),
      !dts && require('@rollup/plugin-commonjs')(),
      !dts &&
        esbuildPlugin({
          target: 'es2017',
        }),
      dts && dtsPlugin(),
    ].filter(Boolean),
  }
}

export default [
  createConfig(),
  createConfig({ dts: true }),
  createConfig({ esm: true }),
  createConfig({ umd: true }),

]