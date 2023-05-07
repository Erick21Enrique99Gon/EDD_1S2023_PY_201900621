class NNode {
    constructor(folderName,weight) {
        this.folderName = folderName;
        this.chidren = [];
        this.files = [];
        this.id = null;
        this.matrix = new SparseMatrix();
        this.weight = weight;
    }
}
class NaryTree {
    constructor() {
        this.root = new NNode('/',1);
        this.root.id = 0;
        this.size = 1;
    }

    insertValue(folderName, folderfather) {
        let { node: father, weight } = this.getFolder(folderfather);
        let newNodo = new NNode(folderName, weight);
        if (father == null) {
            console.log("No se encontro el padre");
        } else {
            newNodo.folderName = this.#modificarfolder(folderName, father);
            newNodo.id = this.size;
            father.chidren.push(newNodo);
            this.size++;
            return newNodo.folderName;
        }
    }

    modifyFile(fatherNode, fileName, n) {
        if (fatherNode.files.length == 0) {
            return fileName;
        } else {
            let file = fatherNode.files.find(file => file.name == fileName);
            if (typeof file == 'undefined' || file == null) {
                return fileName;
            } else {
                let fileP = fileName + "(Copia" + (n + 1) + ")";
                file = fatherNode.files.find(file => file.name == fileP);
                if (typeof file == 'undefined' || file == null) {
                    return fileP;
                } else {
                    return this.modifyFile(fatherNode, fileName, n + 1);
                }
            }
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
                return this.#modificarfolder("Copia " + folderName, fatherNode);
            }
        }
    }

    getFolder(path) {
        let weight = 2;
        if (path == this.root.folderName) {
            return { node: this.root, weight: weight };
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
                weight++;
            }
            return { node: temp, weight: weight }; 
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
                if (temp.folderName == "/") {
                    connections += temp.id + "->" + child.id + "[label = " + 1 + "] ;\n";
                }else{
                    connections += temp.id + "->" + child.id + "[label = " + temp.weight + "] ;\n";
                }
                queue.push(child);
            });
        }
        return "digraph G {sep=\" + 1, 3\"; \noverlap=scalexy;\nlayout=neato; \nedge[dir=none];\n node[shape=\"record\"];\n" + nodes + connections + "}";
    }
    getHTML(path) {
        let { node } = this.getFolder(path);
        let code = "";
        node.chidren.map(child => {
            code += ` <div class="col-2 folder" onclick="entrarCarpeta('${child.folderName}')">
                        <img src="imagenes\\pngwing.com.png" width="100%"/>
                        <p class="h6 text-center">${child.folderName}</p>
                    </div>`
        })
        node.files.map(file => {
            if (file.type === 'text/plain') {
                let archivo = new Blob([file.content], { type: file.type + "; charset = utf - 8" });
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