/**
 * Created by mingzhang on 6/7/17.
 */
'use strict';

const customFuncsOnArray = (function () {
  function map(a, f) {
    let res = [];
    for (let i = 0; i < a.length; i++) {
      res.push(f(a[i], i));
    }
    return res;
  }

  function filter(a, f) {
    let res = [];
    let t;
    for (let i = 0; i < a.length; i++) {
      t = f(a[i], i);
      if (t) {
        res.push(a[i]);
      }
    }
    return res;
  }

  function split(arr, ratio) {
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
  }

  return {
    map: map,
    filter: filter,
    split: split
  }
})();

if (typeof module !== 'undefined' && module.parent) {
  module.exports = customFuncsOnArray;
}