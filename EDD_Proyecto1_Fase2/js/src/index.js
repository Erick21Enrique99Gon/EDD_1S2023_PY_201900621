let avlTree = new AvlTree();
let matrix = new SparseMatrix();
let estudiante = new Estudiante();
let estudiant = new Estudiante();
let Tree = new NaryTree();
let listaCircular = new CircularList();

async function login(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData);
    let username = form.username;
    let password = form.password;
    if (username == "Admin" && password == "Admin") {
        window.location = "admin.html";
    }
    else {
        if (localStorage.getItem("avlTree") !== null) {
            let temp = JSON.retrocycle(JSON.parse(localStorage.getItem("avlTree")));
            avlTree.root = temp.root;
            estudiante = avlTree.search(username);
            localStorage.setItem("estudiante", JSON.stringify(JSON.decycle(estudiante)));
            if (estudiante != null) {
                if (estudiante.password == password && estudiante.carnet == username) {
                    window.location = "principal.html";
                    Tree.root = estudiante.nray_tree.root;
                    Tree.size = estudiante.nray_tree.size;
                    $('#espacio_carpetas').html(Tree.getHTML(path));
                }
                else {
                    alert("Usuario o Contraseña incorrecta");
                }
            }
        }else{
        alert("Usuario o Contraseña incorrectos");
        }
    }
}

function crearCarpeta(e) {
    e.preventDefault();
    let folder = $('#folderName').val();
    let path = $('#path').val();
    estudiante = JSON.retrocycle(JSON.parse(localStorage.getItem("estudiante")));
    Tree.root = estudiante.nray_tree.root;
    Tree.size = estudiante.nray_tree.size;
    Tree.insertValue(folder, path);
    let actividad = `Accion: Se creo carpeta\n\\"${folder}\\"\nFecha y Hora: ${ new Date().toLocaleString()}`;
    listaCircular.head = estudiante.circular_list.head;
    listaCircular.tail = estudiante.circular_list.tail;
    listaCircular.insertar(actividad);
    estudiante.circular_list.head = listaCircular.head;
    estudiante.circular_list.tail = listaCircular.tail;
    estudiante.nray_tree.root = Tree.root;
    estudiante.nray_tree.size = Tree.size;
    $('#espacio_carpetas').html(Tree.getHTML(path));
    let temp = JSON.retrocycle(JSON.parse(localStorage.getItem("avlTree")));
    avlTree.root = temp.root;
    avlTree.ActualizarCarpetas(estudiante);
    localStorage.setItem("avlTree", JSON.stringify(JSON.decycle(avlTree)));
    localStorage.setItem("estudiante", JSON.stringify(JSON.decycle(estudiante)));
}

function eliminarCarpeta(e) {
    e.preventDefault();
    let folder = $('#folderNameEliminacion').val();
    let path = $('#path').val();
    let currpath = path == "/" ? path + folder : path + "/" + folder;
    estudiante = JSON.retrocycle(JSON.parse(localStorage.getItem("estudiante")));
    Tree.root = estudiante.nray_tree.root;
    Tree.size = estudiante.nray_tree.size;
    Tree.deleteFolder(currpath);
    let actividad = `Accion: Se elimino carpeta\n\\"${folder}\\"\nFecha y Hora: ${new Date().toLocaleString()}`;
    listaCircular.head = estudiante.circular_list.head;
    listaCircular.tail = estudiante.circular_list.tail;
    listaCircular.insertar(actividad);
    estudiante.circular_list.head = listaCircular.head;
    estudiante.circular_list.tail = listaCircular.tail;
    estudiante.nray_tree.root = Tree.root;
    estudiante.nray_tree.size = Tree.size;
    $('#espacio_carpetas').html(Tree.getHTML(path));
    let temp = JSON.retrocycle(JSON.parse(localStorage.getItem("avlTree")));
    avlTree.root = temp.root;
    avlTree.ActualizarCarpetas(estudiante);
    localStorage.setItem("avlTree", JSON.stringify(JSON.decycle(avlTree)));
    localStorage.setItem("estudiante", JSON.stringify(JSON.decycle(estudiante)));
}

function entrarCarpeta(folderName) {
    let path = $('#path').val();
    let currpath =path == "/"? path + folderName : path + "/" + folderName;
    $('#path').val(currpath);
    estudiante = JSON.retrocycle(JSON.parse(localStorage.getItem("estudiante")));
    Tree.root = estudiante.nray_tree.root;
    $('#espacio_carpetas').html(Tree.getHTML(currpath));
}

function retornarInicio() {
    $('#path').val("/");
    estudiante = JSON.retrocycle(JSON.parse(localStorage.getItem("estudiante")));
    Tree.root = estudiante.nray_tree.root;
    $('#espacio_carpetas').html(Tree.getHTML("/"));
}

function showGraphNaryTree() {
    estudiante = JSON.retrocycle(JSON.parse(localStorage.getItem("estudiante")));
    Tree.root = estudiante.nray_tree.root;
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = Tree.Graphviz();
    console.log(body);
    $("#graph").attr("src", url + body);
}

function showGraphCircular() {
    estudiante = JSON.retrocycle(JSON.parse(localStorage.getItem("estudiante")));
    listaCircular.head = estudiante.circular_list.head;
    listaCircular.tail = estudiante.circular_list.tail;
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = listaCircular.graph();
    $("#graph").attr("src", url + body);
}

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

const subirArchivo = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData);
    let path = $('#path').val();
    if(form.file.type == 'text/plain'){
        let fr = new FileReader();
        fr.readAsText(form.file);
        fr.onload = () => {
            Tree.getFolder(path).files.push({
                name: form.fileName,
                content: fr.result,
                type: form.file.type
            })
            $('#espacio_carpetas').html(Tree.getHTML(path));
        }
    }else{
        let parseBase64 = await toBase64(form.file);
        Tree.getFolder(path).files.push({
            name: form.fileName,
            content: parseBase64,
            type: form.file.type
        })
        $('#espacio_carpetas').html(Tree.getHTML(path));
    }
}

function eliminarArchivo(event){
    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData);
    let path = $('#path').val();
    let fileName = form.fileName;
    Tree.deleteFile(path, fileName);
    $('#espacio_carpetas').html(Tree.getHTML(path));
}

/*function showCarpetas(){
    estudiante = JSON.retrocycle(JSON.parse(localStorage.getItem("estudiante")));
    Tree.root = estudiante.nray_tree.root;
    $('#espacio_carpetas').html(Tree.getHTML("/"));
}
$(document).ready(showCarpetas);*/

function showLocalStudents() {
    estudiante = JSON.parse(localStorage.getItem("estudiante"));
    $('#carnet h3').html(
       estudiante.carnet
    )
}

$(document).ready(showLocalStudents);
/*
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
arb
function showGraph() {
    let temp = JSON.retrocycle(JSON.parse(localStorage.getItem("matriz")));
    matrix.head = temp.head;
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = `digraph G { ${matrix.graph()} }`
    $("#graph").attr("src", url + body);
}*/


function loadStudentsForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData);
    let studentsArray = [];
    if (localStorage.getItem("avlTree") !== null) {
        let temp = JSON.retrocycle(JSON.parse(localStorage.getItem("avlTree")));
        avlTree.root = temp.root;
    }
    try {
        let fr = new FileReader();
        fr.readAsText(form.inputFile);
        fr.onload = () => {

            studentsArray = JSON.parse(fr.result).alumnos;
            //AGREGAR A LA TABLA LOS ALUMNOS CARGADOS 
            $('#studentsTable tbody').html(
                studentsArray.map((item, index) => {
                    return (`
                        <tr>
                            <th>${item.carnet}</th>
                            <td>${item.nombre}</td>
                            <td>${item.password}</td>
                        </tr>
                    `);
                }).join('')
            )

            for (let i = 0; i < studentsArray.length; i++) {
                let estudianteIngresando = new Estudiante(studentsArray[i].carnet, studentsArray[i].nombre, studentsArray[i].password, studentsArray[i].carpeta_raiz);
                avlTree.insertValue(estudianteIngresando);
            }
            // GUARDAR EN LOCAL STORAGE
            localStorage.setItem("avlTree", JSON.stringify(JSON.decycle(avlTree)));
            alert('Alumnos cargados con éxito!')
        }
    } catch (error) {
        console.log(error);
        alert("Error en la inserción");
    }
}


function showStudentsForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData);
    let temp = JSON.retrocycle(JSON.parse(localStorage.getItem("avlTree")));
    avlTree.root = temp.root;
    console.log(avlTree);
    if (avlTree.root !== null) {
        switch (form.traversal) {
            case 'inOrder':
                $('#studentsTable tbody').html(
                    avlTree.inOrder()
                )
                break;
            case 'preOrder':
                $('#studentsTable tbody').html(
                    avlTree.preOrder()
                )
                break;
            case 'postOrder':
                $('#studentsTable tbody').html(
                    avlTree.postOrder()
                )
                break;
            default:
                $('#studentsTable tbody').html("")
                break;
        }
    }
}

function showAvlGraph() {
    if (localStorage.getItem("avlTree") !== null) {
        let temp = JSON.retrocycle(JSON.parse(localStorage.getItem("avlTree")));
        avlTree.root = temp.root;
        let url = 'https://quickchart.io/graphviz?graph=';
        let body = avlTree.Graph();
        console.log(body);
        $("#graph").attr("src", url + body);
    }
}