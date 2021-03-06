/**
 * Created by yangm11 on 4/7/2017.
 */
'use strict';

function flattenObj(obj, result, path) {
  let props = Object.keys(obj);
  for (let i = 0; i < props.length; i++) {
    let p = path + (props[i] + '/');
    if (Object.prototype.toString.call(obj[props[i]]) === '[object Object]') {
      flattenObj(obj[props[i]], result, p);
      continue;
    }
    if (Object.prototype.toString.call(obj[props[i]]) === '[object Array]') {
      flattenArr(obj[props[i]], result, p);
      continue;
    }
    result[p] = obj[props[i]];
  }
}

function flattenArr(arr, result, path) {
  for (let i = 0; i < arr.length; i++) {
    let p = path + (i + '/');
    if (Object.prototype.toString.call(arr[i]) === '[object Object]') {
      flattenObj(arr[i], result, p);
      continue;
    }
    if (Object.prototype.toString.call(arr[i]) === '[object Array]') {
      flattenArr(arr[i], result, p);
      continue;
    }
    result[p] = arr[i];
  }
}

function flatten(elem, result, path) {
  result = result || {};
  path = path || '/';

  if (Object.prototype.toString.call(elem) === '[object Object]') {
    flattenObj(elem, result, path);

  } else if (Object.prototype.toString.call(elem) === '[object Array]') {
    flattenArr(elem, result, path);
  } else {
    console.log('Not an object or array!');
  }
  return result;
}

function _flatten_(obj) {
  if (typeof obj !== 'object') {
    throw 'An object expected...';
  }
  let res = {};
  function worker(o, path) {
    let keys = Object.keys(o);
    for (let i = 0; i < keys.length; i++) {
      let cur = o[keys[i]];
      if (typeof cur !== 'object' || cur === null) {
        res[path + '/' + keys[i]] = cur;
        continue;
      }
      worker(cur, path + '/' + keys[i]);
    }
  }
  worker(obj, '');
  return res;
}

function main() {
  let a = [
    {
      "Name":"family with sequence similarity 161 member A",
      "EntrezGeneID":84140,
      "Symbol":"FAM161A",
      "ClinGenDosageSenMap":[],
      "Links":[
        {
          "LinkURL":"https://www.ncbi.nlm.nih.gov/gene/84140",
          "LinkTitle":"Gene"
        },
        {
          "LinkURL":"http://www.genenames.org/data/hgnc_data.php?hgnc_id=HGNC:25808",
          "LinkTitle":"HGNC"
        },
        {
          "LinkURL":"http://www.omim.org/entry/613596",
          "LinkTitle":"OMIM"
        },
        {
          "LinkURL":"https://www.ncbi.nlm.nih.gov/letiation/view/?chr=2&q=FAM161A&assm=GRCh37&from=62051982&to=62081277",
          "LinkTitle":"Variation Viewer"
        },
        {
          "LinkURL":"https://www.ncbi.nlm.nih.gov/letiation/view/?chr=2&q=FAM161A&assm=GRCh38&from=61800240&to=61856074",
          "LinkTitle":"Variation Viewer"
        }
      ]
    },
    {
      "Name":"",
      "EntrezGeneID":null,
      "Symbol":"FAM161A",
      "ClinGenDosageSenMap":[
      ],
      "Links":[]
    }
  ];


  let b = {
    x: 2,
    y: [1, 2, 3],
    z: {m: 0, n: 2, p: {
      a: 'Hello',
      b: [10, 12]
    }}
  };
  // console.log(flatten(a));
  // console.log(_flatten_(b));
  console.log(_flatten_(a));
}

if (typeof module !== 'undefined' && module.parent) {
  module.exports = _flatten_;
} else if (typeof window !== 'undefined') {
  console.log('flatten module running in the browser');
} else {
  main();
}


