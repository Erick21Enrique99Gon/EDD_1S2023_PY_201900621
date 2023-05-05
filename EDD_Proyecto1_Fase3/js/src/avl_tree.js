class AvlNode {
    constructor(item ) {
        this.item = item;
        this.left = null;
        this.right = null;
        this.height = 0;
    }
}

let  nodes = ""
let  connections = ""

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
    insertValue(item) {
        this.root = this.#insertRecursive(item, this.root);
    }

    #insertRecursive(item, node) {
        if (node == null) {
            node = new AvlNode(item);
        } else if (item.carnet < node.item.carnet) {
            node.left = this.#insertRecursive(item, node.left);
            if (this.getHeight(node.right) - this.getHeight(node.left) == 2) {
                if (item.carnet < node.left.item.carnet) {
                    node = this.#rotateLeft(node);
                } else {
                    node = this.#doubleLeft(node);
                }
            }
        } else if (item.carnet > node.item.carnet) {
            node.right = this.#insertRecursive(item, node.right);
            if (this.getHeight(node.right) - this.getHeight(node.left) == 2) {
                if (item.carnet > node.right.item.carnet) {
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
            nodes += node.item.carnet + "[label=\"" + node.item.carnet + " " + node.item.nombre + " Altura: " + this.getHeight(node) + "\" shape=box];\n";
            if (node.left != null) {
                connections += node.item.carnet + "->" + node.left.item.carnet + ";\n";
                this.#GraphRecursive(node.left);
            }
            if (node.right != null) {
                connections += node.item.carnet + "->" + node.right.item.carnet + ";\n";
                this.#GraphRecursive(node.right);
            }
        }
    }
    inOrderSeleccion() {
        let html = "    <option selected disabled>Seleccionar Carnet</option>";
        html += this.#inOrderRecursiveSeleccion(this.root);
        return html;
    }
    #inOrderRecursiveSeleccion(current) {
        let row = "";
        if (current.left != null) {
            row += this.#inOrderRecursiveSeleccion(current.left);
        }
        row += `
             <option value="${current.item.carnet}">${current.item.carnet}</option>
        `;
        if (current.right != null) {
            row += this.#inOrderRecursiveSeleccion(current.right);
        }
        return row;
    }
    inOrder() {
        let html = this.#inOrderRecursive(this.root);
        return html;
    }
    #inOrderRecursive(current) {
        let row = "";
        if (current.left != null) {
            row += this.#inOrderRecursive(current.left);
        }
        row += `
            <tr>
                <th>${current.item.carnet}</th>
                <td>${current.item.nombre}</td>
                <td>${current.item.password}</td>
            </tr>
        `;
        if (current.right != null) {
            row += this.#inOrderRecursive(current.right);
        }
        return row;
    }
    
    preOrder() {
        let html = this.#preOrderRecursive(this.root);
        return html;
    }
    #preOrderRecursive(current) {
        let row = "";
        row += `
            <tr>
                <th>${current.item.carnet}</th>
                <td>${current.item.nombre}</td>
                <td>${current.item.password}</td>
            </tr>
        `;
        if (current.left != null) {
            row += this.#preOrderRecursive(current.left);
        }
        if (current.right != null) {
            row += this.#preOrderRecursive(current.right);
        }
        return row;
    }

    postOrder() {
        let html = this.#postOrderRecursive(this.root);
        return html;
    }
    #postOrderRecursive(current) {
        let row = "";
        if (current.left != null) {
            row += this.#postOrderRecursive(current.left);
        }
        if (current.right != null) {
            row += this.#postOrderRecursive(current.right);
        }
        row += `
            <tr>
                <th>${current.item.carnet}</th>
                <td>${current.item.nombre}</td>
                <td>${current.item.password}</td>
            </tr>
        `;
        return row;
    }

    search(carnet) {
        var nodo = this.root;
        while (nodo != null) {
            if (nodo.item.carnet == carnet) {
                return nodo.item;
            } else if (carnet > nodo.item.carnet) {
                nodo = nodo.right;
            } else {
                nodo = nodo.left;
            }
        }
        return null;
    }
    ActualizarCarpetas(itemActualizado) {
        var nodo = this.root;
        while (nodo != null) {
            if (nodo.item.carnet == itemActualizado.carnet) {
                nodo.item.nray_tree.root = itemActualizado.nray_tree.root;
                nodo.item.circular_list.head = itemActualizado.circular_list.head;
                nodo.item.circular_list.tail = itemActualizado.circular_list.tail;
                return;
            } else if (carnet > nodo.item.carnet) {
                nodo = nodo.right;
            } else {
                nodo = nodo.left;
            }
        }
    }
    insetarHash(hashtable) {
        hashtable = this.#insetarHashRecursive(this.root, hashtable);
        return hashtable;
    }
    #insetarHashRecursive(current, hashtable) {
        if (current.left != null) {
            hashtable = this.#insetarHashRecursive(current.left, hashtable);
        }
        hashtable.insert(current.item.carnet, current.item.nombre, current.item.password);
        if (current.right != null) {
            hashtable = this.#insetarHashRecursive(current.right, hashtable);
        }
        return hashtable;
    }
}

//module.exports = AvlTree;