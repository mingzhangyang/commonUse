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
      if (str[i] === ' ') {
        return {
          tagName: s,
          endChar: str[i], // if " ", skipSpace; else if ">", findTextNode
          index: i
        };
      } else {
        return {
          tagName: s,
          endChar: str[i], // if " ", skipSpace; else if ">", findTextNode
          index: i+1
        };
      }
      
    },
    // skipSpace happens in the middle of open tag
    skipSpace: function (i) {
      while (str[i] === ' ') {
        i++;
      }
      return {
        index: i,
        endChar: str[i]
      };
    },
    findAttr: function (i) {
      let s = '';
      let equalMark = false;
      let quotes = 0;
      while (i < str.length) {
        if (str[i] === '=') {
          equalMark = true;
        }
        if (str[i] === '"') {
          quotes++;
        }
        if (str[i] === ' ' && !equalMark) {
          return {
            attrName: s,
            attrValue: true,
            endChar: ' ',
            index: i
          };
        }
        if (str[i] === '>' && !equalMark) {
          return {
            attrName: s,
            attrValue: true,
            endChar: '>',
            index: i
          };
        }
        if (str[i] === '"' && equalMark && quotes === 1) {
          let a = s.split('="');
          return {
            attrName: a[0],
            attrValue: a[1],
            endChar: '"',
            index: i+1
          };
        }
        s += str[i++];
      }
    },
    // findTextNode happens between open and closing tag
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
        index: i+1
      };
    }
  };
  // list of tags that are without closing tag
  const SelfContainedTags = [
    'br',
    'input'
  ];
  
  // sm: state machine
  let sm = {
    stack: [],
    // currentObject: {}, // not necessary, just use the last object in the stack
    // currentElementDone: true, // not necessary, can be determined by the length of stack
    currentTask: 'findOpenTag',
    preTask: '',
    nextTask: '',
    count: 0
  };
  i++;
  while (i < str.length - 1 && sm.count < str.length) {
    console.log(i, str.length);
    sm.count++;
    if (!Tasks[sm.currentTask]) {
      console.error(sm);
      throw new Error('failed to parse');
    }
    let res = Tasks[sm.currentTask](i);
    console.log(res);
    switch (sm.currentTask) {
      case 'findOpenTag':
        sm.stack.push({
          tagName: res.tagName,
          open: SelfContainedTags.indexOf(res.tagName) === -1
        });

        if (res.endChar === ' ') {
          sm.nextTask = 'skipSpace';
        } else if (res.endChar === '>') {
          sm.nextTask = 'findTextNode';
        } else {
          throw new Error('finding open tag failed.');
        }
        break;
      case 'findTextNode':
        if (res.followingCloseTag) {
          i++;
          sm.nextTask = 'findCloseTag';
        } else {
          sm.nextTask = 'findOpenTag';
        }
        if (res.text.trim()) {
          sm.stack.push({
            type: 'textNode',
            content: res.text,
            parent: sm.stack[sm.stack.length - 1]
          });
        }
        break;
      case 'findAttr':
        sm.stack[sm.stack.length - 1][res.attrName] = res.attrValue;
        if (res.following === '>') {
          sm.nextTask = 'findTextNode';
        } else if (res.following === ' ') {
          sm.nextTask = 'skipSpace';
        }
        break;
      case 'findCloseTag':
        let h = sm.stack.length - 1;
        if (sm.stack[h-1].open) {
          sm.stack[h-1].firstChild = sm.stack[h];
          sm.stack[h].parent = sm.stack[h-1];
        } else {
          sm.stack[h-1].nextSibling = sm.stack[h];
          sm.stack[h].lastSibling = sm.stack[h-1];
        }
        for (h; h > -1; h--) {
          if (sm.stack[h].open === true) {
            sm.stack[h].open = false;
          }
        }
        sm.nextTask = 'findTextNode';
        break;
      case 'skipSpace':
        // skipSpace only happens in the middle of open tag
        if (res.following === '>') {
          sm.nextTask = 'findTextNode';
        } else {
         sm.nextTask = 'findAttr';
        }
        break;
      default:
        console.error('something wrong');
    }
    sm.preTask = sm.currentTask;
    sm.currentTask = sm.nextTask;
    sm.nextTask = '';
    i = res.index;
  }
  return sm.stack;
}
