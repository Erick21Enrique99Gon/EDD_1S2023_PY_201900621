package cola

import (
	"fmt"

	"edd.com/proyectofase1/estructura"
)

type Cola struct {
	Inicio *Nodo_cola
	Tamaño int
}

func (l *Cola) Sacar() (e *estructura.Estudiante) {
	if l.Inicio == nil {
		return nil
	} else {
		l.Tamaño--
		temp := l.Inicio
		l.Inicio = l.Inicio.Siguiente
		return temp.Estudiante
	}
}

func (l *Cola) Insertar(e *estructura.Estudiante) {
	nuevo_nodo := &Nodo_cola{Estudiante: e, Siguiente: nil}
	l.Tamaño++
	if l.Inicio == nil {
		l.Inicio = nuevo_nodo
	} else {
		temp := l.Inicio
		for temp.Siguiente != nil {
			temp = temp.Siguiente
		}
		temp.Siguiente = nuevo_nodo
	}
}

func (l *Cola) I() {
	temp := l.Inicio
	for temp.Siguiente != nil {
		fmt.Printf("Nombre: %s %s, Carnet: %d \n", temp.Estudiante.Nombre, temp.Estudiante.Apellido, temp.Estudiante.Carnet)
		fmt.Println("-------------------")
		temp = temp.Siguiente
	}
	fmt.Println("-------------------")
	fmt.Printf("Nombre: %s %s, Carnet: %d\n", temp.Estudiante.Nombre, temp.Estudiante.Apellido, temp.Estudiante.Carnet)
}

func (l *Cola) Vacio() bool {
	return l.Inicio == nil
}
