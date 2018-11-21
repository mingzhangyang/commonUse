/**
 * Created by yangm11 on 4/7/2017.
 */
'use strict';

const stats = (function () {
  // convert string to an array of objects
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

  // generate a list of numbers
  const range = function (n, m, step) {
    let result = [];
    if (typeof n !== 'number' || n <= 0) {
      throw 'a number greater than 0 as the first parameter expected';
    }
    if (typeof m === 'undefined' && typeof step === 'undefined') {
      for (let i = 0; i < n; i++) {
        result.push(i);
      }
      return result;
    }
    if (typeof m !== 'number') {
      throw 'a number as the second parameter expected';
    }
    if (typeof step === 'undefined') {
      let b = m > n ? n : m;
      let t = m > n ? m : n;
      for (let j = b; j < t; j++) {
        result.push(j);
      }
      return result;
    }
    if (typeof step !== 'number' || step === 0) {
      throw 'a non-zero number as the third parameter expected';
    }
    if (step > 0) {
      if (m < n) {
        throw 'step value is greater than 0, but the stop value is smaller than start value';
      }
      let t = n;
      while (t < m) {
        result.push(t);
        t += step;
      }
      return result;
    }
    if (step < 0) {
      if (m > n) {
        throw 'step value is smaller than 0, but the stop value is greater than the start value';
      }
      let t = n;
      while (t > m) {
        result.push(t);
        t += step;
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

  // function for calculating both population and sample variance
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
      pV: s / arr.length, // population variance
      sV: s / (arr.length - 1) // sample variance
    };
  };

  // the specific function for calculating sample variance
  const sv = function (arr) {
    let u = mean(arr);
    let s = 0;
    let c;
    for (let i = 0; i < arr.length; i++) {
      c = arr[i];
      s += (c - u) * (c - u);
    }
    return s / (arr.length - 1);
  };

  // calculate sample standard deviation
  const sd = function (arr) {
    return Math.sqrt(sv(arr));
  };

  // empirical cumulative distribution function
  const ecdf = function (arr) {
    return function (v) {
      let t = arr.filter(d => d <= v);
      return t.length / arr.length;
    }
  };

  // calculate t-statistic
  const tstat = function (arr1, arr2) {

    if (arr2 === undefined) {
      return mean(arr1) / Math.sqrt(sv(arr1) / arr1.length);
    }

    let diff = mean(arr1) - mean(arr2);
    let se = Math.sqrt(sv(arr1) / arr1.length + sv(arr2) / arr2.length);

    return diff / se;
  };

  // Welch's t-test
  const tTest = function (arr1, arr2) {
    let s1 = sv(arr1);
    let len1 = arr1.length;
    let s2 = sv(arr2);
    let len2 = arr2.length;
    let tValue = (mean(arr1) - mean(arr2)) / Math.sqrt(s1 / len1 + s2 / len2);
    let x = Math.pow((s1 / len1 + s2 / len2), 2);
    let y = s1 * s1 / (len1 * len1 * (len1 - 1)) + s2 * s2 / (len2 * len2 * (len2 - 1));

    let p = pt(tValue, x / y);

    return {
      t: tValue,
      df: x / y,
      'p-value': tValue >= 0 ? 1 - p : p
    }
  };

  // calculate 95% interval
  const interval = function (arr) {
    let b = mean(arr);
    let d = 1.96 * sd(arr) / Math.sqrt(arr.length);
    return [b - d, b + d];
  };

  // calculate sample covariance
  const cov = function (arr1, arr2) {
    if (arr1.length !== arr2.length) {
      throw new Error('The two arrays should be of the same length!');
    }
    let len = arr1.length;
    let m1 = mean(arr1);
    let m2 = mean(arr2);

    let sum = 0;
    for (let i = 0; i < len; i++) {
      sum += (arr1[i] - m1) * (arr2[i] - m2);
    }
    return sum / (len - 1);
  };

  // calculate sample correlation coefficient
  const cor = function (arr1, arr2) {
    let sd1 = sd(arr1);
    let sd2 = sd(arr2);
    return cov(arr1, arr2) / (sd1 * sd2);
  };

  const quantile = function (arr) {
    // let cp = arr.slice.sort((d1, d2) => d1 - d2);
    let me = median(arr);
    let mi = min(arr);
    let ma = max(arr);

    return {
      '0%': mi,
      '25%': (mi + me) / 2,
      '50%': me,
      '75%': (ma + me) / 2,
      '100%': ma
    }
  };

  const erfc = function (v) {
    let z = Math.abs(v);
    let t = 1 / (1 + z / 2);
    let r = t * Math.exp(-z * z - 1.26551223 + t * (1.00002368 +
        t * (0.37409196 + t * (0.09678418 + t * (-0.18628806 +
        t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 +
        t * (-0.82215223 + t * 0.17087277)))))))));
    return v >= 0 ? r : 2 - r;
  };

  // https://en.wikipedia.org/wiki/Error_function
  // input a value to get its cumulative distribution
  const pnorm = function (x) {
    return 0.5 * erfc((-x) / (Math.sqrt(2)));
  };

  // https://github.com/errcw/gaussian/blob/master/lib/gaussian.js
  // input a probability to get the value whose cumulative distribution
  // equals the probability
  const qnorm = function (x) {
    if (x === 0) return -Infinity;
    if (x === 1) return Infinity;
    if (x < 0 || x > 1) {
      throw new Error('probability should be in domain [0, 1]');
    }

    function ierfc(v) {
      if (v >= 2) { return -100; }
      if (v <= 0) { return 100; }

      var xx = (v < 1) ? v : 2 - v;
      var t = Math.sqrt(-2 * Math.log(xx / 2));

      var r = -0.70711 * ((2.30753 + t * 0.27061) /
        (1 + t * (0.99229 + t * 0.04481)) - t);

      for (var j = 0; j < 2; j++) {
        var err = erfc(r) - xx;
        r += err / (1.12837916709551257 * Math.exp(-(r * r)) - r * err);
      }

      return (v < 1) ? r : -r;
    }

    return -(Math.sqrt(2) * ierfc(2 * x));
  };

  const factorial = function (n)  {
    if (typeof n !== 'number' || n < 0 || n % 1 !== 0) {
      throw 'A natural number expected...';
    }
    if (!stats.cache) {
      stats.cache = {};
    }
    if (!stats.cache.factorial) {
      stats.cache.factorial = {};
    }
    if (n === 0) {
      return 0;
    }
    if (n === 1) {
      return 1;
    }
    if (n === 2) {
      return 2;
    }
    if (stats.cache.factorial[n]) {
      return stats.cache.factorial[n];
    }
    stats.cache.factorial[n] = factorial(n - 1) * n;
    return stats.cache.factorial[n];
  };

  const combination = function (n, k) {
    if (typeof n !== 'number' || n < 0 || n % 1 !== 0) {
      throw 'A natural number expected...';
    }
    if (typeof k !== 'number' || k < 0 || k % 1 !== 0) {
      throw 'A natural number expected...';
    }
    if (k > n) {
      throw 'Correct usage: stats.combination(n, k), k should not be larger than n...';
    }
    if (!stats.cache) {
      stats.cache = {};
    }
    if (!stats.cache.combination) {
      stats.cache.combination = {};
    }
    if (!stats.cache.combination[n]) {
      stats.cache.combination[n] = {};
    }
    if (k === 1) {
      return n;
    }
    if (k === 2) {
      return n * (n -1) / 2;
    }
    if (stats.cache.combination[n][k]) {
      return stats.cache.combination[n][k];
    }
    stats.cache.combination[n][k] = combination(n, k - 1) * (n - k + 1) / k;
    return stats.cache.combination[n][k];
  };


  return {
    str2Array: str2Array,
    range: range,
    max: max,
    min: min,
    mean: mean,
    median: median,
    sum: sum,
    sample: sample,
    shuffle: shuffle,
    unique: findUnique,
    split: split,
    arithmetic: arithmetic,
    variance: variance, // both population and sample variance
    sv: sv, // for the sample variance
    sd: sd, // only the sample standard deviation
    ecdf: ecdf,
    tstat: tstat,
    tTest: tTest,
    iv: interval,
    cov: cov,
    cor: cor,
    quantile: quantile,
    pnorm: pnorm,
    qnorm: qnorm,
    factorial: factorial,
    combination: combination
  };
})();

// ###############################################################################

function gammln(v) {
  let j, x, tmp, y, ser;
  let cof = [57.1562356658629235,-59.5979603554754912,
    14.1360979747417471,-0.491913816097620199,.339946499848118887e-4,
    .465236289270485756e-4,-.983744753048795646e-4,.158088703224912494e-3,
    -.210264441724104883e-3,.217439618115212643e-3,-.164318106536763890e-3,
    .844182239838527433e-4,-.261908384015814087e-4,.368991826595316234e-5];
  if (v < 0) {
    throw new Error('bad arg in gammln');
  }

  x = v;
  y = v;
  tmp = x + 5.24218750000000000;
  tmp = (x + 0.5) * Math.log(tmp) - tmp;
  ser = 0.999999999999997092;
  for (j = 0; j < 14; j++) {
    ser += cof[j] / (++y);
  }
  return tmp + Math.log(2.5066282746310005*ser/x);
}

const FPMIN = 1e-30;
const EPS = 3e-7;

function betacf(a, b, x) {
  let m, m2, aa, c, d, del, h, qab, qam, qap;
  qab = a + b;
  qap = a + 1;
  qam = a -1;
  c = 1;
  d = 1 - qab * x / qap;
  if (Math.abs(d) < FPMIN) {
    d = FPMIN;
  }
  d = 1 / d;
  h = d;
  for (m = 1; m < 10000; m++) {
    m2 = 2 * m;
    aa = m * (b - m) * x / ((qam + m2) * (a + m2));
    d = 1 + aa * d;
    if (Math.abs(d) < FPMIN) {
      d = FPMIN;
    }
    c = 1 + aa / c;
    if (Math.abs(c) < FPMIN) {
      c = FPMIN;
    }
    d = 1 / d;
    h *= d * c;
    aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2));
    d = 1 + aa * d;
    if (Math.abs(d) < FPMIN) {
      d = FPMIN;
    }
    c = 1 + aa / c;
    if (Math.abs(c) < FPMIN) {
      c = FPMIN;
    }
    d = 1 / d;
    del = d * c;
    h *= del;
    if (Math.abs(del - 1) < EPS) {
      break;
    }
  }
  return h;
}


function betai(a, b, x) {
  let bt;
  if (a <= 0.0 || b <= 0.0) throw "Bad a or b in routine betai";
  if (x < 0.0 || x > 1.0) throw "Bad x in routine betai";
  if (x === 0.0 || x === 1.0) return x;
  bt=Math.exp(gammln(a+b)-gammln(a)-gammln(b)+a * Math.log(x)+b * Math.log(1.0-x));
  if (x < (a+1.0)/(a+b+2.0)) return bt*betacf(a,b,x)/a;
  else return 1.0-bt*betacf(b,a,1.0-x)/b;
}


function pt(t, v) {
  let p = betai(0.5 * v, 0.5, v / (v + t * t));
  if (t >= 0) {
    return 1 - p;
  }
  return p;
}

//############################################################################

function main() {
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

  // let A = [19.8, 20.4, 19.6, 17.8, 18.5, 18.9, 18.3, 18.9, 19.5, 22.0];
  // let B = [28.2, 26.6, 20.1, 23.3, 25.2, 22.1, 17.7, 27.6, 20.6, 13.7, 23.2, 17.5, 20.6, 18.0, 23.9, 21.6, 24.3, 20.4, 24.0, 13.2];
  // // console.log(stats.tstat(A, B));
  // console.log(stats.tTest(A, B));
  // console.log(stats.tTest(B, A));

  // console.log(stats.range(5));
  // console.log(stats.range(5, 10));
  // console.log(stats.range(5, 10, 0.5));
  // console.log(stats.range(5, -1, -0.2));
  // console.log(stats.range(5, 10, 0.2));

  // console.log(stats.split(stats.range(20), 0.2));

  // console.log(stats.cache);

  console.log(stats.factorial(5));
  console.log(stats.factorial(10));
  console.log(stats.factorial(15));
  console.log(stats.factorial(20));
  console.log(stats.factorial(25));

  // console.log(stats.cache);

  console.log(stats.combination(6, 1));
  console.log(stats.combination(6, 2));
  console.log(stats.combination(6, 3));
  console.log(stats.combination(6, 4));
  console.log(stats.combination(6, 5));
  console.log(stats.combination(6, 6));

  console.log(stats.cache);

  // let x = [1, 2, 3, 4, 5];
  // let y = [10, 23, 31, 38, 49];
  //
  // console.log(stats.cov(x, y));
  // console.log(stats.cor(x, y));

  // console.log(stats.quantile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));

  // console.log(stats.pnorm(2));
  // console.log(stats.qnorm(0.95));

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

if (typeof module !== 'undefined') {
  if (module.parent) {
    module.exports = stats;

  } else { // testing codes go here
    main();
  }

} else if (typeof window !== 'undefined') {
  console.log('stats running in browser!');
}