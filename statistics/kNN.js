/**
 * Created by yangm11 on 9/14/2017.
 */
'use strict';

const cf = require('../array/customFuncsOnArray');
const iris = require('./datasets/iris').array;

class KNN {
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
      let v = a.slice(0, this.k);

      // find the most common one in v

      let o = {};
      for (let h = 0; h < this.k; h++) {
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
  let data = cf.split(iris, 0.6);
  console.log(data.length);
  let train = data[0];
  let valid = data[1];

  let trainX = train.map(d => d.slice(0, -1));
  let train_y = train.map(d => d[d.length - 1]);

  let validX = valid.map(d => d.slice(0, -1));
  let valid_y = valid.map(d => d[d.length - 1]);

  let knn = new KNN(3);
  knn.train(trainX, train_y);

  for (let i = 1; i < 20; i += 2) {
    knn.k = i;
    let predict = knn.predict(validX);

    console.log('k = ' + i + ', ', cf.accuracy(predict, valid_y));
  }
}