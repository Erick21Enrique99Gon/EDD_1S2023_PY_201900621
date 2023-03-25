class Mnode {
    constructor(x, y, value) {
        this.x = x;
        this.y = y;
        this.value = value;
        ///Apuntadores
        this.up = null;
        this.down = null;
        this.right = null;
        this.left = null;
    }
}

//Clase matriz dispersa

class SparseMatrix {
    constructor() {
        this.head = new Mnode(-1, -1, "Inicio");
    }

    insertar(x, y, value) {
        this.#xHeaders(x);
        this.#yHeaders(y);
        const nodo = new Mnode(x, y, value);
        this.#addx(nodo, x);
        this.#addy(nodo, y);
    }

    #addx(newNode, x) {
        let temp = this.head;
        // BUSCAR LA CABECERA
        while (temp.value != x) {
            temp = temp.down;
        }
        // INSERCION SI LA FILA ESTA VACIA
        if (temp.right == null) {
            temp.right = newNode;
            newNode.left = temp;
        } else {
            let curr = temp.right;
            // INSERTAR ORDENADAMENTE
            if (curr.y >= newNode.y) {
                // CAMBIAR DE LUGAR CON EL PRIMERO DE LA LISTA
                newNode.right = curr;
                newNode.right.left = newNode;
                //ENLAZARLO A LA CABECERA
                newNode.left = temp
                temp.right = newNode
                //ASIGNARLO AL PRIMERO DE LA LISTA
                curr = newNode;
            } else {
                while (curr.right != null && curr.right.y < newNode.y) {
                    curr = curr.right;
                }
                newNode.right = curr.right;
                if (curr.right != null) {
                    newNode.right.left = newNode;
                }
                curr.right = newNode;
                newNode.left = curr;
            }

        }

    }

    #addy(newNode, y) {
        let temp = this.head;
        // BUSCAR LA CABECERA
        while (temp.value != y) {
            temp = temp.right;
        }
        // INSERCION SI LA FILA ESTA VACIA
        if (temp.down == null) {
            temp.down = newNode;
            newNode.up = temp;
        } else {
            let curr = temp.down;
            // INSERTAR ORDENADAMENTE
            if (curr.x >= newNode.x) {
                // CAMBIAR DE LUGAR CON EL PRIMERO DE LA LISTA
                newNode.down = curr;
                newNode.down.up = newNode;
                //ENLAZARLO A LA CABECERA
                newNode.up = temp
                temp.down = newNode
                //ASIGNARLO AL PRIMERO DE LA LISTA
                curr = newNode;
            } else {
                while (curr.down != null && curr.down.y < newNode.y) {
                    curr = curr.down;
                }
                newNode.down = curr.down;
                if (curr.down != null) {
                    newNode.down.up = newNode;
                }
                curr.down = newNode;
                newNode.up = curr;
            }

        }
    }

    #xHeaders(x) {
        const curr = new Mnode(-1, -1, x);
        let esta = false;
        if (this.head.down == null) {
            this.head.down = curr;
            curr.up = this.head;
        } else {
            let temp = this.head;
            while (temp.down != null && temp.down.value < x) {
                temp = temp.down;

            }

            if (temp.down == null) {
                temp.down = curr;
                curr.up = temp;
            } else if (temp.down != null && temp.down.value != x) {
                let r = temp.down;
                temp.down = curr;
                curr.up = temp;
                curr.down = r;
                r.up = curr;
            }

        }
    }

    #yHeaders(y) {
        const curr = new Mnode(-1, -1, y);
        if (this.head.right == null) {
            this.head.right = curr;
            curr.left = this.head;
        } else {
            let temp = this.head;
            while (temp.right != null && temp.right.value < y) {
                temp = temp.right;
            }

            if (temp.right == null) {
                temp.right = curr;
                curr.left = temp;
            } else if (temp.right != null && temp.right.value != y) {
                let r = temp.right;
                temp.right = curr;
                curr.left = temp;
                curr.right = r;
                r.left = curr;
            }
        }
    }

    printx() {
        let tx = null;
        try { tx = this.head.down } catch (error) { tx = null; console.log("errorX1"); }
        let ty = null;
        while (tx != null) {
            try { ty = tx.right } catch (error) { ty = null; console.log("errorX2"); }
            let str = ""
            while (ty != null) {
                str += ty.value + ",";
                ty = ty.right;
            }
            console.log(tx.value, ": ", str)
            tx = tx.down;
        }
    }

    printy() {
        let ty = null;
        try { ty = this.head.right } catch (error) { ty = null; console.log("errorY1"); }
        let tx = null;
        while (ty != null) {
            // console.log(ty.value)
            try { tx = ty.down } catch (error) { tx = null; console.log("errorY2"); }
            let str = ""
            while (tx != null) {
                str += tx.value + ",";
                tx = tx.down;
            }
            console.log(ty.value, ": ", str)
            ty = ty.right;
        }
    }
    graph() {
        let code = "graph [nodesep=\"0.8\", ranksep=\"0.6\"]; \n";
        code += "M0[ label = \"Inicio\" width = 1.5 shape = \"square\" style = \"filled\" fillcolor =\"slateblue\" group=\"0\"]; \n";
        code += this.#headersGraph()
        code += this.#nodesGraph()
        code += ""
        console.log(code)
        return code;
    }
    #headersGraph() {
        let conn = "M0 ->";
        let nodes = "";
        let rank = "{rank = same; M0; "
        let temp = null;
        try { temp = this.head.right } catch (error) { temp = null; console.log("GRAPH"); }
        while (temp != null) {
            nodes += "Y" + temp.value + `[label="Y(${temp.value})" width = 1.5 shape ="square" style="filled" fillcolor="skyblue3" group = ${temp.value} ];\n`
            rank += "Y" + temp.value + ";";
            if (temp.right != null) {
                conn += "Y" + temp.value + "->";
            } else {
                conn += "Y" + temp.value + `[dir="both"];\n`;
            }
            temp = temp.right;
        }

        conn += 'M0 ->';
        try { temp = this.head.down } catch (error) { temp = null; console.log("GRAPH"); }
        while (temp != null) {
            nodes += "X" + temp.value + `[label="X(${temp.value})" width = 1.5 shape ="square" style="filled" fillcolor="skyblue3" group="0"];\n`
            if (temp.down != null) {
                conn += "X" + temp.value + "->";
            } else {
                conn += "X" + temp.value + `[dir="both"];\n`;
            }
            temp = temp.down;
        }

        rank += "}";
        return nodes + "\n" + conn + "\n" + rank + "\n";
    }

    #nodesGraph() {
        let conn = "";
        let nodes = "";
        let rank = ""
        let tx = null;
        try { tx = this.head.down } catch (error) { tx = null; console.log("errorX1"); }
        let ty = null;
        while (tx != null) {
            try { ty = tx.right } catch (error) { ty = null; console.log("errorX2"); }
            conn += `X${ty.x} -> `
            while (ty != null) {
                nodes += `S${ty.x}_${ty.y}[label="${ty.value}" width=1.5 shape="square" style="filled" fillcolor="slategray1" group="${ty.y}"];\n`
                rank += `{rank=same; X${ty.x}; S${ty.x}_${ty.y};}\n`;
                if (ty.right != null) {
                    conn += `S${ty.x}_${ty.y} ->`;
                } else {
                    conn += `S${ty.x}_${ty.y} [dir="both"]; \n`;
                }
                ty = ty.right;
            }
            tx = tx.down;
        }

        try { ty = this.head.right } catch (error) { ty = null; console.log("errorY1"); }
        tx = null;
        while (ty != null) {
            try { tx = ty.down } catch (error) { tx = null; console.log("errorX2"); }
            conn += `Y${tx.y} -> `
            while (tx != null) {
                if (tx.down != null) {
                    conn += `S${tx.x}_${tx.y} ->`;
                } else {
                    conn += `S${tx.x}_${tx.y} [dir="both"]; \n`;
                }
                tx = tx.down;
            }
            ty = ty.right;
        }

        return nodes + "\n" + rank + "\n" + conn;
    }
}

//module.exports = SparseMatrix;