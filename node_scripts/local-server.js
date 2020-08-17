/**
 * @file loval-server.js
 * ローカルサーバー設定ファイル
 */

const browserSync = require('browser-sync');
// const watch = require('./watch');

browserSync({
  server: {
    baseDir: '.dist',
  },
  port: 8000,
  https: false,
  notify: false,
  open: false,
});


// 終了処理
process.on('SIGINT', () => {
  process.exit(0);
});
