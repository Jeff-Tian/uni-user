const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const configArgv = JSON.parse(process.env.npm_config_argv);

module.exports = function() {
  let config = {
    entry: {
      index: './src/main.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
      filename: '[name].[hash].js',
      chunkFilename: '[name].[hash].chunk.js'
    },
    module: require('./webpack/modules'),
    optimization: {
      splitChunks: {
        chunks: 'async',
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        name: false,
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            reuseExistingChunk: true,
            enforce: true
          }
        }
      }
    },
    resolve: require('./webpack/resolve.js'),
    plugins: [
      new MiniCssExtractPlugin({
        // JS中的CSS -> 单独的文件中
        filename: '[id].[contenthash:12].css',
        chunkFilename: '[id].[contenthash:12].css'
      }),
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/)
    ]
    // configFileName: 'tsconfig.json'
  };

  if (configArgv.original.includes('-analyzer')) {
    config.plugins.push(new BundleAnalyzerPlugin());
  }

  return config;
};
