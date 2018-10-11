/**
 * Created by mingzhang on 9/30/18.
 */
'use strict';

// Given a list of natural number less than 100
// find the missing ones

function findMissingNumbers(a) {
  let b = new Array(101);
  for (let i of a) {
    b[i] = 1;
  }
  let res = [];
  for (let i = 1; i < 101; i++) {
    if (!b[i]) {
      res.push(i)
    }
  }
  return res
}

if (typeof module !== 'undefined') {
  if (module.parent) {
    // serve as module
  } else {
    // run as executable

    let a = [1,5, 9, 23, 34, 53, 78, 91];
    console.log(findMissingNumbers(a));
  }
} else if (typeof window !== 'undefined') {
// run in browser

}