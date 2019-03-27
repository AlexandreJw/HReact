const webpack = require("webpack");
const path = require("path");
const srcDir = path.join(__dirname, "./src");
const distDir = path.join(__dirname, "./dist");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const env = process.env.NODE_ENV.trim();

const webpackConfig = {
  mode: env === "dev" ? "development" : "production",
  entry: {
    main: "./src/index.js"
  },
  output: {
    path: path.resolve(distDir),
    filename: env === "dev" ? "[name].js" : "[name].min.js"
  },
  devtool: env === "dev" ? "source-map" : false,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new HtmlWebpackPlugin({
      title: 'react',
      chunks: ['main'],
      filename: 'index.html',
      template: './main.html',
      inject: 'body'
    })
  ]
};
if (env === 'dev') {
  webpackConfig.devServer = {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: 'localhost',
    port: 9000,
    open: true,
    overlay: {warnings: false, errors: true },
    proxy: {},
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: false
    }
  }
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
}
module.exports = webpackConfig