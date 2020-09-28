const path = require('path')
function inputResolve (file) {
  return path.resolve(__dirname, '../packages/', file)
}

import vue from 'rollup-plugin-vue'
import styles from 'rollup-plugin-styles'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
// import replace from '@rollup/plugin-replace'
// import alias from '@rollup/plugin-alias'

export default {
  input: inputResolve('./index.js'),
  output: {
    dir: 'lib',
    exports: 'auto',
    format: 'cjs',
    esModule: true,
    assetFileNames: '[name][extname]'
    // file: 'lib/index.js'
  },
  plugins: [
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      exclude: [/node_modules/]
    }),
    styles({
      mode: ['extract', 'style.css'],
      autoModules: true,
      sourceMap: false
    }),
    vue({
      css: false
    }),
    resolve()
  ]
}