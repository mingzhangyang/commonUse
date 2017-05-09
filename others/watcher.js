/**
 * Created by yangm11 on 5/9/2017.
 */
'use strict';

function watcher(check, limit, time, cb) {
  let count = 0;
  function run(check, limit, time, cb) {
    limit = limit || 5;
    if (check()) {
      cb();
    } else {
      count += 1;
      console.log(count);
      console.log('checked, waiting one more time');
      if (count < limit) {
        setTimeout(function () {
          run(check, limit, time, cb);
        }, time);
      } else {
        console.log('limit reached, not finished...');
      }
    }
  }

  run(check, limit, time, cb);
}

let start = Date.now();
watcher(function () {
  return Date.now() - start > 3000;
}, 10, 500, function () {
  console.log('Yes!');
});
