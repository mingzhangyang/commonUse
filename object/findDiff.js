/**
 * Created by yangm11 on 8/18/2017.
 */
'use strict';

function findDiff(objA, objB) {
  let res = {
    notFoundInA: [], // newly added
    notFoundInB: [], // removed
    diff: [] // value modified
  };

  let keysA = Object.keys(objA);

  for (let i = 0; i < keysA.length; i++) {
    if (!objB.hasOwnProperty(keysA[i])) {
      res.notFoundInB.push('/' + keysA[i]);
    }
  }

  function worker(A, B, path) {
    let keysB = Object.keys(B);
    for (let i = 0; i < keysB.length; i++) {
      if (!(A.hasOwnProperty(keysB[i]))) {
        res.notFoundInA.push(path + '/' + keysB[i]);
        continue;
      }
      if ((typeof A[keysB[i]]) !== (typeof B[keysB[i]])) {
        res.diff.push({
          path: path + '/' + keysB[i],
          valA: A[keysB[i]],
          valB: B[keysB[i]]
        });
        continue;
      }
      if ((typeof A[keysB[i]] !== 'object') && (A[keysB[i]] !== B[keysB[i]])) {
        res.diff.push({
          path: path + '/' + keysB[i],
          valA: A[keysB[i]],
          valB: B[keysB[i]]
        });
        continue;
      }
      if (A[keysB[i]] === null && B[keysB[i]] === null) {
        continue;
      }
      if (A[keysB[i]] === null && B[keysB[i]] !== null) {
        res.diff.push({
          path: path + '/' + keysB[i],
          valA: A[keysB[i]],
          valB: B[keysB[i]]
        });
        continue;
      }
      if (A[keysB[i]] !== null && B[keysB[i]] === null) {
        res.diff.push({
          path: path + '/' + keysB[i],
          valA: A[keysB[i]],
          valB: B[keysB[i]]
        });
        continue;
      }
      worker(A[keysB[i]], B[keysB[i]], path + keysB[i]);
    }
  }

  worker(objA, objB, '');

  if (res.notFoundInB.length === 0 && res.notFoundInA.length === 0 && res.diff.length ===0) {
    return null;
  }
  return res;
}

let a = {x: 3, y: 4, z: 5, m: [1, 2, 3], n: {a: 0, b: 1}, p: null};
let b = {z: 0, p: {}, q: 5, k: 'abc', m: [0, 2, 3, 4], n: {a: 10, b: 1, c: 2}};

let res = findDiff(a, b);
// console.log(res);
console.dir(res, {depth: null, colors: true});
console.dir(findDiff({x: 1}, {x: 1}));