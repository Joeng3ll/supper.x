module.exports = {
  type: 'react-app',
  webpack: {},
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/1.0': {
        target: 'http://tunnel.fibos.io',
        changeOrigin: true,
      }
    }
  }
}
