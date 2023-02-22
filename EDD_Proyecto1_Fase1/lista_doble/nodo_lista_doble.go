package lista_doble

import "edd.com/proyectofase1/estructura"

type Nodo_lista_doble struct {
	Estudiante *estructura.Estudiante
	Siguiente  *Nodo_lista_doble
	Anterior   *Nodo_lista_doble
}

func (n *Nodo_lista_doble) GetCarnet() int {
	return n.Estudiante.Carnet
}

func (n *Nodo_lista_doble) SetCarnet(Carnet int) {
	n.Estudiante.Carnet = Carnet
}
