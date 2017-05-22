/**
 * Created by yangm11 on 5/22/2017.
 */
'use strict';

// m is how many times you roll a die or how many dies you are rolling
// n is the number you want to get

function roll(m, n) {
  if (m < 1) {
    throw new Error('m can not be less than 1');
  }
  if (n < m || n > m * 6) {
    throw new Error('n out of range');
  }

  // split checking m, n out from rolling function

  function rolling(m, n) {
    if (m === 1) {
      return 1 / 6;
    }

    let sum = 0;

    for (let i = 1; i < 7; i++) {
      if (n - i > (m - 1) * 6) {
        continue;
      }
      if (n - i < m - 1) {
        break;
      }
      sum += roll(m - 1, n - i) / 6; // * roll(1, i)
    }
    return sum;
  }
  return rolling(m, n);
}

let s = 0;
for (let i = 4; i < 25; i++) {
  // console.log(i);
  // console.log(roll(4, i));

  s += roll(4, i);

}
console.log(s);