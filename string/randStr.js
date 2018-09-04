/**
 * Created by yangm11 on 7/7/2017.
 */
'use strict';

const mix = require('./mixTwoString');

function randStr(opts) {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  const marks = '~!@#$%^&*()_+-={}[]:";``,.<>?/\\|';

  opts = opts || {};
  let len = opts.len || 10;
  let cap = opts.cap || false;
  let space = opts.space || 0;
  let charOnly = opts.characterOnly || false;

  let res = '';
  if (charOnly) {
    for (let i = 0; i < len; i++) {
      res += chars[Math.floor(chars.length * Math.random())];
    }
  } else {
    let base = mix(chars, marks);
    for (let i = 0; i < len; i++) {
      res += base[Math.floor(chars.length * Math.random())];
    }
  }

  let spacePos = [];
  while (spacePos.length < space) {
    let t = Math.floor(len * Math.random());
    if (t !== 0 && spacePos.indexOf(t) === -1) {
      spacePos.push(t);
    }
  }

  function replaceAtIndex(str, i, char) {
    return str.slice(0, i) + char + str.slice(i + 1);
  }

  for (let i = 0; i < spacePos.length; i++) {
    res = replaceAtIndex(res, spacePos[i], ' ');
  }

  if (cap) {
    res = res[0].toUpperCase() + res.slice(1);
  }

  return res;
}

if (typeof module !== 'undefined' && module.parent) {
  module.exports = randStr;
} else if (typeof window !== 'undefined') {
  console.log('randstr imported as global variable');
} else {
  console.log(randStr());
  console.log(randStr({cap: true}));
  console.log(randStr({space: 3, len: 45}));
}
