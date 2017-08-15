/**
 * Created by yangm11 on 8/15/2017.
 */
'use strict';

const flatten = require('./flatten');

function searchObj(obj, pat, opts) {
  if (!(pat instanceof RegExp)) {
    opts = opts || 'ig';
    pat = new RegExp(pat, opts);
  }
  let tmp = flatten(obj);
  let res = {
    props: [],
    values: []
  };
  let keys = Object.keys(tmp);
  for (let i = 0; i < keys.length; i++) {
    let p = keys[i];
    let v = tmp[p] + '';
    if (p.search(pat) !== -1) {
      res.props.push(p);
    }
    if (v.search(pat) !== -1) {
      res.values.push({
        path: p,
        value: tmp[p]
      });
    }
  }
  return res;
}



function main() {
  let a = [1, 2, 3, 'abc', 'xyz', 'ABC', 'FLag', 'atcg', {
    x: 1,
    y: 2
  }, {
    a: 3,
    b: 4
  }];
  let obj = {
    a: a,
    b: [1, 2, 3],
    c: 'xyz',
    d: {
      a: 10
    }
  };
  console.log(flatten(obj));
  console.log(searchObj(obj, 'a'));
}

if (typeof module !== 'undefined' && module.parent) {
  module.exports = {
    searchObj: searchObj
  }
} else if (typeof window !== 'undefined') {
  console.log('searchObj.js imported into browser');
} else {
  main();
}