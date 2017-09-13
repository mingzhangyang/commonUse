/**
 * Created by mingzhang on 9/12/17.
 */
'use strict';

// idea from Lucky Money distribution in WeChat

function splitNumber(sum, num) {
  let res = [];
  let s = sum * 100;
  let a = 0;
  for (let i = 0; i < num - 1; i++) {
    let t = Math.floor(Math.random() * s);
    s -= t;
    if (s < 0) {
      t = t - (0 - s);
      s = 0;
    }
    a += t;
    res.push(t / 100);
  }
  res.push((sum * 100 - a) / 100);
  return res;
}

function sum(a) {
  let i = a.length;
  let res = 0;
  while (--i > -1) {
    res += a[i];
  }
  return res;
}

if (typeof module !== 'undefined' && module.parent) {
  module.exports = splitNumber;
} else {
  if (process.argv.length > 2) {
    let s = +process.argv[2];
    let n = +process.argv[3];
    if (s && n) {
      console.log(splitNumber(s, n));
    }
  } else {
    console.log((splitNumber(1, 8)));
  }
}
