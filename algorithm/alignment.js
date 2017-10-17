/**
 * Created by yangm11 on 10/17/2017.
 * This script is a prototype for pairwise sequence alignment
 * using dynamic programming method.
 */
'use strict';

function scoreMatrix(a, b) {
  let top = a, left = b;
  if (a.length < b.length) {
    [top, left] = [b, a];
  }
  let mat = createMatrix(left.length, top.length);
  for (let i = 0; i < top.length; i++) {
    mat[0][i] = +(top[i] === left[0]);
  }
  for (let i = 1; i < left.length; i++) {
    for (let j = 0; j < top.length; j++) {
      let t, l, tl;
      if (j > 0) {
        t = mat[i-1][j];
        l = mat[i][j-1];
        tl = mat[i-1][j-1];
        mat[i][j] = max(t, l, tl) + (+(top[j] === left[i]));
      } else {
        mat[i][j] = +(top[j] === left[i]);
      }
    }
  }
  return mat;
}

function createMatrix(rows, cols) {
  let res = new Array(rows);
  for (let i = 0; i < rows; i++) {
    res[i] = new Array(cols);
  }
  return res;
}

function max(a, b, c) {
  let m = a > b ? a : b;
  return m > c ? m : c;
}

if (typeof module !== 'undefined' && module.parent) {

} else {
  // test code go here
  let a = 'ATTGC';
  let b = 'AGGC';
  console.log(scoreMatrix(a, b));
}