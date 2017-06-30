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
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            hash: 'sha512',
            digest: 'hex',
            name: '[hash].[ext]',
          },
        }, {
          loader: 'image-webpack-loader',
          options: {
            bypassOnDebug: true,
          },
        }],
      },
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