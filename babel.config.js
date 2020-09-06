module.exports = {
  presets: [
    ['@vue/cli-plugin-babel/preset', {
        modules: 'auto', 
        targes: {
          esmodules: true
        },
        useBuiltIns: false,
        forceAllTransforms: true
      }
    ]
  ]
}
