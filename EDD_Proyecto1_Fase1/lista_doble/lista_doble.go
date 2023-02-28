package lista_doble

import (
	"fmt"
	"strconv"

	"edd.com/proyectofase1/estructura"
)

type Lista_doble struct {
	Cabeza *Nodo_lista_doble
	Cola   *Nodo_lista_doble
}

func (l *Lista_doble) Insertar_al_final(e *estructura.Estudiante) {
	nuevo_Nodo := &Nodo_lista_doble{Estudiante: e, Anterior: nil, Siguiente: nil}

	if l.Cabeza == nil {
		l.Cabeza = nuevo_Nodo
		l.Cola = nuevo_Nodo
	} else {
		l.Cola.Siguiente = nuevo_Nodo
		nuevo_Nodo.Anterior = l.Cola
		l.Cola = nuevo_Nodo
	}
}

func (l *Lista_doble) Insertar_al_Inicio(e *estructura.Estudiante) {
	nuevo_Nodo := &Nodo_lista_doble{Estudiante: e, Anterior: nil, Siguiente: nil}

	if l.Cabeza == nil {
		l.Cabeza = nuevo_Nodo
		l.Cola = nuevo_Nodo
	} else {
		l.Cabeza.Anterior = nuevo_Nodo
		nuevo_Nodo.Siguiente = l.Cabeza
		l.Cabeza = nuevo_Nodo
	}
}

func (l *Lista_doble) I() {
	temp := l.Cabeza
	for temp != nil {
		fmt.Printf("Nombre: %s %s, Carnet: %d\n", temp.Estudiante.Nombre, temp.Estudiante.Apellido, temp.Estudiante.Carnet)
		fmt.Println("-------------------")
		temp = temp.Siguiente
	}
}

func (l *Lista_doble) ToJson() string {
	contenido := "{\n"
	contenido += "\t\"alumnos\": [\n"
	aux := l.Cabeza

	for aux.Siguiente != nil {
		contenido += "\t\t{\n"
		contenido += "\t\t\t\"nombre\": \"" + aux.Estudiante.Nombre + " " + aux.Estudiante.Apellido + "\", \n"
		contenido += "\t\t\t\"carnet\": " + strconv.Itoa(aux.Estudiante.Carnet) + ", \n"
		contenido += "\t\t\t\"password\": \"" + aux.Estudiante.Password + "\", \n"
		contenido += "\t\t\t\"Carpeta_Raiz\": \" " + aux.Estudiante.Carpeta_Raiz + " \" \n"
		contenido += "\t\t},\n"
		aux = aux.Siguiente
	}

	contenido += "\t\t{\n"
	contenido += "\t\t\t\"nombre\": \"" + aux.Estudiante.Nombre + " " + aux.Estudiante.Apellido + "\", \n"
	contenido += "\t\t\t\"carnet\": " + strconv.Itoa(aux.Estudiante.Carnet) + ", \n"
	contenido += "\t\t\t\"password\": \"" + aux.Estudiante.Password + "\", \n"
	contenido += "\t\t\t\"Carpeta_Raiz\": \"/\" \n"
	contenido += "\t\t}\n"
	contenido += "\t]\n"
	contenido += "}"
	return contenido
}

func (l *Lista_doble) EncontrarEstudiante(c int, p string) (e *estructura.Estudiante) {
	temp := l.Cabeza
	for temp != nil {
		if temp.Estudiante.Carnet == c && temp.Estudiante.Password == p {
			return temp.Estudiante
		}
		temp = temp.Siguiente
	}
	return nil
}

func (l *Lista_doble) Vacio() bool {
	return l.Cabeza == nil
}

func (l *Lista_doble) Insertar_en_Orden(e *estructura.Estudiante) {
	nuevo_Nodo := &Nodo_lista_doble{Estudiante: e, Anterior: nil, Siguiente: nil}
	if l.Cabeza == nil {
		l.Cabeza = nuevo_Nodo
		l.Cola = nuevo_Nodo
	} else {
		if l.Cabeza.GetCarnet() > nuevo_Nodo.GetCarnet() {
			l.Cabeza.Anterior = nuevo_Nodo
			nuevo_Nodo.Siguiente = l.Cabeza
			l.Cabeza = nuevo_Nodo
		} else if l.Cola.GetCarnet() < nuevo_Nodo.GetCarnet() {
			l.Cola.Siguiente = nuevo_Nodo
			nuevo_Nodo.Anterior = l.Cola
			l.Cola = nuevo_Nodo
		} else {
			temp := l.Cabeza
			puesto := false
			for temp.Siguiente != nil && !puesto {
				if temp.Estudiante.Carnet == nuevo_Nodo.Estudiante.Carnet {
					puesto = true

				} else if temp.Estudiante.Carnet < nuevo_Nodo.Estudiante.Carnet && temp.Siguiente.Estudiante.Carnet > nuevo_Nodo.Estudiante.Carnet {
					aux := temp.Siguiente
					temp.Siguiente = nuevo_Nodo
					nuevo_Nodo.Anterior = temp
					nuevo_Nodo.Siguiente = aux
					aux.Anterior = nuevo_Nodo
					puesto = true
				}

				temp = temp.Siguiente
			}
		}

	}
}

func (l *Lista_doble) Repetido(e *estructura.Estudiante) bool {
	temp := l.Cola
	for temp.Anterior != nil {
		if e.Carnet == temp.Estudiante.Carnet {
			return true
		}
		temp = temp.Siguiente
	}
	if e.Carnet == temp.Estudiante.Carnet {
		return true
	}
	return false
}

func (l *Lista_doble) GraphCode() string {
	temp := l.Cabeza
	nodes := ""
	conn := ""
	connPILAS := ""
	counter := 0
	rankear := ""
	for temp.Siguiente != nil {
		nodes += "N" + strconv.Itoa(counter) + "[label=\"Carnet:" + strconv.Itoa(temp.Estudiante.Carnet) + "\nNombre: " + temp.Estudiante.Nombre + " " + temp.Estudiante.Apellido + "\"];\n"
		if !temp.Estudiante.Log.Vacio() {
			nodes += temp.Estudiante.Log.NodosGraph(strconv.Itoa(temp.Estudiante.Carnet))
			connPILAS += "N" + strconv.Itoa(counter) + "-> N" + strconv.Itoa(temp.Estudiante.Carnet) + "\n"
		}
		conn += "N" + strconv.Itoa(counter) + "->"
		temp = temp.Siguiente
		counter++
	}
	nodes += "N" + strconv.Itoa(counter) + "[label=\"Carnet:" + strconv.Itoa(temp.Estudiante.Carnet) + "\nNombre: " + temp.Estudiante.Nombre + " " + temp.Estudiante.Apellido + "\"];\n"
	conn += "N" + strconv.Itoa(counter) + "\n"
	temp = l.Cola
	for temp.Anterior != nil {
		conn += "N" + strconv.Itoa(counter) + "->"
		temp = temp.Anterior
		counter--
	}
	conn += "N" + strconv.Itoa(counter) + "\n"

	temp = l.Cabeza

	rankear += "{rank = same;"

	for temp != nil {
		rankear += "N" + strconv.Itoa(counter) + ";"
		temp = temp.Siguiente
		counter++
	}

	rankear += "}\n"

	temp = l.Cabeza

	rankear += "{rank = same;"

	for temp != nil {
		if !temp.Estudiante.Log.Vacio() {
			rankear += "N" + strconv.Itoa(temp.Estudiante.Carnet) + ";"
		}
		temp = temp.Siguiente
	}

	rankear += "}"

	return "digraph G {\n" +
		"node[shape=rectangle, style=filled];\n" +
		nodes + // NODOS
		conn + // CONEXIONES
		connPILAS + // CONEXIONES
		rankear +
		"\n}"
}
