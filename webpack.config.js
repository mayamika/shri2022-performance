const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInjectPreload = require('@principalstudio/html-webpack-inject-preload');

module.exports = {
  mode: 'production',
  entry: ['./scripts.js'],
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: '[name].[contenthash].js',
    clean: true,
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new HtmlWebpackInjectPreload({
      files: [
        {
          match: /.*\.woff2$/,
          attributes: { as: 'font', type: 'font/woff2' },
        },
        {
          match: /\.svg$/,
          attributes: { as: 'image', type: "image/svg+xml" },
        },
        {
          match: /\.png$/,
          attributes: { as: 'image' },
        },
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
