/**
 * Created by yangm11 on 5/9/2017.
 */
'use strict';

const fs = require('fs');

function json2csv(path) {
  let data = fs.readFileSync(path, 'utf8');
  data = JSON.parse(data);
  // console.log(data);
  if (!Array.isArray(data)) {
    console.log('Not a JSON array...');
    return;
  }

  let headers = Object.keys(data[0]);
  let str = headers.join(',');

  for (let i = 0; i < data.length; i++) {
    let ta = [];
    for (let j = 0; j < headers.length; j++) {
      ta.push(data[i][headers[j]]);
    }
    str += ('\n' + ta.join(','));
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
    arr = arr.filter(d => d.length > 0 && d[0] !== '#');
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

// the parameter data below is an object
// e.g. {newCol1: [...], newCol2: func}
function addCols(path, data) {
  let csv = fs.readFileSync(path, 'utf8');
  csv = csv.split('\n').map(line => line.trim());
  csv = csv.filter(line => line[0] !== '#');

  let colNames = Object.keys(data);

  for (let i = 0; i < colNames.length; i++) {
    let c = colNames[i];
    if (typeof data[c] === 'function') {
      csv = csv.map((line, idx) => idx === 0
        ? line + ',' + c
        : line + ',' + data[c](line, idx)
      );
    } else if (Array.isArray(data[c])) {
      csv = csv.map((line, idx) => idx === 0
        ? line + ',' + c
        : line + ',' + data[c][idx - 1]
      );
    } else {
      throw new Error('either a function or array should be provided');
    }
  }
  fs.createWriteStream(path, {
    flag: 'w',
    defaultEncoding: 'utf8'
  }).end(csv.join('\n'));
}

// data should be an object with the format below
// {name: colName, index: idx, values: valueArray}
function insertCol(path, data) {
  let csv = fs.readFileSync(path, 'utf8');
  csv = csv.split('\n').map(line => line.trim());
  csv = csv.filter(line => line[0] !== '#');

  csv = csv.map(function (line, idx) {
    line = line.split(',');
    if (idx === 0) {
      line.splice(data.index, 0, data.name);
    } else {
      line.splice(data.index, 0, data.values[idx - 1]);
    }
    return line.join(',');
  });

  fs.createWriteStream(path, {
    flag: 'w',
    defaultEncoding: 'utf8'
  }).end(csv.join('\n'));
}

function selectCols(path, colNames) {
  let csv = fs.readFileSync(path, 'utf8');
  csv = csv.split('\n').map(line => line.trim());
  csv = csv.filter(line => line[0] !== '#');

  let headers = csv[0].split(',');
  let selected = colNames.map(d => headers.findIndex(h => h === d));

  csv = csv.map(function (line) {
    line = line.split(',');
    line = line.filter((d, i) => selected.includes(i));
    return line.join(',');
  });

  let newPath = path.slice(0, -4) + '_modified.csv';

  fs.createWriteStream(newPath, {
    flag: 'w',
    defaultEncoding: 'utf8'
  }).end(csv.join('\n'));
}

function removeCols(path, colNames) {
  let csv = fs.readFileSync(path, 'utf8');
  csv = csv.split('\n').map(line => line.trim());
  csv = csv.filter(line => line[0] !== '#');

  let headers = csv[0].split(',');
  let selected = colNames.map(d => headers.findIndex(h => h === d));

  csv = csv.map(function (line) {
    line = line.split(',');
    line = line.filter((d, i) => !(selected.includes(i)));
    return line.join(',');
  });

  let newPath = path.slice(0, -4) + '_modified.csv';

  fs.createWriteStream(newPath, {
    flag: 'w',
    defaultEncoding: 'utf8'
  }).end(csv.join('\n'));
}

// below is a limited merge function, which only works for column that contains only unique values
function merge(arrOfcsv, colName) {
  arrOfcsv = arrOfcsv.map(function (csv) {
    csv = csv.split('\n').map(row => row.trim());
    csv = csv.filter(row => row[0] !== '#');
    return csv.map(row => row.split(','));
  });
  // console.log(arrOfcsv);

  let res = [];
  let len = arrOfcsv[0].length;
  let headers = [];
  for (let i = 0; i < arrOfcsv.length; i++) {
    headers.push(arrOfcsv[i][0].join());
  }
  res.push(headers.join());

  let indices = arrOfcsv.map(csv => csv[0].findIndex(h => h === colName));
  // console.log(indices);

  for (let j = 1; j < len; j++) {
    let row = [arrOfcsv[0][j]];
    let v = (arrOfcsv[0][j])[indices[0]];
    for (let k = 1; k < indices.length; k++) {
      let line = arrOfcsv[k].find(d => d[indices[k]] === v);
      if (line) {
        row.push(line);
      } else {
        let t = '';
        for (let i = 0; i < arrOfcsv[k][0].length - 1; i++) {
          t += ',';
        }
        row.push(t);
      }
    }
    res.push(row.join());
  }
  // console.log(res);
  return res.join('\n');
}

function mergeCSV(arrOfpaths, colName) {
  let list = [];
  for (let i = 0; i < arrOfpaths.length; i++) {
    if (arguments[i]) {
      let csv = fs.readFileSync(arrOfpaths[i], 'utf8');
      list.push(csv);
    }
  }

  fs.createWriteStream('merged.csv', {
    flag: 'w',
    defaultEncoding: 'utf8'
  }).end(merge(list, colName));
}


if (typeof module !== 'undefined' && module.parent) {
  module.exports = {
    json2csv: json2csv,
    csv2json: csv2json,
    addCols: addCols,
    insertCol: insertCol,
    selectCols: selectCols,
    removeCols: removeCols,
    mergeCSV: mergeCSV
  }
} else {
  // console.log(fs.readdirSync('../statistics'));
  // json2csv('../../r_playground/mice_pheno.JSON');
  // addCols('test.csv', {
  //   sum: function (line, idx) {
  //     let s = 0;
  //     line = line.split(',').map(d => +(d.trim()));
  //     for (let i = 0; i < line.length; i++) {
  //       s += line[i];
  //     }
  //     return s;
  //   },
  //   id: function(line, idx) {
  //     return idx;
  //   }
  // });
  // insertCol('test.csv', {
  //   name: 'M',
  //   index: 3,
  //   values: ['a', 'b', 'c']
  // });
  // selectCols('test.csv', ['A', 'B', 'E', 'F']);
  // removeCols('test.csv', ['F']);
  mergeCSV(['test.csv', 'test_modified.csv'], 'A');
}

