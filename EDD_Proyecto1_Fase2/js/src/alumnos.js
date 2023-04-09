class Estudiante{
    constructor(carnet, nombre, password, carpeta_raiz){
        this.carnet = carnet;
        this.nombre = nombre;
        this.password = password;
        this.carpeta_raiz = carpeta_raiz;
        this.nray_tree = new NaryTree();
        this.circular_list = new CircularList();
    }
    agregarCarpeta(cnombre, cpath){
        console.log("this.nray_tree");
        this.nray_tree.insertValue(cnombre, cpath);
    }
}
//module.exports = estudiante;