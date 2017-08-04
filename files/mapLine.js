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
  'capitalize': str => {
    if (str.length > 0) {
      return str[0].toUpperCase() + str.slice(1, -1);
    }
    return '';
  }
};

/**
 * The function to do map function on each line in a file.
 * @param path: the path to the file to be processed
 * @param func: either a string or a custom function
 *    if func is a string, pre-defined function will be invoked if the string matches one of the names of pre-defined functions;
 *    if func is a function, make sure the return value is the expected string that will be written to the output. The parameters that the function received will be the line (string) and its line number (int) which starts from 0. If you want to omit a line, please make the return value of that line be 'null'.
 */
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

  rl.lineIndex = 0;
  rl.outputLineCount = 0;
  rl.on('line', line => {
    let toWrite;
    try {
      toWrite = func(line, rl.lineIndex++);
    } catch (err) {
      throw 'Failed to process @ ' + rl.lineIndex + ': ' + line;
    }
    if (toWrite !== null) {
      output.write(toWrite + os.EOL);
      rl.outputLineCount++;
    }
  });

  rl.on('close', () => {
    console.log('Done!');
    console.log('Total number of lines processed: ' + (rl.lineIndex + 1));
    console.log('Total number of lines output: ' + (rl.outputLineCount + 1));
  })
}

if (typeof module !== 'undefined' && module.parent) {
  module.exports = mapLine;
} else {
  let file = process.argv[2];
  let opt = process.argv[3];
  mapLine(file, opt);
}