/**
 * @file copy.js
 * app/html/をコピーして.distに移動
 */

const glob = require('glob');
const fse = require('fs-extra');

const htmlFiles = glob.sync(
  './app/html/*.html'
);

htmlFiles.forEach(value => {
  fse.copySync(value, value.replace('./app/html/', '.dist/'));
});
