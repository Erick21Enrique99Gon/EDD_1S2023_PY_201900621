/*let matrix = new SparseMatrix();

function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData);
    if (localStorage.getItem("matriz") !== null) {
        let temp = JSON.retrocycle(JSON.parse(localStorage.getItem("matriz")));
        matrix.head = temp.head;
    }
    try{
        matrix.insertar(Number(form.xpos), Number(form.ypos), form.value);
        alert("Todo b" );
        matrix.printx();
    }catch(error){
        alert("Error: " + error);
        console.log(error);
    }
    localStorage.setItem("matriz", JSON.stringify(JSON.decycle(matrix)));
    //localStorage.clear() para limpiar
}

function showGraph() {
    let temp = JSON.retrocycle(JSON.parse(localStorage.getItem("matriz")));
    matrix.head = temp.head;
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = `digraph G { ${matrix.graph()} }`
    $("#graph").attr("src", url + body);
}*/

let avl = require('./avl-tree');
let t = new avl();

t.insertValue(9);
t.insertValue(7);
t.insertValue(3);
t.insertValue(4);
t.insertValue(5);
t.Graph();
/*let avl = require('./circular');
let c = new avl();
c.insertar(1);
c.insertar(2);
c.insertar(3);
c.insertar(4);
c.insertar(5);
c.insertar(6);
c.graph();*/