/**
 * Created by yangm11 on 5/12/2017.
 */
'use strict';

const stats = require('./stats');

function TdArray(nestedArr, columns) {
  let data = nestedArr.slice();
  this.values = data;
  this.shape = [data.length, data[0].length];
  columns = columns || data[0].map((d, idx) => 'c' + idx);
  this.columns = columns;
  for (let i = 0; i < columns.length; i++) {
    this[columns[i]] = data.map((row) => row[i]);
  }
}
TdArray.prototype.T = function () {
  let result = [];
  for (let i = 0; i < this.columns.length; i++) {
    result.push(this[this.columns[i]]);
  }
  return result;
};



let d = [
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20]
];

let df = new TdArray(d, ['A', 'B', 'C', 'D', 'E']);

console.log(df.A);
console.log(df.T());