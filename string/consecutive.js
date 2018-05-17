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

if (typeof module !== 'undefined' && module.parent) {

} else {
  // test code go here
  let s = "atgcgtaacttcgggtttgtaccctgattcgtatcgtttgatctgtcat";
  let a = getIndex(s, 'g');
  console.log(a);
  console.log(extractSegment(a));
}