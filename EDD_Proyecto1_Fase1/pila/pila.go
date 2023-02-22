package pila

import "fmt"

type Pila struct {
	Tope *Nodo_pila
}

func (p *Pila) Push(Carnet int) {
	nuevo_nodo := &Nodo_pila{Carnet: Carnet, Siguiente: nil}

	if p.Tope == nil {
		p.Tope = nuevo_nodo
	} else {
		temp := p.Tope
		p.Tope = nuevo_nodo
		nuevo_nodo.Siguiente = temp
	}
}

func (p *Pila) Pop() (Carnet int) {
	if p.Tope == nil {
		return -1
	} else {
		temp := p.Tope
		p.Tope = p.Tope.Siguiente
		return temp.Carnet
	}
}

func (p *Pila) I() {
	temp := p.Tope
	for temp.Siguiente != nil {
		fmt.Print(temp.Carnet)
		temp = temp.Siguiente
	}
	fmt.Print(temp.Carnet)
}
