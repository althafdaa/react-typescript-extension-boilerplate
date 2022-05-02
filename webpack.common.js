const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const {
  cleanWebpackPlugin,
  CleanWebpackPlugin,
} = require('clean-webpack-plugin');

const getHtmlPlugins = (chunks) => {
  const Plugins = chunks.map(
    (item) =>
      new HtmlPlugin({
        title: 'React Typescript Extension Boilerplate',
        filename: `${item}.html`,
        chunks: [item],
      })
  );

  return Plugins;
};

const chunks = ['PopUp', 'Options'];

module.exports = {
  entry: {
    PopUp: path.resolve('src/PopUp/PopUp.tsx'),
    Options: path.resolve('src/Options/Options.tsx'),
    Background: path.resolve('src/Background/Background.ts'),
    contentScript: path.resolve('src/contentScript/ContentScript.ts'),
  },
  module: {
    rules: [
      {
        use: 'ts-loader',
        test: /\.tsx?$/,
        exclude: /node_modules/,
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css?$/i,
      },
      {
        type: 'asset/resource',
        test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve('src/static'),
          to: path.resolve('dist'),
        },
      ],
    }),
    ...getHtmlPlugins(chunks),
  ],
  resolve: {
    extensions: ['tsx', '.ts', '.js'],
  },

  output: {
    filename: '[name].js',
    path: path.resolve('dist'),
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};
