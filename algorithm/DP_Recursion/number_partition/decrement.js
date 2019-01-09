/**
 * Created by yangm11 on 5/24/2017.
 * Modified on 1/9/2019.
 * A version that tolerate a specified error can be found with the link below
 * https://github.com/mingzhangyang/go-learning/blob/master/snippets/partition.go
 */
'use strict';

// arr is an array of natural numbers
// arr.length > 2
// all elements of arr < target
// sum of elements of arr > target
// judge whether a sub group of arr sums to target

function judge(arr, target) {
  if (target === 0) { // this is very important!!!!!!
    return [];
  }

  if (target < 0) { //  this is very important!!!!!!!!!!
    return false;
  }

  if (arr.length === 1) {
    if (arr[0] !== target) {
      return false;
    }
    return arr;
  }

  // Due to sum of elements of arr > target, there must be at least one element left.
  // The very deepest 'state' that the recursion can reach should be [elem1, elem2],
  // for the goal to be accomplished, either elem1 or elem2 should be equal to the updated target.
  // Otherwise, it fails.
  // However, in most of time, it never reach that deep, it will stop at updated target <= 0.

  // if (arr.length === 2) {
  //   if (arr[0] === target) {
  //     return [arr[0]];
  //   }
  //   if (arr[1] === target) {
  //     return [arr[1]];
  //   }
  //   return false;
  // }

  for (var i = 0; i < arr.length; i++) {
    let newArr = arr.slice();
    newArr.splice(i);
    var t = judge(newArr, target - arr[i]);
    if (t) {
      return t.concat(arr[i]);
    }
  }

  return false;
}

console.log(judge([1], 2));
console.log(judge([2], 2));
console.log(judge([2, 3], 2));
console.log(judge([2, 3], 4));
console.log(judge([2, 3, 7], 4));
console.log(judge([2, 3, 7], 5));


var test = judge([3, 6, 8, 9, 17, 21, 45, 34, 7, 4, 12 ], 37);
console.log(test);

// for (var i = 1; i < 100; i++) {
// 	console.log('To reach ' + i, judge([3, 6, 8, 9, 17, 21, 45, 34, 7, 4, 12 ], i));
// }

// var testArr = [];
// for (var j = 0; j < 100; j++) {
//   var t = Math.random() * 1000;
//   testArr.push(Math.floor(t));
// }
//
// console.log(testArr);
//
// for (var i = 1001; i < 1105; i++) {
//   console.log('To reach ' + i, judge(testArr, i));
// }