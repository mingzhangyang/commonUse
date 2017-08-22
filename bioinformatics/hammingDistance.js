/**
 * Created by yangm11 on 8/22/2017.
 */
'use strict';

/*
  Background: Given two strings ss and tt of equal length, the Hamming distance between ss and tt, denoted dH(s,t)dH(s,t), is the number of corresponding symbols that differ in s and t.
 */

function hammingDistance(s, t) {
  if (s.length !== t.length) {
    throw 'Two strings with equal length are expected!';
  }
  let res = {
    length: s.length,
    diffCount: 0,
    diffPositions: []
  };
  let i = s.length;
  while (--i) {
    if (s[i] !== t[i]) {
      res.diffCount += 1;
      res.diffPositions.push(i);
    }
  }
  return res;
}

let s = 'ATGCATCGCTCGATCGATC';
let t = 'ACGTACCGTAGTCGTAGTC';

console.log(hammingDistance(s, t));