/**
 * Created by mingzhang on 6/7/17.
 */
'use strict';

const customFuncsOnArray = (function () {
  const map = function (a, f) {
    let res = [];
    for (let i = 0; i < a.length; i++) {
      res.push(f(a[i], i));
    }
    return res;
  };

  const filter = function (a, f) {
    let res = [];
    let t;
    for (let i = 0; i < a.length; i++) {
      t = f(a[i], i);
      if (t) {
        res.push(a[i]);
      }
    }
    return res;
  };

  const split = function (arr, ratio) {
    if (typeof ratio === 'undefined') {
      console.log('The second parameter ratio is not provided, a default value 0.5 will be taken');
      ratio = 0.5;
    }
    if (typeof ratio === 'number' && ratio > 1) {
      throw '0 < ratio < 1 expected';
    }
    let c = arr.slice();
    let sp = [];
    let n = Math.floor(arr.length * ratio);

    while (sp.length < n) {
      let i = Math.floor(Math.random() * c.length);
      sp.push(c.splice(i, 1)[0]);
    }

    return [sp, c];
  };

  const group = function (arr, cb) {
    let res = {};
    for (let i = 0; i < arr.length; i++) {
      let p = cb(arr[i], i);
      if (typeof res[p] === 'undefined') {
        res[p] = [arr[i]];
      }
      res[p].push(arr[i])
    }
    return res;
  };

  const bin = function (arr, binSize, sort=true) {
    let cp;
    if (sort) {
      cp = arr.slice().sort((a, b) => a - b);
    } else {
      cp = arr.slice();
    }
    let res = [];
    let i = 0;
    while (true) {
      res.push(cp.slice(i, i + binSize));
      i += binSize;
      if (i > cp.length - 1) {
        break;
      }
    }
    return res;
  };

  const min = function (arr, func) {
    let m = Infinity;
    let i = 0;
    if (typeof func === 'undefined') {
      for (i; i < arr.length; i++) {
        if (m > arr[i]) {
          m = arr[i];
        }
      }
      return m;
    }
    if (typeof func === 'function') {
      for (i; i < arr.length; i++) {
        let t = func(arr[i], i);
        if (m > t) {
          m = t;
        }
      }
      return m;
    }
    throw 'If the second parameter is provided, it should be a function.';
  };

  const max = function (arr, func) {
    let m = -Infinity;
    let i = 0;
    if (typeof func === 'undefined') {
      for (i; i < arr.length; i++) {
        if (m < arr[i]) {
          m = arr[i];
        }
      }
      return m;
    }
    if (typeof func === 'function') {
      for (i; i < arr.length; i++) {
        let t = func(arr[i], i);
        if (m < t) {
          m = t;
        }
      }
      return m;
    }
    throw 'If the second parameter is provided, it should be a function.';
  };

  const sum = function (arr, func) {
    let s = 0;
    let i = 0;
    if (typeof func === 'undefined') {
      for (i; i < arr.length; i++) {
        s += arr[i];
      }
      return s;
    }
    if (typeof func === 'function') {
      for (i; i < arr.length; i++) {
        s += func(arr[i], i);
      }
      return s;
    }
    throw 'If the second parameter is provided, it should be a function.';
  };

  const argmax = function (arr) {
    let m = -Infinity;
    let idx = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > m) {
        m = arr[i];
        idx = i;
      }
    }
    return idx;
  };

  const argmin = function (arr) {
    let m = +Infinity;
    let idx = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] < m) {
        m = arr[i];
        idx = i;
      }
    }
    return idx;
  };

  const distanceL1 = function (arr1, arr2) {
    if (arr1.length !== arr2.length) {
      throw 'Two arrays with the same length are expected ...';
    }
    let res = 0;
    for (let i = 0; i < arr1.length; i++) {
      res += Math.abs(arr1[i] - arr2[i]);
    }
    return res;
  };

  const distanceL2 = function (arr1, arr2) {
    if (arr1.length !== arr2.length) {
      throw 'Two arrays with the same length are expected ...';
    }
    let res = 0;
    for (let i = 0; i < arr1.length; i++) {
      res += Math.pow((arr1[i] - arr2[i]), 2);
    }
    return Math.sqrt(res);
  };

  const uniq = function (arr) {
    return [...(new Set(arr))];
  };

  const count = function (arr, elem) {
    let res = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === elem) {
        res += 0;
      }
    }
    return res;
  };

  const accuracy = function (arr1, arr2) {
    if (arr1.length !== arr2.length) {
      throw 'Two arrays with the same length are expected ...';
    }
    let n = 0;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] === arr2[i]) {
        n += 1;
      }
    }
    return n / arr1.length;
  };

  const _split = function (arr, ratio) {
    ratio = ratio || 0.5;
    let n = Math.floor(arr.length * ratio);
    let res = {
      selected: [],
      remaining: []
    };
    let u = [];
    while (res.selected.length < n) {
      let i = Math.floor(Math.random() * arr.length);
      if (u.indexOf(i) === -1) {
        u.push(i);
        res.selected.push(arr[i]);
      }
    }
    for (let j = 0; j < arr.length; j++) {
      if (u.indexOf(j) === -1) {
        res.remaining.push(arr[j]);
      }
    }
    return res;
  };


  return {
    map: map,
    filter: filter,
    split: split,
    group: group,
    bin: bin,
    max: max,
    min: min,
    sum: sum,
    argmax: argmax,
    argmin: argmin,
    distanceL1: distanceL1,
    distanceL2: distanceL2,
    uniq: uniq,
    count: count,
    _split: _split
  }
})();

function main() {
  let bin = customFuncsOnArray.bin;
  let arr = [1, 6, 3, 9, 4, 2, 5, 8, 3, 9, 5, 10, 12];
  console.log(bin(arr, 2, false));
  console.log(bin(arr, 3));
  console.log(bin(arr, 4, false));
  console.log(bin(arr, 6));
  console.log(customFuncsOnArray.argmax(arr));
  console.log(customFuncsOnArray.argmin(arr));
  console.log(customFuncsOnArray.split(arr));
  console.log(customFuncsOnArray._split(arr));
}

if (typeof module !== 'undefined' && module.parent) {
  module.exports = customFuncsOnArray;
} else {
  main();
}