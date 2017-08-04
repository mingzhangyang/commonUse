/**
 * Created by mingzhang on 6/8/17.
 */
'use strict';

/**
 * @param objA should be {object: *, propertyName: *}
 * @param objB should be {object: *, propertyName: *}
 * @returns undefined
 */
function twBind(objA, objB) {
  // let tmp = objB.object[objB.propertyName];
  Object.defineProperty(objA.object, '_bound', {
    configurable: true,
    enumerable: false,
    value: {},
    writable: false
  });

  objA.object._bound.target = objB;
  objA.object._bound.value = objB.object[[objB.propertyName]];

  Object.defineProperty(objA.object, objA.propertyName, {
    get: function () {
      return this._bound.value;
    },
    set: function (v) {
      this._bound.value = v;
    }
  });

  Object.defineProperty(objB.object, objB.propertyName, {
    get: function () {
      return objA.object._bound.value;
    },
    set: function (v) {
      objA.object._bound.value = v;
    }
  });
}

/**
 * @param objA should be {object: *, propertyName: *}
 * @param objB should be {object: *, propertyName: *}
 */
function owBind(objA, objB) {
  Object.defineProperty(objB.object, '_value', {
    value: objB.object[objB.propertyName],
    writable: true
  });
  Object.defineProperty(objB.object, objB.propertyName, {
    get: function () {
      return this._value;
    },
    set: function (v) {
      this._value = v;
    }
  });

  Object.defineProperty(objA.object, objA.propertyName, {
    get: function () {
      return objB.object._value;
    }
  })
}


function main() {
  var a = {x: 3}, b = {y: 5};
  console.log(a.x, b.y);

  twBind({
    object: a,
    propertyName: 'x'
  }, {
    object: b,
    propertyName: 'y'
  });

  console.log(a.x, b.y);

  a.x = 10;
  console.log(a.x, b.y);

  b.y = 8;
  console.log(a.x, b.y);

  console.log(a._bound);

  let c = {z: 0};
  owBind({
    object: a,
    propertyName: 'x'
  }, {
    object: c,
    propertyName: 'z'
  });

  console.log(a.x, b.y, c.z);

  c.z = Math.E;
  console.log(a.x, b.y, c.z);

  a.x = 9;
  console.log(a.x, b.y, c.z);
}

if (typeof module !== 'undefined' && module.parent) {
  module.exports = {
    owBind: owBind,
    twBind: twBind
  }
} else if (typeof window !== 'undefined') {
  console.log('binding.js imported!');
} else {
  main();
}