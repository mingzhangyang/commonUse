/**
 * Created by yangm11 on 7/27/2017.
 */
'use strict';

class MySet extends Set {
  constructor(iterator) {
    super(iterator);
  }

  isSuperset(subset) {
    for (let elem of subset) {
      if (!(this.has(elem))) {
        return false;
      }
    }
    return true;
  }

  union(setB) {
    let un = new MySet(this);
    for (let elem of setB) {
      if (!(this.has(elem))) {
        this.add(elem);
      }
    }
    return un;
  }

  intersection(setB) {
    let ins = new MySet();
    for (let elem of setB) {
      if (this.has(elem)) {
        ins.add(elem);
      }
    }
    return ins;
  }

  difference(setB) {
    let diff = new MySet(this);
    for (let elem of setB) {
      diff.delete(elem);
    }
    return diff;
  }

}

function jaccardSimilarity(set1, set2) {
  set1 = new MySet(set1);
  set2 = new MySet(set2);
  return set1.intersection(set2) / set1.union(set2);
}

if (typeof module !== 'undefined' && module.parent) {
  module.exports = {
    MySet: MySet,
    jaccardSimilarity: jaccardSimilarity
  }
}