/*********************************************************************
 * Created by mingzhang on 6/22/18
 ********************************************************************/

'use strict';

class Circle {
    constructor(ctx, center, radius, fill, options) {
        this.ctx = ctx;
        this.center = center;
        this.radius = radius;
        this.fill = (fill === undefined ? false : fill);
        this.options = options ? options : {};
        Object.assign(this.ctx, this.options);
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.center[0], this.center[1], this.radius, 0, 2 * Math.PI);
        if (this.fill) {
            this.ctx.fill();
        }
        this.ctx.stroke();
    }
    clear() {

    }
}



