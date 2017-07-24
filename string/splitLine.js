/**
 * Created by yangm11 on 4/7/2017.
 */
'use strict';


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

// " A, 'B, C' D, E" is not allowed.
// " A, 'B, C' , D, E" is OK.

if (typeof module !== 'undefined' && module.parent) {
  module.exports = splitLine;
} else {
  // test code go here
  var s = '1, 2, "OK", ,test"Hello World", 567, "","I am fine.", "A, B, C"';
  var a = splitLine(s);
  console.log(a);
  for (var i = 0; i < a.length; i++) {
    console.log(a[i]);
  }

  console.log(splitLine("10,2,tRNA (cytidine(34)-2'-O)-methyltransferase TrmL catalyzes the methyl transfer from S-adenosyl-L-methionine to the ribose at the nucleotide 34 wobble position in the two leucyl isoacceptors tRNA(Leu)(CmAA) and tRNA(Leu)(cmnm5UmAA),tRNA (cytidine(34)-2'-O)-methyltransferase,SpoU_methylase,COG0219,1,1,published,17:04.8,17:04.8,curated"));
}