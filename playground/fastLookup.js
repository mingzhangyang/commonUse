/**
 * Created by yangm11 on 11/10/2017.
 */
'use strict';

function randomString() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

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
    let s = randomString();
    if (m.has(s)) {
      m.get(s).push(randomString());
    } else {
      m.set(s, [randomString()]);
    }
  }
  console.log('Map set, ' + (Date.now() - start) + ' ms');

  start = Date.now();
  for (let i = 0; i < n; i++) {
    let s = randomString();
    if (o[s]) {
      o[s].push(randomString());
    } else {
      o[s] = [randomString()];
    }
  }
  console.log('Object set, ' + (Date.now() - start) + ' ms');

  start = Date.now();
  for (let i = 0; i < n; i++) {
    let s = randomString();
    if (i === 0) {
      a.push([s, randomString()]);
    } else {
      for (let j = 0; j < a.length; j++) {
        if (a[j][0] === s) {
          a[j].push(randomString());
          break;
        }
        if (j === a.length - 1) {
          a.push([s, randomString()]);
        }
      }
    }

  }
  console.log('Array set, ' + (Date.now() - start) + ' ms');

  let s = randomString();

  start = Date.now();
  for (let [k, v] of m.keys()) {
    if (v.includes(s)) {
      console.log('Found in map');
    }
  }
  console.log('Iterate the map in ' + (Date.now() - start) + ' ms');

  start = Date.now();
  let props = Object.keys(o);
  for (let i = 0; i < props.length; i++) {
    if (o[props[i]].includes(s)) {
      console.log('Found in object');
    }
  }
  console.log('Iterate the object in ' + (Date.now() - start) + ' ms');

  start = Date.now();
  for (let i = 0; i < a.length; i++) {
    if (a[i].includes(s)) {
      console.log('Found in array');
    }
  }
  console.log('Iterate the array in ' + (Date.now() - start) + ' ms');
  console.log(a.slice(0, 10));
  console.log(a.length);
}

if (typeof module !== 'undefined' && module.parent) {

} else {
  // test code go here
  run(3000000);
}