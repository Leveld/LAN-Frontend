const webpack = require('webpack');
//const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeExternals = require('webpack-node-externals');
const { IS_PRODUCTION } = require('capstone-utils');
var path = require('path');

const isProduction = process.env.NODE_ENV === 'production';
const productionPluginDefine = isProduction ? [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  }) 
] : [];
const clientLoaders = isProduction ? productionPluginDefine.concat([
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env.BROWSER': true
  }),
]) : [];

module.exports = [
  {
    entry: ['babel-polyfill', './src/client/index.jsx'],
    output: {
      path: path.resolve(__dirname,'./public/'),
      publicPath: path.resolve(__dirname,'./public/'),
      filename: 'js/bundle.js'
    },
    plugins: clientLoaders.concat([
      new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'css/styles.css',
      chunkFilename: 'css/styles.css',
    })
    ]),
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.jsx$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use:[
            {
              loader: MiniCssExtractPlugin.loader,
            },
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use:[
            {
              loader: MiniCssExtractPlugin.loader,
              options:{
                publicPath:'../'
              }
            },
            'css-loader'
          ],
        {
          test: /\.(png|jpg|gif)$/,
          exclude:/node_modules/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192
              }
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx', '.jpg', '.png']
    }
  }
];
