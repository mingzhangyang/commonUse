/**
 * Created by yangm11 on 4/7/2017.
 */
'use strict';

/**
 * A function for split lines in CSV file
 * @param s: a line
 * @param sep: default is ,
 * @returns an array of fields
 */
function splitLine(s, sep) {
  sep = sep || ',';
  var elem = '';
  var quo = {
    open: false,
    // seq: '',
    sign: '',
    ready: false
  };
  var array = [];

  for (var i = 0; i < s.length; i++) {
    if (quo.open) {
      elem += s[i];
      if (s[i] === quo.sign) {
        quo.open = false;
        quo.ready = true;
      }
    } else {
      if (s[i] === sep) {
        if (quo.ready) {
          // array.push(elem + quo.seq);
          array.push(elem);
          // quo.seq = '';
          quo.sign = '';
          quo.ready = false;
          elem = '';
          continue;
        }

        array.push(elem);
        elem = '';
        continue;
      }
      // if (s[i] === ' ') {
      //   continue;
      // }
      if (s[i] === '"') { // only double quotes
        quo.open = true;
        quo.sign = '"';
        elem += '"';
        continue;
      }
      elem += s[i];
    }
  }
  // if (quo.seq) {
  //   array.push(quo.seq);
  // }
  // if (elem) {
  //   array.push(elem);
  // }
  array.push(elem);
  return array;
}

function splitLineB(s, sep) {
  sep = sep || ',';
  var elem = '';
  var quo = 0;
  var array = [];

  for (var i = 0; i < s.length; i++) {
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
    elem  += s[i];
  }
  array.push(elem);
  return array;
}

if (typeof module !== 'undefined' && module.parent) {
  module.exports = splitLineB;
} else {
  // test code go here
  let test = [
      'a, b, c, d',
      '"A", B, C, D',
      '"A, B", c, d, e',
      '1, 2, "OK", ,test"Hello World", 567, "","I am fine.", "A, B, C"',
      '10,2,tRNA (cytidine(34)-2\'-O)-methyltransferase TrmL catalyzes the' +
      ' methyl transfer from S-adenosyl-L-methionine to the ribose at the nucleotide 34 wobble position in the two leucyl isoacceptors tRNA(Leu)(CmAA) and tRNA(Leu)(cmnm5UmAA),tRNA (cytidine(34)-2\'-O)-methyltransferase,SpoU_methylase,COG0219,1,1,published,17:04.8,17:04.8,curated',
      '10000155,HY190125,03/19/2015 02:30:00 AM,008XX E 65TH ST,0486,BATTERY,DOMESTIC BATTERY SIMPLE,APARTMENT,false,true,0312,003,20,42,08B,1183157,1862099,2015,02/10/2018 03:50:01 PM,41.776797342,-87.604098905,"(41.776797342, -87.604098905)"'
  ];
  for (let i = 0; i < test.length; i++) {
    let t = test[i];
    let x = splitLine(t);
    let y = splitLineB(t);
    console.log(i, x.length, y.length, x.length === y.length);
  }
  console.log(splitLineB(test[test.length-1]));
}