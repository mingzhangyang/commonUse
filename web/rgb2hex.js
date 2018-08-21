/**
 * Created by yangm11 on 8/21/2018.
 */
'use strict';

function rgb2hex(r, g, b) {
  let res = '#';
  for (let t of arguments) {
    if (t < 0 || t > 255) {
      throw 'Out of range. Please check your RGB code.';
    }
    let th = Number(t).toString(16);
    res += th.length === 1 ? `0${th}` : th;
  }
  return res;
}

if (typeof module !== 'undefined' && module.parent) {

} else {
  // test code go here
  console.log(rgb2hex(1, 2, 3));
  console.log(rgb2hex(100, 200, 300));
}