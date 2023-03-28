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
        let temp = this.head;
        let str = "digraph G {\n";
        str += "layout=circo\n";
        while (temp.next != this.head) {
            str += temp.value + "->" + temp.next.value + "\n";
            temp = temp.next;
        }
        str += temp.value + "->" + temp.next.value + "\n";
        str += "}";
        console.log(str);
        return str;
    }
}
module.exports = CircularList;