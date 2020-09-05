const fs = require('fs')
const path = require('path')

module.exports = {
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  chainWebpack: config => {
    config.resolve.alias
     .set("@assets", path.resolve(__dirname, './assets'))
     .set("@utils", path.resolve(__dirname, './utils'))
     .set("@packages", path.resolve(__dirname, './packages'))
     .set("@lib", path.resolve(__dirname, './lib'))
  }
}