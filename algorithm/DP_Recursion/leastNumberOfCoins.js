/**
 * Created by yangm11 on 12/2/2016.
 */

// function minOfArray(arr) {
//   arr.sort(function (a, b) {
//     return a - b;
//   });
//   return arr[0];
// }

// Given a group of natural numbers,
// For example, a group of coins with specific values
// Ask what is the least number of coins needed to meet a given number.
// coins can be used as many times as wanted.

// function findLeastRequired(coins) {
//   coins.sort(function (a, b) {
//     return a - b;
//   });
//
//   var repo = {};
//
//   for (var i = 0; i < coins.length; i++) {
//     repo[coins[i]] = 1;
//   }
//
//   function dp(amount) {
//     if (repo[amount]) {
//       return repo[amount];
//     }
//     if (amount < coins[0]) {
//       return false;
//     }
//     var candidates = [];
//     for (var j = 0; j < coins.length; j++) {
//       if (dp(amount - coins[j])) { // amount >= coins[j] &&
//         candidates.push(dp(amount - coins[j]) + 1);
//       }
//     }
//     if (candidates.length === 0) {
//       repo[amount] = false;
//     } else {
//       repo[amount] = minOfArray(candidates);
//     }
//
//     return repo[amount];
//   }
//
//   return dp;
// }

// Below is version 2. The improvement is to skip the additional function
// minOfArray and add the sequence of coins chose to meet the requirement.

function findLeastRequired(coins) {
  coins.sort(function (a, b) {
    return a - b;
  });

  var repo = {};

  for (var i = 0; i < coins.length; i++) {
    repo[coins[i]] = [1, [coins[i]]];
  }

  function dp(amount) {
    if (repo[amount]) {
      return repo[amount];
    }
    if (amount < coins[0]) {
      return false;
    }
    var min = 1000;// arbitrary number, can be modified to meet new requirement
    var seqs;
    for (var j = 0; j < coins.length; j++) {
      if (dp(amount - coins[j]) && dp(amount - coins[j])[0] < min ) {
        min = dp(amount - coins[j])[0];
        seqs = dp(amount - coins[j])[1].concat(coins[j]);
      }
    }
    if (min === 1000) {
      repo[amount] = false;
    } else {
      repo[amount] = [min + 1, seqs];
    }

    return repo[amount];
  }

  return dp;
}


var test = findLeastRequired([3, 5, 7]);

for (var k = 0; k < 100; k++) {
  console.log('To reach ' + k, 'the least number of coins needed is ', test(k));
}