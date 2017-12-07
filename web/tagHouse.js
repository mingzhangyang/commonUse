/**
 * Created by yangm11 on 12/7/2017.
 */
'use strict';

/**
 * turn a html tag descriptor tag into html tag string
 * @param obj: a html tag descriptor object
 * @returns {string}
 */
function tagHouse(obj) {
  let res = '<' + obj.type;
  let props = Object.keys(obj);
  let children;
  for (let i = 0; i < props.length; i++) {
    if (props[i] === 'type') {
      continue;
    }
    if (props[i] === 'child') {
      children = obj.child;
      continue;
    }
    res += ' ' + props[i] + '=' + '"' + obj[props[i]] + '"';
  }
  res += '>';
  if (children) {
    for (let k = 0; k < children.length; k++) {
      res += tagHouse(obj);
    }
  }
  if (['input', 'img', 'hr', 'meta', 'link'].includes(obj.type)) {
    return res;
  }
  return res + '</' + obj.type + '>';
}

if (typeof module !== 'undefined' && module.parent) {

} else {
  // test code go here
}