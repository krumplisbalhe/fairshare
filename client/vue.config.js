module.exports = {
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')

  },
  devServer: {
    port: 3001,
    proxy: {
      '^/api': {
        target: 'http://localhost:3000/'
      }
    },
  }
};
