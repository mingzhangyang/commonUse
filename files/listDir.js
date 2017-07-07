/**
 * Created by yangm11 on 7/6/2017.
 */
'use strict';

const fs = require('fs');
const path = require('path');

function listDir(dir) {
  let s = fs.statSync(dir);
  if (s.isFile()) {
    throw 'A directory expected';
  }
  if (s.isDirectory()) {
    let arr = fs.readdirSync(dir);
    let res = {
      files: [],
      directories: []
    };
    for (let i = 0; i < arr.length; i++) {
      if (fs.statSync(path.join(dir, arr[i])).isFile()) {
        res.files.push(arr[i]);
      }
      else {
        res.directories.push(arr[i]);
      }
    }
    return res;
  }
  throw 'Failed to read the directory provided';
}

if (typeof module !== 'undefined' && module.parent) {
  module.exports = listDir;
} else {
  // test codes go here

  console.log(listDir('../'));
}