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
  // iterate the array
  let uid = 0;
  for (let i = 0; i < allOnesArray.length; i++) {
    let key = allOnesArray[i];
    let r, c;
    [r, c] = key.split(',').map(d => +d);
    let up, left, upright;
    if (r > 0 && m[r-1][c] === 1) {
      up = (r - 1) + ',' + c;
      let id = allOnesMap.get(up);
      if (id !== 0) {
        allOnesMap.set(key, id);
      }
      continue;
    }
    if (c > 0 && m[r][c-1] === 1) {
      left = r + ',' + (c - 1);
      let id = allOnesMap.get(left);
      if (id !== 0) {
        allOnesMap.set(key, id);
        continue;
      }
    }
    if (r > 0 && c+1 < m[r-1].length && m[r][c+1] === 1 && m[r-1][c+1] === 1) {
      upright = (r - 1) + ',' + (c + 1);
      let id = allOnesMap.get(upright);
      if (id !== 0) {
        allOnesMap.set(key, id);
        continue;
      }
    }
    allOnesMap.set(key, ++uid);
  }
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

// console.log(detectShapes2(mat));