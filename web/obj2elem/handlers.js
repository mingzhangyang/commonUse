/**
 * Created by yangm11 on 8/15/2017.
 */
'use strict';

// add click handler to expand-collapse-handler class

(function () {
  let ics = document.getElementsByClassName('expand-collapse-handler');

  for (let i = 0; i < ics.length; i++) {
    let ic =ics[i];
    ic.addEventListener('click', function () {
      let elem = this.parentNode.lastChild;
      let b = this.classList.contains('fa-plus-square-o');
      if (b) {
        this.classList.remove('fa-plus-square-o');
        this.classList.add('fa-minus-square-o');
        // elem.style.display = 'block';
        elem.classList.remove('collapsed');
      } else {
        this.classList.remove('fa-minus-square-o');
        this.classList.add('fa-plus-square-o');
        // elem.style.display = 'none';
        elem.classList.add('collapsed');
      }
    });
  }
})();

// add change handler to input elements

(function () {
  let inps = document.getElementsByClassName('terminus-value');

  for (let i = 0; i < inps.length; i++) {
    let inp = inps[i];
    inp.addEventListener('change', function () {
      this.classList.add('value-modified');
      let pnd = this.parentNode._boundData;
      pnd.object[pnd.prop] = this.value;
    });
  }
})();

// add 'add' and 'remove' handler to icons

(function () {
  let pluses = document.getElementsByClassName('fa-plus');

  let insertedTemplate = '<div class="obj2elem-div"><div>Name:<input name="name" id="name">Value:<input name="value" id="value"></div><div id="confirm-panel"><input id="add-icon" type="button" value="Add"><span>&#8198;&#8198;</span><input id="cancel-icon" type="button" value="Cancel"></div></div>';

  for (let i = 0; i < pluses.length; i++) {
    let plus = pluses[i];
    plus.addEventListener('click', function () {
      let cNode = this.parentNode.parentNode;
      let ref = cNode.lastChild.firstChild;
      let div = cNode.lastChild.insertBefore(document.createElement('div'), ref);
      div.innerHTML = insertedTemplate;
      // let _1 = document.createElement('input');
      // let _2 = document.createElement('input');
      // _1.classList.add('prop-name');
      // _1.value = 'prop-name';
      // _2.classList.add('terminus-value');
      // _2.value = 'value';
      // let span = document.createElement('span');
      // span.textContent = ':';
      // div.appendChild(_1);
      // div.appendChild(span);
      // div.appendChild(_2);
    });
  }

  let minuses = document.getElementsByClassName('fa-times');


})();