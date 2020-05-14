/**
 * Created by yangm11 on 6/26/2019.
 */
'use strict';

class Shape {
  constructor() {}
  isShape() {
    return true;
  }
  generate() {}
}

export class Circle extends Shape {
  constructor(obj) {
    super();
    obj = obj ? obj : {};
    if (typeof obj !== "object") {
      throw "invalid argument to create a Circle instance";
    }
    this.center = obj.center ? obj.center : [0, 0];
    this.radius = obj.radius ? obj.radius : 100;
    this.props = {};
    Object.assign(this.props, obj.otherProps);
  }

  generate() {
    let c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c.setAttribute("cx", this.center[0]);
    c.setAttribute("cy", this.center[1]);
    c.setAttribute("r", this.radius);

    let props = Object.keys(this.props);
    for (let prop of props) {
      c.setAttribute(prop, this.props[prop]);
    }
    return c;
  }
}

export function draw(id, shapes) {
  let svg = document.getElementById(id);
  if (!Array.isArray(shapes) && shapes.isShape()) {
    shapes = [shapes];
  }
  for (let shape of shapes) {
    if (shape.isShape()) {
      svg.appendChild(shape.generate());
    } else {
      console.log('Not a shape object. Ignored ...');
    }
  }
}
