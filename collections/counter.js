/**
 * Created by yangm11 on 6/20/2017.
 */
'use strict';

class Counter {
  constructor(it) {
    if (typeof it === 'number' || typeof it === 'boolean') {
      throw 'an array or string or iterable expected';
    }
    this.elements = Array.from(it);
  }

  get stat() {
    if (typeof this._stat !== 'undefined') {
      return this._stat;
    }
    let res = {};
    for (let i = 0; i < this.elements.length; i++) {
      if (res[this.elements[i]] === undefined) {
        res[this.elements[i]] = 1;
      } else {
        res[this.elements[i]] += 1;
      }
    }
    this._stat = res;
    return res;
  }

  mostCommon(n) {
    if (typeof n !== 'number') {
      throw 'a number expected';
    }
    let obj = this.stat;
    let keys = Object.keys(obj);
    let res = [];
    for (let i = 0; i < keys.length; i++) {
      res.push({
        element: keys[i],
        count: obj[keys[i]]
      });
    }
    res.sort((a, b) => {
      return b.count - a.count;
    });
    return res.slice(0, n);
  }
}

if (typeof module !== 'undefined' && module.parent) {
  module.exports = Counter;
} else if (typeof window !== 'undefined') {
  console.log('Counter exported to browser');
} else {

  let mlh1 = `GAAGAGACCCAGCAACCCACAGAGTTGAGAAATTTGACTGGCATTCAAGCTGTCCAATCAATAGCTGCCG
CTGAAGGGTGGGGCTGGATGGCGTAAGCTACAGCTGAAGGAAGAACGTGAGCACGAGGCACTGAGGTGAT
TGGCTGAAGGCACTTCCGTTGAGCATCTAGACGTTTCCTTGGCTCTTCTGGCGCCAAAATGTCGTTCGTG
GCAGGGGTTATTCGGCGGCTGGACGAGACAGTGGTGAACCGCATCGCGGCGGGGGAAGTTATCCAGCGGC
CAGCTAATGCTATCAAAGAGATGATTGAGAACTGTTTAGATGCAAAATCCACAAGTATTCAAGTGATTGT
TAAAGAGGGAGGCCTGAAGTTGATTCAGATCCAAGACAATGGCACCGGGATCAGGAAAGAAGATCTGGAT
ATTGTATGTGAAAGGTTCACTACTAGTAAACTGCAGTCCTTTGAGGATTTAGCCAGTATTTCTACCTATG
GCTTTCGAGGTGAGGCTTTGGCCAGCATAAGCCATGTGGCTCATGTTACTATTACAACGAAAACAGCTGA
TGGAAAGTGTGCATACAGAGCAAGTTACTCAGATGGAAAACTGAAAGCCCCTCCTAAACCATGTGCTGGC
AATCAAGGGACCCAGATCACGGTGGAGGACCTTTTTTACAACATAGCCACGAGGAGAAAAGCTTTAAAAA
ATCCAAGTGAAGAATATGGGAAAATTTTGGAAGTTGTTGGCAGGTATTCAGTACACAATGCAGGCATTAG
TTTCTCAGTTAAAAAACAAGGAGAGACAGTAGCTGATGTTAGGACACTACCCAATGCCTCAACCGTGGAC
AATATTCGCTCCATCTTTGGAAATGCTGTTAGTCGAGAACTGATAGAAATTGGATGTGAGGATAAAACCC
TAGCCTTCAAAATGAATGGTTACATATCCAATGCAAACTACTCAGTGAAGAAGTGCATCTTCTTACTCTT
CATCAACCATCGTCTGGTAGAATCAACTTCCTTGAGAAAAGCCATAGAAACAGTGTATGCAGCCTATTTG
CCCAAAAACACACACCCATTCCTGTACCTCAGTTTAGAAATCAGTCCCCAGAATGTGGATGTTAATGTGC
ACCCCACAAAGCATGAAGTTCACTTCCTGCACGAGGAGAGCATCCTGGAGCGGGTGCAGCAGCACATCGA
GAGCAAGCTCCTGGGCTCCAATTCCTCCAGGATGTACTTCACCCAGACTTTGCTACCAGGACTTGCTGGC
CCCTCTGGGGAGATGGTTAAATCCACAACAAGTCTGACCTCGTCTTCTACTTCTGGAAGTAGTGATAAGG
TCTATGCCCACCAGATGGTTCGTACAGATTCCCGGGAACAGAAGCTTGATGCATTTCTGCAGCCTCTGAG
CAAACCCCTGTCCAGTCAGCCCCAGGCCATTGTCACAGAGGATAAGACAGATATTTCTAGTGGCAGGGCT
AGGCAGCAAGATGAGGAGATGCTTGAACTCCCAGCCCCTGCTGAAGTGGCTGCCAAAAATCAGAGCTTGG
AGGGGGATACAACAAAGGGGACTTCAGAAATGTCAGAGAAGAGAGGACCTACTTCCAGCAACCCCAGAAA
GAGACATCGGGAAGATTCTGATGTGGAAATGGTGGAAGATGATTCCCGAAAGGAAATGACTGCAGCTTGT
ACCCCCCGGAGAAGGATCATTAACCTCACTAGTGTTTTGAGTCTCCAGGAAGAAATTAATGAGCAGGGAC
ATGAGGTTCTCCGGGAGATGTTGCATAACCACTCCTTCGTGGGCTGTGTGAATCCTCAGTGGGCCTTGGC
ACAGCATCAAACCAAGTTATACCTTCTCAACACCACCAAGCTTAGTGAAGAACTGTTCTACCAGATACTC
ATTTATGATTTTGCCAATTTTGGTGTTCTCAGGTTATCGGAGCCAGCACCGCTCTTTGACCTTGCCATGC
TTGCCTTAGATAGTCCAGAGAGTGGCTGGACAGAGGAAGATGGTCCCAAAGAAGGACTTGCTGAATACAT
TGTTGAGTTTCTGAAGAAGAAGGCTGAGATGCTTGCAGACTATTTCTCTTTGGAAATTGATGAGGAAGGG
AACCTGATTGGATTACCCCTTCTGATTGACAACTATGTGCCCCCTTTGGAGGGACTGCCTATCTTCATTC
TTCGACTAGCCACTGAGGTGAATTGGGACGAAGAAAAGGAATGTTTTGAAAGCCTCAGTAAAGAATGCGC
TATGTTCTATTCCATCCGGAAGCAGTACATATCTGAGGAGTCGACCCTCTCAGGCCAGCAGAGTGAAGTG
CCTGGCTCCATTCCAAACTCCTGGAAGTGGACTGTGGAACACATTGTCTATAAAGCCTTGCGCTCACACA
TTCTGCCTCCTAAACATTTCACAGAAGATGGAAATATCCTGCAGCTTGCTAACCTGCCTGATCTATACAA
AGTCTTTGAGAGGTGTTAAATATGGTTATTTATGCACTGTGGGATGTGTTCTTCTTTCTCTGTATTCCGA
TACAAAGTGTTGTATCAAAGTGTGATATACAAAGTGTACCAACATAAGTGTTGGTAGCACTTAAGACTTA
TACTTGCCTTCTGATAGTATTCCTTTATACACAGTGGATTGATTATAAATAAATAGATGTGTCTTAACAT
AA`;

  let c = new Counter(mlh1);
  console.log(c);
  console.log(c.stat);
  console.log(c.mostCommon(2));
  console.log(Counter.prototype);
}