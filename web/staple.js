/**
 * Created by yangm11 on 9/5/2018.
 */
'use strict';

export class ConfigMap {
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

export function staple(dataObj, map) {
  let keys = Object.keys(dataObj);
  for (let key of keys) {
    document.getElementById(map.map[key].id)[map.map[key].prop] = map.map[key].func(dataObj[key]);
  }
}

