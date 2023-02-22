package cola

import "edd.com/proyectofase1/estructura"

type Nodo_cola struct {
	Estudiante *estructura.Estudiante
	Siguiente  *Nodo_cola
}
