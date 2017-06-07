/**
 * Created by yangm11 on 5/23/2017.
 */
'use strict';

const cfs = require('../array/customFuncsOnArray');

class RandVar {
  constructor(arr1, arr2) {
    if (!Array.isArray(arr1)) {
      throw 'The first arg should be an array!';
    }

    this.values = arr1;

    if (typeof arr2 === 'undefined') {
      // this.weights = arr1.map(d => 1 / arr1.length);
      this.weights = cfs.map(arr1, d => 1 / arr1.length);
    }

    if (Array.isArray(arr2)) {
      if (arr1.length !== arr2.length) {
        throw 'The two array provided should be same in length!';
      }
      let s = arr2.reduce((acc, d) => acc + d);
      // this.weights = arr2.map(d => d / s);
      this.weights = cfs.map(arr2, d => d / s);
    }

    let ws = this.weights;
    Object.defineProperty(this, 'combined', {
      get: function () {
        return cfs.map(arr1, function (d, i) {
          return {
            v: d,
            p: ws[i]
          }
        });
      }
    })
  }

  _bins() {
    let bins = [[0, this.weights[0]]];
    for (let i = 1; i < this.weights.length; i++) {
      let acc = bins[i - 1][1];
      bins.push([acc, acc + this.weights[i]]);
    }
    this.bins = bins;
  }

  sample() {
    if (!this.bins) {
      this._bins();
    }
    // console.log(this.bins);
    let p = Math.random();
    let i = this.bins.findIndex(d => p >= d[0] && p < d[1]);
    return this.values[i];
  }

  arithmetic(sign, rv) {
    if (rv.constructor !== RandVar) {
      throw 'An RandVar instance expected!';
    }
    let rv1 = this.combined;
    let rv2 = rv.combined;
    let result = [];
    let uniqV = [];
    switch (sign) {
      case '+':
        for (let i = 0; i < rv1.length; i++) {
          for (let j = 0; j < rv2.length; j++) {
            let t = rv1[i].v + rv2[j].v;
            if (uniqV.indexOf(t) === -1) {
              uniqV.push(t);
              result.push({
                v: t,
                p: rv1[i].p * rv2[j].p
              });
              continue;
            }
            let idx = result.findIndex(o => o.v === t);
            result[idx].p += rv1[i].p * rv2[j].p;
          }
        }
        break;
      case '-':
        for (let i = 0; i < rv1.length; i++) {
          for (let j = 0; j < rv2.length; j++) {
            let t = rv1[i].v - rv2[j].v;
            if (uniqV.indexOf(t) === -1) {
              uniqV.push(t);
              result.push({
                v: t,
                p: rv1[i].p * rv2[j].p
              });
              continue;
            }
            let idx = result.findIndex(o => o.v === t);
            result[idx].p += rv1[i].p * rv2[j].p;
          }
        }
        break;
      case '*':
        for (let i = 0; i < rv1.length; i++) {
          for (let j = 0; j < rv2.length; j++) {
            let t = rv1[i].v * rv2[j].v;
            if (uniqV.indexOf(t) === -1) {
              uniqV.push(t);
              result.push({
                v: t,
                p: rv1[i].p * rv2[j].p
              });
              continue;
            }
            let idx = result.findIndex(o => o.v === t);
            result[idx].p += rv1[i].p * rv2[j].p;
          }
        }
        break;
      case '/':
        for (let i = 0; i < rv1.length; i++) {
          for (let j = 0; j < rv2.length; j++) {
            let t = rv1[i].v / rv2[j].v;
            if (uniqV.indexOf(t) === -1) {
              uniqV.push(t);
              result.push({
                v: t,
                p: rv1[i].p * rv2[j].p
              });
              continue;
            }
            let idx = result.findIndex(o => o.v === t);
            result[idx].p += rv1[i].p * rv2[j].p;
          }
        }
        break;
      case '%':
        for (let i = 0; i < rv1.length; i++) {
          for (let j = 0; j < rv2.length; j++) {
            let t = rv1[i].v % rv2[j].v;
            if (uniqV.indexOf(t) === -1) {
              uniqV.push(t);
              result.push({
                v: t,
                p: rv1[i].p * rv2[j].p
              });
              continue;
            }
            let idx = result.findIndex(o => o.v === t);
            result[idx].p += rv1[i].p * rv2[j].p;
          }
        }
        break;
      case '//':
        for (let i = 0; i < rv1.length; i++) {
          for (let j = 0; j < rv2.length; j++) {
            let t = Math.floor(rv1[i].v / rv2[j].v);
            if (uniqV.indexOf(t) === -1) {
              uniqV.push(t);
              result.push({
                v: t,
                p: rv1[i].p * rv2[j].p
              });
              continue;
            }
            let idx = result.findIndex(o => o.v === t);
            result[idx].p += rv1[i].p * rv2[j].p;
          }
        }
        break;
      default:
        throw new Error('sign not recognized.');
    }
    // let vs = result.map(o => o.v);
    let vs = cfs.map(result, o => o.v);
    // let ws = result.map(o => o.p);
    let ws = cfs.map(result, o => o.p);
    return new RandVar(vs, ws);
  }


}


let r1 = new RandVar([1, 2, 3, 4, 5, 6], [1, 1, 2, 4, 2, 1]);

// console.log(r1.arithmetic('+', r1));
let ans = [];
let N = 100000;
for (let i = 0; i < N; i++) {
  let c = r1.sample();

  let idx = ans.findIndex(o => o.value === c);

  if (idx === -1) {
    ans.push({
      value: c,
      count: 1
    });
  } else {
    ans[idx].count += 1;
  }
}

ans.sort((o1, o2) => o1.count - o2.count);
console.log(cfs.map(ans, o => ({
  value: o.value,
  count: o.count,
  ratio: o.count / N
})));