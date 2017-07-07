/**
 * Created by yangm11 on 7/5/2017.
 */
function softMax(arr) {
    var sum = 0;
    var t = [];
    for (var i = 0; i < arr.length; i++) {
        var tmp = Math.pow(Math.E, arr[i]);
        sum += tmp;
        t.push(tmp);
    }
    var res = [];
    for (var i = 0; i < t.length; i++) {
        res.push(t[i] / sum);
    }
    return res;
}
function oneHot(arr) {
    var max = -Infinity;
    for (var i = 0; i < arr.length; i++) {
        if (max < arr[i]) {
            max = arr[i];
        }
    }
    var res = [];
    for (var i = 0; i < arr.length; i++) {
        var r = new Array(max + 1);
        r.fill(0);
        r[arr[i]] = 1;
        res.push(r);
    }
    return res;
}
function crossEntropy(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        throw 'Two arrays with same length are expected';
    }
    var sum = 0;
    for (var i = 0; i < arr1.length; i++) {
        sum += arr1[i] * Math.log(arr2[i]);
    }
    return -sum;
}
console.log(softMax([3, 1, 0.2]));
console.log(softMax([1, 2, 3]));
