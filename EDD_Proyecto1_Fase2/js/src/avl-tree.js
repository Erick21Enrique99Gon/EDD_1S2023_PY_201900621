class AvlNode {
    constructor(/*item*/ v) {
        this./*item*/v = /*item*/v;
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

    getHeight(node) {
        return node === null ? -1 : node.height;
    }

    getMaxHeight(leftNode, rightNode) {
        return leftNode > rightNode ? leftNode : rightNode;
    }
    #rotateRight(node1) {
        var node2 = node1.right;
        node1.right = node2.left;
        node2.left = node1;
        node1.height = this.getMaxHeight(this.getHeight(node1.left), this.getHeight(node1.right)) + 1;
        node2.height = this.getMaxHeight(this.getHeight(node2.right), node1.height) + 1;
        return node2;
    }
    #rotateLeft(node2) {
        var node1 = node2.left;
        node2.left = node1.right;
        node1.right = node2;
        node2.height = this.getMaxHeight(this.getHeight(node2.left), this.getHeight(node2.right)) + 1;
        node1.height = this.getMaxHeight(this.getHeight(node1.left), node2.height) + 1;
        return node1;
    }
    #doubleLeft(node) {
        node.left = this.#rotateRight(node.left);
        return this.#rotateLeft(node);
    }
    #doubleRight(node) {
        node.right = this.#rotateLeft(node.right);
        return this.#rotateRight(node);
    }
    insertValue(/*item*/v) {
        this.root = this.#insertRecursive(/*item*/v, this.root);
    }

    // #insertNodeRecursive(/*item*/v, node) {
    //     if (node == null) {
    //         node = new AvlNode(/*item*/v);
    //     } else if(/*item.carne*/v < node./*item.carne*/v) {
    //         node.left = this.#insertNodeRecursive(/*item*/v, node.left);
    //         if (this.getHeight(node.left)-this.getHeight(node.right) == 2) {
    //             if (/*item.carne*/v < node.left./*item.carne*/v) {
    //                 node = this.#rotateLeft(node);
    //             } else {
    //                 node = this.#doubleLeft(node);
    //             }
    //         }
    //     }else if (/*item.carne*/v > node./*item.carne*/v) {
    //         node.right = this.#insertNodeRecursive(/*item*/v, node.right);
    //         if (this.getHeight(node.right)-this.getHeight(node.left) == 2) {
    //             if (/*item.carne*/v < node.right./*item.carne*/v) {
    //                 node = this.#rotateRight(node);
    //             } else {
    //                 node = this.#doubleRight(node);
    //             }
    //         }
    //     }else {
    //         console.log("Elemento ya existe en el árbol");
    //     }
    //     node.height = this.getMaxHeight(this.getHeight(node.left), this.getHeight(node.right)) + 1;
    //     return node;
    // }
    #insertRecursive(v, node) {
        if (node == null) {
            node = new AvlNode(v);
        } else if (v < node.v) {
            node.left = this.#insertRecursive(v, node.left);
            if (this.getHeight(node.left) - this.getHeight(node.right) == 2) {
                if (v < node.left.v) {
                    node = this.#rotateLeft(node);
                } else {
                    node = this.#doubleLeft(node);
                }
            }
        } else if (v > node.v) {
            node.right = this.#insertRecursive(v, node.right);
            if (this.getHeight(node.left) - this.getHeight(node.right) == 2) {
                if (v > node.right.v) {
                    node = this.#rotateRight(node);
                } else {
                    node = this.#doubleRight(node);
                }
            }
        } else {
            alert("Elemento ya existe en el árbol");
        }
        node.height = this.getMaxHeight(this.getHeight(node.left), this.getHeight(node.right)) + 1;
        return node;
    }

    Graph() {
        nodes = "";
        connections = "";
        this.#GraphRecursive(this.root);
        console.log("digraph G {\n" + nodes + connections + "}");
        return "digraph G {\n" + nodes + connections + "}";
    }
    #GraphRecursive(node) {
        if (node != null) {
            nodes += node./*item.carne*/v + "[label=\"" + node./*item.carne*/v + "\"];\n";
            if (node.left != null) {
                connections += node./*item.carne*/v + "->" + node.left./*item.carne*/v + ";\n";
                this.#GraphRecursive(node.left);
            }
            if (node.right != null) {
                connections += node./*item.carne*/v + "->" + node.right./*item.carne*/v + ";\n";
                this.#GraphRecursive(node.right);
            }
        }
    }
}
module.exports = AvlTree;