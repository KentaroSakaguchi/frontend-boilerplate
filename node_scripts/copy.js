/**
 * @file copy.js
 * app/html/をコピーして.distに移動
 */

const glob = require('glob');
const fse = require('fs-extra');

const htmlFiles = glob.sync(
  './app/html/*.html'
);

const dirName = process.env.NODE_ENV === 'production' ? 'build' : '.dist';

htmlFiles.forEach(value => {
  fse.copySync(value, value.replace('./app/html', dirName));
});
