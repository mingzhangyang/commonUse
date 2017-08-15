/**
 * Created by yangm11 on 8/15/2017.
 */
'use strict';

// add click handler to expand-collapse-handler class

let ics = document.getElementsByClassName('expand-collapse-handler');

for (let i = 0; i < ics.length; i++) {
  let ic =ics[i];
  ic.addEventListener('click', function () {
    let elem = this.parentNode.lastChild;
    let b = this.classList.contains('fa-plus-square-o');
    if (b) {
      this.classList.remove('fa-plus-square-o');
      this.classList.add('fa-minus-square-o');
      elem.style.display = 'block';
    } else {
      this.classList.remove('fa-minus-square-o');
      this.classList.add('fa-plus-square-o');
      elem.style.display = 'none';
    }
  });
}

// add change handler to input elements

let inps = document.getElementsByTagName('input');

for (let i = 0; i < inps.length; i++) {
  let inp = inps[i];
  inp.addEventListener('change', function () {
    let pnd = this.parentNode._boundData;
    pnd.object[pnd.prop] = this.value;
  });
}