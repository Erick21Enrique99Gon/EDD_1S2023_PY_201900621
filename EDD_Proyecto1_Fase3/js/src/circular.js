class CNodo {
    constructor(  value) {
        this.value = value;
        this.next = null;
    }
}

class CircularList {
    constructor() {
        this.head = null;
        this.tail = null;
    }
    insertar(value) {
        const node = new CNodo(value);
        if (this.head == null) {
            this.head = node;
            this.tail = node;
            node.next = this.head;
        } else {
            this.tail.next = node;
            this.tail = node;
            this.tail.next = this.head;
        }
    }
    imprimir() {
        let temp = this.head;
        while (temp.next != this.head) {
            console.log(temp.value);
            temp = temp.next;
        }
        console.log(temp.value);
    }
    graph() {
        let id = 0;
        let temp = this.head;
        let str = "digraph G {rankdir=\"LR\" \n";
        while (temp.next != this.head) {
            str += id + "[label=\"" + temp.value + "\"];\n";
            id++;
            temp = temp.next;
        }
        str += id + "[label=\"" + temp.value + "\"];\n";
        id = 0;
        temp = this.head;
        while (temp.next != this.head) {
            str += id + "->" + (id+1) + ";\n";
            id++;
            temp = temp.next;
        }
        str += id + "->" + 0 + ";\n";
        str += "}";
        console.log(str);
        return str;
    }
}
//module.exports = CircularList;