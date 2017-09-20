'use strict';

const Rs = require('stream').Readable;
const Ws = require('stream').Writable;
const Ts = require('stream').Transform;

function fibonacciInStream(n) {
  let rs = new Rs();
  let x = 0, y = 1;
  for (let i = 0; i < n; i++) {
    rs.push(x + '\n');
    [x, y] = [y, x + y]
  }
  rs.push(null);
  return rs;
}

if (typeof module !== 'undefined' && module.parent) {
  module.exports = {
    fibonacci: fibonacciInStream
  }
} else {
  // test code go here
  let f = fibonacciInStream(10);
  f.pipe(process.stdout);
}


