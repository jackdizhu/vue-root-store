module.exports = function (babel) {
  const t = babel.types
  return {
    visitor: {
      VariableDeclarator(path, state) {
        if (path.node.id.name == 'a') {
          path.node.id = t.identifier('b')
        }
      }
    }
  }
}