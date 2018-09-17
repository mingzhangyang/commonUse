const Margin:number = 2;
const DefaultColor:string = '#000';
const DefaultHeight:number = 20;
const DefaultWidth:number = 20;
const DefaultLineWidth:number = 20;

abstract class Shape {
    public shown: boolean = true;
    public strokeStyle:string = DefaultColor;
    public fillStyle:string = DefaultColor;
    public lineWidth:number = DefaultLineWidth;
    abstract translate(x,y:number):void;
    abstract draw(ctx:object):void;
}


class Point extends Shape {
    x:number;
    y:number;
    constructor(x:number = 0, y:number = 0) {
        super();
        this.x = x;
        this.y = y;
    }
    static distance(p1, p2:Point):number {
        return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2));
    }
    translate(x, y:number):void {
      this.x += x;
      this.y += y;
    }
    draw(ctx):void {

    }
}

class Line extends Shape {
    start:Point;
    end:Point;
    lineWidth:number;
    constructor (p1, p2:Point, lw:number=DefaultLineWidth) {
        super();
        this.start = p1;
        this.end = p2;
        this.lineWidth = lw;
    }
    contain(p:Point):boolean {
        let k = (this.end.y - this.start.y) / (this.end.x - this.start.x);
        return p.x * k - Margin < p.y && p.x * k + Margin > p.y;
    }
    translate(x, y:number):void {
        this.start.x += x;
        this.start.y += y;
        this.end.x += x;
        this.end.y += y;
    }
    draw(ctx):void {
        ctx.strokeStyle = this.fillStyle;
        ctx.beginPath();
        ctx.moveTo(this.start.x, this.start.y);
        ctx.lineTo(this.end.x, this.end.y);
        ctx.closePath();
        ctx.stroke();
    }
}

class Rectangle extends Shape {
    vertex:Point;
    height:number;
    width:number;
    constructor(p:Point, w:number=DefaultWidth, h:number=DefaultHeight) {
        super();
        this.vertex = p;
        this.width = w;
        this.height = h;
    }

    contain(p:Point):boolean {
        return (p.x > this.vertex.x && p.x < this.vertex.x + this.width)
            && (p.y > this.vertex.y && p.y < this.vertex.y + this.height);
    }

    translate (x, y:number):void {
        this.vertex.x += x;
        this.vertex.y += y;
    }
    draw(ctx):void {
        ctx.fillStyle = this.fillStyle;
        ctx.strokeStyle = this.strokeStyle;
        ctx.lineWidth = this.lineWidth;
        if (this.fillStyle === 'transparent') {
            ctx.strokeRect(this.vertex.x, this.vertex.y, this.width, this.height);
        } else if (this.strokeStyle === 'transparent') {
            ctx.fillRect(this.vertex.x, this.vertex.y, this.width, this.height);
        } else {
            ctx.fillRect(this.vertex.x, this.vertex.y, this.width, this.height);
            ctx.strokeRect(this.vertex.x, this.vertex.y, this.width, this.height);
        }
    }
}

class Circle extends Shape {
    center:Point;
    radius:number;
    filled:boolean = true;
    constructor (c:Point, r:number=DefaultWidth) {
        super();
        this.center = c;
        this.radius = r;
    }
    contain(p:Point):boolean {
        return Point.distance(p, this.center) < this.radius;
    }
    translate(x,y:number):void {
        this.center.x += x;
        this.center.y += y;
    }
    draw(ctx):void {
        ctx.fillStyle = this.fillStyle;
        ctx.strokeStyle = this.strokeStyle;
        ctx.lineWidth = this.lineWidth;
        ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2, false);
        if (this.filled) {
            ctx.fill();
        } else {
            ctx.stroke();
        }
    }
}

class Polygon extends Shape {
    vertexes:Point[];
    close:boolean = false;
    constructor (...p:Point[]) {
        super();
        this.vertexes = p;
    }
    translate (x,y:number):void {
        for (let p of this.vertexes) {
            p.x += x;
            p.y += y;
        }
    }
    draw(ctx):void {
        ctx.fillStyle = this.fillStyle;
        ctx.strokeStyle = this.strokeStyle;
        ctx.lineWidth = this.lineWidth;
        ctx.beginPath();
        ctx.moveTo(this.vertexes[0].x, this.vertexes[0].y);
        for (let i = 1; i < this.vertexes.length; i++) {
            ctx.lineTo(this.vertexes[i].x, this.vertexes[i].y);
        }
        ctx.closePath();
        if (this.close) {
            ctx.stroke();
            ctx.fill();
        } else {
            ctx.stroke();
        }
    }
}

class Mask extends Rectangle {
    targets:Shape[];
    constructor (p:Point, w,h:number) {
        super(p, w, h);
        this.shown = false;
    }
    
    track(s:Shape):void {
        this.targets.push(s);
    }

    translate(x,y:number):void {
        for (let s of this.targets) {
            s.translate(x, y);
        }
        this.vertex.x += x;
        this.vertex.y += y;
    }
}