const path = require('path');

module.exports = {
  entry: {
    app: './app',
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    chunkFilename: '[id].js',
  },
  devServer: {
    stats: 'errors-only',
    hot: true,
    inline: true,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  resolve: {
    extensions: ['.js', '.sass', '.json'],
    modules: ['node_modules', 'app', 'seed'],
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
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
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'sass-loader',
          options: {
            includePaths: ['./app/styles'],
          },
        }],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0', 'react'],
        },
      },
    ],
  },
};