/**
 * Created by mingzhang on 7/23/17.
 */
'use strict';

const Transform = require('stream').Transform;
const fs = require('fs');
const Readable = require('stream').Readable;

class MT extends Transform {
  constructor(options) {
    super(options);
  }
  _transform(data, enc, callback) { // data is Buffer
    // console.log(data);
    let DATA = data.toString().toUpperCase();
    // console.log(DATA);
    this.push(DATA);
    callback();
  }
}

function transformer(opts, mapFunc, medium) {
  class MT extends Transform {
    constructor(options) {
      super(options);
    }
    _transform(chunk, enc, callback) { // data is Buffer
      let s = chunk.toString();
      this.push(mapFunc(s, medium));
      callback();
    }
  }
  return new MT(opts);
}

if (typeof module !== 'undefined' && module.parent) {
  module.exports = MT;
} else {
  let source = process.argv[2];

  let m = new MT();
  m.setEncoding('utf8');

  // process.stdin.pipe(m).pipe(process.stdout);

  let sourceStream = fs.createReadStream(source, 'utf8');
  // sourceStream.pipe(m).pipe(fs.createWriteStream('testingStream.csv', 'utf8'));
  

}