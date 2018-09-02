/**
 * Created by mingzhang on 9/1/18.
 */
'use strict';

function parseTable(str) {
  if (typeof str !== 'string') {
    throw new Error('string argument expected.');
  }
  let i = str.indexOf('<');
  if (i === -1) {
    throw new Error('invalid string, no "<" found.');
  }
  const Tasks = {
    findOpenTag: function(i) {
      let s = '';
      while (str[i] !== ' ' && str[i] !== '>') {
        s += str[i++];
      }
      return {
        tagName: s,
        following: str[i], // if " ", skipSpace; else if ">", findTextNode
        index: i
      };
    },
    skipSpace: function (i, preTask) {
      while (str[i] === '') {
        i++;
      }
      return {
        index: i,
        preTask: preTask
      };
    },
    findAttr: function (i) {
      let s = '';
      while (str[i] !== '=' && str[i] !== ' ' && str[i] !== '>') {
        s += str[i++];
      }
      return {
        attrName: s,
        following: str[i],
        withoutValue: str[i] !== '=', // if true, findValue; else if " ",
        // skipSpace; else if ">", findTextNode
        index: i
      };
    },
    findValue: function (i) {
      let s = '';
      while (str[i] !== '"') {
        s += str[i++];
      }
      return {
        value: s,
        following: str[i+1], // if ">", findTextNode; else if " ", skipSpace
        index: i+1
      };
    },
    findTextNode: function (i) {
      let s = '';
      while (str[i] !== '<') {
        s += str[i++];
      }
      return {
        text: s,
        followingCloseTag: str[i+1] === '/', // if true, findCloseTag; else
        // findOpenTag
        index: i+1
      };
    },
    findCloseTag: function (i) {

    }
  };
  // sm: state machine
  let sm = {
    stack: [],
    currentObject: null,
    currentTask: 'findOpenTag'
  };
  while (i < str.length) {
    let res = Tasks[sm.currentTask](i);
    i = res.index;
    switch (sm.currentTask) {
      case 'findOpenTag':
        break;
      case 'findTextNode':
        break;
      case 'findAttr':
        break;
      case 'findValue':
        break;
      case 'findCloseTag':
        break;
      default:

    }
  }
  
}
