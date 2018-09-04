/**
 * Created by mingzhang on 9/3/18.
 */
'use strict';

function removeRedundantSpace(s) {
  let res = '';
  let flag = false;
  for (let i = 0; i < s.length; i++) {
    if (s[i] !== ' ') {
      res += s[i];
      if (flag) {
        flag = false;
      }
    } else {
      if (!flag) {
        res += ' ';
        flag = true;
      }
    }
  }
  return res;
}

function removeRedundantSpaceB(s) {
  let res = '';
  let i = 0;
  while (i < s.length) {
    res += s[i];
    if (s[i] === ' ') {
      while (s[i] < s.length && s[i] === ' ') {
        i++;
      }
      res += s[i];
    }
    i++;
  }
  return res;
}

function removeRedundantSpaceC(s) {
  return s.split(' ').filter(d => d).join(' ');
}

if (typeof module !== 'undefined') {
  if (module.parent) {
    // serve as module
  } else {
    // run as executable

    let s = 'a b  c   d    e';
    console.log(removeRedundantSpace(s));
    console.log(removeRedundantSpaceB(s));
    console.log(removeRedundantSpaceC(s));

    let randString = '';
    const base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*_?|-=/';
    for (let i = 0; i < 100; i++) {
      let n = Math.ceil(20 * Math.random());
      let word = '';
      for (let j = 0; j < n; j++) {
        word += base[Math.floor(base.length * Math.random())];
      }
      let m = Math.floor(10 * Math.random());
      for (let k = 0; k < m; k++) {
        word += ' ';
      }
      randString += word;
    }

    randString += 'END';
    // console.log(randString);

    const pt = require('../utils/performaceTest');
    pt(removeRedundantSpace, randString, 10000);
    pt(removeRedundantSpaceB, randString, 10000);
    pt(removeRedundantSpaceC, randString, 10000);
  }
} else if (typeof window !== 'undefined') {
// run in browser

}