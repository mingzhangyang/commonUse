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

//