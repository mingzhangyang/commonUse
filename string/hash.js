/**
 * Created by yangm11 on 8/1/2017.
 */
'use strict';

// function hash1(s) {
//   let hash = 0;
//   let i, char, len;
//   if (s.length === 0) return hash;
//   for (i = 0, len = s.length; i < len; i++) {
//     char = s.charCodeAt(i);
//     hash = ((hash << 5) - hash) + char;
//     hash |= 0; // Convert to 32bit integer
//   }
//   return hash;
// }

// Java version
function hashCode(s) {
  let hash = 0, i = 0, len = s.length;
  while ( i < len ) {
    hash  = ((hash << 5) - hash + s.charCodeAt(i++)) << 0;
  }
  return hash;
}

function sdbmCode(str) {
  let hash = 0, i = 0, len = str.length;
  for (; i < len; i++) {
    let char = str.charCodeAt(i);
    hash = char + (hash << 6) + (hash << 16) - hash;
  }
  return hash;
}

// console.log(hash1('Hello world'));
console.log(hash2('Hello world'));
console.log(sdbmCode('Hello world'));


function perfTest(n, str) {
  let start = Date.now();
  for (let i = 0; i < n; i++) {
    hash1(str);
  }
  console.log('hash1 finished, time used: ' + (Date.now() - start) / 1000 + 's');
  start = Date.now();
  for (let i = 0; i < n; i++) {
    hash2(str);
  }
  console.log('hash2 finished, time used: ' + (Date.now() - start) / 1000 + 's');
}

perfTest(1000000, 'Hello World!');
