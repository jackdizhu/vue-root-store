const babel = require('@babel/core')
const fs = require('fs')

const i = '2'

const { code } = babel.transform(fs.readFileSync(`./plugins/${i}.js`), {
  plugins: [require(`./plugins/test.${i}.js`)]
});

console.log(code);
