const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, options) => {
  const dev = options.mode === "development";
  const config = {
    devtool: dev ? "source-map" : "none",
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-transform-runtime']
            }
          }
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader',
          ],
        },
      ]
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 9000
    },
    plugins: [new MiniCssExtractPlugin(), new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
    })],
    entry: ['./src/app.js', './src/style.scss'],
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
    },
  }
  return config;
};