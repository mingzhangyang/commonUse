/**
 * Created by mingzhang on 9/14/17.
 */
'use strict';

const fileStream = require('../../files/FileStream');

// console.log(__dirname);

let json = new fileStream(__dirname + '/iris.JSON', 'binary');

let iris = json.toJSON();

// console.log(iris.length);

let sp = {
  "I. setosa": 0,
  "I. versicolor": 1,
  "I. virginica": 2
};

let arr = iris.map(d => {
  return [d.sepalLength, d.sepalWidth, d.petalLength, d.petalWidth, sp[d.species]];
});

if (typeof module !== 'undefined' && module.parent) {
  module.exports = {
    json: json,
    array: arr,
    species: sp
  }
} else {
  console.log(arr);
}