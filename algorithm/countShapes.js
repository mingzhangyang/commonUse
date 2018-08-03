// Installed npm packages: jquery underscore request express
// jade shelljs passport http sys lodash async mocha chai sinon
// sinon-chai moment connect validator restify ejs ws co when
// helmet wrench brain mustache should backbone forever debug jsdom


let m = [
  [0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0, 0],
  [0, 0, 1, 1, 1, 0],
  [0, 1, 1, 1, 0, 0],
  [0, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0]
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
  
}


function searchRow() {
  // search a row to get all connected points
  // return the array of the coordinates of the connected points
}

function getDown(row) {
  // select a point under && connected to the current row
}






