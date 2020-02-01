const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  rules: [
    {
      test: /\.(svg)$/,
      use: [
        {
          loader: 'url-loader'
        }
      ]
    },
    {
      test: /\.([tj]sx?)$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env', '@babel/react'],
          plugins: [
            '@babel/plugin-transform-runtime',
            [
              '@babel/plugin-proposal-class-properties',
              {
                loose: true
              }
            ],
            ['@babel/plugin-proposal-export-default-from']
          ]
        }
      },
      exclude: /node_modules/
    },
    {
      test: /node_modules\/react-intl\/.+\.(jsx?)$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env', '@babel/react'],
          plugins: [
            '@babel/plugin-transform-runtime',
            ['@babel/plugin-transform-parameters'],
            [
              '@babel/plugin-proposal-class-properties',
              {
                loose: true
              }
            ],
            ['@babel/plugin-proposal-export-default-from']
          ]
        }
      }
    },
    {
      test: /\.css$/,
      resolve: { extensions: ['.css'] },
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            // you can specify a publicPath here
            // by default it use publicPath in webpackOptions.output
            publicPath: path.resolve(__dirname, 'lib')
          }
        },
        { loader: 'css-loader' }
      ],
      exclude: process.env.CSS_LOADER_EXCLUDE_NODE_MODULES === 'true' ? /node_modules/ : undefined
    },
    {
      test: /\.less$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            // you can specify a publicPath here
            // by default it use publicPath in webpackOptions.output
            publicPath: path.resolve(__dirname, 'lib')
          }
        },
        {
          loader: 'css-loader'
        },
        {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true,
            modifyVars: {}
          }
        }
      ],
      exclude: /node_modules/
    },
    {
      test: /\.tsx?$/,
      use: { loader: 'awesome-typescript-loader' },
      exclude: /node_modules/
    }
  ]
};
