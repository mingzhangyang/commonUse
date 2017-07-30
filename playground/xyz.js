'use strict';

const readline = require('readline');
const fs = require('fs');
const Transform = require('stream').Transform;

const PI = Math.PI;
const sin = Math.sin;
const cos = Math.cos;
const moonRadius = 1737.4;

function filter(arr, cb) {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    let cur = cb(arr[i]);
    if (cur) {
      res.push(cur);
    }
  }
  return res;
}

function transform(line) {
  // console.log(line);
  // let arr = line.split(' ').filter(d => d.trim());
  let arr = filter(line.split(' '), d => d.trim());
  // console.log(arr);
  let elevation = +arr[0],
    longtitude = +arr[1],
    latitude = +arr[2];
  // console.log(elevation, longtitude, latitude);

  let phi = longtitude < 0 ? (360 + longtitude) / 180 * PI : longtitude / 180 * PI;
  let theta = (90 - latitude) / 180 * PI;
  let r = elevation / 2 + moonRadius;

  let x = r * sin(theta) * cos(phi);
  let y = r * sin(theta) * sin(phi);
  let z = r * cos(theta);

  return line.trim() + '        ' + x + ',' + y + ',' + z + '\n';
}

function read(path) {
  let out = fs.createWriteStream(path + '.result', 'binary');
  let rl = readline.createInterface({
    input: fs.createReadStream(path, 'binary')
  });
  let start = Date.now();
  let countLine = 0;
  let tmp = new Array(50);
  let i = 0;
  rl.on('line', (line) => {
    countLine += 1;
    tmp[i++] = transform(line);
    if (tmp[49]) {
      out.write(tmp.join(''));
      tmp.fill(undefined);
      i = 0;
    }
  }).on('close', () => {
    let lastLine = tmp.join('');
    out.end(lastLine, () => {
      console.log('Done!');
      console.log('Time used: ' + (Date.now() - start) / 1000 + 's');
      console.log('Total number of lines: ' + countLine);
    });
  })
}


// read('/home/mingzhang/Data/test.txt');



/* ##########################################################################

 Below is another method to do the job.

 ##########################################################################*/


class YZ extends Transform {
  constructor(opts) {
    super(opts);
    this.tmp = '';
    this.countLine = 0;
  }

  _transform(chunk, enc, next) {
    let str = this.tmp + chunk.toString();
    let i = str.lastIndexOf('\n');
    this.tmp = str.slice(i + 1);
    let arr = str.slice(0, i).split('\n');
    this.countLine += arr.length;
    for (let i = 0; i < arr.length; i++) {
      this.push(transform(arr[i]));
    }
    next();
  }

  _flush(cb) {
    if (this.tmp) {
      this.push(transform(this.tmp).slice(0, -1));
      this.countLine += 1;
    }
    console.log('Transformation done.');
    console.log('Total number of lines transformed: ' + this.countLine);
  }
}

function _read(path) {
  let input = fs.createReadStream(path, 'binary');
  let output = fs.createWriteStream(path + '.result', 'binary');
  let yz = new YZ();
  input.pipe(yz).pipe(output);
}



// _read('/home/mingzhang/Data/test.txt');


/***************************************************************************

 main()

 **************************************************************************/


let file = process.argv[2];
read(file);
// _read(file);