/**
 * Created by mingzhang on 6/16/17.
 */
'use strict';

// artificial neural network

const map = function (arr, func) {
  if (typeof func !== 'function') {
    throw 'A function expected as the second parameter.';
  }
  let res = new Array(arr.length);
  for (let i = 0; i < arr.length; i++) {
    res[i] = func(arr[i], i);
  }
  return res;
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
      if (m < func(arr[i])) {
        m = func(arr[i], i);
      }
    }
    return m;
  }
  throw 'If the second parameter is provided, it should be a function.';
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
      if (m > func(arr[i])) {
        m = func(arr[i], i);
      }
    }
    return m;
  }
  throw 'If the second parameter is provided, it should be a function.';
};


// ******************** Above: Functions of common use *************************

function softMax(arr) {
  let s = sum(arr, d => Math.exp(d));
  return map(arr, v => Math.exp(v) / s);
}

let a = [3, 1, 0.2];
console.log(softMax(a));
console.log(map(a, Math.exp));
console.log(sum(a, Math.exp));