/**
 * Created by yangm11 on 6/27/2017.
 */
'use strict';

function oneHot(arr) {
  let max = -Infinity;
  for (let i = 0; i < arr.length; i++) {
    if (max < arr[i]) {
      max = arr[i];
    }
  }
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    let r = new Array(max + 1);
    r.fill(0);
    r[arr[i]] = 1;
    res.push(r);
  }
  return res;
}

console.log(oneHot([0, 1, 2, 1, 2]));