/**
 * Created by yangm11 on 6/26/2019.
 */
'use strict';

export function draw(id, shapes) {
  let svg = document.getElementById(id);
  for (let shape of shapes) {
    svg.appendChild(shape.generate());
  }
}
