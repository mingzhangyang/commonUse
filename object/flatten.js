/**
 * Created by yangm11 on 4/7/2017.
 */
'use strict';


function flattenObj(obj, result, path) {

  var props = Object.keys(obj);
  for (var i = 0; i < props.length; i++) {
    var p = path + (props[i] + '/');
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

  for (var i = 0; i < arr.length; i++) {
    var p = path + (i + '/');
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

var a = [
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
        "LinkURL":"https://www.ncbi.nlm.nih.gov/variation/view/?chr=2&q=FAM161A&assm=GRCh37&from=62051982&to=62081277",
        "LinkTitle":"Variation Viewer"
      },
      {
        "LinkURL":"https://www.ncbi.nlm.nih.gov/variation/view/?chr=2&q=FAM161A&assm=GRCh38&from=61800240&to=61856074",
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


console.log(flatten(a));
