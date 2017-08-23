/**
 * Created by mingzhang on 8/20/17.
 */
'use strict';

function pt(n) {
  if (n === 1) {
    return [1];
  }
  if (n === 2) {
    return [1, 2, 1];
  }
  let res = [1];
  let tmp = pt(n -1);
  for (let i = 0; i < tmp.length - 1; i++) {
    res.push(tmp[i] + tmp[i + 1]);
  }
  res.push(1);
  return res;
}

console.log(pt(3));
console.log(pt(4));
console.log(pt(5));
console.log(pt(6));