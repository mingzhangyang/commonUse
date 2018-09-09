/**
 * Created by mingzhang on 9/9/18.
 */
'use strict';

// get all combinations without recursion
class Combinator {
  /**
   * create a combinator
   * @param m: an integer
   * @param k: an integer in domain [0, source.length)
   */
  constructor(m, k) {
    this.len = k;
    this.array = new Array(k);
    for (let i = 0; i < k; i++) {
      this.array[i] = {
        value: i,
        max: m - k + i
      };
    }
    this.count = 0;
    this.export = [];
  }
  next() {
    if (this.array[0].value < this.array[0].max + 1) {
      this.export = this.array.map(d => d.value);
      console.log(this.export);
      this.count += 1;

      this.array[this.len-1].value += 1;
      let j = this.len - 1;
      while (j > 0 && this.array[j].value > this.array[j].max) {
        this.array[j-1].value += 1;
        this.array[j].value = j;
        j--;
      }
      j++;
      while (j < this.len) {
        this.array[j].value = this.array[j-1].value + 1;
        j++;
      }

      return this.export;
    } else {
      return null;
    }
  }
}


if (typeof module !== 'undefined') {
  if (module.parent) {
    // serve as module
  } else {
    // run as executable

    let c = new Combinator(10, 2);
    console.log(c);

    while (c.next()) {
      console.log(c.count);
    }

  }
} else if (typeof window !== 'undefined') {
// run in browser

}