const { VueLoaderPlugin } = require('vue-loader');  // node의 모듈 시스템
const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.vue'],
    },
  entry: {
    app: path.join(__dirname, 'main.js'),
  },
  module: {
      rules: [
          {
            test: /\.vue$/,
            loader: 'vue-loader',
          },
          {
            test: /\.css$/,
            use: [
                'vue-style-loader',
                'css-loader',
            ],
          }
      ]
  },
  plugins: [
      new VueLoaderPlugin(),
  ],
  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '',
  },
};