# vue lib packages

* 配置启动模式 vue-cli-service build --mode lib 区分开发,打包状态
* 配置多入口 entry: getComponents(pkgPath) 打包支持按需引入
* 配置 output 打包commonjs2类型
* 删除配置 config.optimization.delete('splitChunks') 禁止webpack分包
* 删除 config.plugins.delete('html-index').delete('preload-index').delete('prefetch-index') 取消index.html 入口文件
* 修改 config.plugin('extract-css') 插件配置定义打包style名称