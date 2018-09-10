/**
 * Created by yangm11 on 9/10/2018.
 */
'use strict';

function parseURL(url, sep='&', eq='=') {
  if (typeof url !== 'string') {
    throw new TypeError('a string expected');
  }
  let res = {
    queryObject: {},
    path: '',
    query: '',
    hash: '',
  };

  // 0: '?' or '#' not found yet
  // 1: '?' found
  // 2: '#' found
  let status = 0;
  let tmp = {
    flag: false,
    key: '',
    value: ''
  };
  for (let i = 0; i < url.length; i++) {
    let cur = url[i];
    if (status === 0) {
      switch (cur) {
        case '?':
          status = 1;
          break;
        case '#':
          status = 2;
          break;
        default:
          res.path += cur;
      }
    } else if (status === 1) {
      switch (cur) {
        case '&':
          if (tmp.key && tmp.value) {
            if (typeof res.queryObject[tmp.key] === 'string') {
              res.queryObject[tmp.key] = [res.queryObject[tmp.key], tmp.value];
            } else if (Array.isArray(res.queryObject[tmp.key])) {
              res.queryObject[tmp.key].push(tmp.value);
            } else {
              res.queryObject[tmp.key] = tmp.value;
            }
            tmp.flag = false;
            tmp.key = '';
            tmp.value = '';
          }
          res.query += cur;
          break;
        case '=':
          tmp.flag = true;
          res.query += cur;
          break;
        case '#':
          status = 2;
          if (tmp.key && tmp.value) {
            if (typeof res.queryObject[tmp.key] === 'string') {
              res.queryObject[tmp.key] = [res.queryObject[tmp.key], tmp.value];
            } else if (Array.isArray(res.queryObject[tmp.key])) {
              res.queryObject[tmp.key].push(tmp.value);
            } else {
              res.queryObject[tmp.key] = tmp.value;
            }
            tmp.flag = false;
            tmp.key = '';
            tmp.value = '';
          }
          break;
        default:
          if (tmp.flag) {
            tmp.value += cur;
          } else {
            tmp.key += cur;
          }
          res.query += cur;
      }
    } else {
      res.hash += cur;
    }
  }
  if (tmp.key && tmp.value) {
    if (typeof res.queryObject[tmp.key] === 'string') {
      res.queryObject[tmp.key] = [res.queryObject[tmp.key], tmp.value];
    } else if (Array.isArray(res.queryObject[tmp.key])) {
      res.queryObject[tmp.key].push(tmp.value);
    } else {
      res.queryObject[tmp.key] = tmp.value;
    }
    tmp.flag = false;
    tmp.key = '';
    tmp.value = '';
  }
  let fullPath = res.path.split('://');
  if (fullPath.length > 1) {
    res.protocol = fullPath[0];
    res.path = fullPath[1];
    let i = res.path.indexOf('@');
    if (i !== -1) {
      res.auth = res.path.slice(0, i);
      res.path = res.path.slice(i+1);
      if (res.auth) {
        [res.user, res.pass] = res.auth.split(':');
      }
      let k = res.path.indexOf('/');
      if (k !== -1) {
        res.host = res.path.slice(0, k);
        res.path = res.path.slice(k);

        let j = res.host.indexOf(':');
        if (j !== -1) {
          res.port = res.host.slice(j+1);
          res.host = res.host.slice(0, j);
        }
      }
    }
  }
  return res;
}


if (typeof module !== 'undefined') {
  // Node environment, 
  if (module.parent) {
    // required as module

  } else {
    // run as executable

    let url = 'https://user:pass@sub.host.com:8080/p/a/t/h?foo=bar&abc=xyz&abc=123#hash';
    console.log(parseURL(url));
    console.log(parseURL('?foo=bar&abc=xyz&abc=123#hash'));
  }
} else if (typeof window === 'object') {
  // Browser environment
} 