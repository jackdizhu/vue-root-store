const name = 'module-demo'
let entry = 'src/main.js'
// console.log(process.env.VUE_APP_SPA_TYPE, '-- process.env.VUE_APP_SPA_TYPE --')
// console.log(process.env.NODE_ENV, '-- process.env.NODE_ENV --')
const prodSpaModule = process.env.NODE_ENV !== 'development' && process.env.VUE_APP_SPA_TYPE === 'module'
if (prodSpaModule) {
  entry = 'src/load.js'
}
module.exports = {
  publicPath: './',
  pages: {
    index: {
      entry: entry
    }
  },
  css: {
    extract: false
  },
  configureWebpack: {
    optimization: {
      minimize: false
    },
    output: {
      // 把子应用打包成 umd 库格式
      library: `${name}`,
      libraryTarget: 'umd'
    }
  },
  // 第三方插件配置
  chainWebpack: config => {
    config.optimization.delete('splitChunks')
    config.output.filename('[name].js').end();
    config.output.chunkFilename('[name].js').end();
    config
      .plugin('copy')
      .use(require('copy-webpack-plugin'),
        [
          []
        ]
      );
  }
}