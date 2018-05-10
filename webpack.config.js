const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const createConfig = target => ({
  entry: './src/index.js',
  output: {
    filename: target === 'web' ? 'index.js' : `index.${target}.js`,
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
  target,
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
});

module.exports = [createConfig('web'), createConfig('node')];
