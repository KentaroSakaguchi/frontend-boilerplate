/**
 * @file index.js
 */

const path = require('path');

/**
 * webpack.config.jsの設定を記述するファイル
 */
const webpackAddedInfo = {
  env: process.env.NODE_ENV, // 環境変数(package.jsonで定義している)
  entry: {
    app: './app/scripts', // トランスパイルするディレクトリ名
  },
  output: path.resolve(__dirname, process.env.NODE_ENV === 'development' ? '.dist' : 'build'), // jsの出力先
  exclude: [] // node_modulesライブラリでトランスパイルする必要な物がある場合はここに記述
};

/**
 * sass.config.jsの設定を記述するファイル
 */
const sassAddedInfo = {
  env: process.env.NODE_ENV, // 環境変数(package.jsonで定義している)
  dir: './app/styles/', // コンパイル対象のディレクトリ名
  file: './app/styles/index.scss', // コンパイルするファイル名
  outFile: '.dist/index.css', // 出力するファイル名
  sourceMap: process.env.NODE_ENV === 'development' ? true : false, // ソースマップの有無(開発時:あり 本番(stg):なし)
  sourceMapEmbed: process.env.NODE_ENV === 'development' ? true : false, // ソースマップの有無(開発時:あり 本番(stg):なし)
};

module.exports = {
  webpackAddedInfo: webpackAddedInfo,
  sassAddedInfo: sassAddedInfo
};
