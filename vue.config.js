module.exports = {
  devServer: {
    public: 'scheduler.localhost'
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'UF Scheduler'
        return args
      })
  }
}
