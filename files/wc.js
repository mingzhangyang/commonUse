/**
 * Created by yangm11 on 6/12/2017.
 */
'use strict';

const fs = require('fs');

function wc(dir, showHidden) {
  if (dir.length > 2 && dir.slice(0, 2) === './') {
    dir = dir.slice(2);
  }

  let p = __dirname;
  if (dir.slice(0, 2) === '..') {
    let s = dir.split('..');
    let t = s.length - 1;
    let r = s[t];
    p = p.split('/').slice(0, -t).join('/') + r;
  } else if (dir === '.' || dir === './') {
    // pass
  } else {
    p = p + dir;
  }

  let res = {
    path: p,
    files: 0,
    lines: 0,
    words: 0,
    chars: 0,
    skipped: [],
    hiddenFiles: [],
    hiddenDirectories: []
  };

  if (dir[dir.length - 1] === '/') {
    dir = dir.slice(0, -1);
  }

  function read(dirName) {
    console.log(dirName);
    let list = fs.readdirSync(dirName);
    console.log(list);

    for (let i = 0; i < list.length; i++) {
      let path = dirName + '/' + list[i];
      let cur = fs.statSync(path);

      if(list[i][0] === '.' || list[i][0] === '_') {
        if (list[i][1] === '.' && list[i][0] === '.') {
          res.hiddenDirectories.push(path);
        } else {
          res.hiddenFiles.push(path);
        }
        if (!showHidden) {
          continue;
        }
      }

      if (cur.isFile()) {
        res.files += 1;
        let c;
        try {
          c = fs.readFileSync(path, 'utf8');
        } catch (err) {
          res.skipped.push(path);
          continue;
        }

        res.lines += c.split('\n').length;
        res.words += c.replace(/\s/g, '').length;
        res.chars += c.length;

      } else if (cur.isDirectory()) {

        read(path);

      } else {

        return;

      }
    }

  }

  read(dir);
  console.log(res);
  return res;
}

if (typeof module !== 'undefined' && module.parent) {
  module.exports = wc;
} else {
  // test cases go here

  // wc('../../biologymeetweb');
  wc('./');
}