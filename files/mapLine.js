/**
 * Created by yangm11 on 8/4/2017.
 */
'use strict';

const fs = require('fs');
const readline = require('readline');
const os = require('os');

let mapOptions = {
  'upperCase': str => str.toUpperCase(),
  'lowerCase': str => str.toLowerCase(),
  'capitalize': str => str[0].toUpperCase() + str.slice(1, -1)
};

function mapLine(path, func) {
  if (typeof func === 'string') {
    func = mapOptions[func];
    if (typeof func !== 'function') {
      throw 'map option not identified ...';
    }
  }
  let rl = readline.createInterface({
    input: fs.createReadStream(path, 'utf8')
  });
  let output = fs.createWriteStream(path + '_mapped', 'utf8');

  let i = 0;
  rl.on('line', line => {
    output.write(func(line, i++) + os.EOL);
  });

  rl.on('close', () => {
    console.log('Done!');
  })
}

if (typeof module !== 'undefined' && module.parent) {
  module.exports = mapLine;
} else {
  let file = process.argv[2];
  let opt = process.argv[3];
  mapLine(file, opt);
}