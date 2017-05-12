/**
 * Created by yangm11 on 4/7/2017.
 */
'use strict';

// get one item from an array randomly
function sample(arr) {
  var t = Math.floor(arr.length * Math.random());
  return arr[t];
}

// shuffle an array
function shuffle(arr) {
  var result = [];
  var len = arr.length;
  var cp = arr.slice();
  for (var i = 0; i < len; i++) {
    var idx = Math.floor(cp.length * Math.random());
    result.push(cp.splice(idx, 1)[0]);
  }
  return result;
}

// console.log(shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]));

function findUnique(arr) {
  let uniq = [];
  let dupl = [];

  for (let i = 0; i < arr.length; i++) {
    let elem = arr[i];
    let count = 1;
    for (let j = i + 1; j < arr.length - 1; j++) {
      if (elem === arr[j]) {
        count += 1;
      }
    }
    if (count === 1) {
      uniq.push(elem);
    } else {
      dupl.push({
        elem: elem,
        count: count
      });
    }
  }
  return {
    unique: uniq,
    duplicate: dupl
  };
}

function sum(arr) {
  let s = 0;
  for (let i = 0; i < arr.length; i++) {
    s += arr[i];
  }
  return typeof s === 'number' ? s : NaN;
}

function mean(arr) {
  return sum(arr) / arr.length;
}

function median(arr) {
  // for (let i = 0; i < arr.length; i++) {
  //   if (typeof arr[i] !== 'number') {
  //     throw new Error('All must be numbers!');
  //   }
  // }
  let cp = arr.slice();
  cp.sort((a, b) => a - b );
  let m = cp.length;
  return m % 2 ? cp[(m - 1) / 2] : (cp[m / 2 - 1] + cp[m / 2]) / 2;
}

function max(arr) {
  let m = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (m < arr[i]) {
      m = arr[i];
    }
  }
  return m;
}

function min(arr) {
  let m = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (m > arr[i]) {
      m = arr[i];
    }
  }
  return m;
}

let a = [1, 6, 4, 3, 7, 2, 8, 3, 5, 9, 1, 5, 6];
// console.log(a.length);
// console.log(median(a));
// console.log(a.slice().sort((a, b) => a - b));
// console.log(a.filter((d) => d < 5));
// console.log(a.filter((d) => d > 5));
// console.log(max(a));
// console.log(min(a));
// console.log(sum(a));


if (typeof module) {
  if (module.parent) {
    module.exports = {
      max: max,
      min: min,
      mean: mean,
      median: median,
      sum: sum,
      sample: sample,
      shuffle: shuffle,
      unique: findUnique
    }
  }
} else if (typeof window) {
  console.log('Running in browser!');
}