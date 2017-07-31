const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
  'react', 'react-dom', 'redux', 'axios', 'prop-types', 'redux-thunk',
  'react-router-redux', 'lodash.chunk', 'lodash.debounce', 'lodash.throttle',
  'react-router', 'react-onclickoutside', 'react-input-range', 'react-toastify',
  'react-circular-progressbar', 'react-addons-css-transition-group',
];

module.exports = {
  entry: {
    bundle: './app',
    vendor: VENDOR_LIBS,
  },
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'js/[name].js',
    publicPath: '/',
  },
  resolve: {
    extensions: [
      '.js', '.sass', '.json',
    ],
    modules: ['node_modules', 'app', 'seed'],
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          // resolve-url-loader may be chained before sass-loader if necessary
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                includePaths: ['./app/styles'],
              },
            },
          ],
        }),
      }, {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0', 'react'],
        },
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('css/style.css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
    new webpack
      .optimize
      .UglifyJsPlugin({
        compress: {
          warnings: false,
        },
      }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    new HtmlWebpackPlugin({
      template: './app/index.html',
    }),
  ],
};
