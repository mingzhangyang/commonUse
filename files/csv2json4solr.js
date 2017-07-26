/**
 * Created by yangm11 on 7/20/2017.
 */
'use strict';

const fs = require('fs');
const readline = require('readline');
const splitLine = require('../string/splitLine');

function csv2json(path, cb, n) {
  let start = Date.now();

  let p = new Promise((resolve, reject) => {
    let types = {};
    let headers = '';
    let rl = readline.createInterface({
      input: fs.createReadStream(path, 'utf8')
    });

    let tmp = [];
    let count = 0;

    let num = n ? n : 51;

    let json = fs.createWriteStream(path + '.json', {
      flag: 'w+',
      defaultEncoding: 'utf8'
    });
    json.write('[\n');

    rl.on('line', function (line) {
      if (line.length && line[0] !== '#') {
        if (!headers) {
          headers = splitLine(line);
          headers = map(headers, d => {
            return d.replace(/ /g, '_'); // this is to make the name can be used in solr functions like "unique(name_a)"
          });
          // console.log(headers);

          for (let i = 0; i < headers.length; i++) {
            types[headers[i]] = [];
          }

        } else {
          let cur = splitLine(line);

          if (cur.length === headers.length) {
            let obj = {};
            for (let i = 0; i < headers.length; i++) {
              if (cur[i]) {
                obj[headers[i]] = cur[i];
                let type = guessType(cur[i]);
                if (type && types[headers[i]].indexOf(type) === -1) {
                  types[headers[i]].push(type);
                }
              }
            }
            tmp.push(obj);

          } else {
            console.log('Possibly wrong @ line: ', cur[i]);
          }

          if (tmp.length === num) {
            let to_write = tmp.slice(0, -1);
            json.write(JSON.stringify(to_write).slice(1, -1) + ',\n');

            count += 50;

            tmp = tmp.slice(-1);
            // this is to make sure that an nonempty array is always pass to the callback function on 'close' event, which will remove the comma following the last object
          }

        }
      }
    }).on('close', function () {
      json.write(JSON.stringify(tmp).slice(1, -1));

      count += tmp.length;

      json.end('\n]', 'utf8', () => {
        console.log('File is created successfully');
        let timeUsed = (Date.now() - start) / 1000;
        console.log('Time used: ' + timeUsed);

        for (let i = 0; i < headers.length; i++) {
          let t = types[headers[i]];
          if (t.length === 1) {
            types[headers[i]] = t[0];
          }
          if (t.length === 2) {
            if (t.includes('int') && t.includes('float')) {
              types[headers[i]] = 'float';
            }
            if (t.includes('string')) {
              types[headers[i]] = 'string';
            }
          }
          if (t.length > 2) {
            types[headers[i]] = 'string';
          }
        }
        console.log('Number of lines: ' + count);
        console.log('Types: ');
        console.dir(types, {
          depth: null,
          colors: true
        });

        resolve(types);
      });
    });
  });
  if (cb && typeof cb === 'function') {
    return p.then(types => {
      cb(types);
    })
  }
  return p;
}

let noType = ['null', 'Null', 'NULL', 'N/A', ''];
let boolType = ['true', 'True', 'TRUE', 'false', 'False', 'FALSE'];
let dateRe = new RegExp(/^(\d{4}\-\d\d\-\d\d([tT][\d:\.]*)?)([zZ]|([+\-])(\d\d):?(\d\d))?$/);

function guessType(str) {
  if (noType.includes(str)) {
    return '';
  }
  if (!isNaN(Number(str))) {
    let num = +str;
    if (num % 1 === 0) {
      return 'int';
    } else {
      return 'float';
    }
  }
  if (boolType.includes(str)) {
    return 'boolean';
  }
  if (dateRe.test(str)) {
    return 'date';
  }
  return 'string';
}

function map(arr, f) {
  let res = new Array(arr.length);
  for (let i = 0; i < res.length; i++) {
    res[i] = f(arr[i], i);
  }
  return res;
}

function filter(arr, f) {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    if (f(arr[i], i)) {
      res.push(arr[i]);
    }
  }
  return res;
}


function _csv2json(path, cb) {
  let start = Date.now();
  let p = new Promise((resolve, reject) => {
    let input = fs.createReadStream(path, 'utf8');
    let output = fs.createWriteStream(path + '.json', {
      flag: 'w',
      defaultEncoding: 'utf8'
    });
    output.write('[\n');

    let headers = '';
    let rems = '';
    let types = {};

    input.on('data', (str) => {
      str = rems + str;

      let i = str.length - 1;
      let n = 0;
      for (i; i > 0; i--) {
        if (str[i] === '\n') {
          n += 1;
        }
        if (n === 2) {
          break;
        }
      }
      let s = str.slice(0, i);
      rems = str.slice(i + 1);
      let arr = s.split('\n');

      arr = filter(arr, d => d.length && d[0] !== '#');
      arr = map(arr, d => d.trim());

      if (!headers) {

        headers = splitLine(arr[0]);
        headers = map(headers, d => d.replace(/ /g, '_'));

        for (let i = 0; i < headers.length; i++) {
          types[headers[i]] = [];
        }

        parseLines(arr.slice(1), headers, output, types, ',\n');

      } else {
        parseLines(arr, headers, output, types, ',\n');
      }
    }).on('end', () => {
      rems = rems.split('\n').filter(d => d.length);
      rems = map(rems, d => d.trim());
      parseLines(rems, headers, output, types, '\n');

      output.end(']', 'utf8', () => {
        console.log('File is created successfully');
        let timeUsed = (Date.now() - start) / 1000;
        console.log('Time used: ' + timeUsed);

        for (let i = 0; i < headers.length; i++) {
          let t = types[headers[i]];
          if (t.length === 1) {
            types[headers[i]] = t[0];
          }
          if (t.length === 2) {
            if (t.includes('int') && t.includes('float')) {
              types[headers[i]] = 'float';
            }
            if (t.includes('string')) {
              types[headers[i]] = 'string';
            }
          }
          if (t.length > 2) {
            types[headers[i]] = 'string';
          }
        }

        console.log('Types: ');
        console.dir(types, {
          depth: null,
          colors: true
        });

        resolve(types);
      });

    });

  });


  if (cb && typeof cb === 'function') {
    return p.then(types => {
      cb(types);
    })
  }
  return p;

}

function parseLines(arr, colNames, writeStream, typesObject, suffix) {
  // console.log('Processing: ' + arr.length);
  for (let i = 0; i < arr.length; i++) {

    let line = splitLine(arr[i]);

    if (line.length === colNames.length) {
      let obj = {};
      for (let i = 0; i < colNames.length; i++) {
        if (line[i]) {
          obj[colNames[i]] = line[i];
          let type = guessType(line[i]);
          if (type && typesObject[colNames[i]].indexOf(type) === -1) {
            typesObject[colNames[i]].push(type);
          }
        }
      }

      writeStream.write(JSON.stringify(obj) + suffix, 'utf8');

    } else {
      console.error('Error found @ line: ' + arr[i]);
      console.log('Length of headers: ' + colNames.length);
      console.log('Length of current line: ' + line.length);
    }
  }
}


if (typeof module !== 'undefined' && module.parent) {
  module.exports = csv2json;
} else {
  let csv = process.argv[2];
  let n = process.argv[3];
  if (csv) {
    if (csv.slice(-4) !== '.csv') {
      console.log('The input file is not ended with ".csv" !');
    } else {
      // csv2json(csv, false, +n);
      _csv2json(csv, false);
    }
  }

  // console.log(guessType('FALSE'));
  // console.log(guessType('2000'));
  // console.log(guessType('CANTIL 100'));
  // console.log(guessType('5% DEXTROS'));
  // console.log(guessType('10% ALCOHO'));
  // console.log(guessType('09 ALBUTER'));


  // console.log(splitLine('a, b, c,'));
  // console.log('a, b, c,'.split(','));

}
