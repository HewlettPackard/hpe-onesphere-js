const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'hpe-onesphere-js',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        },
      },
    ],
  },
  target: 'node',
  node: {
    global: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  plugins: [
    new UglifyJsPlugin({
      parallel: true,
    }),
  ],
};
