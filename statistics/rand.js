/**
 * To generate random numbers
 * Created by yangm11 on 9/13/2017.
 */
'use strict';

function randN(low, high) {
  if (typeof low === 'undefined' && typeof high === 'undefined') {
    return Math.floor(Math.random() * 10);
  }
  if (typeof low === 'number' && typeof high === 'undefined') {
    return Math.floor(Math.random() * low);
  }
  if (typeof low === 'number' && typeof high === 'number') {
    if (low > high) {
      [low, high] = [high, low];
    }
    return Math.floor(Math.random() * (high - low)) + low;
  }
  throw `Correct usage:
    * omit the input to get a random integer between 0 and 9
    * input one integer N to get a random integer smaller than N
    * input two integers to get a random integer between them`
}


if (typeof module !== 'undefined' && module.parent) {

} else {
  // test code go here
  console.log(randN());
  console.log(randN(20));
  console.log(randN(1, 100));
}