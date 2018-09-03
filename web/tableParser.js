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
    skipSpace: function (i) {
      while (str[i] === '') {
        i++;
      }
      return {
        index: i
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
      let s = '';
      i++; // str at current index is "/", so we need go next index
      while (str[i] !== '>') {
        s += str[i++];
      }
      return {
        tagName: s,
        index: i
      }
    }
  };
  const SelfContainTags = [
    'br',
    'input'
  ];
  let obj = {};
  // sm: state machine
  let sm = {
    stack: [obj],
    // currentObject: {}, // not necessary, just use the last object in the stack
    // currentElementDone: true, // not necessary, can be determined by the length of stack
    currentTask: 'findOpenTag',
    preTask: '',
    nextTask: ''
  };
  while (i < str.length) {
    let res = Tasks[sm.currentTask](i);
    i = res.index;
    switch (sm.currentTask) {
      case 'findOpenTag':
        let cobj = sm.stack[sm.stack.length - 1];
        cobj.tagName = res.tagName;
        if (res.following = ' ') {
          sm.nexttTask = 'skipSpace';
        } else if (res.following = '>') {
          sm.nextTask = 'findTextNode';
        } else {
          throw new Error('finding open tag faild.');
        }
        sm.preTask = sm.currentTask;
        sm.currentTask = sm.nextTask;
        sm.nextTask = '';
        break;
      case 'findTextNode':
        break;
      case 'findAttr':
        break;
      case 'findValue':
        break;
      case 'findCloseTag':
        break;
      case 'skipSpace':
        if (sm.preTask === 'findOpenTag') {
        
        } else if (sm.preTask === 'findValue') {
          
        } else if (sm.preTask === 'findAttr') {
        
        } else {
        
        }
        break;
      default:

    }
  }
  
}
