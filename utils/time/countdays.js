/*********************************************************************
 * Created by mingzhang on 6/20/18
 ********************************************************************/

'use strict';

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

/**
 * Given the start and end time in Unix (milliseconds elapsed since 1970-01-01) to
 * compute how many days elapsed
 * @param start: start time in Unix format
 * @param end: end time in Unix format
 */
function countDays(start, end) {
    let t = (end - start) / DAY;
    let res = {};
    res.days = Math.floor(t);
    t -= res.days;
    t /= HOUR;
    res.hours = Math.floor(t);
    t -= res.hours;
    t /= MINUTE;
    res.minutes = Math.floor(t);
    t -= res.minutes;
    t /= SECOND;
    res.seconds = Math.floor(t);
    return res;
}

/**
 * To calculate how many weekdays passed given the start day and days passed
 * @param start: the weekday of the start day, sunday (0) - saturday (6)
 * @param days: an integer representing days passed
 */
function weekdays(start, days) {
    let rem = days % 7;
    let n = (days - rem) / 7;
    let m = 0;
    for (let i = 1; i <= rem; i++) {
        if (start + i !== 6 && start + i !== 7) {
            m++;
        }
    }
    return n * 5 + m;
}

if (typeof window === 'object' && typeof global === 'undefined') {
    // work in browser

} else {
    if (typeof module === 'object' && module.parent) {
        // work as a module

    } else {
        // work as an exectuable
        let d = Date.parse('2018-03-05');
        let d2 = Date.parse('2014-12-20');
        let now = Date.now();
        console.log(d);
        console.log(now);
        console.log(countDays(d, now));
        console.log(weekdays(3, 5));
    }
}


