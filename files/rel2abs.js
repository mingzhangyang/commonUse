/**
 * Created by mingzhang on 6/12/17.
 */
'use strict';

const path = require('path');

// the function below accepts paths of Linux style, namely '/'
function rel2abs(rel, dir, platform) {
  let sep = path.sep;

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

  let li = rel.split('/');
  let res = dir.split(sep);
  // console.log(res);

  for (let i = 0; i < li.length; i++) {
    if (li[i] === '..') {
      res.pop();
    } else {
      res.push(li[i]);
    }
  }
  // console.log(res);
  return res.join(sep);
}

if (typeof module !== 'undefined' && module.parent) {
  module.exports = rel2abs;
} else {
  // test cases go here
  console.log(rel2abs('../../biologymeetweb/..'));
}