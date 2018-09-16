class GraphNode {
    public value:any;
    public connected:GraphNode[];
    constructor (value:any) {
        this.value = value;
        this.connected = [];
    }

    connect (node:GraphNode) {
        this.connected.push(node);
        node.connect(this);
    }
}