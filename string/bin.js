/**
 * Created by yangm11 on 7/31/2017.
 */
'use strict';

function bin(str, binSize) {
  let res = [];
  let i = 0;
  while (true) {
    res.push(str.substr(i, binSize));
    i += binSize;
    if (i > str.length - 1) {
      break;
    }
  }
  return res;
}

function main() {
  let s = `If start is negative, substr() uses it as a character index from the end of the string. If start is negative and abs(start) is larger than the length of the string, substr() uses 0 as the start index. Note: the described handling of negative values of the start argument is not supported by Microsoft JScript. If length is 0 or negative, substr() returns an empty string. If length is omitted, substr() extracts characters to the end of the string.`;

  console.log(bin(s, 5));
}

if (typeof module !== 'undefined' && module.parent) {
  module.exports = bin;
} else {
  main();
}
