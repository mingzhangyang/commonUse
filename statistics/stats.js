/**
 * Created by yangm11 on 4/7/2017.
 */
'use strict';

const stats = (function () {
  // generate a list of numbers
  const range = function (n, m) {
    if (typeof m === 'undefined') {
      let result = [];
      for (let i = 0; i < n; i++) {
        result.push(i);
      }
      return result;
    } else {
      let b = m > n ? n : m;
      let t = m > n ? m : n;
      let result = [];
      for (let j = b; j < t; j++) {
        result.push(j);
      }
      return result;
    }
  };

  // get one item from an array randomly
  const sample = function (arr, n) {
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
  };

  // shuffle an array
  const shuffle = function (arr) {
    var result = [];
    var len = arr.length;
    var cp = arr.slice();
    for (var i = 0; i < len; i++) {
      var idx = Math.floor(cp.length * Math.random());
      result.push(cp.splice(idx, 1)[0]);
    }
    return result;
  };


  const findUnique = function (arr) {
    let uniq = [];
    let dupl = [];

    for (let i = 0; i < arr.length; i++) {
      let elem = arr[i];
      if (dupl.find(d => d.elem === elem)) {
        continue;
      }
      let count = 1;
      for (let j = i + 1; j < arr.length; j++) {
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
  };

  const sum = function (arr) {
    let s = 0;
    for (let i = 0; i < arr.length; i++) {
      s += arr[i];
    }
    return typeof s === 'number' ? s : NaN;
  };

  const mean = function (arr) {
    return sum(arr) / arr.length;
  };

  const median = function (arr) {
    // for (let i = 0; i < arr.length; i++) {
    //   if (typeof arr[i] !== 'number') {
    //     throw new Error('All must be numbers!');
    //   }
    // }
    let cp = arr.slice();
    cp.sort((a, b) => a - b );
    let m = cp.length;
    return m % 2 ? cp[(m - 1) / 2] : (cp[m / 2 - 1] + cp[m / 2]) / 2;
  };

  const max = function (arr) {
    let m = arr[0];
    for (let i = 1; i < arr.length; i++) {
      if (m < arr[i]) {
        m = arr[i];
      }
    }
    return m;
  };

  const min = function (arr) {
    let m = arr[0];
    for (let i = 1; i < arr.length; i++) {
      if (m > arr[i]) {
        m = arr[i];
      }
    }
    return m;
  };

  const arithmetic = function (sign, arr1, arr2) {
    if (typeof arr2 === 'number') {
      let t = arr2;
      arr2 = arr1.map(d => t);
    }
    if (arr1.length !== arr2.length) {
      throw new Error('The two arrays should be of the same length.');
    }
    if (typeof sign === 'string') {
      switch (sign) {
        case '+':
          return arr1.map((d, i) => d + arr2[i]);
        case '-':
          return arr1.map((d, i) => d - arr2[i]);
        case '*':
          return arr1.map((d, i) => d * arr2[i]);
        case '/':
          return arr1.map((d, i) => d / arr2[i]);
        case '%':
          return arr1.map((d, i) => d % arr2[i]);
        case '//':
          return arr1.map((d, i) => Math.floor(d / arr2[i]));
        case '^':
          return arr1.map((d, i) => Math.pow(d, arr2[i]));
        default:
          throw new Error('The sign is not supported.');
      }
    } else if (typeof sign === 'function') {
      return arr1.map((d, i) => sign(d, arr2[i]));
    } else {
      throw new Error('The first parameter should be a sign of arithmetic' + ' operator or function.');
    }
  };


  const variance = function (arr) {
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
  };

  // empirical cumulative distribution function
  const ecdf = function (arr) {
    return function (v) {
      let t = arr.filter(d => d <= v);
      return t.length / arr.length;
    }
  };

  // convert string to array object
  function str2Array(str) {
    let arr = str.split('\n');
    let result = [];
    let headers = arr[0].split(',').map(d => d.trim());
    let len = headers.length;
    let line;

    for (let i = 1; i < arr.length - 1; i++) {
      line = arr[i].split(',').map(d => d.trim());
      let obj = {};
      for (let j = 0; j < len; j++) {
        obj[headers[j]] = line[j];
      }
      result.push(obj);
    }
    // console.log(result.length);
    return result;
  }


  return {
    range: range,
    max: max,
    min: min,
    mean: mean,
    median: median,
    sum: sum,
    sample: sample,
    shuffle: shuffle,
    unique: findUnique,
    arithmetic: arithmetic,
    variance: variance,
    ecdf: ecdf,
    str2Array: str2Array
  }
})();



if (typeof module !== 'undefined') {
  if (module.parent) {
    module.exports = stats;

  } else { // testing codes go here

    // import * from 'tdArray'

    // let a = [1, 6, 4, 3, 7, 2, 8, 3, 5, 9, 10, 5, 5];
    // console.log(a.length);
    // console.log(stats.median(a));
    // console.log(stats.mean(a));
    // console.log(a.slice().sort((a, b) => a - b));
    // console.log(a.filter((d) => d < 5));
    // console.log(a.filter((d) => d > 5));
    // console.log(stats.max(a));
    // console.log(stats.min(a));
    // console.log(stats.sum(a));
    // console.log(stats.shuffle(a));
    // console.log(stats.arithmetic((d1, d2) => d1*d1 + d2*d2, a, 5));
    // console.log(stats.arithmetic('^', a, 3));
    // console.log(stats.variance(a));
    // console.log(stats.unique(a));

    // let a = stats.range(1, 11);
    // let c = stats.ecdf(a);
    // console.log(c(4));




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
    //   nu.push(stats.mean(stats.sample(csv, 12)) - stats.mean(stats.sample(csv, 12)));
    // }
    // console.log(mean(nu));
    // console.log(Date.now() - start);


  }

} else if (typeof window !== 'undefined') {
  console.log('stats running in browser!');
}