/**
 * Created by yangm11 on 11/10/2017.
 */
'use strict';

function randomString() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  for( var i=0; i < 5; i++ )
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

let m = new Map();
let o = {};
let a = [];

function run(n) {
  let start = Date.now();
  for (let i = 0; i < n; i++) {
    m.set(randomString(), randomString());
  }
  console.log('Map set, ' + (Date.now() - start) + ' ms');

  start = Date.now();
  for (let i = 0; i < n; i++) {
    o[randomString()] = randomString();
  }
  console.log('Object set, ' + (Date.now() - start) + ' ms');

  start = Date.now();
  for (let i = 0; i < n; i++) {
    a.push([randomString(), randomString()]);
  }
  console.log('Array set, ' + (Date.now() - start) + ' ms');

  let s = randomString();

  start = Date.now();
  for (let key of m) {
    if (m.get(key) === s) {
      console.log('Found in map');
    }
  }
  console.log('Iterate the map in ' + (Date.now() - start) + ' ms');

  start = Date.now();
  let props = Object.keys(o);
  for (let i = 0; i < props.length; i++) {
    if (o[props[i]] === s) {
      console.log('Found in object');
    }
  }
  console.log('Iterate the object in ' + (Date.now() - start) + ' ms');

  start = Date.now();
  for (let i = 0; i < a.length; i++) {
    if (a[i][1] === s) {
      console.log('Found in array');
    }
  }
  console.log('Iterate the array in ' + (Date.now() - start) + ' ms');
}

if (typeof module !== 'undefined' && module.parent) {

} else {
  // test code go here
  run(3000000);
}