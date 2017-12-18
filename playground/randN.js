/**
 * Created by yangm11 on 12/18/2017.
 */
'use strict';

let fn = n => {
  if (typeof n !== 'number' || n % 1 !== 0) {
    throw 'An integer expected';
  }
  if (n < 0 || n > 31) {
    throw 'n out of range';
  }
  if (n === 0) {
    return [];
  }
  let left = new Array(31);
  for (let i = 0; i < 31; i++) {
    left[i] = i + 2;
  }
  let res = [];
  while (res.length < n) {
    let i = Math.floor(left.length * Math.random());
    res.push(left[i]);
    left.splice(i, 1);
  }
  return res;
};

if (typeof module !== 'undefined' && module.parent) {

} else {
  // test code go here
  console.log(fn(31));
}