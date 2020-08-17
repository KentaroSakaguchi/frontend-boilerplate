/**
 * @file sass.config.js
 */

const sass = require('sass'); // https://www.npmjs.com/package/sass
const fse = require('fs-extra');
const glob = require('glob');
const chokidar = require('chokidar');
const chalk = require('chalk');
const path = require('path');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const postcssEasyImport = require('postcss-easy-import');
const simpleExtend = require('postcss-extend');
const hexrgba = require('postcss-hexrgba');
const cssnano = require('cssnano');
const postcssEasings = require('postcss-easings');
const globImporter = require('node-sass-glob-importer');
const stylelint = require('stylelint');
const stylelintConfig = path.join(__dirname, '../.stylelintrc.json');

const sassAddedInfo = require('../index').sassAddedInfo;

const cssPlugins = [
  // scssで使用するプラグイン(dart-sassにない機能を追加する場合はこの配列に追加する)
  autoprefixer(),
  postcssEasyImport({ extensions: ['.scss'] }),
  simpleExtend(),
  hexrgba(),
  postcssEasings()
];

if (sassAddedInfo.env !== 'development') {
  cssPlugins.push(cssnano()); // productionの時はcssを圧縮する
}

const scssBasePath = path.join(__dirname, '..', sassAddedInfo.dir); // scssの置いてあるディレクトリ
const lintTargetScssFiles = glob.sync(`${scssBasePath}**/*.scss`); // scssのファイル郡

/**
 * stylelintの設定
 * @param {String} lintCheckFile lintを通すscssのファイル名
 */
const styleLintFunk = (lintCheckFile) => {

  stylelint.lint({
    configFile: stylelintConfig,
    files: lintCheckFile,
    syntax: 'scss',
    formatter: 'string',
  }).then((data) => {

    if (data.output.length) {
      console.log(chalk.red.bold('cssの構文エラーです'));
      console.log(data.output);
    } else {
      console.log(chalk.cyan(`${data.results[0].source.replace(scssBasePath, '')} lint check ok`));
      sassFunc(lintCheckFile);
    }

  })
  .catch((err) => {
    console.error(err.stack);
  });
};

lintTargetScssFiles.forEach(value => {
  styleLintFunk(value);
});

/**
 * sassコンパイル実行関数
 * @param {String} lintCheckOkFile lintOKのscssのファイル名
 */
const sassFunc = (lintCheckFile) => {
  return sass.render(
    {
      // https://github.com/sass/dart-sass#javascript-api
      file: sassAddedInfo.file, // コンパイル対象のディレクトリ名
      outFile: sassAddedInfo.outFile, // コンパイルするファイル名
      sourceMap: sassAddedInfo.env === 'development' ? true : false, // ソースマップの有無(開発時:あり 本番(stg):なし)
      sourceMapEmbed: sassAddedInfo.env === 'development' ? true : false, // ソースマップを埋め込むか(開発時:あり 本番(stg):なし)
      importer: globImporter() // sassのimportで*を使用するためのプラグイン
    }, (err, result) => {

      if (!err) {
        // cssでプラグイン(dart-sassにない機能)を使用したい場合はpostcss経由でプラグインを使う
        // dart-sassが生成したcssをpostcssで解析しプラグインを当て、cssファイルとして出力する
        postcss(cssPlugins).process(result.css, { from: sassAddedInfo.file }).then(cssData => {

          cssData.warnings().forEach(warn => {
            // エラーの場合の処理
            console.warn(warn.toString());
          });

          // No errors during the compilation, write this result on the disk
          fse.writeFile(sassAddedInfo.outFile, cssData, (err) => {
            if(!err){
              //file written on disk
              console.log(chalk.green(`compile finish -> ${lintCheckFile.replace(scssBasePath, '')}`));
            } else {
              console.log(chalk.underline.red(`compile error -> ${lintCheckFile.replace(scssBasePath, '')}`));
              console.log(err);
            }
          });
        });
      } else {
        console.log(chalk.underline.red(`compile error! -> ${lintCheckFile.replace(scssBasePath, '')}`));
        console.log(err);
      }
    }
  );
};

// watchモード
if (process.env.NODE_WATCH) {

  /**
   * ファイルを監視して変更があったらコンパイルする
   */
  const chokidarWatch = chokidar.watch(`${path.join(__dirname, '..', sassAddedInfo.dir)}**`, {
    gnoreInitial: true, // ファイルやフォルダの監視開始時にaddイベントやaddDirイベントを発生させない。
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    awaitWriteFinish: { // ファイルに対する変更が完了したと思われるまでaddイベントやchangeイベントの発生を遅らせる
      stabilityThreshold: 1000, // ファイルに対する変更が完了したと判断するまでの時間
      pollInterval: 100 // ファイルに対する変更が完了したかを確認する間隔
    }
  });

  chokidarWatch.on('change', (path) => {
    styleLintFunk(path);
    console.log(chalk.yellow(`filechange -> ${path.replace(scssBasePath, '')}`));

  }).on('error', (err) => {
    console.error(err);
    process.exit(1);
  });

  // 終了処理
  process.on('SIGINT', () => {
    process.exit(0);
  });
}
