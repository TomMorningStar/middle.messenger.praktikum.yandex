const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.ts'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.ts', '.json'],
    enforceExtension: false,
    alias: {
      handlebars: 'handlebars/dist/handlebars.min.js',
      pages: path.resolve(__dirname, './src/pages'),
      components: path.resolve(__dirname, './src/components'),
      core: path.resolve(__dirname, './src/core'),
      utils: path.resolve(__dirname, './src/utils'),
      services: path.resolve(__dirname, './src/services'),
      api: path.resolve(__dirname, './src/api'),
    },
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.hbs$/,
        use: [
          'handlebars-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};
