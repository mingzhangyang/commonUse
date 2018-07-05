/**
 * Created by yangm11 on 7/5/2018.
 */
'use strict';

function getPromise() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      console.log('A promise getting fulfilled');
      res(1);
    }, 2000);
  });
}

async function unblockingWhile() {
  while (true) {
    await getPromise();
  }
}

if (typeof module !== 'undefined' && module.parent) {

} else {
  // test code go here

  unblockingWhile();
  console.log('This should be logged first');
  console.log('Start generating endless promises');
  setTimeout(() => {
    console.log('This line should be logged after 10 seconds');
  }, 10000);
  setTimeout(() => {
    console.log('This line should be logged after 20 seconds');
  }, 20000);
}