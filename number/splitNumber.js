/**
 * Created by mingzhang on 9/12/17.
 */
'use strict';

// idea from Lucky Money distribution in WeChat

function splitNumber(sum, num, opts) {
  opts = opts || {};
  opts.low = opts.low || 0.05;
  opts.high = opts.high || 0.55;
  let d = opts.high - opts.low;
  let res = [];
  let rem = sum * 100;
  for (let i = 0; i < num - 1; i++) {
    let t = Math.floor((opts.low + Math.random() * d) * rem);
    rem -= t;
    res.push(t / 100);
  }
  res.push(rem / 100);
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
    console.log(sum(splitNumber(1, 8)));
  }
}
