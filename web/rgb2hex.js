/**
 * Created by yangm11 on 8/21/2018.
 */
'use strict';

function rgb2hex(r, g, b) {
  let res = '#';
  for (let t of arguments) {
    if (typeof t === 'number' && t % 1 === 0 && t > -1 && t < 256) {
      let th = Number(t).toString(16);
      res += th.length === 1 ? `0${th}` : th;
    } else {
      throw 'Please check your RGB code.';
    }
  }
  return res;
}

if (typeof module !== 'undefined' && module.parent) {

} else if (typeof window === 'object') {

} else {
  // test code go here
  console.log(rgb2hex(1, 2, 3));
  console.log(rgb2hex(100, 200, 300));
}