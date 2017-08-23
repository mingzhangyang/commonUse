/**
 * Created by yangm11 on 5/24/2017.
 */
'use strict';

// arr is an array of natural numbers
// arr.length > 2
// all elements of arr < target
// sum of elements of arr > target
// judge whether a sub group of arr sums to target


function increment(array, target, result) {
  var arr = array.slice();
  var d = target;
  result = result || [];

  // if only one element left in the updated array to be checked,
  // it means all other elements have been pushed into result array
  // as we have been aware of that the sum of all elements is greater than target
  // Thereof, if there is only one element left in the updated array to be checked,
  // It is impossible to reach target.

  if (arr.length === 1) {
    return false;
  }

  for (var i = 0; i < arr.length; i++) {
    if (arr.length === 0 || sumOfArray(result) + arr[i] < d) {
      result.push(arr[i]);
      let newArr = arr.slice();
      newArr.splice(i, 1);
      var t = increment(newArr, d, result);
      if (t) {
        return result;
      }
      result.pop();
    }

    if(sumOfArray(result) + arr[i] === d) {
      result.push(arr[i]);
      return result;
    }
  }

  return false;

}

function sumOfArray(arr) {
  var total = 0;
  for (var i = 0; i < arr.length; i++) {
    total += arr[i];
  }
  return total;
}

for (var i = 1; i < 100; i++) {
  console.log('To reach ' + i, increment([3, 6, 8, 9, 17, 21, 45, 34, 7, 4, 12 ], i));
}

// var testArr = [];
// for (var j = 0; j < 100; j++) {
//  var t = Math.random() * 1000;
//  testArr.push(Math.floor(t));
// }
//
// console.log(testArr);
//
// for (var i = 1001; i < 1105; i++) {
//  console.log('To reach ' + i, increment(testArr, i));
// }