/**
 * Created by mingzhang on 9/1/18.
 */
'use strict';

// function parseHTML(str) {
//   if (typeof str !== 'string') {
//     throw new Error('string argument expected.');
//   }
//   let i = str.indexOf('<');
//   if (i === -1) {
//     throw new Error('invalid string, no "<" found.');
//   }
//   const Tasks = {
//     findOpenTag: function(i) {
//       let s = '';
//       while (str[i] !== ' ' && str[i] !== '>') {
//         s += str[i++];
//       }
//       if (str[i] === ' ') {
//         return {
//           tagName: s,
//           endChar: str[i], // if " ", skipSpace; else if ">", findTextNode
//           index: i
//         };
//       } else {
//         return {
//           tagName: s,
//           endChar: str[i], // if " ", skipSpace; else if ">", findTextNode
//           index: i+1
//         };
//       }
//
//     },
//     // skipSpace happens in the middle of open tag
//     skipSpace: function (i) {
//       while (str[i] === ' ') {
//         i++;
//       }
//       return {
//         index: i,
//         endChar: str[i]
//       };
//     },
//     findAttr: function (i) {
//       let s = '';
//       let equalMark = false;
//       let quotes = 0;
//       while (i < str.length) {
//         if (str[i] === '=') {
//           equalMark = true;
//         }
//         if (str[i] === '"') {
//           quotes++;
//         }
//         if (str[i] === ' ' && !equalMark) {
//           return {
//             attrName: s,
//             attrValue: true,
//             endChar: ' ',
//             index: i
//           };
//         }
//         if (str[i] === '>' && !equalMark) {
//           return {
//             attrName: s,
//             attrValue: true,
//             endChar: '>',
//             index: i
//           };
//         }
//         if (str[i] === '"' && equalMark && quotes === 1) {
//           let a = s.split('="');
//           return {
//             attrName: a[0],
//             attrValue: a[1],
//             endChar: '"',
//             index: i+1
//           };
//         }
//         s += str[i++];
//       }
//     },
//     // findTextNode happens between open and closing tag
//     findTextNode: function (i) {
//       let s = '';
//       while (str[i] !== '<') {
//         s += str[i++];
//       }
//       return {
//         text: s,
//         followingCloseTag: str[i+1] === '/', // if true, findCloseTag; else
//         // findOpenTag
//         index: i+1
//       };
//     },
//     findCloseTag: function (i) {
//       let s = '';
//       i++; // str at current index is "/", so we need go next index
//       while (str[i] !== '>') {
//         s += str[i++];
//       }
//       return {
//         tagName: s,
//         index: i+1
//       };
//     }
//   };
//   // list of tags that are without closing tag
//   const SelfContainedTags = [
//     'br',
//     'input'
//   ];
//
//   // sm: state machine
//   let sm = {
//     stack: [],
//     // currentObject: {}, // not necessary, just use the last object in the stack
//     // currentElementDone: true, // not necessary, can be determined by the length of stack
//     currentTask: 'findOpenTag',
//     preTask: '',
//     nextTask: '',
//     count: 0
//   };
//   i++;
//   while (i < str.length - 1 && sm.count < str.length) {
//     console.log(i, str.length);
//     sm.count++;
//     if (!Tasks[sm.currentTask]) {
//       console.error(sm);
//       throw new Error('failed to parse');
//     }
//     let res = Tasks[sm.currentTask](i);
//     console.log(res);
//     switch (sm.currentTask) {
//       case 'findOpenTag':
//         sm.stack.push({
//           tagName: res.tagName,
//           open: SelfContainedTags.indexOf(res.tagName) === -1
//         });
//
//         if (res.endChar === ' ') {
//           sm.nextTask = 'skipSpace';
//         } else if (res.endChar === '>') {
//           sm.nextTask = 'findTextNode';
//         } else {
//           throw new Error('finding open tag failed.');
//         }
//         break;
//       case 'findTextNode':
//         if (res.followingCloseTag) {
//           i++;
//           sm.nextTask = 'findCloseTag';
//         } else {
//           sm.nextTask = 'findOpenTag';
//         }
//         if (res.text.trim()) {
//           sm.stack.push({
//             type: 'textNode',
//             content: res.text,
//             parent: sm.stack[sm.stack.length - 1]
//           });
//         }
//         break;
//       case 'findAttr':
//         sm.stack[sm.stack.length - 1][res.attrName] = res.attrValue;
//         if (res.following === '>') {
//           sm.nextTask = 'findTextNode';
//         } else if (res.following === ' ') {
//           sm.nextTask = 'skipSpace';
//         }
//         break;
//       case 'findCloseTag':
//         let h = sm.stack.length - 1;
//         if (sm.stack[h-1].open) {
//           sm.stack[h-1].firstChild = sm.stack[h];
//           sm.stack[h].parent = sm.stack[h-1];
//         } else {
//           sm.stack[h-1].nextSibling = sm.stack[h];
//           sm.stack[h].lastSibling = sm.stack[h-1];
//         }
//         for (h; h > -1; h--) {
//           if (sm.stack[h].open === true) {
//             sm.stack[h].open = false;
//             break;
//           }
//         }
//         sm.nextTask = 'findTextNode';
//         break;
//       case 'skipSpace':
//         // skipSpace only happens in the middle of open tag
//         if (res.following === '>') {
//           sm.nextTask = 'findTextNode';
//         } else {
//          sm.nextTask = 'findAttr';
//         }
//         break;
//       default:
//         console.error('something wrong');
//     }
//     sm.preTask = sm.currentTask;
//     sm.currentTask = sm.nextTask;
//     sm.nextTask = '';
//     i = res.index;
//   }
//   return sm.stack;
// }

function splitLine(s, sep) {
  sep = sep || ',';
  let elem = '';
  let quo = 0;
  let array = [];

  for (let i = 0; i < s.length; i++) {
    if (s[i] === '"') {
      if (quo === 0) {
        quo++;
      } else {
        quo--;
      }
    }
    if (s[i] === sep) {
      if (quo === 0) {
        array.push(elem);
        elem = '';
        continue;
      }
    }
    elem += s[i];
  }
  array.push(elem);
  return array;
}

function parseHTML(str) {
  if (typeof str !== 'string') {
    throw new Error('HTML string expected.');
  }
  let i = str.indexOf('<');
  if (i === '-1') {
    throw new Error('no HTML tag identified.');
  }
  let nodeList = [];
  let TagsWithoutClosingTag = ['input', 'br'];
  const Handlers = {
    processOpenTag: function (i) {
      let j = i+1;
      while (j < str.length && str[j] !== '>') {
        j++;
      }
      if (j === str.length) {
        throw new Error('open tag not closed');
      }

      let arr = splitLine(str.slice(i+1, j), ' ');
      // console.log(arr);
      if (arr.length < 1) {
        throw new Error('empty tag: ' + str(i, j+1));
      }
      let obj = {
        tagName: arr[0],
        open: TagsWithoutClosingTag.indexOf(arr[0]) === -1
      };
      for (let k = 1; k < arr.length; k++) {
        let field = arr[k].split('=');
        if (field.length === 1) {
          obj[field[0]] = true;
        } else {
          if (field.length > 2) {
            throw new Error('invalid attribute: ' + arr[k]);
          }
          let attr = field[0];
          let value = field[1];
          if  (value[0] !== '"' || value[value.length-1] !== '"') {
            throw new Error('invalid attribute: ' + arr[k]);
          }
          obj[attr] = value.slice(1, -1);
        }
      }

      for (let h = nodeList.length - 1; h > -1; h--) {
        if (nodeList[h].open) {
          obj.parentNode = nodeList[h];
          if (h === nodeList.length - 1) {
            nodeList[h].firstChild = obj;
          }
          break;
        }
      }
      for (let h = nodeList.length - 1; h > -1; h--) {
        if (nodeList[h].parentNode === obj.parentNode) {
          nodeList[h].nextSibling = obj;
          obj.previousSibling = nodeList[h];
          break;
        }
        if (nodeList[h] === obj.parentNode) {
          break;
        }
      }

      nodeList.push(obj);
      return j+1; // the first char after ">"
    },
    processTextNode: function (i) {
      let s = '';
      while (str[i] !== '<') {
        s += str[i++];
      }
      if (s) {
        let obj = {
          type: 'textNode',
          content: s
        };

        for (let h = nodeList.length - 1; h > -1; h--) {
          if (nodeList[h].open) {
            obj.parentNode = nodeList[h];
            if (h === nodeList.length - 1) {
              nodeList[h].firstChild = obj;
            }
            break;
          }
        }
        for (let h = nodeList.length - 1; h > -1; h--) {
          if (nodeList[h].parentNode === obj.parentNode) {
            nodeList[h].nextSibling = obj;
            obj.previousSibling = nodeList[h];
            break;
          }
          if (nodeList[h] === obj.parentNode) {
            break;
          }
        }

        nodeList.push(obj);
      }
      return i; // the index of "<"
    },
    processClosingTag: function (i) {
      let s = '';
      i++; // str at current index is "/", so we need go next index
      while (str[i] !== '>') {
        s += str[i++];
      }
      let k = nodeList.length-1;
      for (k; k > -1; k--) {
        if (nodeList[k].open) {
          if (nodeList[k].tagName !== s) {
            throw new Error('tag name not match. Something wrong.');
          } else {
            nodeList[k].open = false;
            break;
          }
        }
      }
      return i+1; // the first char after ">"
    }
  };

  i = Handlers.processOpenTag(i);
  let task = 'processTextNode';
  while (i < str.length) {
    console.log(i, task);
    if (!Handlers[task]) {
      throw new Error('can not proceed');
    }
    let j = Handlers[task](i);
    switch (str[j]) {
      case '<':
        if (str[j+1] === '/') {
          task = 'processClosingTag';
           i = j+1;
        } else {
          task = 'processOpenTag';
          i = j;
        }
        break;
      default:
        task = 'processTextNode';
        i = j;
    }
  }
  return nodeList;
}

let s = '<h1><span>Hello world!</span>  <a href="hello.world">Link</a></h1>';
console.log(parseHTML(s));
