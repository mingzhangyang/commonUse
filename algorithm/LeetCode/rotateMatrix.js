/**
 * Created by yangm11 on 9/6/2018.
 */

/**
 Given input matrix =
 [
 [ 5, 1, 9,11],
 [ 2, 4, 8,10],
 [13, 3, 6, 7],
 [15,14,12,16]
 ],
 rotate the input matrix in-place such that it becomes:
 [
 [15,13, 2, 5],
 [14, 3, 4, 1],
 [12, 6, 8, 9],
 [16, 7,10,11]
 ]
 **/

'use strict';

// Method #1

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function(matrix) {
  let tmp = [];
  let n = matrix.length;
  for (let i = 0; i < n; i++) {
    for (let k = 0; k < n; k++) {
      tmp.push(matrix[i][k]);
    }
  }
  let idx = 0;
  for (let p = n-1; p > -1; p--) {
    for (let q = 0; q < n; q++) {
      matrix[q][p] = tmp[idx];
      idx++;
    }
  }
};

// Method #2

function rotateB(mat) {
  let r = mat.length - 1;
  let lt = [0, 0];
  let rt = [0, r];
  let rb = [r, r];
  let lb = [r, 0];
  while (rt[1] >= lt[1]) {
    let d = rt[1] - lt[1];
    for (let i = 0; i < d; i++) {
      [
        mat[rt[0]+i][rt[1]],
        mat[rb[0]][rb[1]-i],
        mat[lb[0]-i][lb[1]],
        mat[lt[0]][lt[1]+i]
      ] = [
        mat[lt[0]][lt[1]+i],
        mat[rt[0]+i][rt[1]],
        mat[rb[0]][rb[1]-i],
        mat[lb[0]-i][lb[1]]
      ]
      // let a = mat[lt[0]][lt[1]+i];
      // let b = mat[rt[0]+i][rt[1]];
      // let c = mat[rb[0]][rb[1]-i];
      // let d = mat[lb[0]-i][lb[1]];
      //
      // mat[rt[0]+i][rt[1]] = a;
      // mat[rb[0]][rb[1]-i] = b;
      // mat[lb[0]-i][lb[1]] = c;
      // mat[lt[0]][lt[1]+i] = d;
    }
    lt[0]++;
    lt[1]++;

    rt[0]++;
    rt[1]--;

    rb[0]--;
    rb[1]--;

    lb[0]--;
    lb[1]++;

    // console.log(lt, rt, rb, lb);
  }
}

if (typeof module !== 'undefined' && module.parent) {
  // Node environment, required as module
} else if (typeof window === 'object') {
  // Browser environment
} else {
  // Node environment, run directly
  // test code go here

  let m1 = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16]
  ];
  let m2 = [
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20],
      [21, 22, 23, 24, 25]
  ];
  rotateB(m1);
  console.log(m1);
  rotateB(m2);
  console.log(m2);
}