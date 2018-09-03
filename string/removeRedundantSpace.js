/**
 * Created by mingzhang on 9/3/18.
 */
'use strict';

function removeRedundantSpace(s) {
  let res = '';
  let flag = false;
  for (let i = 0; i < s.length; i++) {
    if (s[i] !== ' ') {
      res += s[i];
      if (flag) {
        flag = false;
      }
    } else {
      if (!flag) {
        res += ' ';
        flag = true;
      }
    }
  }
  return res;
}

if (typeof module !== 'undefined') {
  if (module.parent) {
    // serve as module
  } else {
    // run as executable
  }
} else if (typeof window !== 'undefined') {
// run in browser

}