/**
 * Created by yangm11 on 4/7/2017.
 */
'use strict';

// generate a list of numbers
function range(n) {
  let result = [];
  for (let i = 0; i < n; i++) {
    result.push(i);
  }
  return result;
}

// get one item from an array randomly
function sample(arr, n) {
  n = typeof n === 'undefined' ? 1 : n;
  if (typeof n !== 'number') {
    throw new Error('The second parameter should be number!');
  }
  var t;
  if (n === 1) {
    t = Math.floor(arr.length * Math.random());
    return arr[t];
  } else if (n > 1 && n < arr.length) {
    let idxList = [];
    do {
      t = Math.floor(arr.length * Math.random());
      if (idxList.indexOf(t) === -1) {
        idxList.push(t);
      }
    } while (idxList.length < n);
    let result = [];
    for (let i = 0; i < n; i++) {
      result.push(arr[idxList[i]]);
    }
    return result;
  } else {
    throw new Error('Out of range!');
  }
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


function variance(arr) {
  let u = mean(arr);
  // let na = arr.map((d) => (d - u) * (d - u));
  let s = 0;
  let c;
  for (let i = 0; i < arr.length; i++) {
    c = arr[i];
    s += (c - u) * (c - u);
  }
  return {
    pV: s / arr.length,
    sV: s / (arr.length - 1)
  };
}


let a = [1, 6, 4, 3, 7, 2, 8, 30, 50, 9, 10, 5, 60];
// console.log(a.length);
// console.log(median(a));
// console.log(mean(a));
// console.log(a.slice().sort((a, b) => a - b));
// console.log(a.filter((d) => d < 5));
// console.log(a.filter((d) => d > 5));
// console.log(max(a));
// console.log(min(a));
// console.log(sum(a));
// console.log(shuffle(a));

// const request = require('request');
// const fs = require('fs');
// let url = 'https://raw.githubusercontent.com/genomicsclass/dagdata/master/inst/extdata/femaleControlsPopulation.csv';
// request(url).pipe(fs.createWriteStream('femaleControlPopulation.csv'));
// let csv = fs.readFileSync('femaleControlPopulation.csv', 'utf8');
// csv = csv.split('\n');
// csv = csv.slice(1).map((d) => +d.trim());
// // console.log(csv);
// let start = Date.now();
// let nu = [];
// for (let i = 0; i < 10000; i++) {
//   nu.push(mean(sample(csv, 12)) - mean(sample(csv, 12)));
// }
// console.log(mean(nu));
// console.log(Date.now() - start);



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