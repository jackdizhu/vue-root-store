const fs = require('fs')
const path = require('path')

const libPath = path.resolve(__dirname, 'lib')
const pkgPath = path.resolve(__dirname, 'packages')

function upperCasetoLine(str) {
  let temp = str.replace(/[A-Z]/g, function (match) {
   return "-" + match.toLowerCase();
  });
  if (temp.slice(0, 1) === "-") {
   temp = temp.slice(1);
  }
  return temp;
}
function getComponents(dir) {
  let obj = {}
  let list = fs.readdirSync(dir)
  list.forEach((item) => {
    const itemPath = path.resolve(dir, item)
    if (fs.statSync(itemPath).isDirectory()) {
      obj[upperCasetoLine(item)] = path.resolve(itemPath, './index.js')
    }
  })
  return obj
}

module.exports = {
  pages: {
    index: {
      entry: 'packages/index.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  // 输出文件目录
  outputDir: libPath,
  // webpack配置
  configureWebpack: {
    // 入口文件
    entry: getComponents(pkgPath),
    // 输出配置
    output: {
      globalObject: "this",
      // 文件名称
      filename: "[name].js",
      // 构建依赖类型
      libraryTarget: "commonjs2",
      // 库中被导出的项
      libraryExport: "default",
      // 引用时的依赖名
      library: {
        root: 'npmComponents1',
        amd: 'npmComponents1',
        commonjs: 'npmComponents1'
      },
    },
    optimization: {
      minimize: false
    }
  },
  chainWebpack: config => {
    config.optimization.delete('splitChunks')
    config.resolve.alias
    .set("@assets", path.resolve(__dirname, './assets'))
    .set("@utils", path.resolve(__dirname, './utils'))
    .set("@packages", path.resolve(__dirname, './packages'))
    .set("@lib", path.resolve(__dirname, './lib'))
  }
}