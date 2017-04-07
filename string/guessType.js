/**
 * Created by yangm11 on 4/7/2017.
 */
'use strict';

// guess the type of a given data
function guessTypeOf(str) {

  var re = new RegExp(/^(\d{4}\-\d\d\-\d\d([tT][\d:\.]*)?)([zZ]|([+\-])(\d\d):?(\d\d))?$/);

  function isInt(n){
    return Number(n) === n && n % 1 === 0;
  }

  function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
  }

  function isDate(d) {
    return re.test(d);
  }

  if (isInt(str)) {
    return 'int';
  } else if (isFloat(str)) {
    return 'float'
  } else if (typeof str === 'boolean') {
    return 'boolean';
  } else if (isDate(str)) {
    return 'date';
  } else if (str === null) {
    return null;
  } else {
    return 'string';
  }
}