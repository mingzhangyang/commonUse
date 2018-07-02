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

async function df(n) {
  for (let i = 0; i < n; i++) {
    await bar(i);
  }
}

if (typeof window !== 'undefined') {
  df(5);
}
df(10);