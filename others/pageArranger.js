'use strict';

/**
 * Given the start page number and the end page number,
 * calculate the arrangement of pages on each sheet for booklet.
 * @param {start page number} m : psotive int
 * @param {end page number} n : positive int
 * n should be equal or greater then m 
 */
function arrange(m, n) {
    let pages = [];
    for (let i = m; i < n+1; i++) {
        pages.push(i);
    }
    let r = pages.length % 4;
    if (r) {
        for (let i = 0; i < (4-r); i++) {
            pages.push(0);
        }
    }
    // console.log(pages); // for debugging
    let sheets = pages.length / 4;
    let res = [];
    let start = 0;
    let end = pages.length - 1;
    for (let i = 0; i < sheets; i++) {
        let tmp = [0, 0, 0, 0];
        tmp[0] = pages[end];
        tmp[1] = pages[start];
        tmp[2] = pages[start+1];
        tmp[3] = pages[end-1];
        start += 2;
        end -= 2;
        res.push(tmp);
    }
    return res;
}

// console.log(arrange(1, 1));
// console.log(arrange(1, 2));
// console.log(arrange(1, 3));
// console.log(arrange(1, 4));
// console.log(arrange(1, 5));
// console.log(arrange(1, 6));
// console.log(arrange(1, 7));
// console.log(arrange(1, 8));
console.log(arrange(19, 53));