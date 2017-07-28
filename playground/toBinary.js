/**
 * Created by yangm11 on 7/28/2017.
 */
'use strict';

function toBinary(n) {
  if (n === 0) {
    return [0];
  }
  if (n === 1) {
    return [1];
  }
  let i = 0;
  while (Math.pow(2, i) < n && Math.pow(2, i + 1) <= n) {
    i++;
  }
  let arr = new Array(i + 1);
  arr[0] = 1;

  let p = n - Math.pow(2, i);

  let list = toBinary(p);

  let c = arr.length - list.length;

  for (let j = 1; j < c; j++) {
    arr[j] = 0;
  }

  for (let k = 0; k < list.length; k++) {
    arr[k + c] = list[k];
  }

  return arr;
}

for (let i = 0; i < 20; i++) {
  console.log(i + ' : ' + toBinary(i));
}

console.log(toBinary(125).join(''));
console.log((125).toString(2));