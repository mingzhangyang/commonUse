/**
 * Created by mingzhang on 8/23/17.
 */
'use strict';

/*
 https://leetcode.com/problems/trapping-rain-water/description/

 Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it is able to trap after raining.

 For example,
 Given [0,1,0,2,1,0,1,3,2,1,2,1], return 6.

 */

function wv(arr) {
  if (arr.length < 3) {
    return 0;
  }
  let res = 0;
  let state = {
    left: 0,
    right: 0,
    content: []
  };
  let i = 0;
  while (i < arr.length) {
    let cur = arr[i];
    if (state.left === 0 && state.right === 0 && state.content.length === 0) {
      state.left = cur;
      i++;
      continue;
    }
    if (state.left > 0 && state.right === 0 && state.content.length === 0) {
      if (cur < state.left) {
        state.content.push(cur);
      } else {
        state.left = cur;
      }
      i++;
      continue;
    }
    if (state.left > 0 && state.right === 0 && state.content.length > 0) {
      if (cur >= state.left) {
        state.right = cur;
        for (let i = 0; i < state.content.length; i++) {
          res += (state.left - state.content[i]);
        }
        state.left = state.right;
        state.content = [];
        state.right = 0;
      } else {
        state.content.push(cur);
      }
      i++;
      continue;
    }
    console.log('If you see this, there must be something missed...');
  }
  if (state.right === 0 && state.content.length === 0) {
    return res;
  }
  if (state.left > 0 && state.content.length > 0) {
    let _arr = state.content;
    _arr.reverse();
    _arr.push(state.left);
    console.log('reverse the remaining, and start recursion.');
    return res + wv(_arr);
  }
}

let a = [5, 2, 1, 2, 1, 5];
console.log(wv(a));


/*
  Alternative solution (more elegant?)
  The idea comes from mimic filling water into reservoir.
  It is more straightforward. But if the numbers distribute too far,
  this method will be less efficient.
 */

function _wv(arr) {
  let res = 0;
  let max = 0, min = +Infinity;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
    if (arr[i] < min) {
      min = arr[i];
    }
  }

  arr = arr.map(d => d - min);
  max -= min;
  let matrix = new Array(max);

  for (let i = 0; i < max; i++) {
    let row = new Array(arr.length);
    for (let j = 0; j < arr.length; j++) {
      row[j] = (arr[j] > i) ? 1 : 0;
    }
    matrix[i] = row;
  }

  function sum(a) {
    return a.reduce((acc, cur) => acc + cur, 0);
  }

  for (let i = 0; i < max; i++) {
    let row = matrix[i];
    if (sum(row) < 2) {
      continue;
    }
    for (let j = 1; j < row.length - 1; j++) {
      let v = row[j];
      if (v === 0) {
        let flag1, flag2;
        for (let k = j - 1; k > -1; k--) {
          if (row[k] === 1) {
            flag1 = true;
            break;
          }
        }
        for (let h = j + 1; h < row.length; h++) {
          if (row[h] === 1) {
            flag2 = true;
            break;
          }
        }
        if (flag1 && flag2) {
          res += 1;
        }
      }
    }
  }

  return res;
}

console.log(_wv(a));