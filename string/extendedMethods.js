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

function findAllSubsequenceWIthGivenLength(str, n) {
  let res = [];
  function worker(s, len) {
    let tmp = [];
    if (len === 1) {
      for (let i = 0; i < s.length; i++) {
        if (!tmp.includes(s[i])) {
          tmp.push(s[i]);
        }
      }
      return tmp;
    }
    for (let k = 1; k < s.length - len + 1; k++) {
      let cur = [s[k - 1]].concat(findAllSubsequenceWIthGivenLength())
    }
  }
}
