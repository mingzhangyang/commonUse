/**
 * Created by yangm11 on 7/7/2017.
 */
'use strict';

function replaceOnIndex(str, index, char) {
  return str.slice(0, index) + char + str.slice(index + 1);
}

if (typeof module !== 'undefined' && module.parent) {
  module.exports = replaceOnIndex;
}  else if (typeof window !== 'undefined') {
  console.log('replaceOnIndex exported as a global variable');
} else {
  // testing code goes here
  let s = 'abcdefggfedcba';

  console.log(replaceOnIndex(s, 5, '   '));

}