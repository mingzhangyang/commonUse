/**
 * Created by mingzhang on 1/2/18.
 */
'use strict';

function bindElementToSubject(elem, attr, event, subject, prop) {
  if (typeof subject !== 'object') {
    let symb = Symbol('__bindingData');
    window[symb] = {};
    window[symb]._boundData = elem[attr];

    Object.defineProperty(window[symb], '_boundData', {
      configurable: false,
      enumerable: true,
      get: () => elem[attr],
      set: v => {
        // console.log('set to ' + v);
      }
    });

    elem.addEventListener(event, () => {
      window[symb]._boundData = elem[attr];
    });
    // console.log(res);
    // console.log(window[symb]);
    console.log('The subject is not an object!');
    console.log('An object is created to store the bound data.');
    console.log('The object returned.');
    return window[symb];
    // return symb;
  }
  subject[prop] = elem[attr];
  elem.addEventListener(event, () => {
    subject[prop] = elem[attr];
  });
  return subject;
}

function twoWayBinding(elem, attr, event, subject, prop) {
  if (typeof subject !== 'object') {
    let symb = Symbol('__bindingData');
    window[symb] = {};
    Object.defineProperty(window[symb], '_boundData', {
      get: () => elem[attr],
      set: v => {
        elem[attr] = v;
      }
    });
    console.log('The subject is not an object!');
    console.log('An object is created to store the bound data.');
    console.log('The object returned.');
    return window[symb];
  }

  elem.addEventListener(event, () => {
    subject[prop] = elem[attr];
  });
  return subject;
}

if (typeof module !== 'undefined' && module.parent) {
  //module.exports =
} else {

} 