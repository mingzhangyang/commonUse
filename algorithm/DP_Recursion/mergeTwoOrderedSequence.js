/**
 * Created by mingzhang on 1/22/17.
 */

/****************************************************************************
 * a and b are two ordered sequences of numbers. Try to merge them into a new
 * ordered sequence of numbers.
 *****************************************************************************/

function merge(a, b) {
  var i = 0;
  var j = 0;
  var merged = [];

  while (i < a.length && j < b.length) {
    while (a[i] <= b[j]) {
      merged.push(a[i]);
      i++;
    }
    while (a[i] >= b[j]) {
      merged.push(b[j]);
      j++;
    }
  }

  if (i === a.length) {
    merged = merged.concat(b.slice(j));
  } else {
    merged = merged.concat(a.slice(i));
  }

  return merged;
}

var x = [1, 4, 7, 9, 13, 24, 30, 37, 43];
var y = [2, 3, 6, 7, 12, 16, 19, 25, 37];

console.log(merge(x, y));

function mergeByRecursion(a, b) {
  var result = [];
  var left, right;

  if (a[0] <= b[0]) {
    left = a;
    right = b;
  } else {
    right = a;
    left = b;
  }

  function m(x, y) {
    if (x.length === 0) {
      result = result.concat(y);
      y = [];
    }

    for (var i = 0; x[i] <= y[0]; i++) {
      result.push(x[i]);
    }

    var t = y;
    right = x.slice(i);
    left = t;
  }

  while (left.length > 0 || right.length > 0) {
    m(left, right);
  }

  return result;
}

console.log(mergeByRecursion(x, y));