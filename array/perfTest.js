/**
 * Created by mingzhang on 6/7/17.
 */
'use strict';

let arr = [];
for (let i = 0; i < 10000; i++) {
  arr.push(Math.random());
}

function map(a, f) {
  let res = [];
  for (let i = 0; i < a.length; i++) {
    res.push(f(a[i]));
  }
  return res;
}

function filter(a, f) {
  let res = [];
  let t;
  for (let i = 0; i < a.length; i++) {
    t = f(a[i]);
    if (t) {
      res.push(a[i]);
    }
  }
  return res;
}

function find(a, f) {
  for (let i = 0; i < a.length; i++) {
    if (f(a[i])) {
      return a[i];
    }
  }
  return undefined;
}

function findIndex(a, f) {
  for (let i = 0; i < a.length; i++) {
    if (f(a[i])) {
      return i;
    }
  }
  return -1;
}

let start = Date.now();
for (let i = 0; i < 1000; i++) {
  arr.map(d => d * d);
}
console.log('Native map:', Date.now() - start);

start = Date.now();
for (let i = 0; i < 1000; i++) {
  map(arr, d => d * d);
}
console.log('Custom map:', Date.now() - start);

start = Date.now();
for (let i = 0; i < 1000; i++) {
  arr.filter(d => d >= 0.5);
}
console.log('Native filter:', Date.now() - start);

start = Date.now();
for (let i = 0; i < 1000; i++) {
  filter(arr, d => d >= 0.5);
}
console.log('Custom filter:', Date.now() - start);

start = Date.now();
for (let i = 0; i < 1000; i++) {
  arr.find(d => d >= 0.99);
}
console.log('Native find:', Date.now() - start);

start = Date.now();
for (let i = 0; i < 1000; i++) {
  find(arr, d => d >= 0.99);
}
console.log('Custom find:', Date.now() - start);

start = Date.now();
for (let i = 0; i < 1000; i++) {
  arr.findIndex(d => d >= 0.99);
}
console.log('Native findIndex:', Date.now() - start);

start = Date.now();
for (let i = 0; i < 1000; i++) {
  findIndex(arr, d => d >= 0.99);
}
console.log('Custom findIndex:', Date.now() - start);