/**
 * Created by yangm11 on 7/25/2018.
 */
'use strict';

/*
  Create a for loop that iterates up to 100 while outputting "fizz" at multiples of 3, "buzz" at multiples of 5 and "fizzbuzz" at multiples of 3 and 5.
 */

let m = [[0, 'fizz'], ['buzz', 'fizzbuzz']];
for (let i = 0; i < 100; i++) {
  let x = +(i % 3 === 0);
  let y = +(i % 5 === 0);
  if (x + y > 0) {
    console.log(i, m[y][x]);
  }
}

if (typeof module !== 'undefined' && module.parent) {

} else {
  // test code go here
}