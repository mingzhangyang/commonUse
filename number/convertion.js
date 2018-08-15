/**
 * Created by yangm11 on 8/15/2018.
 */
'use strict';
const TimeUnits = [
  {
    unit: 'year',
    value: 365 * 24 * 60 * 60
  }, {
    unit: 'day',
    value: 24 * 60 * 60
  }, {
    unit: 'hour',
    value: 60 * 60
  }, {
    unit: 'minute',
    value: 60
  }, {
    unit: 'second',
    value: 1
  }
];

const VolumeUnits = [
  {
    unit: 'Yb',
    value: Math.pow(1024, 8)
  },
  {
    unit: 'Zb',
    value: Math.pow(1024, 7)
  }, {
    unit: 'Eb',
    value: Math.pow(1024, 6)
  }, {
    unit: 'Pb',
    value: 1024 * 1024 * 1024 * 1024 * 1024
  }, {
    unit: 'Tb',
    value: 1024 * 1024 * 1024 * 1024
  }, {
    unit: 'Gb',
    value: 1024 * 1024 * 1024
  }, {
    unit: 'Mb',
    value: 1024 * 1024
  }, {
    unit: 'Kb',
    value: 1024
  }, {
    unit: 'byte',
    value: 1
  }
];

function convert(units, n) {
  if (n < 0) {
    throw new Error('invalid number, must be a positive integer');
  }
  let res = '';
  let it = n;
  let m;
  for (let unit of units) {
    m = Math.floor(it / unit.value);
    if (m > 0) {
      res += `${m} ${unit.unit} `;
    }
    // it -= m * unit.value;
    it %= unit.value;
  }
  if (res === '') {
    return `${0} ${units[units.length-1].unit}`;
  }
  return res;
}

if (typeof module !== 'undefined' && module.parent) {

} else {
  // test code go here
  console.log(convert(TimeUnits, 0));
  console.log(convert(TimeUnits, 2));
  console.log(convert(TimeUnits, 62));
  console.log(convert(TimeUnits, 172));
  console.log(convert(TimeUnits, 2000));
  console.log(convert(TimeUnits, 20000));
  console.log(convert(TimeUnits, 2000000000));
  console.log('+++++++++++++++++++++++++++++++++++');
  console.log(convert(VolumeUnits, 0));
  console.log(convert(VolumeUnits, 10));
  console.log(convert(VolumeUnits, 1024));
  console.log(convert(VolumeUnits, 65536));
  console.log(convert(VolumeUnits, 1000000));
  console.log(convert(VolumeUnits, 100000000));
  console.log(convert(VolumeUnits, 100000000000));
  console.log(convert(VolumeUnits, 10000000000000));
  console.log(convert(VolumeUnits, 100000000000000));
  console.log(convert(VolumeUnits, 1000000000000000));
}