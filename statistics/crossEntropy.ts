/**
 * Created by yangm11 on 6/28/2017.
 */

function crossEntropy(arr1: number[], arr2: number[]): number {
    if (arr1.length !== arr2.length) {
        throw 'Two arrays with same length are expected';
    }
    let sum: number = 0;
    for (let i = 0; i < arr1.length; i++) {
        sum += arr1[i] * Math.log(arr2[i]);
    }
    return -sum;
}

let x: number =  crossEntropy([0, 1, 0], [0.228, 0.619, 0.153]);
console.log(x);
