/**
 * Created by yangm11 on 8/24/2017.
 */
'use strict';
/*
 Given a collection of distinct numbers, return all possible permutations.

 For example,
 [1,2,3] have the following permutations:
 [
   [1,2,3],
   [1,3,2],
   [2,1,3],
   [2,3,1],
   [3,1,2],
   [3,2,1]
 ]
 */

function permute(arr) {
  if (arr.length < 2) {
    return [arr];
  }
  if (arr.length === 2) {
    return [
      [arr[0], arr[1]],
      [arr[1], arr[0]]
    ]
  }
  if (arr.length === 3) {
    return [
      [arr[0], arr[1], arr[2]],
      [arr[0], arr[2], arr[1]],
      [arr[1], arr[0], arr[2]],
      [arr[1], arr[2], arr[0]],
      [arr[2], arr[0], arr[1]],
      [arr[2], arr[1], arr[0]]
    ]
  }
  let res = [];
  let tmp = permute(arr.slice(1));
  for (let i = 0; i < tmp.length; i++) {
    let cur = tmp[i];
    for (let j = 0; j < cur.length; j++) {
      res.push(cur.slice(0, j).concat(arr[0], cur.slice(j)));
    }
    res.push(cur.concat(arr[0]));
  }
  return res;
}

let a = [5, 4, 2, 6];
console.log(permute(a).length);

/*
 Given a collection of numbers that might contain duplicates, return all possible unique permutations.

 For example,
 [1,1,2] have the following unique permutations:
 [
 [1,1,2],
 [1,2,1],
 [2,1,1]
 ]
 */

function permuteUnique(nums) {
  function worker(arr) {
    if (arr.length === 1) {
      return [arr.join()];
    }
    let res = [];
    let tmp = worker(arr.slice(1));
    let i = 0;
    while (i < tmp.length) {
      let cur = tmp[i].split(',');
      let j = 0;
      while (j < cur.length + 1) {
        let candidate = (cur.slice(0, j).concat(arr[0], cur.slice(j))).join();
        if (!res.includes(candidate)) {
          res.push(candidate);
        }
        j++;
      }
      i++;
    }
    return res;
  }

  function mapToNumber(s) {
    let a = s.split(',');
    let list = new Array(a.length);
    for (let i = 0; i < a.length; i++) {
      list[i] = +a[i];
    }
    return list;
  }

  let res = worker(nums);
  return res.map(s => mapToNumber(s));
}

console.log(permuteUnique([1, 1, 2, 2]));

function _permuteUnique(nums) {
  function worker(arr) {
    if (arr.length < 2) {
      return [arr];
    }
    if (arr.length === 2) {
      return [
        [arr[0], arr[1]],
        [arr[1], arr[0]]
      ]
    }
    if (arr.length === 3) {
      return [
        [arr[0], arr[1], arr[2]],
        [arr[0], arr[2], arr[1]],
        [arr[1], arr[0], arr[2]],
        [arr[1], arr[2], arr[0]],
        [arr[2], arr[0], arr[1]],
        [arr[2], arr[1], arr[0]]
      ]
    }
    let res = [];
    let tmp = permute(arr.slice(1));
    for (let i = 0; i < tmp.length; i++) {
      let cur = tmp[i];
      for (let j = 0; j < cur.length; j++) {
        res.push(cur.slice(0, j).concat(arr[0], cur.slice(j)));
      }
      res.push(cur.concat(arr[0]));
    }
    return res;
  }

  function map(a) {
    let res = new Array(a.length);
    let i = 0;
    while (i < a.length) {
      res[i] = a[i].join();
      i++;
    }
    return res;
  }

  let r = worker(nums);
  let d = map(r);

  let res1 = [], res2 = [];

  for (let i = 0; i < d.length; i++) {
    if (!res1.includes(d[i])) {
      res1.push(d[i]);
      res2.push(r[i]);
    }
  }

  return res2;
}

console.log(_permuteUnique([2, 1, 2, 1]));