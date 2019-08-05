const path = require('path');

const config = {
  mode: 'development',
  entry: ['@babel/polyfill', path.resolve(__dirname, './index.js')],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [{
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }]
  },
  resolve: {
    extensions: ['.json', '.js']
  }
}

module.exports = config;