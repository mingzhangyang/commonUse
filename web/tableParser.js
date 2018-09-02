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
        following: str[i],
        index: i
      };
    },
    skipSpace: function (i) {
      while (str[i] === '') {
        i++;
      }
      return i;
    },
    findAttr: function (i) {
      let s = '';
      while (str[i] !== '=' && str[i] !== ' ' && str[i] !== '>') {
        s += str[i++];
      }
      return {
        attrName: s,
        following: str[i],
        withoutValue: str[i] !== '=',
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
        following: str[i+1],
        index: i+1
      };
    },
    findText: function (i) {
      let s = '';
      while (str[i] !== '<') {
        s += str[i++];
      }
      return {
        text: s,
        followingCloseTag: str[i+1] === '/',
        index: i+1
      }
    }
  };
  // sm: state machine
  let sm = {
    stack: [],
    currentObject: null,
    nextStep: 'findOpenTag'
  };
  
}