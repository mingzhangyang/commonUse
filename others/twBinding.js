/**
 * Created by mingzhang on 6/8/17.
 */
'use strict';

// obj = {object: x, property: y}
function twBind(objA, objB) {
  let tmp = objB.object[objB.propertyName];

  Object.defineProperty(objA.object, objA.propertyName, {
    get: function () {
      return tmp;
    },
    set: function (v) {
      tmp = v;
    }
  });

  Object.defineProperty(objB.object, objB.propertyName, {
    get: function () {
      return tmp;
    },
    set: function (v) {
      tmp = v;
    }
  });

  return tmp;
}

var a = {x: 3}, b = {y: 5};
console.log(a.x, b.y);

let t = twBind({
  object: a,
  propertyName: 'x'
}, {
  object: b,
  propertyName: 'y'
});

console.log(a.x, b.y, t);

a.x = 10;
console.log(a.x, b.y, t);

b.y = 8;
console.log(a.x, b.y, t);