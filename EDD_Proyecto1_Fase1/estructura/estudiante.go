package estructura

import "edd.com/proyectofase1/pila"

type Estudiante struct {
	Carnet       int
	Nombre       string
	Apellido     string
	Password     string
	Carpeta_Raiz string
	Log          *pila.Pila
}
