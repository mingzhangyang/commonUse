/**
 * Created by yangm11 on 10/17/2018.
 */

/******************************************************************************
 * ngram query examples
 * 1. [display()].from(bioactivity).usingschema(schema.bioactivity)
 * 2. [display(),hist(aidtype,actvty)].from(bioactivity).usingschema(schema.bioactivity)
 * 3. [display(sid,acname,acvalue,actvty,cid,cmpdname,aid,aidtype,aidname,protdefline,gi,pmid)].from(bioactivity).usingschema(schema.bioactivity).matching(aid==1)
 * 4. [display(sid,acname,acvalue,actvty,cid,cmpdname,aid,aidtype,aidname,protdefline,gi,pmid)].from(bioactivity).usingschema(schema.bioactivity).matching(aid in [1,3,5])
 * 5. [display()].from(bioactivity).usingschema(schema.bioactivity).matching(cid==2244)
 * 6. [display()].from(bioactivity).usingschema(schema.bioactivity).matching(cid==2244 && actvty==active)
 * 7. [display(),hist(actvty,genename,acname,aidtype)].from(bioactivity).usingschema(schema.bioactivity).matching(cid==2244&&actvty==active)
 *****************************************************************************/

'use strict';

class NgParser {
  constructor() {}
  parse(s) {

  }
  static split(s) {
    s = s.toLowerCase().trim();
    let group = {
      '[': 0,
      '(': 0
    };
    let res = [];
    let sub = '';
    let i = 0;
    let j = s.length;
    while (i < j) {
      let c = s[i];
      switch (c) {
        case '.':
          if (group['['] === 0 && group['('] === 0) {
            res.push(sub);
            sub = '';
          } else {
            sub += c;
          }
          break;
        case '[':
          group['['] += 1;
          sub += c;
          break;
        case ']':
          group['['] -= 1;
          sub += c;
          break;
        case '(':
          group['('] += 1;
          sub += c;
          break;
        case ')':
          group['('] -= 1;
          sub += c;
          break;
        default:
          sub += c;
      }
      i++;
    }
    return res;
  }
  static splitArray(s) {

  }
  static parse(s) {
    const verbs = ['display', 'from', 'usingschema', 'matching', 'hist'];
    s = s.toLowerCase().trim();
    let i = s.indexOf('(');
    if (i === -1 || s[s.length-1] !== ')') {
      return [new Error('invalid format: incomplete parenthesis'), null];
    }
    let verb = s.slice(0, i);
    if (verbs.indexOf(verb) === -1) {
      return [new Error('invalid verb: ' + verb), null];
    }
    return [null, {
      verb: verb,
      args: s.slice(i+1, -1).split(',').filter(d => !!d.length)
    }];
  }
}

if (typeof module !== 'undefined') {
  // Node environment, 
  if (module.parent) {
    // required as module

  } else {
    // run as executable

    let s = '[display(),hist(actvty,genename,acname,aidtype)].from(bioactivity).usingschema(schema.bioactivity).matching(cid==2244&&actvty==active)';
    console.log(NgParser.split(s));

  }
} else if (typeof window === 'object') {
  // Browser environment
} 