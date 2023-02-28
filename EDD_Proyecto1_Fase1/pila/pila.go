package pila

import (
	"fmt"
	"time"
)

type Pila struct {
	Tope *Nodo_pila
}

func (p *Pila) Push(entrada string) {
	t := time.Now()
	fecha := fmt.Sprintf("%02d/%02d/%d %02d:%02d",
		t.Day(), t.Month(), t.Year(),
		t.Hour(), t.Minute())

	nuevo_nodo := &Nodo_pila{Entrada: entrada, Fecha: fecha, Siguiente: nil}

	if p.Tope == nil {
		p.Tope = nuevo_nodo
	} else {
		temp := p.Tope
		p.Tope = nuevo_nodo
		nuevo_nodo.Siguiente = temp
	}
}

func (p *Pila) Pop() (Carnet *Nodo_pila) {
	if p.Tope == nil {
		return nil
	} else {
		temp := p.Tope
		p.Tope = p.Tope.Siguiente
		return temp
	}
}
func (p *Pila) Vacio() bool {
	return p.Tope == nil

}

func (p *Pila) I() {
	temp := p.Tope
	for temp != nil {
		fmt.Println(temp.Entrada)
		fmt.Println(temp.Fecha)
		temp = temp.Siguiente
	}
}

func (p *Pila) Graph() string {
	return "digraph G {\n" +
		"node [shape=record];\n" +
		"rankdir=TB;\n" +
		p.NodosGraph("") +
		"N:here;\n}"
}

func (p *Pila) NodosGraph(Carnet string) string {
	temp := p.Tope
	nodos := ""

	nodos += "N" + Carnet + "[label=\"{"

	for temp.Siguiente != nil {
		nodos += temp.Entrada + " &#92;n " + temp.Fecha + "|"
		temp = temp.Siguiente
	}
	nodos += temp.Entrada + " " + temp.Fecha
	nodos += "}\"shape=Mrecord];\n"

	return nodos
}
