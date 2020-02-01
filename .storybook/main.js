const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  stories: ['../stories/**/*.stories.js'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],
  webpackFinal: async config => {
    // do mutation to the config
    config.module.rules = [
      ...config.module.rules.map(r => {
        if (r.test.toString().includes('svg')) {
          const test = r.test.toString().replace('svg|', '');

          return { ...r, test: new RegExp(test) };
        }

        return r;
      }),
      ...require('../webpack/modules').rules
    ];
    config.plugins = [
      ...config.plugins,
      new MiniCssExtractPlugin({
        // JS中的CSS -> 单独的文件中
        filename: '[id].[contenthash:12].css',
        chunkFilename: '[id].[contenthash:12].css'
      })
    ];

    const customizedResolves = require('../webpack/resolve.js');
    config.resolve.extensions = [...config.resolve.extensions, ...customizedResolves.extensions];
    config.resolve.alias = { ...config.resolve.alias, ...customizedResolves.alias };

    return config;
  }
};
