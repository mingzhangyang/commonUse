/**
 * Created by mingzhang on 6/12/17.
 */
'use strict';

const path = require('path');

function rel2abs(rel, dir) {
  if (path.isAbsolute(rel)) {
    return rel;
  }
  if (typeof dir === 'undefined') {
    dir = __dirname;
  }
  if (rel === './' || rel === '.') {
    return dir;
  }

  if (rel.slice(0, 2) === './') {
    rel = rel.slice(2);
  }

  // if (rel[0] !== '.') {
  //   return dir + rel;
  // }
  //
  // let t = rel.split('/');
  // let p = 0;
  // for (let i = 0; i < t.length; i++) {
  //   if (t[i] === '..') {
  //     p += 1;
  //   }
  // }
  // let r = t.slice(p).join('/');
  // return dir.split('/').slice(0, -p).join('/') + '/' + (r ? r : '');

  let li = rel.split('/');
  let res = dir.split('/');

  for (let i = 0; i < li.length; i++) {
    if (li[i] === '..') {
      res.pop();
    } else {
      res.push(li[i]);
    }
  }

  return res.join('/');

}

if (typeof module !== 'undefined' && module.parent) {
  module.exports = rel2abs;
} else {
  // test cases go here
  console.log(rel2abs('../../biologymeetweb/..'));
}