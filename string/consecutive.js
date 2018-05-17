/**
 * Created by yangm11 on 5/17/2018.
 */
'use strict';

// get the indices of c characters in string s
function getIndex(s, c) {
  let list = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] === c) {
      list.push(i);
    }
  }
  return list;
}

// given a ascending ordered array of int numbers,
// extract consecutive fragments
function extractSegment(a) {
  let list = [];
  let seg = [a[0]];
  for (let i = 1; i < a.length; i++) {
    if (seg[seg.length-1] + 1 === a[i]) {
      seg.push(a[i]);
    } else {
      list.push(seg);
      seg = [a[i]];
    }
  }
  return list;
}

/**
 * find all the segments with a specified n times of repeats in a give string
 * @param s: the string to be searched
 * @param n: the number of repeat times
 */
function findAllRepeats(s, n) {
  let res = {};
  let prop = '';
  let w = '';
  let idx = {};
  for (let i = 0; i < s.length; i++) {
    if (s[i] === w) {
      prop += w;
    } else {
      idx.stop = i;
      if (prop.length === n) {
        if (res[prop] === undefined) {
          res[prop] = [idx];
        } else {
          res[prop].push(idx);
        }
      }
      prop = s[i];
      w = s[i];
      idx = {start: i}
    }
  }
  return res;
}

if (typeof module !== 'undefined' && module.parent) {

} else {
  // test code go here
  let s = "atgcgtaacttcgggtttgtaccctgattcgtatcgtttgatctgtcat";
  let a = getIndex(s, 'g');
  console.log(a);
  console.log(extractSegment(a));
}