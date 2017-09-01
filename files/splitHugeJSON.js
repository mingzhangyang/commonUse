/*
 * This script is to split a huge json file into pieces of json files of
 * around 200 M.
 * User can set the file size that they prefer by setting the size parameter
 * in bytes.
 * The subFiles will be created in the current folder from which the script
 * is running.
 */

/*******************************************************************************
 *  PAY ATTENTION
 *
 *  This script only handles JSON files that fit for Solr, which means that
 *  each JSON file is an array of objects, for each object, the values of
 *  it's attributes can be number, string, boolean value, array of string,
 *  array of number, but not array of objects. (array of stringified object
 *  string is OK).
 *
 ****************************************************************************/

'use strict';

const fs = require('fs');
const path = require('path');

function splitLargeJSON(srcPath, size) {
  var src = fs.createReadStream(srcPath, 'utf8');
  src.count = 0;
  src.part = 1;
  src.size = size || 1024 * 1024 * 200;

  var filePath = path.parse(srcPath);
  var subFilePath = filePath.name + '_part_' + src.part + '.json';

  var subFile = fs.createWriteStream(subFilePath, {flags: 'w+', defaultEncoding: 'utf8'});
  src.on('data', function (chunk) {
    var s = chunk.replace(/\s+/g, '');
    // s = s.replace(/,,+/g, ',');

    src.count += s.length;

    if (src.count >= src.size) {
      var idx = s.lastIndexOf('},{');
      if (idx !== -1) {
        var left = s.slice(0, idx + 1) + ']';
        subFile.end(left, 'utf8');
        src.part += 1;
        subFilePath = filePath.name + '_part_' + src.part + '.json';
        subFile = fs.createWriteStream(subFilePath, {flags: 'w+', defaultEncoding: 'utf8'});
        subFile.write('[' + s.slice(idx + 2));
        src.count = 0;
      } else {
        subFile.write(s, 'utf8');
      }
    } else {
      subFile.write(s, 'utf8');
    }
  }).on('end', function () {
    console.log('Done!');
    console.log('' + src.part + ' files were created in the current' +
      ' directory!');
    process.exit(0);
  });
}

if (module.parent) {
  module.exports = splitLargeJSON;
} else {
  console.log('Done!');
}