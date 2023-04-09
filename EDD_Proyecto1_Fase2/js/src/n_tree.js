class NNode {
    constructor(folderName) {
        this.folderName = folderName;
        this.chidren = [];
        this.files = [];
        this.id = null;
    }
}
class NaryTree {
    constructor() {
        this.root = new NNode('/');
        this.root.id = 0;
        this.size = 1;
    }

    insertValue(folderName, folderfather) {
        let newNodo = new NNode(folderName);
        let father = this.getFolder(folderfather);
        if (father == null) {
            console.log("No se encontro el padre");
        } else {
            newNodo.folderName = this.#modificarfolder(folderName, father);
            newNodo.id = this.size;
            father.chidren.push(newNodo);
            this.size++;
        }
    }

    #modificarfolder(folderName, fatherNode) {
        if (fatherNode.chidren.length == 0) { 
            return folderName;
        } else {
            let folder = fatherNode.chidren.find(child => child.folderName == folderName);
            if (typeof folder == 'undefined' || folder == null) {
                return folderName;
            } else {
                return this.#modificarfolder("Copia "+folderName, fatherNode);
            }
        }
    }

    getFolder(path) {
        if (path == this.root.folderName) {
            return this.root;
        } else {
            let temp = this.root;
            let folders = path.split('/');
            folders = folders.filter((item) => item !== '');
            let folder = null;
            while (folders.length > 0) {
                let currentFolder = folders.shift();
                folder = temp.chidren.find(child => child.folderName == currentFolder);
                if (typeof folder == 'undefined' || folder == null) {
                    return null;
                }
                temp = folder;
            }
            return temp
        }
    }

    deleteFolder(path) {
        let temp = this.root;
        let tempFather = this.root;
        let folders = path.split('/');
        folders = folders.filter((item) => item !== '');
        let folder = null;
        while (folders.length > 0) {
            let currentFolder = folders.shift();
            folder = temp.chidren.find(child => child.folderName == currentFolder);
            if (typeof folder == 'undefined' || folder == null) {
                return null;
            }
            tempFather = temp;
            temp = folder;
        }
        let index = tempFather.chidren.indexOf(folder);
        tempFather.chidren.splice(index, 1);
    }

    deleteFile(path, fileName) {
        let temp = this.root;
        let folders = path.split('/');
        folders = folders.filter((item) => item !== '');
        let folder = null;
        while (folders.length > 0) {
            let currentFolder = folders.shift();
            folder = temp.chidren.find(child => child.folderName == currentFolder);
            if (typeof folder == 'undefined' || folder == null) {
                return null;
            }
            temp = folder;
        }
        let file = temp.files.find(file => file.name == fileName);
        let index = temp.files.indexOf(file);
        temp.files.splice(index, 1);
    }

    Graphviz() {
        let nodes = "";
        let connections = "";
        let temp = this.root;
        let queue = [];
        queue.push(temp);
        while (queue.length > 0) {
            temp = queue.shift();
            nodes += temp.id + "[label=\"" + temp.folderName + "\"];\n";
            temp.chidren.forEach(child => {
                connections += temp.id + "->" + child.id + ";\n";
                queue.push(child);
            });
        }
        return "digraph G {\n node[shape=\"record\"];\n" + nodes + connections + "}";
    }
    getHTML(path) {
        let node = this.getFolder(path);
        let code = "";
        node.chidren.map(child => {
            code += ` <div class="col-2 folder" onclick="entrarCarpeta('${child.folderName}')">
                        <img src="imagenes\\pngwing.com.png" width="100%"/>
                        <p class="h6 text-center">${child.folderName}</p>
                    </div>`
        })
        node.files.map(file => {
            console.log(file.type);
            if (file.type === 'text/plain') {
                let archivo = new Blob([file.content], {type: file.type +"; charset = utf - 8"});
                console.log(archivo);

                const url = URL.createObjectURL(archivo);
                code += `
                        <div class="col-2 folder">
                        <img src="imagenes\\f.png" width="100%"/>
                        <p class="h6 text-center">
                            <a href="${url}" download>
                                ${file.name}
                            </a>
                        </p>
                    </div>
                `
            } else {
                code += ` <div class="col-2 folder">
                        <img src="imagenes\\f.png" width="100%"/>
                        <p class="h6 text-center">
                            <a href="${file.content}" download>
                                ${file.name}
                            </a>
                        </p>
                    </div>`
            }
        })
        return code;
    }
}
//module.exports = NaryTree;