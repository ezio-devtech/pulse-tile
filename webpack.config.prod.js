const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const sourcePath = path.join(__dirname, 'src');
const buildPath = path.join(__dirname, 'dist');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.resolve(sourcePath, 'index.html'),
  filename: path.resolve(buildPath, 'index.html'),
  inject: 'body',
});

const DEV_SERVER_URL = 'http://46.101.95.245';

module.exports = {
  devtool: 'source-map',

  entry: [
    path.resolve(sourcePath, 'index.js'),
  ],

  output: {
    path: path.resolve(buildPath),
    filename: '[name].js',
    publicPath: '/',
  },

  plugins: [
    HtmlWebpackPluginConfig,

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates

    new webpack.NoEmitOnErrorsPlugin(),
    // do not emit compiled assets that include errors

    new ExtractTextPlugin('styles.css'),
  ],

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ['react-hot-loader/webpack', 'babel-loader'],
      },
      {
        test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
        loader: 'url-loader',
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //resolve-url-loader may be chained before sass-loader if necessary
          use: ['css-loader?sourceMap', 'sass-loader?sourceMap'],
        }),
      },
    ],
  },
};
