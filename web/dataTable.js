/**
 * Created by yangm11 on 8/9/2018.
 */
'use strict';

class DataTable {
  constructor(arr, targetId) {
    if (!Array.isArray(arr)) {
      throw new Error('an array of objects expected');
    }
    if (Object.prototype.toString.call(arr[0]) !== '[object Object]') {
      throw new Error('an array of objects expected');
    }
    if (typeof window === 'undefined') {
      throw new Error('Data Table only works in browser');
    }
    this._data = arr;
    this._targetId = targetId;
    this._rowsPerPage = 10;
    this._pageNumber = 1;
  }
  setColumnNames(names) {
    if (typeof names === 'undefined') {
      let res = new Set();
      for (let d of this._data) {
        let keys = Object.keys(d);
        for (let key of keys) {
          res.add(key);
        }
      }
      this._colNames = [...res];
    } else if (Array.isArray(names)) {
      this._colNames = names;
    } else {
      throw new Error('an array of name strings expected');
    }
  }

  // page number starts from 1
  setPageNumber(n) {
    if (typeof n !== 'number' || n < 0) {
      throw new Error('a natural number expected');
    }
    this._pageNumber = n;
  }
  setRowsPerPage(n) {
    if (typeof n !== 'number' || n < 0) {
      throw new Error('a natural number expected');
    }
    this._rowsPerPage = n;
  }

  static convertToString(d) {
    switch (typeof d) {
      case 'number':
        return d + '';
      case 'string':
        return d;
      case 'object':
        if (Array.isArray(d)) {
          return d.join(', ');
        } else if (d === null) {
          return 'null';
        } else {
          return JSON.stringify(d);
        }
      case 'bool':
        return d + '';
      default:
        return 'null';
    }
  }

  // if descending is omitted,
  sort(col, descending) {
    this._data.sort((x, y) => {
      if (descending) {
        return x[col] < y[col] ? 1 : -1;
      } else {
        return x[col] < y[col] ? -1 : 1;
      }
    });
  }

  updateDataToShow() {
    let res = new Array(this._rowsPerPage);
    let start = (this._pageNumber - 1) * this._rowsPerPage;
    for (let i = 0; i < this._rowsPerPage; i++) {
      res[i] = this._data[start+i];
    }
    this._dataToShow = res;
  }

  generate() {
    if (typeof this._targetId !== 'string' || !this._targetId) {
      throw new Error('an element id expected');
    }
    let table = document.getElementById(this._targetId);
    while (table.lastChild) {
      table.removeChild(table.lastChild);
    }
    if (!this._colNames) {
      this.setColumnNames();
    }
    let df = document.createDocumentFragment();
    let head = df.appendChild(document.createElement('thead'))
        .appendChild(document.createElement('tr'));
    for (let name of this._colNames) {
      head.appendChild(document.createElement('th')).innerText = name;
    }
    let tbody = df.appendChild(document.createElement('tbody'));
    for (let row of this._dataToShow) {
      let th = tbody.appendChild(document.createElement('tr'));
      for (let name of this._colNames) {
        th.appendChild(document.createElement('td')).innerText = DataTable.convertToString(row[name]);
      }
    }
    table.appendChild(df);
  }
}

if (typeof module !== 'undefined' && module.parent) {

} else {
  // test code go here
}