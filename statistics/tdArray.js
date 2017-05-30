/**
 * Created by yangm11 on 5/12/2017.
 */
'use strict';

const stats = require('./stats');

function TdArray(nestedArr, columns) {
  let that = this;
  Object.defineProperty(this, '_values', {
    enumerable: false,
    configurable: false,
    writable: true,
    value: nestedArr.slice()
  });
  Object.defineProperty(this, '_columns', {
    enumerable: false,
    configurable: false,
    writable: true,
    value: columns || this._values[0].map((d, idx) => 'c' + idx)
  });
  if (this._columns.length !== this._values[0].length) {
    throw new Error('Columns length not match!');
  }

  Object.defineProperty(this, 'values', {
    get: function () {
      return this._values;
    },
    enumerable: true,
    configurable: false
  });
  // this.shape = [_values.length, _values[0].length];
  Object.defineProperty(this, 'shape', {
    get: function () {
      return [this._values.length, this._values[0].length];
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
        let c = this._columns[i];
        Object.defineProperty(that, c, {
          enumerable: true,
          configurable: true,
          get: function () {
            let idx = that._columns.findIndex((d) => d === c);
            return this._values.map((row) => row[idx]);
          },
          set: function (newArr) {
            if (newArr.length !== this._values.length) {
              throw new Error('The length of new data not match!');
            }
            let idx = that._columns.findIndex((d) => d === c);
            for (let j = 0; j < newArr.length; j++) {
              this._values[j][idx] = newArr[j];
            }
          }
        });
      }
    }
  });
  for (let i = 0; i < this._columns.length; i++) {
    let c = this._columns[i];
    Object.defineProperty(this, c, {
      enumerable: true,
      configurable: true,
      get: function () {
        let idx = this._columns.findIndex((d) => d === c);
        return this._values.map((row) => row[idx]);
      },
      set: function (newArr) {
        if (newArr.length !== this._values.length) {
          throw new Error('The length of new data not match!');
        }
        let idx = this._columns.findIndex((d) => d === c);
        for (let j = 0; j < newArr.length; j++) {
          this._values[j][idx] = newArr[j];
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
    return result;
  }
});

TdArray.prototype.appendColumn = function (name, arr) {
  let that = this;
  let cp = arr.slice();
  if (cp.length !== that.shape[0]) {
    throw new Error('The length of new data not match!');
  }
  this._columns = that._columns.concat(name);
  for (let i = 0; i < cp.length; i++) {
    that._values[i].push(cp[i]);
  }

  Object.defineProperty(that, name, {
    enumerable: true,
    configurable: true,
    get: function () {
      let idx = that._columns.findIndex(d => d === name);
      return that._values.map((d) => d[idx]);
    },
    set: function (newArr) {
      if (newArr.length !== cp.length) {
        throw new Error('The length of new data not match!');
      }
      let idx = that._columns.findIndex(d => d === name);
      for (let j = 0; j < newArr.length; j++) {
        that._values[j][idx] = newArr[j];
      }
    }
  });
};

TdArray.prototype.appendRow = function (arr) {
  if (arr.length !== this.values[0].length) {
    throw new Error('The length of new data not match!');
  }
  this._values.push(arr);
};

TdArray.prototype.insertColumn = function (name, idx, func) {
  let that = this;
  if (that._columns.includes(name)) {
    throw new Error(name + ' has already been defined!');
  }
  if (idx > that.shape[1] || idx < -that.shape[1]) {
    throw new Error('Column index out of range!');
  }
  that._columns.splice(idx, 0, name);
  for (let i = 0; i < that.shape[0]; i++) {
    that._values[i].splice(idx, 0, func(i));
  }

  Object.defineProperty(that, name, {
    enumerable: true,
    configurable: true,
    get: function () {
      return that._values.map((d) => d[idx]);
    },
    set: function (newArr) {
      if (newArr.length !== that.shape[0]) {
        throw new Error('The length of new data not match!');
      }
      for (let j = 0; j < newArr.length; j++) {
        that._values[j][idx] = newArr[j];
      }
    }
  });
};

TdArray.prototype.insertRow = function (idx, func) {
  this._values.splice(idx, 0, func());
};

TdArray.prototype.arithmetic = function(sign, val) {
  if (typeof val !== 'number') {
    throw new Error('A scalar number expected ...');
  }
  switch (sign) {
    case '+':
      for (let i = 0; i < this.shape[0]; i++) {
        for (let j = 0; j < this.shape[1]; j++) {
          this._values[i][j] += val;
        }
      }
      break;
    case '-':
      for (let i = 0; i < this.shape[0]; i++) {
        for (let j = 0; j < this.shape[1]; j++) {
          this._values[i][j] -= val;
        }
      }
      break;
    case '*':
      for (let i = 0; i < this.shape[0]; i++) {
        for (let j = 0; j < this.shape[1]; j++) {
          this._values[i][j] *= val;
        }
      }
      break;
    case '/':
      for (let i = 0; i < this.shape[0]; i++) {
        for (let j = 0; j < this.shape[1]; j++) {
          this._values[i][j] /= val;
        }
      }
      break;
    case '%':
      for (let i = 0; i < this.shape[0]; i++) {
        for (let j = 0; j < this.shape[1]; j++) {
          this._values[i][j] += val;
        }
      }
      break;
    default:
      throw new Error('arithmetic sign not recognized ...');
  }
};

TdArray.prototype.iCol = function (i) {
  if (typeof i !== 'number') {
    throw new Error('column index should be a number!');
  }
  if (i < -(this._columns.length) || i > this._columns.length) {
    throw new Error('index out of range!');
  }
  i = i < 0 ? i + this._columns.length : i;
  return this._values.map(d => d[i]);
};

TdArray.prototype.multiply = function (tdArr) {
  if (tdArr.constructor !== TdArray) {
    throw new Error('a TdArray instance expected ...');
  }
  if (this.shape[1] !== tdArr.shape[0]) {
    throw new Error('See matrix multiplication requirements ...');
  }
  let mul = function (arr1, arr2) {
    let m = 0;
    for (let k = 0; k < arr1.length; k++) {
      m += arr1[k] * arr2[k];
    }
    return m;
  };
  let res = [];
  for (let i = 0; i < this.shape[0]; i++) {
    let r = this._values[i];
    let ln = [];
    for (let j = 0; j < tdArr.shape[1]; j++) {
      let c = tdArr.iCol(j);
      ln.push(mul(r, c));
    }
    res.push(ln);
  }
  return res;
};


TdArray.create = function (m, n, v) {
  v = typeof v === 'undefined' ? 0 : v;
  if (typeof v !== 'number') {
    throw new Error('numeric value expected!');
  }
  if (typeof m !== 'number' || m < 0) {
    throw new Error('m should be a positive number!');
  }
  if (typeof n !== 'number' || n < 0) {
    throw new Error('m should be a positive number!');
  }
  let values = new Array(m);
  // values.fill((new Array(n)).fill(v));
  for (let i = 0; i < m; i++) {
    values[i] = (new Array(n)).fill(v);
  }

  return new TdArray(values);
};


TdArray.diag = function (n) {
  let res = (new Array(n));
  for (let i = 0; i < n; i++) {
    let t = new Array(n).fill(0);
    t[i] = 1;
    res[i] = t;
  }
  return new TdArray(res);
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

// df.insertColumn('N', 1, function (i) {
//   return i + 'N';
// });

console.log(df.columns);
// console.log(df.B);
// console.log(typeof df);
// console.log(Object.prototype.toString.call(df));
// console.log(df.constructor);

console.log(df.iCol(-1));
console.log(TdArray.create(4, 6, 0).values);
console.log(df.shape);
console.log(df.multiply(TdArray.create(6, 4, 1)));
console.log(df.multiply(TdArray.diag(6)));

// df.F = [200, 200, 200, 200];
// console.log(df.F);
// console.log(df.shape);
// console.log(df.values);
// df.appendRow(['x', 'y', 'z', 'm', 'n', 'p']);
// console.log(df.values);
// console.log(df.A);
// df.D = ['Python', 'JavaScript', 'R', 'Go', 'C'];
// console.log(df.values);
// df.columns = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6'];
// df.describe();
// console.log(Object.keys(df));