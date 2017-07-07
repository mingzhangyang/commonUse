/**
 * Created by mingzhang on 6/7/17.
 */
'use strict';

// let arr = [];
// for (let i = 0; i < 10000; i++) {
//   arr.push(Math.random());
// }
//
// function map(a, f) {
//   let res = [];
//   for (let i = 0; i < a.length; i++) {
//     res.push(f(a[i]));
//   }
//   return res;
// }
//
// function filter(a, f) {
//   let res = [];
//   let t;
//   for (let i = 0; i < a.length; i++) {
//     t = f(a[i]);
//     if (t) {
//       res.push(a[i]);
//     }
//   }
//   return res;
// }
//
// function find(a, f) {
//   for (let i = 0; i < a.length; i++) {
//     if (f(a[i])) {
//       return a[i];
//     }
//   }
//   return undefined;
// }
//
// function findIndex(a, f) {
//   for (let i = 0; i < a.length; i++) {
//     if (f(a[i])) {
//       return i;
//     }
//   }
//   return -1;
// }
//
// let start = Date.now();
// for (let i = 0; i < 1000; i++) {
//   arr.map(d => d * d);
// }
// console.log('Native map:', Date.now() - start);
//
// start = Date.now();
// for (let i = 0; i < 1000; i++) {
//   map(arr, d => d * d);
// }
// console.log('Custom map:', Date.now() - start);
//
// start = Date.now();
// for (let i = 0; i < 1000; i++) {
//   arr.filter(d => d >= 0.5);
// }
// console.log('Native filter:', Date.now() - start);
//
// start = Date.now();
// for (let i = 0; i < 1000; i++) {
//   filter(arr, d => d >= 0.5);
// }
// console.log('Custom filter:', Date.now() - start);
//
// start = Date.now();
// for (let i = 0; i < 1000; i++) {
//   arr.find(d => d >= 0.99);
// }
// console.log('Native find:', Date.now() - start);
//
// start = Date.now();
// for (let i = 0; i < 1000; i++) {
//   find(arr, d => d >= 0.99);
// }
// console.log('Custom find:', Date.now() - start);
//
// start = Date.now();
// for (let i = 0; i < 1000; i++) {
//   arr.findIndex(d => d >= 0.99);
// }
// console.log('Native findIndex:', Date.now() - start);
//
// start = Date.now();
// for (let i = 0; i < 1000; i++) {
//   findIndex(arr, d => d >= 0.99);
// }
// console.log('Custom findIndex:', Date.now() - start);

function perfTest(func, opts) {
  if (typeof func !== 'function') {
    throw 'A function as the first parameter expected';
  }
  opts = opts || {};

  let repeats = opts.repeat || 3;
  let cycles = opts.cycles || 1000;
  let start;
  let res = [];

  for (let i = 0; i < repeats; i++) {
    start = Date.now();
    for (let j = 0; j < cycles; j++) {
      func();
    }
    res.push(Date.now() - start);
  }

  return res;
}

function append1() {
  let res = [];
  for (let i = 0; i < 10000; i++) {
    res.push(Math.random());
  }
}

function append2() {
  let res = [];
  for (let i = 0; i < 10000; i++) {
    res[i] = Math.random();
  }
}

function append3() {
  let res = new Array(10000);
  for (let i = 0; i < 10000; i++) {
    res[i] = Math.random();
  }
}

console.log(perfTest(append1));
console.log(perfTest(append2));
console.log(perfTest(append3));