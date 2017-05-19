/**
 * Created by yangm11 on 5/19/2017.
 */
'use strict';

function testLeapYear(n) {
  if (n % 400 === 0) {
    return true;
  }
  return (n % 4 === 0 && n % 100 !== 0);
}

// console.log(testLeapYear(1996));

for (let i = 1980; i < 2080; i++) {
  if (testLeapYear(i)) {
    console.log(i);
  }
}