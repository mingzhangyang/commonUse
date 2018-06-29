/**
 * Created by yangm11 on 6/29/2018.
 */
'use strict';

function oct2hex(n) {
  if (typeof n !== 'number') {
    throw 'an octal integer expected';
  }
  return Number(n).toString(16);
}

function oct2hex_(n) {
  if (typeof n !== 'number') {
    throw 'an octal integer expected';
  }
  function transform(x) {
    switch (x) {
      case 15:
        return 'f';
      case 14:
        return 'e';
      case 13:
        return 'd';
      case 12:
        return 'c';
      case 11:
        return 'b';
      case 10:
        return 'a';
      default:
        return x+'';
    }
  }
  let r = n % 16;
  let d = (n-r)/16;
  let res = transform(r);
  while (d > 0) {
    n = d;
    r = n % 16;
    d = (n-r)/16;
    res = transform(r) + res;
  }
  return res;
}

if (typeof module !== 'undefined' && module.parent) {

} else {
  // test code go here
  console.log(oct2hex(4), oct2hex_(4));
  console.log(oct2hex(10), oct2hex_(10));
  console.log(oct2hex(12), oct2hex_(12));
  console.log(oct2hex(25), oct2hex_(25));
  console.log(oct2hex(65), oct2hex_(65));
  console.log(oct2hex(100), oct2hex_(100));
  console.log(oct2hex(255), oct2hex_(255));
  console.log(oct2hex(1000), oct2hex_(1000));
  console.log(oct2hex(1024), oct2hex_(1024));
}