const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const PacktrackerPlugin = require('@packtracker/webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const Visualizer = require('webpack-visualizer-plugin');

let mode = process.env.NODE_ENV || 'production';
module.exports = {
  mode: mode,
  entry: {
    index: './src/index.js',
  },
  devtool: 'inline-source-map',
  optimization: {
    minimizer: mode === 'production' ? [new OptimizeCSSAssetsPlugin({}), new TerserPlugin({
      extractComments: true
    })] : [],
    minimize: mode === 'production'
  },
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: '[name].js',
    library: 'UniUser',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    publicPath: path.resolve(__dirname, 'lib'),
    globalObject: 'this'
  },
  module: require('./webpack/modules'),
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new CheckerPlugin(),
    new PacktrackerPlugin({
      project_token: '219c8574-0259-4a20-8826-8ffbcf5398c3',
      upload: process.env.ci === 'true',
      branch: 'master'
    }),
    new Visualizer(),
  ].concat(
    process.env.ci ? [] : [new BundleAnalyzerPlugin()]
  ),
  resolve: require('./webpack/resolve.js'),
  externals: [
    {
      // Don't bundle react or react-dom
      react: {
        commonjs: 'react',
        commonjs2: 'react',
        amd: 'react',
        root: 'react'
      },
      'react-dom': {
        commonjs: 'react-dom',
        commonjs2: 'react-dom',
        amd: 'react-dom',
        root: 'react-dom'
      },
      antd: {
        commonjs: 'antd',
        commonjs2: 'antd',
        amd: 'antd',
        root: 'antd'
      },
      'antd-mobile': {
        commonjs: 'antd-mobile',
        commonjs2: 'antd-mobile',
        amd: 'antd-mobile',
        root: 'antd-mobile'
      },
      '@tarojs/taro': {
        commonjs: '@tarojs/taro',
        commonjs2: '@tarojs/taro',
        amd: '@tarojs/taro',
        root: '@tarojs/taro'
      }
    }
  ]
};
