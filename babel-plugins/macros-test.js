const babel = require('@babel/core')
const fs = require('fs')

const i = '1'

const { code } = babel.transform(fs.readFileSync(`./macros/${i}.js`), {
  plugins: [require(`babel-plugin-macros`)]
});

console.log(code);
