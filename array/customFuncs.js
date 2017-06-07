/**
 * Created by mingzhang on 6/7/17.
 */
'use strict';

function map(a, f) {
  let res = [];
  for (let i = 0; i < a.length; i++) {
    res.push(f(a[i], i));
  }
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
}