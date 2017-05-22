/**
 * Created by yangm11 on 5/22/2017.
 */
'use strict';

// S: starting position
// M: medium position
// T: target position

function hanoi(n, S, M, T) {
  if (n === 1) {
    return [S + ' -> ' + T];
  }
  // if (n === 2) {
  //   return [
  //     S + '->' + M,
  //     S + '->' + T,
  //     M + '->' + T
  //   ];
  // }
  return hanoi(n - 1, S, T, M)
    .concat(S + ' -> ' + T)
    .concat(hanoi(n - 1, M, S, T));
}

console.log(hanoi(10, 'A', 'B', 'C').length);