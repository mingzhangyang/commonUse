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
  if (!(obj.type)) {
    console.log('No type field found in the object');
    return '';
  }
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

  switch (Object.prototype.toString.call(children)) {
    case '[object Array]':
      for (let k = 0; k < children.length; k++) {
        res += tagHouse(children[k]);
      }
      break;
    case '[object Object]':
      if (children.type === 'textContent') {
        res += children.content;
      } else {
        res += tagHouse(children);
      }
      break;
    case '[object String]':
      res += children;
      break;
    case '[object Number]':
      res += children;
      break;
    default:
      console.log('Child should be array, object, string, or number.')
  }

  if (['input', 'img', 'a', 'hr', 'meta', 'link'].includes(obj.type)) {
    return res;
  }
  return res + '</' + obj.type + '>';
}

if (typeof module !== 'undefined' && module.parent) {

} else {
  // test code go here
  let d = {
    type: 'div',
    id: 'testid',
    class: 'testclass',
    child: {
      type: 'textContent',
      content: 'This is a test'
    }
  };

  console.log(tagHouse(d));
}