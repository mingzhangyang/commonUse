/**
 * Created by mingzhang on 6/12/17.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const rel2abs = require('./rel2abs');

function dirStruct(dir) {
  let t = fs.statSync(dir);
  if (t.isFile()) {
    throw 'A directory expected';
  }

  let p = rel2abs(dir);

  let res = {
    path: p,
    name: path.basename(p),
    files: [],
    subDir: []
  };

  function readDir(dirName) {
    // console.log(dirName);
    let files = [];
    let subdir = [];
    let list = fs.readdirSync(dirName);
    // console.log(list);
    for (let i = 0; i < list.length; i++) {
      let path = dirName + '/' + list[i];
      // console.log(path);
      let cur = fs.statSync(path);
      // console.log(cur.isFile());
      if (cur.isFile()) {
        files.push(list[i]);
        continue;
      }
      subdir.push(readDir(path));
    }
    let obj = {
      path: dirName,
      name: path.basename(dirName)
    };
    if (files.length > 0) {
      obj.files = files;
    }
    if (subdir.length > 0) {
      obj.subDir = subdir;
    }
    if (files.length === 0 && subdir.length === 0) {
      obj.isEmpty = true;
    }
    return obj;
  }

  let ls = fs.readdirSync(dir);
  for (let i = 0; i < ls.length; i++) {
    let c = fs.statSync(dir + '/' + ls[i]);
    if (c.isFile()) {
      res.files.push(ls[i]);
    } else {
      res.subDir.push(readDir(dir + '/' + ls[i]));
    }
  }

  if(res.files.length === 0 && res.subDir.length === 0) {
    delete res.files;
    delete res.subDir;
    res.isEmpty = true;
  }

  return res;
}

if (typeof module !== 'undefined' && module.parent) {
  module.exports = dirStruct;
} else {
  // test cases go here
  console.log(dirStruct('.'));
}
