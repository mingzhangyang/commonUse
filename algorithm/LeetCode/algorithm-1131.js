/**
 * Created by yangm11 on 7/29/2019.
 */
'use strict';

function work(arr1, arr2) {
  let N = arr1.length;
  let v = -Infinity;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      let c = Math.abs(arr1[i] - arr1[j]) + Math.abs(arr2[i] - arr2[j]) + Math.abs(i - j);
      if (c > v) {
        v = c;
      }
    }
  }
  return v;
}

let arr1 = [1, 2, 3, 4];
let arr2 = [-1, 4, 5, 6];
let arr3 = [1, -2, -5, 0, 10];
let arr4 = [0, -2, -1, -7, -4];

console.log(work(arr1, arr2));
console.log(work(arr3, arr4));

