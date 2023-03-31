class NNode {
    constructor(folderName) {
        this.folderName = folderName;
        this.chidren = [];
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
        if(father==null){
            console.log("No se encontro el padre");
        }else{
            newNodo.id = this.size;
            father.chidren.push(newNodo);
            this.size++;
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
                if (typeof folder== 'undefined'||folder==null) {
                    return null;
                }
                temp = folder;
            }
            return temp
        }
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
        return code;
    }
}
//module.exports = NaryTree;