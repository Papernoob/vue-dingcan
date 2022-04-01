const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: true,
  publicPath: './',
  devServer: {
    host: 'localhost',
    port: 8080,
    //  proxy: {
    //   '/': {
    //     target: 'localhost:3000/', // 要跨域的域名
    //     // changeOrigin: true // 是否开启跨域
    //   }
    // }
  }
    
})
