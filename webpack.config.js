const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const NODE_ENV = process.env.NODE_ENV || 'development';
const isDevelopment = NODE_ENV === 'development';

module.exports = {
  entry: './src/main',
  output: {
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: '[name].bundle.js',
    filename: '[name].bundle.js'
  },
  resolve: {
    extensions: ['.js', '.scss'],
    alias: {
      'react-dom': isDevelopment ? '@hot-loader/react-dom' : 'react-dom'
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: /src/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            options: { hmr: isDevelopment }
          },
          {
            loader: 'css-loader',
            options: { modules: true }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: isDevelopment }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'react-svg-loader',
            options: { jsx: true }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/public/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
    }),
    new Dotenv({
      safe: true
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    publicPath: '/',
    historyApiFallback: true,
    contentBase: './src',
    hot: true,
    inline: true
  }
}