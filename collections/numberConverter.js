/**
 * Created by yangm11 on 8/22/2017.
 */
'use strict';

class NumberConverter {
  constructor (n, opt) {
    opt = opt || 'decimal';
    if (opt === 'decimal') {
      this.decimal = n;
    } else {
      try {
        this.decimal = NumberConverter._toDecimal(n, opt);
      } catch(err) {
        throw err;
      }
    }
    Object.defineProperty(this, 'value', {
      configurable: false,
      enumerable: false,
      get: () => this.decimal,
      set: (v) => {
        this.decimal = v;
      }
    });
  }

  static _toDecimal(it, opt) {
    let table = NumberConverter.rev_hexTable;
    // console.log(table);
    let res = 0;
    it += '';
    it = it.toUpperCase();
    let p;
    switch (opt) {
      case 'binary':
        for (let i = 0, len = it.length; i < len; i++) {
          p = table[it[i]];
          if (typeof p === 'undefined' && p > 1) {
            throw 'Invalid number in binary form.';
          }
          if (p) {
            res += (1 << (len - i - 1));
          }
        }
        return res;
      case 'oct':
        for (let i = 0, len = it.length; i < len; i++) {
          p = table[it[i]];
          if (typeof p === 'undefined' && p > 7) {
            throw 'Invalid number in octal form.';
          }
          if (p) {
            res += (1 << (3 * (len - i - 1))) * p;
          }
        }
        return res;
      case 'hex':
        for (let i = 0, len = it.length; i < len; i++) {
          p = table[it[i]];
          if (typeof p === 'undefined') {
            throw 'Invalid number in octal form.';
          }
          if (p) {
            res += (1 << (4 * (len - i - 1))) * p;
          }
        }
        return res;
      default:
        throw 'type not identified. Please choose from "hex, oct, binary, decimal"';
    }

  }

  toBinary() {
    let res = [];
    let m = this.decimal;
    let p = (m / 2) | 0;
    while (p > 0) {
      res.push(m % 2);
      m = p;
      p = (m / 2) | 0;
    }
    res.push(m);
    res.reverse();
    return res;
  }

  toOctal() {
    let res = [];
    let m = this.decimal;
    let p = (m / 8) | 0;
    while (p > 0) {
      res.push(m % 8);
      m = p;
      p = (m / 8) | 0;
    }
    res.push(m);
    res.reverse();
    return res;
  }

  toHex() {
    let table = NumberConverter.hexTable;
    let res = [];
    let m = this.decimal;
    let p = (m / 16) | 0;
    while (p > 0) {
      res.push(table[m % 16]);
      m = p;
      p = (m / 16) | 0;
    }
    res.push(table[m]);
    res.reverse();
    return res;
  }

  static get hexTable() {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
  }

  static get rev_hexTable() {
    return {
      '0': 0,
      '1': 1,
      '2': 2,
      '3': 3,
      '4': 4,
      '5': 5,
      '6': 6,
      '7': 7,
      '8': 8,
      '9': 9,
      'A': 10,
      'B': 11,
      'C': 12,
      'D': 13,
      'E': 14,
      'F': 15
    }
  }

}

if (typeof module !== 'undefined' && module.parent) {
  module.exports = NumberConverter;
} else if (typeof window !== 'undefined') {

} else {
  let c = new NumberConverter('2a0', 'hex');
  console.log(c.toBinary());
  console.log(c.toOctal());
  console.log(c.decimal);
  console.log(c.toHex());

  c.value = 288;
  console.log(c.toBinary());
  console.log(c);
}