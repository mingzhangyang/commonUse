/**
 * Created by yangm11 on 9/4/2018.
 */
'use strict';

/**
 * Do performance testing
 * @param func: function, the function needed to be tested
 * @param args:, array, arguments required by the function
 * @param iterN: int, the number of loops to run
 * @returns {{total: number, mean: number}}
 */
function performanceTest(func, args, iterN=1000) {
  let start = Date.now();
  for (let i = 0; i < iterN; i++) {
    func(...args);
  }
  let all = Date.now() - start;
  console.log(`Run ${iterN} times, total time ${all} ms, mean time ${all / iterN} ms per loop.`);
  return {
    total: all,
    mean: all / iterN
  };
}

if (typeof module !== 'undefined' && module.parent) {
  // Node environment, required as module
  module.exports = performanceTest;
} else if (typeof window === 'object') {
  // Browser environment
} else {
  // Node environment, run directly
  // test code go here
}