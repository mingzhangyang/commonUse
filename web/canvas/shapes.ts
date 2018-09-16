class Point {
    x:number;
    y:number;
    constructor(x:number = 0, y:number = 0) {
        this.x = x;
        this.y = y;
    }
    static distance(p1, p2:Point):number {
        return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2));
    }
}

class Line {

}

class Rectangle {
    vertex:Point;
    height:number;
    width:number;
    constructor(x,y,w,h) {
        this.vertex = new Point(x, y);
        this.width = w;
        this.height = h;
    }

    contain(p:Point) {
        if (p.x < this.vertex.x || p.y < this.vertex )
    }
}

class Circle {

}

class Polygon {
    
}