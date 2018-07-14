/**
 * Created by mingzhang on 7/7/18.
 */
'use strict';

class Table {
  /**
   *
   * @param arr
   * @param rows
   * @param cols
   */
  constructor(arr, rows, cols) {
    this.data = arr;
    this.rows = rows;
    this.cols = cols;
    this._colorObj = {};
    this._cellWidth = 20;
    this._cellHeight = 20;
  }
  getColor(v) {
    return this._colorObj[v];
  }
  setColor(v, color) {
    this._colorObj[v] = color;
  }
  setCellSize(w, h) {
    this._cellWidth = w;
    this._cellHeight = h;
  }
}


if (typeof module !== 'undefined' && module.parent) {
  //module.exports =
} else {

} 