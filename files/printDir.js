/**
 * Created by mingzhang on 8/19/17.
 */
'use strict';

const fs = require('fs');

function printDir(directory) {
  if (directory[directory.length - 1] === '/') {
    directory = directory.slice(0, -1);
  }

  let s = fs.statSync(directory);

  if (s.isFile()) {
    console.log(directory);
    return;
  }

  function foo(d) {
    if (d === 0) {
      return '';
    }
    if (d === 1) {
      return '|--';
    }
    // let res = '|--';
    // for (let i = 0; i < d - 1; i++) {
    //   res = '|  ' + res;
    // }
    // return res;
    return '|  ' + foo(d - 1);
  }

  function bar(path) {
    let p = path.split('/');
    return p[p.length - 1];
  }

  function worker(dir, d) {
    d = d || 0;

    console.log(foo(d) + bar(dir) + '/');

    d += 1;

    let list = fs.readdirSync(dir);
    for (let i = 0; i < list.length; i++) {
      let cur = dir + '/' + list[i];
      if (fs.statSync(cur).isFile()) {
        console.log(foo(d) + list[i]);
        continue;
      }
      worker(cur, d);
    }
  }

  worker(directory);
}


function main() {
  printDir('../');
// console.log(fs.readdirSync('..'));
// console.log(fs.statSync('..'));
}

if (typeof module !== 'undefined' && module.parent) {
  module.exports = printDir;
} else {
  main();
}