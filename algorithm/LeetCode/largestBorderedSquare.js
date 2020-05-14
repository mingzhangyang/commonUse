/**
 * @param {number[][]} grid
 * @return {number}
 */
var largest1BorderedSquare = function(grid) {
  let maxShift = function (o) {
    let x = o[0];
    let y = o[1];

    let m = grid.length - x;
    let n = grid[0].length - y;

    let i = 1;
    for (i; i < m; i++) {
      if (grid[x + i][y] === 0) {
        break;
      }
    }
    i = i - 1;

    let j = 1;
    for (j; j < n; j++) {
      if (grid[x][y + j] === 0) {
        break;
      }
    }
    j = j - 1;

    // console.log(`i = ${i}, j = ${j}`);
    return i < j ? i : j;
  };

  let check = function(o, n) {
    let [x, y] = o;
    for (let i = 1; i <= n; i++) {
      // if (grid[x + i][y] === 0) {
      //   return false;
      // }
      // if (grid[x][y + i] === 0) {
      //   return false;
      // }
      if (grid[x + n][y + i] === 0) {
        return false;
      }
      if (grid[x + i][y + n] === 0) {
        return false;
      }
    }
    return true;
  };

  let findMax = function(o, limit) {
    let d = maxShift(o);
    while (d > limit) {
      if (check(o, d)) {
        return d;
      } else {
        d--;
      }
    }
    return d;
  };

  let rec = {
    maxShift: -1
  };
  for (let i = 0; i < grid.length; i++) {
    let row = grid[i];
    for (let j = 0; j < row.length; j++) {
      if (row[j] === 1) {
        let s = maxShift([i, j]);
        if (s > rec.maxShift) {
          let n = findMax([i, j], rec.maxShift);
          if (n > rec.maxShift) {
            rec.vertex = [i, j];
            rec.maxShift = n;
          }
        }
      }
    }
  }

  console.log(rec);
  return Math.pow(rec.maxShift + 1, 2);
};

let grid = [[1,1,0,0]];
console.log(largest1BorderedSquare(grid));