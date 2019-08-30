const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('@components', resolve('./src/components'))
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('assets', resolve('./src/assets'))
      .set('@', resolve('./src'))
      .set('public', resolve('./public'))
    if (process.env.NODE_ENV === 'development') {
      config.devServer
        .set('proxy', {

        })
    }
  }
}