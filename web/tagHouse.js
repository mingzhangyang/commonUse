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
  if (typeof window === 'undefined') {
    if (typeof obj === 'string') {
      return obj;
    }
    if (!(obj.type)) {
      console.log('No type field found in the object');
      return '';
    }
    if (obj.type === 'textContent') {
      return obj.content;
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
        res += tagHouse(children);
        break;
      case '[object String]':
        res += children;
        break;
      case '[object Number]':
        res += children;
        break;
      default:
      // console.log(children);
      // console.log('Child should be array, object, string, or number.')
    }

    if (['input', 'img', 'hr', 'meta', 'link'].includes(obj.type)) {
      return res;
    }
    return res + '</' + obj.type + '>';
  } else {
    if (typeof obj === 'string') {
      return document.createTextNode(obj);
    }
    if (!(obj.type)) {
      throw new Error('No type field found in the object');
    }
    if (obj.type === 'textContent') {
      return document.createTextNode(obj.content);
    }
    let df = document.createDocumentFragment();
    let node = df.appendChild(document.createElement(obj.type));
    for (let key of Object.keys(obj)) {
      if (key === 'type') {
        continue;
      }
      if (key === 'child') {
        if (Array.isArray(obj.child)) {
          for (let o of obj.child) {
            node.appendChild(tagHouse(o));
          }
        } else {
          node.appendChild(tagHouse(obj.child));
        }
        continue;
      }
      node.setAttribute(key, obj[key]);
    }
    df.appendChild(node);
    return df;
  }
}

if (typeof module !== 'undefined' && module.parent) {

} else if (typeof window === 'undefined') {
  // test code go here
  let colorSelector = {
    type: 'div',
    child: [
      {
        type: 'a',
        href: 'html/colorSelector.html',
        target: '_blank',
        child: {
          type: 'img',
          class: 'left-edge',
          src: 'images/colorSelector.PNG',
          width: 150,
          height: 150
        }
      }, {
        type: 'strong',
        child: {
          type: 'textContent',
          content: 'Color Selector:'
        }
      }, {
        type: 'textContent',
        content: 'A tool for selecting your favorite colors and get the RGBA' +
        ' code. There are three ways to go through colors: 1) adjust the red,' +
        ' green, blue, and opacity parameters by sliding; 2) directly input' +
        ' the rgba code to check the color; 3) click the "I am feeling good"' +
        ' button to generate a color randomly. Once a color catches your eyes,' +
        ' you can save it and compare with others that interests you by' +
        ' clicking the "Save & Compare button". Hope this tool will help you' +
        ' find the right colors for you! <a href="html/colorSelector.html"' +
        ' target="_blank"><strong>Check it here</strong></a>.'
      }
    ]
  };

  console.log(tagHouse(colorSelector));

  let t = {
    type: 'div',
    child: 'Hello World'
  };

  console.log(tagHouse(t));
}