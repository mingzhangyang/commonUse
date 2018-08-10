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
    this._originalData = arr;
    this._data = arr.slice();
    this._targetId = targetId;
    this._rowsPerPage = 10;
    this._pageNumber = 1;
    this._changePageByUser = true;
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
    let res = [];
    let start = (this._pageNumber - 1) * this._rowsPerPage;
    for (let i = 0; i < this._rowsPerPage && start + i < this._data.length; i++) {
      res.push(this._data[start+i]);
    }
    this._dataToShow = res;
  }

  updateTableView() {
    this.updateDataToShow();
    if (typeof this._targetId !== 'string' || !this._targetId) {
      throw new Error('an element id expected');
    }
    let table = document.getElementById(this._targetId + '-table-section');
    if (!table) {
      throw new Error('failed to locate the table');
    }
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
      let th = head.appendChild(document.createElement('th'));
      th.appendChild(document.createTextNode(name));
      let control = th.appendChild(document.createElement('div'));
      control.classList.add(this._targetId + '-control');
      control._colName = name;
      let up = control.appendChild(document.createElement('i'));
      up.classList.add('data-table-up-control');
      up._colName = name;
      let down = control.appendChild(document.createElement('i'));
      down.classList.add('data-table-down-control');
      down._colName = name;
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
  generate() {
    // replace the table with a div element
    let target = document.getElementById(this._targetId);
    let div = document.createElement('div');
    target.parentNode.insertBefore(div, target);
    target.parentNode.removeChild(target);
    div.id = this._targetId;

    // create the contents of the new object
    let container = document.createDocumentFragment();
    let filterSection = container.appendChild(document.createElement('div'));
    filterSection.id = this._targetId + '-filter-section';

    let vizSection = container.appendChild(document.createElement('div'));
    vizSection.id = this._targetId + '-visualization-section';

    let table = container.appendChild(document.createElement('table'));
    table.id = this._targetId + '-table-section';

    let pager = container.appendChild(document.createElement('div'));
    pager.id = this._targetId + '-pager-section';
    let a = pager.appendChild(document.createElement('div'));
    a.appendChild(document.createElement('span'))
    .appendChild(document.createTextNode('Items per Page'));
    let num = a.appendChild(document.createElement('select'));
    num.classList.add('data-table-row-number-selector');
    for (let i of [5, 10, 20, 50, 100]) {
      num.appendChild(document.createElement('option'))
      .appendChild(document.createTextNode(i));
    }
    num.value = 10;

    let b = pager.appendChild(document.createElement('div'));
    b.appendChild(document.createElement('span'))
    .appendChild(document.createTextNode('Select Page'));
    let pages = b.appendChild(document.createElement('select'));
    pages.classList.add('data-table-pages-selector');

    let totalPages = Math.ceil(this._data.length / this._rowsPerPage);
    for (let i = 1; i <= totalPages; i++) {
      pages.appendChild(document.createElement('option'))
          .appendChild(document.createTextNode(i));
    }

    // add the df to div
    div.appendChild(container);
    this.updateTableView();
    this.attachListeners();
  }
  attachListeners() {
    let that = this;
    let table = document.getElementById(this._targetId + '-table-section');
    if (!table) {
      throw new Error('failed to locate the table');
    }
    table.addEventListener('click', function (evt) {
      if (evt.target.classList.contains('data-table-up-control')) {
        let col = evt.target._colName;
        that.sort(col, false);
      } else if (evt.target.classList.contains('data-table-down-control')) {
        let col = evt.target._colName;
        that.sort(col, true);
      }
      that.updateTableView();
    });
    let pager = document.getElementById(this._targetId + '-pager-section');
    let selects = pager.getElementsByTagName('select');
    selects[0].addEventListener('change', function () {
      // update table view
      that.setRowsPerPage(+this.value);
      that.setPageNumber(1);
      that.updateTableView();

      // update pager
      let totalPages = Math.ceil(that._data.length / that._rowsPerPage);
      while (selects[1].lastChild) {
        selects[1].removeChild(selects[1].lastChild);
      }
      for (let i = 1; i <= totalPages; i++) {
        selects[1].appendChild(document.createElement('option'))
        .appendChild(document.createTextNode(i));
      }
      selects[1].value = 1;
      that._changePageByUser = false;
      setTimeout(function () {
        that._changePageByUser = true;
      }, 1000);
    });
    selects[1].addEventListener('change', function () {
      if (that._changePageByUser) {
        that.setPageNumber(+this.value);
        that.updateTableView();
      }
    });
  }
}

if (typeof module !== 'undefined' && module.parent) {

} else {
  // test code go here
}
