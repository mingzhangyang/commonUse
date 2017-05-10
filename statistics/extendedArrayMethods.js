/**
 * Created by yangm11 on 4/7/2017.
 */
'use strict';

// get one item from an array randomly
function sample(arr) {
  var t = Math.floor(arr.length * Math.random());
  return arr[t];
}

// shuffle an array
function shuffle(arr) {
  var result = [];
  var len = arr.length;
  var cp = arr.slice();
  for (var i = 0; i < len; i++) {
    var idx = Math.floor(cp.length * Math.random());
    result.push(cp.splice(idx, 1)[0]);
  }
  return result;
}

// console.log(shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]));

function findUnique(arr) {
  let uniq = [];
  let dupl = [];

  for (let i = 0; i < arr.length; i++) {
    let elem = arr[i];
    let count = 1;
    for (let j = i + 1; j < arr.length - 1; j++) {
      if (elem === arr[j]) {
        count += 1;
      }
    }
    if (count === 1) {
      uniq.push(elem);
    } else {
      dupl.push({
        elem: elem,
        count: count
      });
    }
  }
  return {
    unique: uniq,
    duplicate: dupl
  };
}