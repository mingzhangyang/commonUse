/**
 * Created by yangm11 on 7/20/2017.
 */
'use strict';

const fs = require('fs');
const readline = require('readline');
const splitLine = require('../string/splitLine');

function csv2json(path, cb) {
  let p = new Promise((resolve, reject) => {
    let types = {};
    let headers = '';
    let rl = readline.createInterface({
      input: fs.createReadStream(path, 'utf8')
    });

    let tmp = [];
    let num = 100001;
    let json = fs.createWriteStream(path + '.json', {
      flag: 'w+',
      defaultEncoding: 'utf8'
    });
    json.write('[');

    rl.on('line', function (line) {
      if (line.length && line[0] !== '#') {
        if (!headers) {
          // headers = map(line.split(','), d => d.trim());
          headers = splitLine(line);
          headers = map(headers, d => {
            return d.replace(/ /g, '_'); // this is to make the name can be used in solr functions like "unique(name_a)"
          });
          // console.log(headers);

          for (let i = 0; i < headers.length; i++) {
            types[headers[i]] = [];
          }

        } else {
          // let cur = map(line.split(','), d => d.trim());
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
            json.write(JSON.stringify(to_write).slice(1, -1) + ',');
            tmp = tmp.slice(-1);
            // this is to make sure that an nonempty array is always pass to the callback function on 'close' event, which will remove the comma following the last object
          }
        }
      }
    }).on('close', function () {
      json.write(JSON.stringify(tmp).slice(1, -1));
      json.end(']', 'utf8', () => {
        console.log('File is created successfully');

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

if (typeof module !== 'undefined' && module.parent) {
  module.exports = csv2json;
} else {
  let csv = process.argv[2];
  if (csv) {
    if (csv.slice(-4) !== '.csv') {
      console.log('The input file is not ended with ".csv" !');
    } else {
      csv2json(csv);
    }
  }

  // console.log(guessType('FALSE'));
  // console.log(guessType('2000'));
  // console.log(guessType('CANTIL 100'));
  // console.log(guessType('5% DEXTROS'));
  // console.log(guessType('10% ALCOHO'));
  // console.log(guessType('09 ALBUTER'));
}