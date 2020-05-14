/**
 * Created by yangm11 on 9/19/2019.
 */
'use strict';

export default class Block {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  /**
   * Add title to the block
   * @param name, type: string
   * @param position, type: string, candidates: ['left', 'right', 'top', 'bottom', 'middle']
   */
  setName(name, position) {
    this.title = {
      name: name,
      position: position
    }
  }

  setStyle(obj) {
    this.style = {};
    Object.assign(this.style, obj);
  }

  includePoint(x, y) {
    return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height;
  }

  includeBlock(b) {
    return this.includePoint(b.x, b.y) && this.includePoint(b.x + b.width, b.y + b.height);
  }

  draw(ctx) {
    if (!ctx) {
      throw "Canvas context is missing.";
    } else {
      if (this.style) {
        ctx.save();
        Object.assign(ctx, this.style);
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.restore();
      } else {
        ctx.fillRect(this.x, this.y, this.width, this.height);
      }
    }
  }
}