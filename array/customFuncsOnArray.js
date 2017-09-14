/**
 * Created by mingzhang on 6/7/17.
 */
'use strict';

const customFuncsOnArray = (function () {
  function map(a, f) {
    let res = [];
    for (let i = 0; i < a.length; i++) {
      res.push(f(a[i], i));
    }
    return res;
  }

  function filter(a, f) {
    let res = [];
    let t;
    for (let i = 0; i < a.length; i++) {
      t = f(a[i], i);
      if (t) {
        res.push(a[i]);
      }
    }
    return res;
  }

  function split(arr, ratio) {
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
  }

  function group(arr, cb) {
    let res = {};
    for (let i = 0; i < arr.length; i++) {
      let p = cb(arr[i], i);
      if (typeof res[p] === 'undefined') {
        res[p] = [arr[i]];
      }
      res[p].push(arr[i])
    }
    return res;
  }

  function bin(arr, binSize, sort=true) {
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
  }

  function min(arr, func) {
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
        if (m > func(arr[i])) {
          m = func(arr[i], i);
        }
      }
      return m;
    }
    throw 'If the second parameter is provided, it should be a function.';
  }

  function max(arr, func) {
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
        if (m < func(arr[i])) {
          m = func(arr[i], i);
        }
      }
      return m;
    }
    throw 'If the second parameter is provided, it should be a function.';
  }

  function sum(arr, func) {
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
  }


  return {
    map: map,
    filter: filter,
    split: split,
    group: group,
    bin: bin,
    max: max,
    min: min,
    sum: sum
  }
})();

function main() {
  let bin = customFuncsOnArray.bin;
  let arr = [1, 6, 3, 9, 4, 2, 5, 8, 3, 9, 5, 10, 12];
  console.log(bin(arr, 2, false));
  console.log(bin(arr, 3));
  console.log(bin(arr, 4, false));
  console.log(bin(arr, 6));
}

if (typeof module !== 'undefined' && module.parent) {
  module.exports = customFuncsOnArray;
} else {
  main();
}