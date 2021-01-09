# spa-module vue微应用原理

1. vue 实例挂载子应用

```sh
npm run build-module
# 打包index.js替换public/module-demo/index.js
npm run dev
# 点击spa-module查看效果
```

2. 问题点

> 子应用数据缓存
> 子应用创建、销毁处理
> 应用路由，css隔离