/**
 * Created by yangm11 on 9/7/2017.
 */
'use strict';

/*
 *  In the codes below, range takes the format [a, b].
 *  Range starts from 1 not 0.
 *  And range is inclusive, which means range[start] and range[end] are both
  *  includes.
 */

const fs = require('fs');
const Transform = require('stream').Transform;

// The code below is for replacing a substring through transform stream
class RepTran extends Transform {
  constructor(range, str, opts) {
    super(opts);
    if (!Array.isArray(range) || range.length > 2) {
      throw 'The range is expected to be an array of two elements...';
    }
    range = range.slice();
    if (range[1] === null) {
      range[1] = +Infinity;
    }
    if (range[0] === 0) {
      range[0] = 1;
    }
    this.range = range;
    this.target = str;
    this._index = 0;
    this.span = range[1] - range[0] + 1;
    this._inRange = '';
  }
  _transform(data, enc, next) {
    data = data.toString();
    let notInRange = '';
    for (let i = 0; i < data.length; i++) {
      this._index += 1;
      if (this._index > (this.range[0] - 1) && this._index < (this.range[1] + 1)) {
        if (notInRange) {
          this.push(notInRange);
          notInRange = '';
        }
        this._inRange += data[i];
      } else {
        notInRange += data[i];
      }
    }
    if (this._inRange.length === this.span) {
      this.push(this.target);
    }
    if (notInRange) {
      this.push(notInRange);
    }
    next();
  }

  _flush(next) {
    // console.log(this._inRange, this._inRange.length);
    // console.log(this.range);
    // console.log(this.span);
    if (this._inRange.length < this.span) {
      this.push(this.target);
    }
    next();
  }
}

class FileStream {
  constructor(path, enc) {
    if (fs.existsSync(path)) {
      this.sourceFilePath = path;
      this.enc = enc || 'binary';
    } else {
      console.log(path);
      throw 'Path not exist ...';
    }
  }

  locate(range, enc) {
    if (!Array.isArray(range) || range.length > 2) {
      throw 'The range is expected to be an array of two elements...';
    }
    range = range.slice();
    if (range[1] === null) {
      range[1] = +Infinity;
    }
    if (range[0] === 0) {
      range[0] = 1;
    }
    enc = this.enc || 'binary';
    let path = this.sourceFilePath;
    return new Promise((resolve, reject) => {
      let rs = fs.createReadStream(path, enc);
      let count = 0;
      let res = '';
      rs.on('data', chunk => {
        for (let i = 0; i < chunk.length; i++) {
          count += 1;
          if (count > (range[0] - 1) && count < (range[1] + 1)) {
            res += chunk[i];
          }
        }
      }).on('end', () => {
        resolve(res);
      }).on('error', err => {
        reject(err);
      });
    });
  }

  replace(range, str, enc) {
    enc = this.enc || 'binary';
    let rs = fs.createReadStream(this.sourceFilePath, enc);
    let ws = fs.createWriteStream(this.sourceFilePath + '.out', enc);
    let cs = new RepTran(range, str);
    rs.pipe(cs).pipe(ws);
    ws.on('finish', () => {
      console.log('Done');
    })
  }

  toJSON() {
    let s = fs.readFileSync(this.sourceFilePath);
    try {
      s = JSON.parse(s);
      console.log('Success!');
      return s;
    } catch (err) {
      throw err;
    }
  }

}

if (typeof module !== 'undefined' && module.parent) {
  module.exports = FileStream;
} else {
  // test code go here
  // Command line usage: node fileStream.js filePath locate|replace 1-20 'xyz'
  let path = process.argv[2];
  let func = process.argv[3];
  let range = process.argv[4] ? process.argv[4].split('-').map(d => +d) : [1, 10];
  let str = process.argv[5] ? process.argv[5] : null;
  let f = new FileStream(path);

  switch (func) {
    case 'locate':
      f.locate(range).then(v => {
        console.log('File:\t\t' + path);
        console.log('Range:\t\t' + range[0] + ' - ' + range[1]);
        console.log('Content:\t' + v);
      });
      break;
    case 'replace':
      f.replace(range, str);
      break;
    case 'toJSON':
      f.toJSON();
      break;
    default:
      console.log('Correct Usage:');
      console.log('e.g. ' + 'node FileStream.js filePath locate|replace 1-20 \'xyz\'');
  }
}