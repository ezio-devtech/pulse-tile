const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ES6Promise = require('es6-promise');
const WebpackZipPlugin = require('webpack-zip-plugin');

ES6Promise.polyfill();

const sourcePath = path.join(__dirname, 'src');
const buildPath = path.join(__dirname, 'dist');

const currentDate = new Date();
const currentDateLabel = currentDate.getFullYear() + '.' + (currentDate.getMonth() + 1) + '.' + currentDate.getDate();

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.resolve(sourcePath, 'index.html'),
  filename: path.resolve(buildPath, 'index.html'),
  inject: 'body',
});

module.exports = {
  devtool: 'cheap-module-source-map',

  entry: [
    path.resolve(sourcePath, 'index.js'),
  ],

  output: {
    path: path.resolve(buildPath),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/',
  },

  plugins: [
    HtmlWebpackPluginConfig,

    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates

    new webpack.NoEmitOnErrorsPlugin(),
    // do not emit compiled assets that include errors

    new ExtractTextPlugin('styles.css'),

    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
    }),

    new webpack.ProvidePlugin({
      Promise: 'es6-promise-promise',
      '_': 'lodash/fp',
      '$': 'jquery',
      'jQuery': 'jquery',
      'window.jQuery': 'jquery',
    }),

    new webpack.optimize.DedupePlugin(),

    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      exclude: [/node_modules/],
      parallel: 4,
      compress: {
        warnings: false,
      },
    }),

    new WebpackZipPlugin({
      initialFile: './dist',
      endPath: './build',
      zipName: 'PulseTile-Core.build-' + currentDateLabel + '.zip',
    }),
  ],

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ['react-hot-loader/webpack', 'babel-loader'],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|jpg|gif)$/,
        loader: 'url-loader?limit=100000',
      },
      {
        test: /\.(scss|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //resolve-url-loader may be chained before sass-loader if necessary
          use: ['css-loader?sourceMap&minimize', 'sass-loader?sourceMap&minimize'],
        }),
      },
    ],
  },
};
