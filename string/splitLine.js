/**
 * Created by yangm11 on 4/7/2017.
 */
'use strict';


function splitLine(s) {
  var elem = '';
  var quo = {
    open: false,
    seq: '',
    sign: '',
    ready: false
  };
  var array = [];

  for (var i = 0; i < s.length; i++) {
    if (quo.open) {
      if (s[i] === quo.sign) {
        quo.open = false;
        quo.ready = true;
      } else {
        quo.seq += s[i];
      }
    } else {
      if (s[i] === ',') {
        if (quo.ready) {
          array.push(quo.seq);
          quo.seq = '';
          quo.sign = '';
          quo.ready = false;
          continue;
        }

        array.push(elem);
        elem = '';
        continue;
      }
      if (s[i] === ' ') {
        continue;
      }
      if (s[i] === '"' || s[i] === "'") {
        quo.open = true;
        quo.sign = s[i];
        continue;
      }
      elem += s[i];
    }
  }
  if (quo.seq) {
    array.push(quo.seq);
  }
  if (elem) {
    array.push(elem);
  }
  return array;
}

// " A, 'B, C' D, E" is not allowed.
// " A, 'B, C' , D, E" is OK.

var s = '1, 2, "OK", ,"Hello World", "I am fine.", "A, B, C"';
var a = splitLine(s);
console.log(a);
for (var i = 0; i < a.length; i++) {
  console.log(a[i]);
}