/**
 * Created by yangm11 on 8/9/2018.
 */
'use strict';

class DataTable {
  constructor(arr, targetId, caption) {
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
    this._customizedFactories = {};
    this._tableCaption = typeof caption === 'string' ? caption : '';
  }

  // reset source data after sorting or filtering
  resetData() {
    this._data = this._originalData.slice();
    this.updateTableView();
  }

  // set table caption
  setTableCaption(str) {
    if (typeof str === 'string' && str.length > 0) {
      this._tableCaption = str;
    }
  }

  // set column names
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

  // factories to create customized elements
  // the provided func should return an document element
  // or innerHTML?
  setCustomizedFactory(colName, func) {
    if (typeof colName !== 'string') {
      throw 'Failed to set customized factory function. The column name' +
      ' should be a string.';
    }
    if (typeof func !== 'function') {
      throw 'Failed to set customized factory function. The second argument' +
      ' is expected to be a function.';
    }
    this._customizedFactories[colName] = func;
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

  _updateDataToShow() {
    let res = [];
    let start = (this._pageNumber - 1) * this._rowsPerPage;
    for (let i = 0; i < this._rowsPerPage && start + i < this._data.length; i++) {
      res.push(this._data[start+i]);
    }
    this._dataToShow = res;
  }

  updateTableView() {
    this._updateDataToShow();
    if (typeof this._targetId !== 'string' || !this._targetId) {
      throw new Error('an element id expected');
    }
    let table = document.getElementById(this._targetId + '-table-section');
    if (!table) {
      throw new Error('failed to locate the table');
    }

    // delete all the rows in tBody
    let tBody = table.getElementsByTagName('tbody')[0];
    while (tBody.lastChild) {
      tBody.removeChild(tBody.lastChild);
    }

    let df = document.createDocumentFragment();
    for (let row of this._dataToShow) {
      let tr = df.appendChild(document.createElement('tr'));
      for (let name of this._colNames) {
        if (this._customizedFactories[name]) {
          let v = this._customizedFactories[name](row[name]);
          switch (typeof v) {
            case 'string':
              tr.appendChild(document.createElement('td')).innerHTML = v;
              break;
            case 'object':
              tr.appendChild(document.createElement('td')).appendChild(v);
              break;
            default:
              tr.appendChild(document.createElement('td')).innerText = 'invalid customized factory function';
          }
        } else {
          tr.appendChild(document.createElement('td')).innerText = DataTable.convertToString(row[name]);
        }
      }
    }
    tBody.appendChild(df);
  }

  // generate all table related panels
  generate() {
    // replace the table with a div element
    let target = document.getElementById(this._targetId);
    let div = document.createElement('div');
    target.parentNode.insertBefore(div, target);
    target.parentNode.removeChild(target);
    div.id = this._targetId;

    // create the contents of the new object
    let container = document.createDocumentFragment();

    // create filter panel
    let filterSection = container.appendChild(document.createElement('div'));
    filterSection.id = this._targetId + '-filter-section';

    // create visualization panel
    let vizSection = container.appendChild(document.createElement('div'));
    vizSection.id = this._targetId + '-visualization-section';

    // create table panel
    let table = container.appendChild(document.createElement('table'));
    table.id = this._targetId + '-table-section';

    // add caption to the table
    table.appendChild(document.createElement('caption'))
        .appendChild(document.createTextNode(this._tableCaption));

    // create table header
    // Since the header is supposed not to update, create it once
    let head = table.appendChild(document.createElement('thead'))
    .appendChild(document.createElement('tr'));
    if (!this._colNames) {
      this.setColumnNames();
    }
    for (let name of this._colNames) {
      let th = head.appendChild(document.createElement('th'));
      th.appendChild(document.createTextNode(name));
      let control = th.appendChild(document.createElement('div'));
      control.classList.add('table-sorting-control-container');
      control._colName = name;
      let up = control.appendChild(document.createElement('i'));
      up.classList.add('table-sorting-control', 'table-sorting-up-control');
      up._colName = name;
      let down = control.appendChild(document.createElement('i'));
      down.classList.add('table-sorting-control', 'table-sorting-down-control');
      down._colName = name;
    }

    //create tBody
    table.appendChild(document.createElement('tbody'));

    // create page controller panel
    let pager = container.appendChild(document.createElement('div'));
    pager.id = this._targetId + '-pager-section';

    // create number of rows per page selector
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

    // create page selector
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

  // attach event listeners to controller elements
  attachListeners() {
    let that = this;
    let table = document.getElementById(this._targetId + '-table-section');
    if (!table) {
      throw new Error('failed to locate the table');
    }
    let pager = document.getElementById(this._targetId + '-pager-section');
    let selects = pager.getElementsByTagName('select');

    // add event listener to up/down sort controls
    let sortingControls = document.getElementsByClassName('table-sorting-control');
    table.addEventListener('click', function (evt) {
      if (evt.target.classList.contains('table-sorting-control')) {
        for (let ctrl of sortingControls) {
          ctrl.classList.remove('table-sorting-control-active');
        }
      }
      if (evt.target.classList.contains('table-sorting-up-control')) {
        let col = evt.target._colName;
        that.sort(col, false);
        evt.target.classList.add('table-sorting-control-active');
      } else if (evt.target.classList.contains('table-sorting-down-control')) {
        let col = evt.target._colName;
        that.sort(col, true);
        evt.target.classList.add('table-sorting-control-active');
      }
      that._pageNumber = 1;
      selects[1].value = 1;
      that.updateTableView();
    });

    // add event listener to number of rows per page selector
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

    // add event listener to page selector
    selects[1].addEventListener('change', function () {
      if (that._changePageByUser) {
        that.setPageNumber(+this.value);
        that.updateTableView();
      }
    });
  }
}


