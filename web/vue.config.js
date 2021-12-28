module.exports = {
  devServer: {
    disableHostCheck: true,
    host: '0.0.0.0',
    port: 8000,
    public: 'localhost',
    allowedHosts: ['reverse_proxy'],
    proxy: {
      '^/api': {
        target: 'http:/web/api',
        ws: true,
        changeOrigin: true
      }
    }
  },
}
