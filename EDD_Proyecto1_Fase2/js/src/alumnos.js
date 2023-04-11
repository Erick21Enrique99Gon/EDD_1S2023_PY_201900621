class Estudiante{
    constructor(carnet, nombre, password, carpeta_raiz){
        this.carnet = carnet;
        this.nombre = nombre;
        this.password = password;
        this.carpeta_raiz = carpeta_raiz;
        this.nray_tree = new NaryTree();
        this.circular_list = new CircularList();
    }
}
//module.exports = estudiante;