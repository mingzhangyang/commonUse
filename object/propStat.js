/**
 * Created by mingzhang on 9/8/18.
 */
'use strict';

/**
 * statistics of the properties of an nested object.
 * This is required to create table headers with multiple rows
 * @param obj: object
 */
function propStat(obj) {
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError('an object expected');
  }
  // root stat object
  let root = {
    prop: '',
    depth: 0,
    children: [],
    maxDepth: 0
  };
  // below is the worker for recursion
  function worker(obj, parentStatObj) {
    let keys = Object.keys(obj);
    for (let key of keys) {
      let value = obj[key];
      if (typeof value === 'object' && value !== null) {
        let o = {
          prop: key,
          depth: parentStatObj.depth + 1,
          children: []
        };
        parentStatObj.children.push(o);
        worker(value, o);
      } else {
        parentStatObj.children.push({
          prop: key,
          depth: parentStatObj.depth + 1
        });
        if (parentStatObj.depth + 1 > root.maxDepth) {
          root.maxDepth = parentStatObj.depth + 1;
        }
      }
    }
  }
  worker(obj, root);

  // recursive function to count colSpan
  function count(obj) {
    if (!obj.children) {
      obj.colSpan = 1;
      obj.rowSpan = root.maxDepth - obj.depth + 1;
    } else {
      obj.colSpan = 0;
      for (let child of obj.children) {
        obj.colSpan += count(child);
      }
    }
    return obj.colSpan;
  }
  count(root);
  return root;
}

function extractValues(obj, propStatObject) {
  let res = [];
  function extract(obj, pso) {
    if (!pso.children) {
      res.push(obj);
    } else {
      for (let p of pso.children) {
        extract(obj[p.prop], p);
      }
    }
  }
  extract(obj, propStatObject);
  return res;
}

if (typeof module !== 'undefined') {
  if (module.parent) {
    // serve as module
  } else {
    // run as executable

    let obj = {
      A: {
        a1: 12,
        a2: 20
      },
      B: {
        b1: 100,
        b2: 200,
        b3: 300
      },
      C: {
        c1: true,
        c2: false
      }
    };

    // let obj = {x: 3, y: 4, z: 5};

    let o = propStat(obj);
    console.dir(o, {colors: true, depth: null});
    console.log(extractValues(obj, o));
  }
} else if (typeof window !== 'undefined') {
// run in browser

}