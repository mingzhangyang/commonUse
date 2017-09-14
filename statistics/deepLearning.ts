/**
 * Created by yangm11 on 7/5/2017.
 */

interface Array<T> {
    fill(value: T): Array<T>;
}

function softMax(arr: number[]) {
    let sum: number = 0;
    let t: number[] = [];
    for (let i = 0; i < arr.length; i++) {
        let tmp: number = Math.pow(Math.E, arr[i]);
        sum += tmp;
        t.push(tmp);
    }
    let res: number[] = [];
    for (let i = 0; i < t.length; i++) {
        res.push(t[i] / sum);
    }
    return res;
}

function relu(arr: number[]) {
    let res: number[] = [];
    for (let i = 0; i < arr.length; i++) {
        res.push(arr[i] > 0 ? arr[i] : 0);
    }
    return res;
}

function tanh(arr: number[]) {
    let res: number[] = [];
    for (let i = 0; i < arr.length; i++) {
        let t: number = Math.pow(Math.E, 2 * arr[i]);
        res.push((t - 1) / (t + 1));
    }
    return res;
}

function oneHot(arr: number[]) {
    let max = -Infinity;
    for (let i = 0; i < arr.length; i++) {
        if (max < arr[i]) {
            max = arr[i];
        }
    }
    let res: number[][] = [];
    for (let i = 0; i < arr.length; i++) {
        let r: number[] = new Array(max + 1);
        r.fill(0);
        r[arr[i]] = 1;
        res.push(r);
    }
    return res;
}

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

console.log(softMax([3, 1, 0.2]));
console.log(softMax([1, 2, 3]));