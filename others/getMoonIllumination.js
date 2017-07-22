/**
 * Created by yangm11 on 7/11/2017.
 * the getMoonIllumination function is extracted from https://github.com/mourner/suncalc
 * Thank you Vladimir Agafonkin.
 */
'use strict';

const fs = require('fs');
const readline = require('readline');

function getMoonIllumination(date) {
  let PI = Math.PI;
  let sin = Math.sin;
  let cos = Math.cos;
  let tan = Math.tan;
  let asin = Math.asin;
  let atan = Math.atan2;
  let acos = Math.acos;
  let rad = PI / 180;
  let e = rad * 23.4397; // obliquity of the Earth

  let dayMs = 1000 * 60 * 60 * 24;
  let J1970 = 2440588;
  let J2000 = 2451545;

  function toJulian(date) {
    return date.valueOf() / dayMs - 0.5 + J1970;
  }
  function fromJulian(j) {
    return new Date((j + 0.5 - J1970) * dayMs);
  }
  function toDays(date) {
    return toJulian(date) - J2000;
  }

  function solarMeanAnomaly(d) {
    return rad * (357.5291 + 0.98560028 * d);
  }

  function eclipticLongitude(M) {

    let C = rad * (1.9148 * sin(M) + 0.02 * sin(2 * M) + 0.0003 * sin(3 * M)); // equation of center
    let P = rad * 102.9372; // perihelion of the Earth

    return M + C + P + PI;
  }

  function rightAscension(l, b) {
    return atan(sin(l) * cos(e) - tan(b) * sin(e), cos(l));
  }
  function declination(l, b)  {
    return asin(sin(b) * cos(e) + cos(b) * sin(e) * sin(l));
  }

  function sunCoords(d) {
    let M = solarMeanAnomaly(d);
    let L = eclipticLongitude(M);

    return {
      dec: declination(L, 0),
      ra: rightAscension(L, 0)
    };
  }

  function moonCoords(d) { // geocentric ecliptic coordinates of the moon

    let L = rad * (218.316 + 13.176396 * d); // ecliptic longitude
    let M = rad * (134.963 + 13.064993 * d); // mean anomaly
    let F = rad * (93.272 + 13.229350 * d);  // mean distance

    let l  = L + rad * 6.289 * sin(M); // longitude
    let b  = rad * 5.128 * sin(F);     // latitude
    let dt = 385001 - 20905 * cos(M);  // distance to the moon in km

    return {
      ra: rightAscension(l, b),
      dec: declination(l, b),
      dist: dt
    };
  }

  let d = toDays(date || new Date());
  let s = sunCoords(d);
  let m = moonCoords(d);

  let sdist = 149598000; // distance from Earth to Sun in km

  let phi = acos(sin(s.dec) * sin(m.dec) + cos(s.dec) * cos(m.dec) * cos(s.ra - m.ra));
  let inc = atan(sdist * sin(phi), m.dist - sdist * cos(phi));
  let angle = atan(cos(s.dec) * sin(s.ra - m.ra), sin(s.dec) * cos(m.dec) - cos(s.dec) * sin(m.dec) * cos(s.ra - m.ra));

  return {
    fraction: (1 + cos(inc)) / 2,
    phase: 0.5 + 0.5 * inc * (angle < 0 ? -1 : 1) / PI,
    angle: angle
  };
}

function parseFile(path) {
  let rl = readline.createInterface({
    input: fs.createReadStream(path, 'utf8'),
    output: process.stdout
  });

  let output = fs.createWriteStream(path.slice(0, -4) + '_illumination.dat', {
    flag: 'w',
    defaultEncoding: 'utf8'
  });
  let tmp = [];

  rl.on('line', line => {
    line = line.trim();
    let start = Date.now();
    let res = getMoonIllumination(new Date(line));
    let lapse = Date.now() - start;
    let str = line + res.fraction + ', ' + res.phase + ', ' + res.angle + ', ' + lapse +  '\n';
    console.log(str);
    tmp.push(str);
    if (tmp.length === 51) {
      output.write(tmp.slice(0, -1).join(''));
      tmp = tmp.slice(-1);
    }
  }).on('close', () => {
    output.end(tmp.join('').slice(0, -1));
    console.log('Done!');
  })
}

function generator(rows) {
  let output = fs.createWriteStream('test.dat', 'utf8');
  let d = 10 * 365 * 24 * 60 * 60 * 1000;
  let now = Date.now();
  let res = '';
  for (let i = 0; i < rows; i++) {
    let rand = Math.random();
    let str = new Date(rand > 0.5 ? now + Math.floor(rand * d) : now - Math.floor(rand * d));
    res += str + '\n';
  }
  output.end(res.slice(0, -1));
}

if (typeof module !== 'undefined' && module.parent) {
  module.exports = {
    parseFile: parseFile,
    getMoonIllumination: getMoonIllumination
  };
  console.log('getMoonIllumination exported');
} else {

  // console.log(module.parent);
  let args = process.argv;
  // console.log(args);

  if (args[2] && args[2].slice(-4) === '.dat') {
    console.log(args[2]);
    parseFile(args[2]);
  } else {
    console.log('Please provide the path to file to be parsed!');
  }

}