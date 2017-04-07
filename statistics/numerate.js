/**
 * Created by yangm11 on 4/7/2017.
 */
'use strict';

// This function is for numerate all possibilities of a given value of members
// from the given array.

function numerate(list, value) {
  list = new Set(list);
  list = Array.from(list);

  var p = list.toString();

  numerate.cache = numerate.cache || {};

  if (!(p in numerate.cache)) {
    numerate.cache[p] = {};
  }

  if (numerate.cache[p][value]) {
    return numerate.cache[p][value];
  }

  if (value === 1) {
    numerate.cache[p][1] = list;
    return numerate.cache[p][1];
  }

  if (value === 2) {
    var result = [];
    for (var i = 0; i < list.length - 1; i++) {
      for (var j = 0; j < list.length - i - 1; j++) {
        result.push([list[i], list.slice(i+1)[j]]);
      }
    }
    numerate.cache[p][2] = result;
    return result;
  }
  if (value > 2) {
    var temp = numerate(list, value - 1);
    var result1 = [];
    for (var m = 0; m < temp.length; m++) {
      var idx = list.indexOf(temp[m][temp[m].length - 1]);
      if (idx === list.length - 1) {
        continue;
      }
      for (var n = 0; n < list.length - idx - 1; n++) {
        result1.push(temp[m].concat(list.slice(idx + 1)[n]));
      }
    }
    numerate.cache[p][value] = result1;
    return result1;
  }
}



if (module.parent && typeof window === 'undefined') {
  module.exports = numerate;
} else {
  var test = numerate([1, 2, 3, 4, 5, 6, 7, 8, 9], 5);
  console.log(test);
  console.dir(numerate.cache, {depth: null, colors: true});
}

