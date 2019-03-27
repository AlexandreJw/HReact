const webpack = require("webpack");
const path = require("path");
const srcDir = path.join(__dirname, "./src");
const distDir = path.join(__dirname, "./dist");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const env = process.env.NODE_ENV.trim();
