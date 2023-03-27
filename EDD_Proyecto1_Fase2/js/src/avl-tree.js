class AvlNode {
    constructor(item) {
        this.item = item;
        this.left = null;
        this.right = null;
        this.height = 0;
    }
}

let = nodes = ""
let = connections = ""

class AvlTree {
    constructor() {
        this.root = null;
    }
    getHeigth(node) {
        return node === null ? -1 : node.height;
    }

    rightRotation(y) {
        let x = y.left;
        let T2 = x.right;
        x.right = y;
        y.left = T2;
        y.height = Math.max(this.getHeigth(y.left), this.getHeigth(y.right)) + 1;
        x.height = Math.max(this.getHeigth(x.left), this.getHeigth(x.right)) + 1;
        return x;
    }
}