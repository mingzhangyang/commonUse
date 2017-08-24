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
  let i = 0, j = 0;
  while (i < str.length && j < sub.length) {
    if (str[i] === sub[j]) {
      j++;
    }
    i++;
  }
  return j === sub.length;
}

function findAllSubsequenceWithGivenLength(str, n) {
  let res = [];
  if (n === 1) {
    for (let i = 0; i < str.length; i++) {
      if (!res.includes(str[i])) {
        res.push(str[i]);
      }
    }
    return res;
  }
  for (let i = 1; i < str.length - (n - 1) + 1; i++) {
    let cur = findAllSubsequenceWithGivenLength(str.slice(i), n - 1);
    for (let j = 0; j < cur.length; j++) {
      if (!res.includes(str[i - 1] + cur[j])) {
        res.push(str[i - 1] + cur[j]);
      }
    }
  }
  return res;
}

let s = 'atgctcgtagctgcatgtcaatcg';
console.log(findAllSubsequenceWithGivenLength(s, 3).length);
console.log(isSubseq(s, 'actu'));

