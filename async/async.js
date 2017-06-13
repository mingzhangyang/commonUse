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
  // test cases go here
}