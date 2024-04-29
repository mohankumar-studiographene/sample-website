const path = require('path');
const { HotModuleReplacementPlugin } = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { merge } = require('webpack-merge');

const ENV_VAR = require('./src/utils/env_variable');
const baseConfig = require('./webpack.base');

const config = {
  mode: 'development',
  entry: ['./src/assets/scss/style.scss', './src/index.jsx'],
  output: {
    filename: `[name].[contenthash].js?var=${new Date()}`,
    chunkFilename: '[name].[chunkhash].js',
    publicPath: '/',
    clean: true, // clean output folder before emit
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
  ],
  devtool: 'inline-source-map',
  devServer: {
    static: path.join(__dirname, 'build'),
    compress: true,
    historyApiFallback: true,
    port: ENV_VAR.PORT,
    open: true,
    hot: true,
  },
};

module.exports = merge(baseConfig, config);
