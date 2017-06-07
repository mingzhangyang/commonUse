/**
 * Created by yangm11 on 6/7/2017.
 */
'use strict';

function bar (x) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      console.log(x);
      resolve();
    }, 2000);
  });
}

async function df() {
  for (let i = 0; i < 5; i++) {
    await bar(i);
  }
}

if (typeof window !== 'undefined') {
  df();
}