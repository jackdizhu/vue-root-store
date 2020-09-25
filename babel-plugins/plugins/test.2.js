module.exports = function (babel) {
  const t = babel.types
  return {
    visitor: {
      ImportDeclaration(path) {
        const { node: { specifiers, source } } = path;
        if (!t.isImportDefaultSpecifier(specifiers[0])) { // 对 specifiers 进行判断，是否默认导入
          const newImport = specifiers.map(specifier => (
            t.importDeclaration(
              [t.ImportDefaultSpecifier(specifier.local)],
              t.stringLiteral(`${source.value}/lib/${specifier.local.name}`)
            )
          ))
          path.replaceWithMultiple(newImport)
        }
      }
    }
  }
}