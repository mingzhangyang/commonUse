/**
 * Created by yangm11 on 6/26/2019.
 */
'use strict';

class Circle {
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

function draw(id, shapes) {
  let svg = document.getElementById(id);
  for (let shape of shapes) {
    svg.appendChild(shape.generate());
  }
}

function d2Alpha(R, r, d) {
  let m = d * d + r * r - R * R;
  let n = 2 * d * r;
  let t = Math.atan(Math.sqrt((n - m) / (n + m) ));
  return t * 4;
}

function alpha2d(alpha, R, r) {
  return r * Math.cos(alpha / 2) + Math.sqrt(R * R - Math.pow(r * Math.sin(alpha/2), 2));
}

function alpha2area(alpha, R, r) {
  if (alpha === 0) {
    return 0;
  }
  if (alpha <= Math.PI) {
    let a = alpha * r * r / 2 - r * Math.sin(alpha / 2) * r * Math.cos(alpha / 2);
    let beta = Math.asin(r * Math.sin(alpha / 2) / R) * 2;
    let b = beta * R * R / 2 - R * Math.sin(beta / 2) * R * Math.cos(beta / 2);
    return a + b;
  }
  else {
    let a = alpha * r * r / 2 + r * Math.sin(alpha / 2) * r * Math.cos(alpha / 2);
    let beta = Math.asin(r * Math.sin(alpha / 2) / R) * 2;
    let b = beta * R * R / 2 - R * Math.sin(beta / 2) * R * Math.cos(beta / 2);
    return a + b;
  }
}


(() => {
  let c1 = new Circle({
    center: [150, 150],
    radius: 150,
    otherProps: {
      fill: "yellow",
      opacity: .8
    }
  });
  let c2 = new Circle({
    center: [320, 150],
    radius: 90,
    otherProps: {
      fill: "dodgerblue",
      opacity: .5
    }
  });
  draw('svg', [c1, c2]);

  let a = Math.PI / 12;
  // for (let i  = 0; i < 25; i++) {
  //   console.log(i * 15, alpha2area(i * a, 8, 4) / (16 * Math.PI));
  // }
  // for (let i  = 0; i < 25; i++) {
  //   console.log(i * 15, alpha2d(i * a, 8, 4));
  // }

  // for (let i = 0; i < 17; i++) {
  //   console.log(12 - i * .5, alpha2area(d2Alpha(8, 4, 12 - i * .5), 8, 4) / (Math.PI * 4 * 4));
  // }

  console.log(d2Alpha(8, 4, 12));
  console.log(d2Alpha(8, 4, 4));

})();
