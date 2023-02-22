package lista_doble

import (
	"fmt"

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

func (l *Lista_doble) Vacio() bool {
	return l.Cabeza == nil
}

func (l *Lista_doble) Insertar_en_Orden(e *estructura.Estudiante) {
	nuevo_Nodo := &Nodo_lista_doble{Estudiante: e, Anterior: nil, Siguiente: nil}
	if l.Cabeza == nil {
		l.Cabeza = nuevo_Nodo
		l.Cola = nuevo_Nodo
		fmt.Println("--------Vacio-----")
	} else {
		if l.Cabeza.GetCarnet() >= nuevo_Nodo.GetCarnet() {
			l.Cabeza.Anterior = nuevo_Nodo
			nuevo_Nodo.Siguiente = l.Cabeza
			l.Cabeza = nuevo_Nodo
			fmt.Println("--------Ca-----")
		} else if l.Cola.GetCarnet() <= nuevo_Nodo.GetCarnet() {
			l.Cola.Siguiente = nuevo_Nodo
			nuevo_Nodo.Anterior = l.Cola
			l.Cola = nuevo_Nodo
			fmt.Println("--------Cola-----")
		} else {
			temp := l.Cabeza
			puesto := false
			for temp.Siguiente != nil && !puesto {
				if temp.Estudiante.Carnet == nuevo_Nodo.Estudiante.Carnet {
					aux := temp.Anterior
					temp.Anterior = nuevo_Nodo
					nuevo_Nodo.Siguiente = temp
					nuevo_Nodo.Anterior = aux
					aux.Siguiente = nuevo_Nodo
					fmt.Println("--------RE----")
					puesto = true

				} else if temp.Estudiante.Carnet < nuevo_Nodo.Estudiante.Carnet && temp.Siguiente.Estudiante.Carnet > nuevo_Nodo.Estudiante.Carnet {
					aux := temp.Siguiente
					temp.Siguiente = nuevo_Nodo
					nuevo_Nodo.Anterior = temp
					nuevo_Nodo.Siguiente = aux
					aux.Anterior = nuevo_Nodo
					temp = temp.Siguiente
					puesto = true
					fmt.Println("--------Vacio-----")
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
