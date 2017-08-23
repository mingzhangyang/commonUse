/**
 * Created by yangm11 on 8/23/2017.
 */
'use strict';

/*
 Given a string, find the length of the longest substring without repeating characters.

 Examples:

 Given "abcabcbb", the answer is "abc", which the length is 3.

 Given "bbbbb", the answer is "b", with the length of 1.

 Given "pwwkew", the answer is "wke", with the length of 3. Note that the answer must be a substring, "pwke" is a subsequence and not a substring.
 */

function findAllSubstrWitnGivenLength(str, n) {
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

function hasRepeat(str) {
  let i = 0;
  let collect = {};
  while (i < str.length) {
    if (!collect[str[i]]) {
      collect[str[i]] = 1;
    } else {
      return true;
    }
    i++;
  }
  return false;
}

function main(str) {
  let start = str.length - 1;
  while (start > 0) {
    let seqs = findAllSubstrWitnGivenLength(str, start);
    for (let i = 0; i < seqs.length; i++) {
      if (!hasRepeat(seqs[i])) {
        console.log(seqs[i]);
        return seqs[i].length;
      }
    }
    start--;
  }
}

main('abcabcbb');
main('bbbbb');
main('pwwkew');