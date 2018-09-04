/**
 * Created by yangm11 on 9/4/2018.
 */
'use strict';

function mixTwoString(s1, s2) {
  let arr = [...s1].concat([...s2]);
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor((i+1) * Math.random());
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join('');
}

if (typeof module !== 'undefined' && module.parent) {
  // Node environment, required as module
  module.exports = mixTwoString;
} else if (typeof window === 'object') {
  // Browser environment

} else {
  // Node environment, run directly
  // test code go here

  console.log(mixTwoString('Hello world!', 'Art of programming'));
}