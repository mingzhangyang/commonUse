'use strict';

export class Circle {
  constructor(obj) {
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