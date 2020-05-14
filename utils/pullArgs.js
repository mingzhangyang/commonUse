'use strict';

const parse = function(arr) {
  return _parse(arr.slice(2));
};

function _parse(arr) {
  let res = {
    noFlag: [],
    withFlag: [],
    error: null,
  };
  let i = 0;
  let n = arr.length;
  let preIsFlag = false;
  let flag = null;
  while (i < n) {
    let a = arr[i];
    if (typeof a !== "string") {
      res.error = new Error("non-string argument identified");
      return res;
    }
    if (isFlag(a)) {
      if (preIsFlag) {
        res.withFlag.push({
          flag: flag,
          value: true,
        });
      }
      flag = a;
      preIsFlag = true;
      i++;
    } else {
      if (preIsFlag) {
        res.withFlag.push({
          flag: flag,
          value: a,
        });
      } else {
        res.noFlag.push(a);
      }
      preIsFlag = false;
      i++;
    }
  }
  if (preIsFlag) {
    res.withFlag.push({
      flag: flag,
      value: true,
    });
  }
  return res;
}

function isFlag(s) {
  return s.length > 0 && s[0] === "-";
}

module.exports = parse;