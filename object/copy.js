/**
 * Created by yangm11 on 6/6/2017.
 */
'use strict';

// Note: default mode set to be shallow copy
// You can specify the second parameter to set 'semi-deep copy' mode
// 'semi-deep' means only the enumerable and own property of an object will be
// deep copied, the non-enumerable or properties from prototype chain are
// not copied.

function copy(obj, opt) {
  if (typeof obj !== 'object') {
    return obj;
  }
  if (typeof opt === 'undefined' || !opt) {
    if (Array.isArray(obj)) {
      return obj.slice();
    }
    return Object.assign({}, obj);
  }

  function dc(o) {
    if (Array.isArray(o)) {
      let res = [];
      for (let i = 0; i < o.length; i++) {
        let c = o[i];
        if (typeof c !== 'object') {
          res.push(c);
          continue;
        }
        if (c === null) {
          res.push(c);
          continue;
        }
        res.push(dc(c));
      }
      return res;
    }

    let keys = Object.keys(o);
    let result = {};
    for (let prop of keys) {
      let c = o[prop];
      if (typeof c !== 'object') {
        result[prop] = c;
        continue;
      }
      if (c === null) {
        result[prop] = c;
        continue;
      }
      result[prop] = dc(c);
    }
    return result;
  }

  let dcp = ['deep', 'deep copy', 'deepCopy', 'deepcopy'];

  if (typeof opt === 'string' && dcp.includes(opt)) {
    return dc(obj);
  }
  if (typeof opt === 'object' && opt !== null && (opt['deepcopy'] || opt['deepCopy'] || opt['deep'])) {
    return dc(obj);
  }

  throw 'command not recognized';
}

if (typeof module !== 'undefined' && module.parent) {
  module.exports = copy;
} else if (typeof window !== 'undefined') {
  console.log('copy module running in browser');
} else {
  console.log(copy(1));

  let a = {x: 3, y: 4, z: 5};
  let arr = [1, 2, 3, 4, 5];

  let ac = copy(a);
  let arrc = copy(arr);

  console.log(ac === a);
  console.log(arrc === arr);

  let t = {m: a, n: arr, p: 123, q: true};
  let t1 = t;
  let t2 = Object.assign({}, t);
  let t3 = copy(t, 'deep');

  console.log('\n##########################################################');
  console.log(t);
  console.log(t1);
  console.log(t2);
  console.log(t3);

  console.log('\n##########################################################');
  console.log(t === t1);
  console.log(t === t2);
  console.log(t === t3);

  console.log('\n##########################################################');
  console.log(t.m === t1.m);
  console.log(t.m === t2.m);
  console.log(t.m === t3.m);

  t.m.x = 100;
  t.n.push(100);

  console.log('\n##########################################################');
  console.log(t);
  console.log(t1);
  console.log(t2);
  console.log(t3);


}