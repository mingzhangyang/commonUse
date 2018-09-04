/**
 * Created by yangm11 on 5/9/2017.
 */
'use strict';

const fs = require('fs');
// const path = require('path');
const readline = require('readline');
const randStr = require('../string/randStr');
const splitLine = require('../string/splitLine');

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

function readCSV(path) {
  let str = fs.readFileSync(path, 'utf8');
  let arr = str.split('\n');
  arr = filter(arr, d => d[0] !== '#');

  let headers = map(arr[0].split(','), d => d.trim());
  let res = new Array(arr.length - 1);

  for (let i = 1; i < arr.length; i++) {
    let obj = {};
    let line = map(arr[i].split(','), d => d.trim());
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = line[j];
    }
    res[i - 1] = obj;
  }

  return res;
}


function _csv2json(path) {
  let p = guessType(path);

  p.then(types => {
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
            return d.replace(/ /g, '_');
          });
          // console.log(headers);
        } else {
          // let cur = map(line.split(','), d => d.trim());
          let cur = splitLine(line);
          let obj = join2json(headers, cur, types);
          tmp.push(obj);
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
      });
    });
  });

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

function join2json (keys, values, types) {

  function typeConverter(str, type) {
    switch (type) {
      case 'string':
        return str;
      case 'number':
        return Number(str);
      case 'boolean':
        if (['true', 'True', 'TRUE'].includes(str)) {
          return true;
        } else if (['false', 'False', 'FALSE'].includes(str)) {
          return false;
        }
        break;
      case 'null':
        return null;
      default:
        throw 'unrecognized type';
    }
  }

  let obj = {};

  for (let i = 0; i < keys.length; i++) {
    if (values[i] !== '') {
      obj[keys[i]] = typeConverter(values[i], types[i]);
    }
  }

  return obj;
}

function typeParser(str) {
  if (['true', 'True', 'TRUE'].includes(str)) {
    return 'boolean';
  }

  if (['false', 'False', 'FALSE'].includes(str)) {
    return 'boolean';
  }

  if (['null', 'Null', 'NULL'].includes(str)) {
    return 'null';
  }

  if (!(Number.isNaN(Number(str)))) {
    return 'number';
  }

  return 'string';
}

function guessType(csvPath) {
  return new Promise((resolve, reject) => {
    let headers = '';
    let types = new Array(50);
    for (let i = 0; i < 50; i++) {
      types[i] = [];
    }

    let currentLine = '';

    let rl = readline.createInterface({
      input: fs.createReadStream(csvPath, 'utf8')
    });

    rl.on('line', function (line) {
      if (line.length && line[0] !== '#') {
        if (!headers) {
          // headers = map(line.split(','), d => d.trim());
          headers = splitLine(line);
        } else {
          currentLine = splitLine(line);
          for (let i = 0; i < currentLine.length; i++) {
            let type = typeParser(currentLine[i]);
            if (types[i].indexOf(type) === -1) {
              types[i].push(type);
            }
          }
        }
      }
    }).on('close', function () {
      types = types.slice(0, headers.length);
      // console.log(types);
      types = map(types, arr => {
        if (arr.includes('string')) {
          return 'string';
        }
        if (arr.length > 1) {
          return 'string';
        }
        return arr[0];
      });

      resolve(types);

    });

  });
}


function sampleGenerator(opts) {
  opts = opts || {};
  let rows = opts.rows || 100;
  let headers = opts.headers || [
      {
        name: 'id',
        type: 'int'
      }, {
        name: 'value',
        type: 'float'
      }, {
        name: 'class',
        domain: ['A', 'B', 'C', 'D', 'E', 'F', 'G']
      },{
        name: 'positive',
        type: 'bool'
      }, {
        name: 'date',
        type: 'date'
      }, {
        name: 'comment',
        type: 'string'
      }
    ];
  let comments = opts.comments || '';
  let fileName = opts.fileName || 'sample_csv.csv';

  let csv = fs.createWriteStream(fileName, {
    flag: 'w',
    defaultEncoding: 'utf8'
  });

  if (comments) {
    csv.write('#' + comments + '\n');
  }

  csv.write(map(headers, d => d.name).join(',') + '\n');

  let tmp = [];
  for (let i = 0; i < rows; i++) {
    let line = '';
    for (let j = 0; j < headers.length; j++) {
      if (headers[j].domain && Array.isArray(headers[j].domain)) {
        line += headers[j].domain[Math.floor(headers[j].domain.length * Math.random())] + ',';
      } else {
        switch (headers[j].type) {
          case 'int':
            if (headers[j].domain) {

            } else {
              line += Math.floor(rows * Math.random()) + ',';
            }
            break;
          case 'float':
            line += Math.random() + ',';
            break;
          case 'string':
            line += randStr() + ',';
            break;
          case 'bool':
            line += (Math.random() > 0.5) + ',';
            break;
          case 'date':
            let t = Date.now();
            let r = Math.random();
            t = r > 0.5 ? t + 8640000000 * r : t - 8640000000 * r;
            line += (new Date(t)).toDateString() + ',';
            break;
          default:
            throw 'type not recognized'
        }
      }
    }
    tmp.push(line.slice(0, -1) + '\n');
    if (tmp.length === 100001) {
      let to_write = tmp.slice(0, -1);
      csv.write(to_write.join(''));
      tmp = tmp.slice(-1);
    }
  }

  // remove the '\n' following the last row
  csv.end(tmp.join('').slice(0, -1), () => {
    console.log('File is created successfully');
  });
}

/**
 * Given a csv file, transpose it, which works like transposing a matrix.
 * This only works for small csv files that row number is lager than column
 * number.
 * @param file: string, path to the csv file
 */
function transpose(file) {
  let mat = [];
  let rl = readline.createInterface({
    input: fs.createReadStream(file)
  });
  rl.on('line', line => {
    mat.push(splitLine(line, ','));
  }).on('close', () => {
    let target = fs.createWriteStream(file.slice(0, -4) + '.transposed.csv');
    let tmp = new Array(mat[0].length);
    for (let i = 0, cols = mat[0].length; i < cols; i++) {
      tmp[i] = new Array(mat.length);
      for (let j = 0, rows = mat.length; j < rows; j++) {
        tmp[i][j] = mat[j][i];
      }
    }
    target.end(tmp.map(a => a.join(',')).join('\n'), () => {
      console.log('finished.');
    });
  }).on('error', err => {
    console.error(err);
    process.exit(1);
  });
}


if (typeof module !== 'undefined' && module.parent) {
  module.exports = {
    readCSV: readCSV,
    json2csv: json2csv,
    csv2json: _csv2json,
    createSampleCSV: sampleGenerator,
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
  // mergeCSV(['test.csv', 'test_modified.csv'], 'A');

  // _csv2json('/home/mingzhang/Data/GSM2354327/HT_MG-430_PM.na35.annot.csv');
  // console.log(readCSV('test.csv'));
  // sampleGenerator({
  //   rows: 200000
  // });

  // _csv2json('sample_csv.csv');

  // let file = process.argv[2];
  // if (file && file.slice(-4) === '.csv') {
  //   _csv2json(file);
  // }

  let args = process.argv;

  if (args.length < 4) {
    console.error('Invalid command. Correct usage: node csvKit.js [cmd]' +
        ' path_to_CSV_file');
    process.exit(1);
  }
  if (args[3].slice(-4).toLowerCase() !== '.csv') {
    console.error('Invalid file. CSV file expected.');
    process.exit(1);
  }
  switch (args[2]) {
    case 'transpose':
      transpose(args[3]);
      break;
    case 'createSample':
      sampleGenerator({
        fileName: args[3]
      });
      break;
    case 'tojson':
      break;
    case 'merge':
      break;
    case 'read':
      break;
    default:
      console.error('Command not recognized.');
  }
}

