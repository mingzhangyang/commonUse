/**
 * Created by yangm11 on 8/18/2017.
 */
'use strict';

/*
 *  It is too hard to create a complete brain.
 *  As a try, create a specialized brain, which
 *    * receive a text file as input
 *    * determine whether it is code
 *    * if yes, then what programming language
 *
 *  This seems to be a task that a function can handle.
 *  But try to think as a creator.
 *
 *  Try to create a crawler living in the world of file system.
 *  It can craw its world,
 *    * learn how the world is laid out
 *    * the types of things it sees in its world
 *
 *  To create such a creature, several predefined skills should
 *  be assigned.
 */

function classify(subject) {
  // determine the type of the subject
}

function characterize(subject) {
  // process data to get a standardized object

}

class Patterns {
  constructor() {

  }
}

class Memory {
  constructor() {
    this.patterns = new Patterns();
  }
  search() {

  }
  dump(analyzedData) {

  }
}

class Brain {
  constructor () {
    this.memory = new Memory();
  }

  fetchData(d) {
    // receive data, analyze the pattern

    this.memory.dump(analyzedData);
  }

}
