/**
 * Created by yangm11 on 6/12/2017.
 */
'use strict';

const fs = require('fs');
const rel2abs = require('../files/rel2abs');
const sep = require('path').sep;

// _filename is taken as hidden file
function wc(dir, showHidden) {
  let p = rel2abs(dir);
  console.log(p);

  let t = fs.statSync(dir);
  if (t.isFile()) {
    let x = fs.readFileSync(dir, 'utf8');
    return {
      path: p,
      lines: x.split('\n').length,
      words: x.replace(/\s/g, '').length,
      chars: x.length
    }
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
    let list = fs.readdirSync(dirName);

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

  return res;
}

if (typeof module !== 'undefined' && module.parent) {
  module.exports = wc;
} else {
  // test cases go here

  console.log(wc('../..'));
}