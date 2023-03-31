let avlTree = new AvlTree();
let matrix = new SparseMatrix();
let estudiante = new Estudiante();
let Tree = new NaryTree();
function login(e) {
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
            console.log(estudiante);
            if (estudiante != null) {
                if (estudiante.password == password && estudiante.carnet == username) {
                    window.location = "principal.html";
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
    Tree.insertValue(folder, path);
    alert("Carpeta creada con exito");
    $('#espacio_carpetas').html(Tree.getHTML(path));
}

function entrarCarpeta(folderName) {
    let path = $('#path').val();
    let currpath =path == "/"? path + folderName : path + "/" + folderName;
    $('#path').val(currpath);
    $('#espacio_carpetas').html(Tree.getHTML(currpath));
}

function retornarInicio() {
    $('#path').val("/");
    $('#espacio_carpetas').html(Tree.getHTML("/"));
}

function showGraphNaryTree() {
    let url = 'https://quickchart.io/graphviz?graph=';
    let body =  Tree.Graphviz();
    $("#graph").attr("src", url + body);
}
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
                avlTree.insertValue(studentsArray[i]);
            }
            // GUARDAR EN LOCAL STORAGE
            localStorage.setItem("avlTree", JSON.stringify(avlTree))
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