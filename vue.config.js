let path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './',
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@A', resolve('src/assets'))
      .set('@M', resolve('src/modules'))
      .set('@L', resolve('src/lib'))
  }
}