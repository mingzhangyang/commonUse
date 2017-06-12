/**
 * Created by yangm11 on 6/12/2017.
 */
'use strict';

function foo(i) {
  return new Promise(function (res, rej) {
    setTimeout(function () {
      console.log(i);
      res(i * i);
    }, i * 1000);
  });
}

function g(n) {
  console.log(n);
  let a = [];
  for (let i = 0; i < n; i++) {
    a.push(foo(i));
  }
  Promise.all(a).then(v => {console.log(v);});
  console.log('function g returned');
}

// g(5);

function bar() {
  let cmdObj = {
    current: 0,
    state: 'pending',
    value: undefined,
    next: true
  };

  function baz(i) {
    if (i < 5) {
      new Promise(function (resolve, reject) {
        setTimeout(function () {
          console.log(cmdObj);
          console.log(i);
          cmdObj.current = i  + 1;
          cmdObj.state = 'resolved';
          cmdObj.value = i * i;
          if (cmdObj.current < 5) {
            cmdObj.next = true;
          }
          if (cmdObj.next) {
            resolve(i + 1);
          } else {
            resolve('Done');
          }
        }, 2000);
      }).then(baz(i + 1));
    } else {
      return undefined;
    }
  }

  baz(0);
}

bar();