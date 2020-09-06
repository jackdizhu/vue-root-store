module.exports = {
  presets: [
    ['@vue/cli-plugin-babel/preset', {
        modules: 'auto', 
        targes: {
          esmodules: true
        },
        useBuiltIns: false, // 剔除core-js包
        forceAllTransforms: true
      }
    ]
  ]
}
