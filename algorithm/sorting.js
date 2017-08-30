/**
 * Created by mingzhang on 8/22/17.
 */
'use strict';

function bubble(list) {
  let cp = list.slice();
  let j = cp.length;
  while (--j > 0) {
    for (let i = 0; i < j; i++) {
      if (cp[i] > cp[i + 1]) {
        [cp[i], cp[i + 1]] = [cp[i + 1], cp[i]];
      }
    }
  }
  return cp;
}

let a = [2, 8, 3, 7, 5, 9, 10, 4, 1, 6];

// console.log(bubble(a));

function reSplit(list) {
  if (list.length < 2) {
    return list;
  }
  if (list.length === 2) {
    if (list[0] > list[1]) {
      return [list[1], list[0]];
    }
    return list;
  }
  if (list.length >  2) {
    let p1 = [list[0]];
    let p2 = [];
    for (let i = 1; i < list.length; i++) {
      if (list[i] > list[0]) {
        p2.push(list[i]);
      } else {
        p1.push(list[i]);
      }
    }
    if (p2.length === 0) {
      return reSplit(list.slice(1)).concat(list[0]);
    } else {
      return reSplit(p1).concat(reSplit(p2));
    }

  }
}


// console.log(reSplit(a));

function tree(list) {
  // see BinaryTree.js
}