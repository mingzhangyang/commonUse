/**
 * Created by mingzhang on 7/12/17.
 */
'use strict';

const kb = 1024;
const mb = 1024 * 1024;
const gb = 1024 * 1024 * 1024;


function convert(bytes) {
  if (+bytes !== parseInt(bytes)) {
    throw 'invalid parameter';
  }
  let b = parseInt(bytes);
  if (b < kb) {
    return b + ' bytes';
  }
  if (b < mb) {
    return (b / kb).toFixed(1) + ' K';
  }
  if (b < gb) {
    return (b / mb).toFixed(1) + ' M';
  }
  return (b / gb).toFixed(1) + ' G';
}

console.log(convert(45));
console.log(convert(2645));
console.log(convert(42645));
console.log(convert(688995027));
console.log(convert(307738545));