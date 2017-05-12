/**
 * Created by yangm11 on 5/12/2017.
 */
'use strict';

const stats = require('./stats');

function TdArray(nestedArr, columns) {
  Object.defineProperty(this, 'data', {
    enumerable: false,
    configurable: false,
    writable: true,
    value: nestedArr.slice()
  });
  Object.defineProperty(this, '_columns', {
    enumerable: false,
    configurable: false,
    writable: true,
    value: columns || this.data[0].map((d, idx) => 'c' + idx)
  });
  if (this._columns.length !== this.data[0].length) {
    throw new Error('Columns length not match!');
  }

  Object.defineProperty(this, 'values', {
    get: function () {
      return this.data;
    },
    enumerable: true,
    configurable: false
  });
  // this.shape = [data.length, data[0].length];
  Object.defineProperty(this, 'shape', {
    get: function () {
      return [this.data.length, this.data[0].length];
    },
    enumerable: true
  });
  Object.defineProperty(this, 'columns', {
    enumerable: true,
    configurable: false,
    get: function () {
      return this._columns;
    },
    set: function (newCols) {
      if (newCols.length !== this._columns.length) {
        throw new Error('The length of new columns not match!');
      }
      let oldOnes = this._columns;
      this._columns = newCols;
      for (let i = 0; i < this._columns.length; i++) {
        delete this[oldOnes[i]];
        Object.defineProperty(this, this._columns[i], {
          enumerable: true,
          configurable: true,
          get: function () {
            return this.data.map((row) => row[i]);
          },
          set: function (newArr) {
            if (newArr.length !== this.data.length) {
              throw new Error('The length of new data not match!');
            }
            for (let j = 0; j < newArr.length; j++) {
              this.data[j][i] = newArr[j];
            }
          }
        });
      }
    }
  });
  for (let i = 0; i < this._columns.length; i++) {
    Object.defineProperty(this, this._columns[i], {
      enumerable: true,
      configurable: true,
      get: function () {
        return this.data.map((row) => row[i]);
      },
      set: function (newArr) {
        if (newArr.length !== this.data.length) {
          throw new Error('The length of new data not match!');
        }
        for (let j = 0; j < newArr.length; j++) {
          this.data[j][i] = newArr[j];
        }
      }
    });
  }
}

Object.defineProperty(TdArray.prototype, 'Transpose', {
  enumerable: true,
  value: function () {
    let result = [];
    for (let i = 0; i < this.columns.length; i++) {
      result.push(this[this.columns[i]]);
    }
    return result;
  }
});

Object.defineProperty(TdArray.prototype, 'describe', {
  enumerable: true,
  value: function () {
    let result = {};
    let cols = this.columns;
    for (let i = 0; i < cols.length; i++) {
      result[cols[i]] = {
        max: stats.max(this[cols[i]]),
        min: stats.min(this[cols[i]]),
        mean: stats.mean(this[cols[i]]),
        median: stats.median(this[cols[i]]),
        sum: stats.sum(this[cols[i]])
      }
    }
    console.log(result);
  }
});

TdArray.prototype.appendColumn = function (name, arr) {
  let cp = arr.slice();
  if (cp.length !== this.shape[0]) {
    throw new Error('The length of new data not match!');
  }
  this._columns = this._columns.concat(name);
  for (let i = 0; i < cp.length; i++) {
    this.data[i].push(cp[i]);
  }
  let idx = this.data[0].length - 1;
  Object.defineProperty(this, name, {
    enumerable: true,
    configurable: true,
    get: function () {
      return this.data.map((d) => d[idx]);
    },
    set: function (newArr) {
      if (newArr.length !== cp.length) {
        throw new Error('The length of new data not match!');
      }
      for (let j = 0; j < newArr.length; j++) {
        this.data[j][idx] = newArr[j];
      }
    }
  });
};

TdArray.prototype.appendRow = function (arr) {
  if (arr.length !== this.values[0].length) {
    throw new Error('The length of new data not match!');
  }
  this.data.push(arr);
};


let d = [
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20]
];

let df = new TdArray(d, ['A', 'B', 'C', 'D', 'E']);

console.log(df.A);
// console.log(df.T());
// df.describe();
console.log(Object.keys(df));
df.A = [0, 0, 0, 0];
console.log(df.shape);
df.appendColumn('F', [100, 100, 100, 100]);
console.log(df.values);
df.F = [200, 200, 200, 200];
console.log(df.F);
console.log(df.shape);
console.log(df.values);
df.appendRow(['x', 'y', 'z', 'm', 'n', 'p']);
console.log(df.values);
console.log(df.A);
df.D = ['Python', 'JavaScript', 'R', 'Go', 'C'];
console.log(df.values);
df.columns = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6'];
df.describe();
console.log(Object.keys(df));