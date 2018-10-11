const path = require('path');
const WorkboxPlugin = require('workbox-webpack-plugin');


module.exports = {
  entry: './src/client/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist', 'static'),
  },
  devServer: {
    contentBase: './dist/static',
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: 'css-loader',
      },
    ],
  },
  // plugins: [
  //   new WorkboxPlugin.GenerateSW({
  //     runtimeCaching: [
  //       {
  //         urlPattern: /images/,
  //         handler: 'cacheFirst',
  //       },
  //       {
  //         urlPattern: new RegExp('^https://fonts.(?:googleapis|gstatic).com/(.*)'),
  //         handler: 'cacheFirst',
  //       },
  //       {
  //         urlPattern: /.*/,
  //         handler: 'networkFirst',
  //       },
  //     ],
  //   }),
  // ],
};
