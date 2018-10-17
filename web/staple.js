/**
 * Created by yangm11 on 9/5/2018.
 */
'use strict';

class ConfigMap {
  constructor(obj) {
    this.map = Object.assign({}, obj);
  }
  set(key, id, prop, func) {
    func = func || (s => s);
    let elem = document.getElementById(id);
    if (!elem) {
      console.error(`${id} is not a valid id.`);
      return;
    }
    this.map[key] = {
      id: id,
      prop: prop,
      func: func
    };
  }
}

function staple(dataObj, map) {
  let keys = Object.keys(dataObj);
  for (let key of keys) {
    document.getElementById(map.map[key].id)[map.map[key].prop] = map.map[key].func(dataObj[key]);
  }
}

class Staple {
  constructor(data) {
    if (!data || typeof data !== 'object') {
      throw new TypeError('invalid data type, an object expected.');
    }
    this._data = data;
    this._targets = {};
    this.funcs = {
      default: function (id, d) {
        let elem = document.getElementById(id);
        if (elem) {
          elem.innerText = d ? d : '';
        }
      }
    };
    let that = this;
    for (let p of Object.keys(data)) {
      Object.defineProperty(data, '_' + p, {
        enumerable: false,
        value: data[p],
        configurable: true,
        writable: true
      });
      Object.defineProperty(data, p, {
        get: function () {
          return data['_' + p];
        },
        set: function (v) {
          data['_' + p] = v;
          if (that._targets[p]) {
            that.publish(p);
          }
        }
      })
    }
  }
  link(prop, id, func) {
    let that = this;
    if (!this._targets[prop]) {
      this._targets[prop] = {};
    }
    this._targets[prop][id] = function() {
      if (func instanceof Function) {
        func(id, that._data._data[prop]);
      } else if (typeof func === 'string') {
        if (that.funcs[func] instanceof Function) {
          that.funcs[func](id, that._data[prop]);
        } else {
          console.error('invalid string. not registered.');
        }
      } else if (typeof func === 'undefined') {
        that.funcs.default(id, that._data[prop]);
      } else {
        throw new TypeError('invalid type for the third argument.');
      }
    };
  }
  publish(prop) {
    if (typeof prop === 'undefined') {
      for (let p of Object.keys(this._targets)) {
        for (let key of Object.keys(this._targets[p])) {
          this._targets[p][key]();
        }
      }
    } else if (typeof this._targets[prop] !== 'undefined') {
      for (let key of Object.keys(this._targets[prop])) {
        this._targets[prop][key]();
      }
    } else {
      console.error('not a valid property to publish.');
    }
  }
  update(prop, value) {
    this._data[prop] = value;
    this.publish(prop);
  }
}