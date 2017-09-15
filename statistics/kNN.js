/**
 * Created by yangm11 on 9/14/2017.
 */
'use strict';

const cf = require('../array/customFuncsOnArray');

class kNN {
  constructor(k) {
    k = k || 1;
    this.k = k;
  }

  train(X, y) {
    // X should be a 2-d array, and y should be a 1-d array
    this.Xtr = X;
    this.ytr = y;
  }

  predict(x) {
    // x should be a 2-d array
    let res = new Array(x.length);
    for (let i = 0; i < x.length; i++) {
      let a = new Array(this.Xtr.length);
      for (let j = 0; j < this.Xtr.length; j++) {
        let d = cf.distanceL1(this.Xtr[j], x[i]);
        // let d = cf.distanceL2(this.Xtr[j], x[i]);
        a[j] = [d, this.ytr[j]];
      }
      a.sort((elem1, elem2) => elem1[0] - elem2[0]);
      let v = a.slice(0, k);

      // find the most common one in v

      let o = {};
      for (let h = 0; h < k; h++) {
        if (!o[v[h][1]]) {
          o[v[h][1]] = 1;
        } else {
          o[v[h][1]] += 1;
        }
      }
      let keys = Object.keys(o);
      let arr = [];
      for (let p = 0; p < keys.length; p++) {
        arr.push([keys[p], o[keys[p]]]);
      }
      arr.sort((elem1, elem2) => elem2[1] - elem1[1]);
      res[i] = +arr[0][0];
    }
    return res;
  }

}

if (typeof module !== 'undefined' && module.parent) {

} else {
  // test code go here
}