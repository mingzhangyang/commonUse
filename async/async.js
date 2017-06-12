/**
 * Created by yangm11 on 6/12/2017.
 */
'use strict';

function async(listOfTask, worker, cb) {
  // worker should return a promise
  let ps = [];
  for (let i = 0; i < listOfTask.length; i++) {
    ps.push(worker(listOfTask[i]));
  }
  Promise.all(ps).then(v => {
    cb(v);
  });
}


if (typeof module !== 'undefined' && module.parent) {
  module.exports = async;
} else if (typeof window !== 'undefined') {
  console.log('async is running in the browser');
} else {

  const fs = require('fs');

  function wc(dir) {
    let list = fs.readdirSync(dir);
    console.log(list);
    function read(fileName) {
      return new Promise(function (resolve, reject) {
        fileName = dir + '/' + fileName;
        fs.readFile(fileName, 'utf8', function (err, data) {
          if (err) {
            throw err;
          }
          resolve({
            fileName: fileName,
            'wc -l': data.split('\n').length,
            'wc -w': data.replace(/\s/g, '').length,
            'wc -c': data.length
          });
        });
      });
    }
    async(list, read, function (v) {
      // console.log(v);
      console.log('Toatal:', v.reduce(function (acc, cur) {
        return {
          lines: acc.lines + cur['wc -l'],
          words: acc.words + cur['wc -w'],
          all: acc.all + cur['wc -c']
        };
      }, {
        lines: 0,
        words: 0,
        all: 0
      }));
    })
  }

  wc('../playground');

}