import path from 'path'
import { Transformer } from '@parcel/plugin'
import * as Eta from 'eta'

const etaTransformer = new Transformer({
  async loadConfig({ config }) {
    let configFile = await config.getConfig([
      'eta.config.json',
      'eta.config.js'
    ], null)

    if (configFile) {
      if (path.extname(configFile.filePath) === '.js') {
        config.invalidateOnStartup()
      }

      return configFile.contents
    }
  },

  async transform({ asset, config }) {
    const etaConfig = (config ?? Eta.config) as typeof Eta.config
    const content = await asset.getCode()
    const render = Eta.compile(content, {
      root: path.dirname(asset.filePath),
      filename: asset.filePath,
      ...etaConfig,
    })

    asset.type = 'html'
    asset.setCode(render(etaConfig?.data ?? {}, etaConfig))

    return [asset]
  }
})

export default etaTransformer
