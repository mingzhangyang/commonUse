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
      a.sort((elem1, elem2) => elem2[0] - elem1[0]);
      let v = a.slice(0, k);

      // find the most common one in v
    }
  }

}

if (typeof module !== 'undefined' && module.parent) {

} else {
  // test code go here
}