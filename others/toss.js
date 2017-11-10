/**
 * Created by yangm11 on 10/23/2017.
 */
'use strict';

function toss(n) {
  let arr = new Array(n);
  for (let i = 0; i < n; i++) {
    arr[i] = Math.random() > 0.5 ? 1 : 0;
  }
  let res = {
    head: 0,
    tail: 0,
    change: 0
  };
  let len = n - 1;
  for (let i = 0; i < len; i++) {
    if (arr[i] > 0.5) {
      res.head += 1;
    } else {
      res.tail += 1;
    }
    if (arr[i] !== arr[i + 1]) {
      res.change += 1;
    }
  }
  return res;
}

if (typeof module !== 'undefined' && module.parent) {

} else {
  // test code go here
  console.log(toss(10000));
}