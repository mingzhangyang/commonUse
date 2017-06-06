/**
 * Created by yangm11 on 5/31/2017.
 */
'use strict';

function hex2rgb(hex) {
  if (typeof hex !== 'string') {
    throw new Error('A string representing hex code expected');
  }
  if (hex[0] === '#') {
    hex = hex.slice(1);
  }
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    throw 'Please check your hex code.';
  }
  let rgb = parseInt(hex, 16);
  let r = (rgb >> 16) & 0xFF;
  let g = (rgb >> 8) & 0xFF;
  let b = rgb & 0xFF;
  return 'rgb(' + r + ',' + g + ',' + b + ')';
}

class colorObj {
  constructor (str) {
    if (str.startsWith('#')) { // #f66 or #FF6666
      this.hex = str;
    }
    if (str.startsWith('rgb')) { // rgb(255, 102, 102)
      this.rgb = str;
    }
  }

  toRGB() {
    if (this.rgb) {
      return this.rgb;
    }
    if (this.hex) {
      this.rgb = hex2rgb(this.hex);
      return this.rgb;
    }
  }
}




console.log(hex2rgb('#00eeee'));

let cc = `#00eeee 
#8a2be2 
#7fffd4 
#6495ed 
#8b0000 
#cd0000 
#ee0000 
#ff0000 
#000000 
#ffc125 
#eeb422 
#cd9b1d 
#8b6914 
#daa520 
#cdad00 
#eec900 
#ffd700 
#f5f5f5 
#68228b 
#9a32cd 
#b23aee 
#bf3eff 
#9932cc 
#e3e3e3 
#bebebe 
#ee6aa7 
#8b4789 
#cd69c9 
#ee7ae9 
#da70d6 
#ff83fa 
#8b3a62 
#cd6090 
#ff6eb4 
#ff69b4 
#e066ff 
#ffff00 
#000000 
#000000 
#aefff4 
#007ba7 
#40e0d0`;

let res = [];

cc = cc.split('\n').map(d => d.trim());
for (let i = 0; i < cc.length; i++) {
  res.push(hex2rgb(cc[i]));
}
console.log(res);
