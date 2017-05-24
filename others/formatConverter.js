/**
 * Created by yangm11 on 5/9/2017.
 */
'use strict';

const fs = require('fs');

function json2csv(path) {
  let data = fs.readFileSync(path, 'utf8');
  data = JSON.parse(data);
  // console.log(data);

  let headers = Object.keys(data[0]);
  let str = headers.join(',') + '\n';

  for (let i = 0; i < data.length; i++) {
    let ta = [];
    for (let j = 0; j < headers.length; j++) {
      ta.push(data[i][headers[j]]);
    }
    str += ta.join(',') + '\n';
  }

  console.log(str);

  let newPath = path.slice(0, -5) + '.csv';
  fs.createWriteStream(newPath, {
    flag: 'w',
    defaultEncoding: 'utf8'
  }).end(str);
}

// json2csv('NM_008355.json');
// json2csv('051017.json');

function csv2json(path) {
  let str = fs.readFileSync(path, 'utf8');

  function str2Array(str) {
    let arr = str.split('\n');
    let result = [];
    let headers = arr[0].split(',').map(d => d.trim());
    let len = headers.length;
    let line;

    for (let i = 1; i < arr.length - 1; i++) {
      line = arr[i].split(',').map(d => d.trim());
      let obj = {};
      for (let j = 0; j < len; j++) {
        obj[headers[j]] = line[j];
      }
      result.push(obj);
    }
    // console.log(result.length);
    return result;
  }

  let dest = fs.createWriteStream(path.slice(0, -3) + 'JSON', {
    flag: 'w',
    defaultEncoding: 'utf8'
  });

  dest.end(JSON.stringify(str2Array(str)));

}

if (typeof module !== 'undefined' && module.parent) {
  module.exports = {
    json2csv: json2csv,
    csv2json: csv2json
  }
}

