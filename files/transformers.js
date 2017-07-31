/**
 * Created by mingzhang on 7/23/17.
 */
'use strict';

const Transform = require('stream').Transform;
const fs = require('fs');
const Readable = require('stream').Readable;
const Writable = require('stream').Writable;
const splitLine = require('../string/splitLine');
const bin = require('../string/bin');

class CSVIIJSON extends Transform {
  constructor(opts) {
    super(opts);
    this.START  = '[\n';
    this.rems = '';
    this.END = ']';
    this.headers = '';
  }

  _transform(data, enc, next) {
    let str = data.toString();
    str = this.rems + str;
    let i = str.length - 1;
    let flag = 0;
    for (; i > 0; i--) {
      if (str[i] === '\n') {
        flag += 1;
      }
      if (flag === 2) {
        break;
      }
    }
    this.rems = str.slice(i + 1);
    let arr = str.slice(0, i).split('\n').map(d => d.trim());
    if (!this.headers) {
      this.headers = splitLine(arr[0]);
      this.push(this.START);
      for (let j = 1; j < arr.length; j++) {
        let obj = {};
        let cur = splitLine(arr[j]);
        for (let k = 0; k < cur.length; k++) {
          obj[this.headers[k]] = cur[k];
        }
        this.push(JSON.stringify(obj) + ',\n');
      }
    } else {
      let toBeWritten = '';
      for (let j = 0; j < arr.length; j++) {
        let obj = {};
        let cur = splitLine(arr[j]);
        for (let k = 0; k < cur.length; k++) {
          obj[this.headers[k]] = cur[k];
        }
        // this.push(JSON.stringify(obj) + ',\n');
        toBeWritten += JSON.stringify(obj) + ',\n';
      }
      let fragments = bin(toBeWritten, 15888);
      for (let h = 0; h < fragments.length; h++) {
        this.push(fragments[h]);
      }
    }
    next(); // This is indispensable, otherwise will only invoke _transform only once.
  }

  _flush(cb) {
    let obj = {};
    let arr = splitLine(this.rems);
    for (let k = 0; k < this.headers.length; k++) {
      obj[this.headers[k]] = arr[k];
    }
    this.push(JSON.stringify(obj) + '\n');
    this.push(this.END);
    console.log('\nTransformation done!');
    cb();
  }
}


class TOUPPERCASE extends Transform {
  constructor(opts) {
    super(opts);
  }
  _transform(chunk, enc, next) {
    this.push(chunk.toString().toUpperCase());
    next();
  }
  _flush(cb) {
    console.log('\nTransformation done!');
    cb();
  }
}

class CSVIITSV extends Transform {
  constructor(opts) {
    super(opts);
    this.rems = '';
  }
  _transform(chunk, enc, next) {
    let str = this.rems + chunk.toString();
    // let i = str.length - 1;
    // let n = 0;
    // for (; i > 0; i--) {
    //   if (str[i] === '\n') {
    //     n += 1;
    //   }
    //   if (n === 2) {
    //     break;
    //   }
    // }
    // this.rems = str.slice(i + 1);
    // let arr = (str.slice(0, i)).split('\n');

    let arr = str.split('\n');
    this.rems = arr[arr.length - 1];
    arr = arr.slice(0, -1);

    this.push(map(arr, line => splitLine(line).join('\t')).join('\n'));
    next();
  }
  _flush(cb) {
    let arr = splitLine(this.rems);
    this.push(map(arr, line => splitLine(line).join('\t')).join('\n'));
    console.log('\nTransformation done!');
    cb();
  }
}

class LINEBYLINE extends Transform {
  constructor(opts) {
    super(opts);
    this.rems = '';
    this.count = 0;
  }
  _transform(chunk, enc, next) {
    let str = this.rems + chunk.toString();

    // let i = str.length - 1;
    // let n = 0;
    // for (; i > 0; i--) {
    //   if (str[i] === '\n') {
    //     n += 1;
    //   }
    //   if (n === 2) {
    //     break;
    //   }
    // }
    //
    // this.rems = str.slice(i + 1);
    //
    // let arr = str.slice(0, i).split('\n');

    let arr = str.split('\n');
    this.rems = arr[arr.length - 1];

    for (let j = 0; j < arr.length - 1; j++) {
      this.push('# ' + (++this.count) + ': ' + arr[j] + '\n');
    }
    next(); // THIS IS IMPORTANT!!!
  }
  _flush(cb) {
    // let arr = this.rems.split('\n');
    // this.push('# ' + (++this.count) + ': ' + arr[0] + '\n');
    // if (arr[1] === '') {
    //   this.push('# ' + (++this.count) + ': ' + '\n');
    // } else {
    //   this.push('# ' + (++this.count) + ': ' + arr[1] + '\n');
    // }

    this.push('# ' + (++this.count) + ': ' + this.rems);

    console.log('\nTransformation done!');
    cb();
  }
}


function map(arr, func) {
  let res = new Array(arr.length);
  for (let i = 0; i < arr.length; i++) {
    res[i] = func(arr[i], i);
  }
  return res;
}

if (typeof module !== 'undefined' && module.parent) {
  module.exports = {
    csv2json: CSVIIJSON,
    uppercase: TOUPPERCASE,
    csv2tsv: CSVIITSV,
    lineByLine: LINEBYLINE
  };
} else {


  let mt = new CSVIIJSON();
  let source = process.argv[2];
  let sourceStream = fs.createReadStream(source, 'utf8');
  let outputStream = fs.createWriteStream('mt.json', 'utf8');
  sourceStream.pipe(mt).pipe(outputStream);

  // let mt = new TOUPPERCASE();
  // process.stdin.pipe(mt).pipe(process.stdout);

  // let mt = new CSVIITSV();
  // sourceStream.pipe(mt).pipe(outputStream);
  // process.stdin.pipe(mt).pipe(process.stdout);

  // let mt = new LINEBYLINE();
  // sourceStream.pipe(mt).pipe(process.stdout);

  // console.log(splitLine('a,b, c, d, "e, f, g", OK').join('\t'));

  // let m = new MT();
  // m.setEncoding('utf8');

  // process.stdin.pipe(m).pipe(process.stdout);


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

  // let ws = new Writable();
  // ws._write = (chunk, enc, cb) => {
  //   console.log(chunk.toString()[0]);
  //   cb();
  // };
  //
  // process.stdin.pipe(ws);
}