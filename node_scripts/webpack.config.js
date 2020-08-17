/**
 * @file webpack.config.js
 */

const webpackAddedInfo = require('../index').webpackAddedInfo;

const modeOption = webpackAddedInfo.env;

const webpackConfig = [
  {
    mode: modeOption,

    // 読み込み元
    entry: webpackAddedInfo.entry,

    // 吐き出し先
    output: {
      path: webpackAddedInfo.output,
      filename: '[name].bundle.js'
    },

    module: {
      rules: [
        // eslintの設定
        {
          enforce: 'pre',
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'eslint-loader'
        },
        // jsの設定
        {
          test: /\.(js|jsx)$/,
          use: [
            {
              // Babel
              // npm install --save-dev babel-loader @babel/core @babel/preset-env
              loader: 'babel-loader',
              options: {
                presets: [
                  // https://babeljs.io/docs/en/babel-preset-env
                  '@babel/preset-env',
                  // https://babeljs.io/docs/en/babel-preset-react
                  '@babel/preset-react'
                ]
              },
            }
          ],
          exclude: {
            // node_modules はトランスパイルから除外する
            include: /node_modules/,
            exclude: webpackAddedInfo.exclude,
          }
        }
      ]
    },

    resolve: { // 下記の拡張子のentryからimportされているファイルをくっつける
      extensions: ['.js', '.jsx'],
    },

    optimization: { // ライブラリを別ファイルでまとめる
      splitChunks: {
        name: 'lib',
        chunks: 'initial'
      }
    }
  }
];

module.exports = webpackConfig;
