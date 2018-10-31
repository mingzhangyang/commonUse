/**
 * Created by yangm11 on 10/31/2018.
 */
'use strict';

function parseArguments(args) {
  // console.log(args);
  let flags = args
      .map((d, i) => {
        return {
          flag: d,
          index: i,
          true: d[0] === '-' || d.slice(0, 2) === '--'
        };
      })
      .filter(d => d.true);
  // console.log(flags);
  return flags.map(d => {
    return {
      flag: d.flag,
      value: args[d.index+1] ? (args[d.index+1][0] === '-' || args[d.index+1].slice(0, 2) === '--' ? '' : args[d.index+1]) : ''
    }
  });
}

if (typeof module !== 'undefined') {
  // Node environment, 
  if (module.parent) {
    // required as module
    module.exports = parseArguments;
  } else {
    // run as executable
    console.log(parseArguments(process.argv));

  }
} else if (typeof window === 'object') {
  // Browser environment
} 