const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app: './app',
  },
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'bundle.js',
    chunkFilename: '[id].js',
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
            }, {
              loader: 'sass-loader',
              options: {
                includePaths: ['./vendor', './app'],
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
    new ExtractTextPlugin('style.css'),
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
  ],
};