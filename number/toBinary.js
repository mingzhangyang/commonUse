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
  if (n === 2) {
    return [1, 0];
  }
  if (n === 3) {
    return [1, 1];
  }
  // let i = 0;
  // while (Math.pow(2, i) < n && Math.pow(2, i + 1) <= n) {
  //   i++;
  // }

  let i = 1;
  while ((1 << i) < n && (1 << (i + 1)) <= n) {
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


function _toBinary(n) {
  if (n === 0) {
    return [0];
  }
  if (n === 1) {
    return [1];
  }
  let i = 1;
  while (i) {
    if ((1 << i) <= n && ((1 << (i + 1)) > n)) {
      break;
    }
    i++;
  }
  let res = new Array(i + 1);
  for (let j = 0; j < i + 1; j++) {
    res[j] = (n >> j) & 1;
  }
  res.reverse();
  return res;
}



for (let i = 0; i < 20; i++) {
  console.log(i + ' : ' + toBinary(i));
}

console.log(toBinary(125).join(''));
console.log(_toBinary(125).join(''));
console.log((125).toString(2));

