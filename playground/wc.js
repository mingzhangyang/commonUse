/**
 * Created by yangm11 on 6/12/2017.
 */
'use strict';

const fs = require('fs');
function wc(dir) {
  let res = {
    files: 0,
    directories: {},
    _dir: [],
    lines: 0,
    words: 0,
    all: 0
  };

  if (dir[dir.length - 1] === '/') {
    dir = dir.slice(0, -1);
  }

  function read(dirName) {
    let list = fs.readdirSync(dirName);
    // console.log(list);
    for (let i = 0; i < list.length; i++) {
      if(list[i][0] === '.' || list[i][0] === '_') {
        continue;
      }
      let cur = fs.statSync(dirName + '/' + list[i]);
      if (cur.isFile()) {
        res.files += 1;
        let c = fs.readFileSync(dirName + '/' + list[i], 'utf8');
        res.lines += c.split('\n').length;
        res.words += c.replace(/\s/g, '').length;
        res.all += c.length;
      } else if (cur.isDirectory()) {
        res._dir.push(list[i]);
        read(dirName + '/' + list[i]);
      } else {
        return;
      }
    }
  }

  read(dir);
  console.log(res);
  return res;
}

wc('..');