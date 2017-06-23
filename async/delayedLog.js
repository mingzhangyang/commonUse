/**
 * Created by yangm11 on 6/23/2017.
 */
'use strict';

function dLog(list, time) {
  function log() {
    setTimeout(function () {
      console.log(list[i++]);
      if (i < list.length) {
        log();
      }
    }, time);
  }

  let i = 0;

  log();
}

dLog(['JavaScript', 'Python', 'Node.js', 'AngularJS', 'C', 'R', 'C++'], 2000);