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

// below is redundant, why not use synchronous function instead?
function asyncInOrder(listOfTask, worker, cb) {
  // worker should be a wrapper function which is able to add custom
  // callback to asynchronous function wrapped in
  function rc() {
    if (_idx > listOfTask.length - 1) {
      return;
    }
    let p = new Promise(function (resolve, reject) {
      worker(listOfTask[_idx++], function () {
        resolve();
      });
    });
    p.then(function () {
      if (_idx === listOfTask.length) {
        cb();
        return;
      }
      rc();
    })
  }

  let _idx = 0;

  rc();
}


if (typeof module !== 'undefined' && module.parent) {
  module.exports = async;
} else if (typeof window !== 'undefined') {
  console.log('async is running in the browser');
} else {
  // test cases go here

  let list = ['JavaScript', 'Python', 'C', 'C++'];
  let worker = function (task, func) {
    setTimeout(function () {
      console.log(task);
      func();
    }, 2000);
  };

  asyncInOrder(list, worker, function () {
    console.log('Done');
  });


}