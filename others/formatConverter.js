/**
 * Created by yangm11 on 5/9/2017.
 */
'use strict';

const fs = require('fs');

function json2csv(path) {
  let data = fs.readFileSync(path, 'utf8');
  data = JSON.parse(data);
  console.log(data);

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

function str2Arr(s) {
  s = s.split('\n');
  s = s.map((d) => d.trim());
  s = s.filter((d) => d.length);
  return s;
}

if (module.parent) {
  module.exports = {
    str2Arr: str2Arr,
    json2csv: json2csv
  }
}