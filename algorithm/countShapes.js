// export {detectShapes2};
'use strict';

let mat = [
  [0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 0],
  [0, 0, 1, 0, 1, 0],
  [0, 1, 1, 1, 0, 0],
  [0, 1, 1, 0, 1, 1],
  [0, 0, 0, 0, 1, 1]
];
// console.log(m);
function findStart(m) {
  let r = 0;
  while (r < m.length) {
    let c = 0;
    while (c < m[r].length) {
//       console.log(r, c, m[r][c]);
      if (m[r][c] === 1) {
        return [r, c];
      }
      c++;
    }
    r++;
  }
}
// Put it simple, all shape are totally filled
function findBorder(m) {
  let res = {
    border: [],
    inner: []
  };
  // ...
}

function findAllOnes(m) {
  let res = [];
  for (let i = 0; i < m.length; i++) {
    for (let j = 0; j < m[i].length; j++) {
      if (m[i][j] > 0) {
        res.push(i + ',' + j);
      }
    }
  }
  return res;
}

function isRecorded(shapes, coor) {
  let keys = Object.keys(shapes);
  for (let key of keys) {
    let arr = shapes[key];
    if (arr.indexOf(coor) !== -1) {
      return key;
    }
  }
  return false;
}

function findAllConnected(mat, r, c) {
  // search to left, right and down only
}

function detectShapes(m) {
  let allOnes = findAllOnes(m);
  let shapes = {};
  for (let i = 0; i < allOnes.length; i++) {
    let coor = allOnes[i];
    if (isRecorded(shapes, coor)) {
      continue;
    }
    // If not recorded, then add to shapes
    let r, c;
    [r, c] = coor.split(',').map(d => +d);
    shapes[coor] = findAllConnected(m, r, c);
    shapes[coor].push(coor);
  }
  return shapes;
}

function detectShapes2(m) {
  let allOnesMap = new Map();
  let allOnesArray = [];
  for (let i = 0; i < m.length; i++) {
    for (let j = 0; j < m[i].length; j++) {
      if (m[i][j] > 0) {
        let key = i+','+j;
        allOnesMap.set(key, 0);
        allOnesArray.push(key);
      }
    }
  }
  // console.log(allOnesMap);
  // iterate the array
  let uid = 0;
  for (let i = 0; i < allOnesArray.length; i++) {
    let key = allOnesArray[i];
    let r, c;
    [r, c] = key.split(',').map(d => +d);
    // console.log(r, c);
    // let up = (r-1) + ',' + c;
    // let left = r + ',' + (c-1);
    // console.log(key, up, left);
    let id1 = allOnesMap.get((r-1) + ',' + c);
    let id2 = allOnesMap.get(r + ',' + (c-1));

    if ((!id1) && (!id2)) {
      // id1 is undefined or 0; id2 is undefined or 0
      allOnesMap.set(key, ++uid);
      continue;
    }

    if (!id1 && id2) {
      // id1 is undefined or 0; id2 is a non-zero integer
      allOnesMap.set(key, id2);
      continue;
    }

    if (id1 && !id2) {
      // id1 is a non-zero integer; id2 is undefined or 0
      allOnesMap.set(key, id1);
      continue;
    }

    if (id1 && id2 && id1 === id2) {
      // id1 and id2 are non-zero integer
      allOnesMap.set(key, id1);
    } else {
      allOnesMap.set(key, id1);
      // change the keys in the map with value of id2 to value of id1
      for (let j = 0; j < i; j++) {
        if (allOnesMap.get(allOnesArray[j]) === id2) {
          allOnesMap.set(allOnesArray[j], id1);
        }
      }
    }
  }
  // console.log(allOnesMap);
  let shapes = {};
  for (let [k, v] of allOnesMap.entries()) {
    if (!shapes[v]) {
      shapes[v] = [k];
    } else {
      shapes[v].push(k);
    }
  }
  return shapes;
}

console.log(detectShapes2(mat));