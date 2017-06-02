/**
 * Created by yangm11 on 6/2/2017.
 */
'use strict';

// to construct a polynomial, the input should follow the requirements below.
// po as a string: '2a^3b^5c^1', to be noted: '1' is required in 'c^1'
// po as a object: {indeterminates: ['a', 'b', 'c'], degrees: [3, 5, 1],
// coefficient: 2}, in which indeterminates are indispensable, so is the
// degrees, they should be arrays and of the same length.

class PolynomialUnit {
  constructor (po) {
    switch (typeof po) {
      case 'string':
        if (po.indexOf('^') === -1) {
          throw 'no ^ detected, please follow the requirements for input';
        }
        if (po.match(/[A-Za-z]/g).length !== po.match(/\^/g).length) {
          throw 'Please follow the requirements for input';
        }
        this.indeterminates = [];
        this.degrees = [];
        this.coefficient = 1;
        let re = /([A-Za-z])\^(\d+)/g;
        let x;
        x = re.exec(po);
        if (x) {
          this.indeterminates.push(x[1]);
          this.degrees.push(+x[2]);
          if (x.index > 0) {
            this.coefficient = +po.slice(0, x.index);
          }
          while (x = re.exec(po)) {
            this.indeterminates.push(x[1]);
            this.degrees.push(+x[2]);
          }
        } else {
          throw 'indeterminates are required to create a polynomial';
        }

        break;
      case 'object':
        if (Array.isArray(po.indeterminates) && Array.isArray(po.degrees)) {
          if (po.constructor === PolynomialUnit) {
            return po;
          }
          this.indeterminates = po.indeterminates;
          this.coefficient = typeof po.coefficient === 'undefined' ? 1 : po.coefficient;
          this.degrees = typeof po.degrees === 'undefined' ? po.indeterminates.map(d => 1) : po.degrees;
          if (typeof this.coefficient !== 'number' || !Array.isArray(this.degrees)) {
            throw new Error('Please see requirements for input!');
          }
        }
        break;
      default:
        throw 'string or object expected!';
    }
    let that = this;
    Object.defineProperty(that, 'combined', {
      get: function () {
        return that.indeterminates.map((d, i) => ({
          symbol: d,
          degree: that.degrees[i]
        })).sort(function (elm1, elm2) {
          if (elm1.symbol < elm2.symbol) {
            return -1;
          }
          if (elm1.symbol > elm2.symbol) {
            return 1;
          }
          return 0;
        });
      }
    });
  }

  _check() {
    let len = this.indeterminates.length;
    let na = [];
    let nd = [];
    for (let i = 0; i < len; i++) {
      let a = this.indeterminates[i];
      let d = this.degrees[i];
      if (na.indexOf(a) === -1) {
        for (let j = i + 1; j < len; j++) {
          if (this.indeterminates[j] === a) {
            d += this.degrees[j];
          }
        }
        na.push(a);
        nd.push(d);
      }
    }
    this.indeterminates = na;
    this.degrees = nd;

    let zeros = [];
    for (let i = 0; i < this.degrees.length; i++) {
      if (this.degrees[i] === 0) {
        zeros.push(i);
      }
    }
    for (let i = 0; i < zeros.length; i++) {
      this.indeterminates.splice(i, 1);
      this.degrees.splice(i, 1);
    }
    return this;
  }

  multiply(c) {
    if (typeof c !== 'number' && c.constructor !== PolynomialUnit) {
      throw 'a number or polynomial unit instance expected';
    }
    switch (typeof c) {
      case 'number':
        if (c === 0) {
          return 0;
        }
        return (new PolynomialUnit({
          indeterminates: this.indeterminates,
          degrees: this.degrees,
          coefficient: this.coefficient * c
        }))._check();
      default:
        return (new PolynomialUnit({
          indeterminates: this.indeterminates.concat(c.indeterminates),
          degrees: this.degrees.concat(c.degrees),
          coefficient: this.coefficient * c.coefficient
        }))._check();
    }
  }

  toString() {
    let s = this.coefficient + '';
    for (let i = 0; i < this.combined.length; i++) {
      s += (this.combined[i].symbol + '^' + this.combined[i].degree);
    }
    return s;
  }

  pow(n) {
    if (typeof n !== 'number') {
      throw 'a number expected';
    }
    if (n ===0) {
      return 1;
    }
    return (new PolynomialUnit({
      indeterminates: this.indeterminates,
      degrees: this.degrees.map(d => d * n),
      coefficient: Math.pow(this.coefficient, n)
    }))._check();
  }
}

class Polynomial {
  constructor(components) {
    let args;
    if (Array.isArray(components)) {
      args = components;
    } else {
      args = (arguments.length === 1) ? [arguments[0]] : Array.apply(null, arguments);
    }
    this.length = args.length;
    for (let i = 0; i < this.length; i++) {
      if (typeof args[i] !== 'number' && args[i].constructor !== PolynomialUnit) {
        console.log(args[i]);
        throw 'Only numbers or polynomial units are allowed.';
      }
      this[i] = args[i];
    }
  }

  _check() {
    let num = 0;
    let units = [];
    for (let i = 0; i < this.length; i++) {
      if (typeof this[i] === 'number') {
        num += this[i];
      } else {
        units.push(this[i]);
      }
    }

    let nu = [units[0]];

    function rn(str) {
      let i = str.search(/[A-Za-z]/);
      return str.slice(i);
    }

    for (let i = 1; i < units.length; i++) {
      let cur = rn(units[i].toString());
      let idx = nu.findIndex(d => rn(d.toString()) === cur);
      if (idx === -1) {
        nu.push(units[i]);
      } else {
        nu[idx].coefficient += units[i].coefficient;
      }
    }

    for (let i = 0; i < this.length; i++) {
      if (i > nu.length) {
        delete this[i];
        continue;
      }
      if (i === nu.length) {
        if (num) {
          this[i] = num;
        } else {
          delete this[i];
        }
        continue;
      }
      this[i] = nu[i];
    }
    this.length = num === 0 ? nu.length : nu.length + 1;
    return this;
  }

  multiply(c) {
    let np = [];
    switch (c.constructor) {
      case Number:
        for (let i = 0; i < this.length; i++) {
          if (typeof this[i] === 'number') {
            np.push(this[i] * c);
          } else {
            np.push(this[i].multiply(c));
          }
        }
        break;
      case PolynomialUnit:
        for (let i = 0; i < this.length; i++) {
          if (typeof this[i] === 'number') {
            np.push(c.multiply(this[i]));
          } else {
            np.push(this[i].multiply(c));
          }
        }
        break;
      case Polynomial:
        for (let i = 0; i < c.length; i++) {
          let t = c[i];
          for (let j = 0; j < this.length; j++) {
            let m = this[j];
            if (typeof m === 'number') {
              if (typeof t === 'number') {
                np.push(this[j] * t);
              } else {
                np.push(t.multiply(m));
              }
            } else {
              np.push(m.multiply(t));
            }
          }
        }
        break;
      default:
        throw 'Only number, polynomial units or polynomial are allowed';
    }
    // console.log(np);
    return (new Polynomial(np))._check(); //._check()
  }

  plus(c) {
    let np = [];
    for (let i = 0; i < this.length; i++) {
      np.push(this[i]);
    }
    if (typeof c === 'number' || c.constructor === PolynomialUnit) {
      return new Polynomial(np.concat(c))._check();
    }
    if (c.constructor === Polynomial) {
      for (let i = 0; i < c.length; i++) {
        np.push(c[i]);
      }
      return (new Polynomial(np))._check();
    }
  }

  pow(n) {
    if (typeof n !== 'number') {
      throw 'Only number is allowed';
    }
    if (n === 0) {
      return 1;
    }
    if (n < 0) {
      throw 'minus not supported';
    }
    let t = this;
    for (let i = 0; i < n - 1; i++) {
      t = t.multiply(this);
    }
    return t._check();
  }

  toString() {
    this._check();
    let s = '';
    for (let i = 0; i < this.length; i++) {
      if (typeof this[i] === 'number') {
        s += this[i] + ' ';
        continue;
      }
      let cur = this[i].toString();
      if (cur[0] === '-') {
        s += cur + ' ';
        continue;
      }
      s += '+' + cur + ' ';
    }
    return s;
  }

}


let p = new PolynomialUnit('2a^2b^2');
let q = new PolynomialUnit({
  indeterminates: ['a', 'c', 'd'],
  degrees: [-2, 2, 3],
  coefficient: 5
});
// console.log(p.toString());
// console.log(q.toString());
// console.log(p.multiply(q).toString());
// console.log(p.pow(3).toString());

let m = new Polynomial(p, q);
// console.log(m);
console.log(m.plus(m));

// let a = new PolynomialUnit('a^1');
// let b = new PolynomialUnit('b^1');
// let c = new PolynomialUnit('c^1');
//
// let n = new Polynomial(a, b, c);
// console.log(n.pow(5).toString());
