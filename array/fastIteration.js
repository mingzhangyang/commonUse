/**
 * Created by yangm11 on 8/2/2017.
 */
'use strict';

const perfTest = require('./perfTest');

let arr = [];
for (let i = 0; i < 100000; i++) {
  arr.push(Math.random());
}

function for1() {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}

function for2() {
  let sum = 0;
  for (let i = 0, len = arr.length; i < len; i++) {
    sum += arr[i];
  }
  return sum;
}

function while1() {
  let sum = 0;
  let i = 0, len = arr.length;
  while (i < len) {
    sum += arr[i++];
  }
  return sum;
}

function while2() {
  let sum = 0;
  let i = arr.length;
  while (i > 0) {
    sum += arr[--i];
  }
  return sum;
}

function forEach1() {
  let sum = 0;
  arr.forEach(d => {
    sum += d;
  });
  return sum;
}

function forEach2() {
  let sum = 0;
  const foo = d => {
    sum += d;
  };
  arr.forEach(foo);
  return sum;
}

function repeat(func, n = 1000) {
  let start = Date.now();
  for (let i = 0; i < n; i++) {
    func();
  }
  console.log(Date.now() - start);
}

console.log('for1 result:', for1());
console.log('for2 result:', for2());
console.log('while1 result:', while1());
console.log('while2 result:', while2());
console.log('forEach1 result:', forEach1());
console.log('forEach2 result:', forEach2());

console.log('for1: ');
repeat(for1);
console.log('for2: ');
repeat(for2);
console.log('while1: ');
repeat(while1);
console.log('while2: ');
repeat(while2);
console.log('forEach1: ');
repeat(forEach1);
console.log('forEach2: ');
repeat(forEach2);


// console.log('for1: ',perfTest(for1));
// console.log('for2: ', perfTest(for2));
// console.log('while1: ', perfTest(while1));
// console.log('while2: ', perfTest(while2));
// console.log('forEach1: ', perfTest(forEach1));
// console.log('forEach2: ', perfTest(forEach2));

