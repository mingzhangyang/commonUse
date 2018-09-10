/**
 * Created by yangm11 on 9/10/2018.
 */
'use strict';

/*
  Create a for loop that iterates up to 100 while outputting
  "fizz" at multiples of 3,
  "buzz" at multiples of 5 and
  "fizzbuzz" at multiples of 3 and 5.
 */

/**
 * address the problem described above
 * @param N: a natural number
 * idea is below:
 *
 *                      |   False  |  True    |(multiples of 3)
 *                      -----------------------
 *                False |    ''    |  fizz    |
 *                -----------------------------
 *                 True |   buzz   | fizzbuzz |
 *                -----------------------------
 *      (multiples of 5)|
 *
 */
function log(N) {
  let m = [[0, 'fizz'], ['buzz', 'fizzbuzz']];
  for (let i = 0; i < N; i++) {
    let x = +(i % 3 === 0);
    let y = +(i % 5 === 0);
    if (x + y > 0) {
      console.log(i, m[y][x]);
    }
  }
}



if (typeof module !== 'undefined') {
  // Node environment, 
  if (module.parent) {
    // required as module

  } else {
    // run as executable

  }
} else if (typeof window === 'object') {
  // Browser environment
} 