/**
 * Created by yangm11 on 8/23/2017.
 */
'use strict';

function findAllSubstringWitnGivenLength(str, n) {
  let res = [];
  let i = 0;
  while (i < str.length - n + 1) {
    let cur = str.slice(i, i + n);
    if (!res.includes(cur)) {
      res.push(cur);
    }
    i++;
  }
  return res;
}

function isSubstr(str, sub) {
  return str.includes(sub);
}

function isSubseq(str, sub) {
  
}


