/**
 * Created by mingzhang on 7/23/17.
 */
'use strict';

const Transform = require('stream').Transform;
const fs = require('fs');
const Readable = require('stream').Readable;
const Writable = require('stream').Writable;

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

  // let rs = new Readable();
  // for (let i = 0; i < 10; i++) {
  //   rs.push('# ' + i + '\n');
  // }
  // rs.push(null);
  // // rs.pipe(process.stdout);
  //
  // let n = 0;
  // rs.on('data', (chunk) => {
  //   let s;
  //   if (chunk) {
  //     s = chunk.toString();
  //     console.log('n = ' + (n++) + ', ' + s);
  //   } else {
  //     console.log('empty or end?');
  //   }
  // }).on('end', () => {
  //   console.log('n = ' + n + ', the end.');
  // });

  // let rs = new Readable();
  // rs.rems = '';
  //
  // rs._read = () => {
  //   let s;
  //   sourceStream.on('readable', () => {
  //     s = sourceStream.read();
  //     if (s !== null) {
  //       let arr = s.split('\n');
  //       for (let i = 0; i < arr.length; i++) {
  //         rs.push(arr[i] + '\n');
  //       }
  //       // rs.push(s.toString());
  //     }
  //   }).on('end', () => {
  //     rs.push(null);
  //   });
  // };
  //
  //
  // let count = 0;
  //
  // rs.on('data', (chunk) => {
  //   console.log('Read, ' + (++count) + ' times ...');
  // });


  // let rs = new Readable();
  //
  // let i = 0;
  //
  // rs._read = () => {
  //   if (i < 10) {
  //     let n = i++;
  //     rs.push(n + '');
  //     rs.push(n * n + '');
  //   } else {
  //     rs.push(null);
  //   }
  // };
  //
  // let count = 0;
  //
  // rs.on('data', (chunk) => {
  //   let s = chunk;
  //   console.log('Read ' + (++count) + ' times, the content is ' + s);
  // }).on('end', () => {
  //   console.log('Done');
  // });

  // let ws = fs.createWriteStream('test.txt', 'utf8');
  //
  // process.stdin.pipe(ws);

  let ws = new Writable();
  ws._write = (chunk, enc, cb) => {
    console.log(chunk.toString()[0]);
    cb();
  }

  process.stdin.pipe(ws);
}