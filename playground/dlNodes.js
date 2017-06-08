/**
 * Created by yangm11 on 6/8/2017.
 */
'use strict';

class InputNode {
  constructor(v) {
    this.value = v;
  }
}

class OutputNode {
  constructor() {
    this.inputs = [];
    this.weight = [];
    this.bias = 0;
  }
  get output() {
    let res = 0;
    for (let i = 0; i < this.inputs.length; i++) {
      res += this.inputs[i] * this.weight[i] - this.bias;
    }
    return 1 / (1 + Math.exp(-res));
  }
  addInput (hN, w) {
    if (hN instanceof HiddenNode) {
      this.inputs.push(hN.output);
    } else if (typeof v === 'number') {
      this.inputs.push(hN);
    }
    w = typeof w === 'undefined' ? 1 : w;
    this.weight.push(w);
  }

}

class HiddenNode {
  constructor() {
    this.inputs = [];
    this.weight = [];
    this.bias = 0;
  }
  get output() {
    let res = 0;
    for (let i = 0; i < this.inputs.length; i++) {
      res += this.inputs[i] * this.weight[i] - this.bias;
    }
    return 1 / (1 + Math.exp(-res));
  }
  addInput (iN, w) {
    if (iN instanceof InputNode) {
      this.inputs.push(iN.value);
    } else if (typeof v === 'number') {
      this.inputs.push(iN);
    }
    w = typeof w === 'undefined' ? 1 : w;
    this.weight.push(w);
  }
}

function test(x, y, z) {
  let iN1 = new InputNode(x);
  let iN2 = new InputNode(y);
  let iN3 = new InputNode(z);

  let hN1 = new HiddenNode();
  let oN = new OutputNode();

  hN1.addInput(iN1, 0.7);
  hN1.addInput(iN2, 0.3);
  hN1.addInput(iN3, 0.9);

// console.log(hN1.output);
  oN.addInput(hN1, 0.8);
  console.log(oN.output);
}

test(0.1, 0.2, 0.3);
test(0.2, 0.3, 0.3);
test(0.3, 0.2, 0.4);
test(0.4, 0.4, 0.3);
test(0.5, 0.2, 0.5);
test(0.6, 0.2, 0.01);






