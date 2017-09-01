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

/**
 * @param srcPath: path to the JSON file
 * @param size in bytes
 * @param enc: encoding, e.g. "binary" (default), "utf8"
 */
function splitLargeJSON(srcPath, size, enc) {
  enc = enc || 'binary';
  var src = fs.createReadStream(srcPath, enc);
  src.count = 0;
  src.part = 1;
  src.size = size || 1024 * 1024 * 200;

  var filePath = path.parse(srcPath);
  var subFilePath = filePath.name + '_part_' + src.part + '.json';

  var subFile = fs.createWriteStream(subFilePath, {flags: 'w+', defaultEncoding: enc});

  console.log('work in progress ...');
  src.on('data', function (chunk) {
    var s = chunk.replace(/\s+/g, '');
    // s = s.replace(/,,+/g, ',');

    src.count += s.length;

    if (src.count >= src.size) {
      var idx = s.lastIndexOf('},{');
      if (idx !== -1) {
        var left = s.slice(0, idx + 1) + ']';
        subFile.end(left, enc);
        src.part += 1;
        subFilePath = filePath.name + '_part_' + src.part + '.json';
        subFile = fs.createWriteStream(subFilePath, {flags: 'w+', defaultEncoding: enc});
        subFile.write('[' + s.slice(idx + 2));
        src.count = 0;
      } else {
        subFile.write(s, enc);
      }
    } else {
      subFile.write(s, enc);
    }
  }).on('end', function () {
    console.log('Done!');
    console.log('' + src.part + ' files were created in the current' +
      ' directory!');
    process.exit(0);
  });
}

if (typeof module !== 'undefined' && module.parent) {
  module.exports = splitLargeJSON;
} else {
  let file = process.argv[2];
  let size = +(process.argv[3]);
  let enc = process.argv[4];
  splitLargeJSON(file, size, enc);
}