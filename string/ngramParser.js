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
    let a = NgParser.split(s);
    let res = [];
    for (let i = 0; i < a.length; i++) {
      let s = a[i];
      let v;
      if (s[0] === '[') {
        v = NgParser.splitArray(s);
      } else {
        v = NgParser.parse(s); 
      }
      if (v[0] === null) {
        if (Array.isArray(v[1])) {
          let t = NgParser.parseArray(v[1]);
          if (t[0] !== null) {
            return [t[0], null];
          }
          res.push(t[1]);
        } else {
          res.push(v[1]);
        }
      } else {
        return [v[0], null];
      }
    }
    return [null, res];
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
    res.push(sub);
    return res;
  }
  static splitArray(s) {
    s = s.toLowerCase().trim();
    if (s[0] !== '[' || s[s.length-1] !== ']') {
      return [new Error('invalide array format'), null];
    }
    let group = 0;
    let sub = '';
    let res = [];
    let i = 1;
    let j = s.length-1;
    while (i < j) {
      switch (s[i]) {
        case ',':
          if (group === 0) {
            res.push(sub);
            sub = '';
          } else {
            sub += s[i];
          }
          break;
        case '(':
          group++;
          sub += s[i];
          break;
        case ')':
          group--;
          sub += s[i];
          break;
        default:
          sub += s[i];
      }
      i++;
    }
    res.push(sub);
    return [null, res];
  }

  // parse a block
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

  // parse a list of blocks
  static parseArray(a) {
    let res = [];
    for (let j = 0; j < a.length; j++) {
      let o = NgParser.parse(a[j]);
      if (o[0] !== null) {
        return [o[0], null];
      } else {
        res.push(o[1]);
      }
    }
    return [null, res];
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
    let s1 = '[display(),hist(actvty,genename,acname,aidtype)]';
    console.log(NgParser.splitArray(s1));

    let ng = new NgParser();
    console.dir(ng.parse(s), {depth: null, colors: true});

  }
} else if (typeof window === 'object') {
  // Browser environment
} 