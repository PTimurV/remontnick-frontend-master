const spritePlugin = require('svg-sprite-loader/lib/utils/index.js')
const { generateExport, stringify } = spritePlugin

function runtimeGenerator(params) {
  const { symbol, config } = params
  const { extract, esModule } = config
  let runtime

  if (extract) {
    const data = `{
      id: ${stringify(symbol.useId)},
      viewBox: ${stringify(symbol.viewBox)},
      url: ${stringify(
        config.spriteFilename.split('?')[0]
      )} + '#' + ${stringify(symbol.id)},
      toString: function () {
        return this.url;
      }
    }`
    runtime = generateExport(data, esModule)
  }

  return runtime
}

module.exports = runtimeGenerator
