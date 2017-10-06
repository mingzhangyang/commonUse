/**
 * Created by yangm11 on 10/6/2017.
 */
'use strict';

const fs = require('fs');
const request = require('request');
const readline = require('readline');
const path = require('path');
const validUrl = require('valid-url');

function parseFile(path, cb) {
  let urls = [];
  let rl = readline.createInterface({
    input: fs.createReadStream(path, 'utf8')
  });
  rl.on('line', line => {
    let url = line.trim();
    if (validUrl.isUri(url)) {
      urls.push(url);
    }
  }).on('close', () => {
    console.log(urls.length + ' urls found in the file.');
    console.log('Starts to download files ...');
    cb(urls);
  });
}

function downloadOne(url) {
  return new Promise((resolve, reject) => {
    request(url)
      .pipe(fs.createWriteStream(path.basename(url)))
      .on('finish', () => {
        console.log(path.basename(url) + ' downloaded ...');
        resolve(path.basename(url));
      })
      .on('error', () => {
      reject(path.basename(url));
      });
  });
}


function downloadFiles(urls) {
  let res = [];
  for (let i = 0; i < urls.length; i++) {
    res.push(downloadOne(urls[i]));
  }
  return Promise.all(res).then(v => {
    console.log('All done!');
    console.log('The list of files downloaded are as follows:');
    console.log(v);
  });
}

function worker(path) {
  parseFile(path, downloadFiles);
}

if (typeof module !== 'undefined' && module.parent) {

} else {
  // test code go here
  let p = process.argv[2];
  if (p) {
    worker(p);
  }
}