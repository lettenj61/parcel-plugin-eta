import { Parcel } from '@parcel/core'

const bundler = new Parcel({
  entries: 'src/index.eta',
  defaultConfig: '@parcel/config-default',
})

try {
  console.log('Build start ...')
  const res = await bundler.run()

  const graph = res.bundleGraph
  const bundles = graph.getBundles()
  console.log(`
Bundle completed!

files: ${bundles.length}
time: ${res.buildTime} ms`)

} catch (ex) {
  console.error(JSON.stringify(ex.diagnostics ?? {}, null, 2))
}