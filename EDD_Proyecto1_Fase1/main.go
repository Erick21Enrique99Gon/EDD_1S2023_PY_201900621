package main

import (
	"fmt"

	"edd.com/proyectofase1/cola"
	funcionesadministrador "edd.com/proyectofase1/funciones_administrador"
	"edd.com/proyectofase1/lista_doble"
)

func main() {

	Registrados := &lista_doble.Lista_doble{}
	Espera := &cola.Cola{}

	var (
		Usuario  string
		Password string
		Salida   bool
	)

	opcion := 0

	for !Salida {
		fmt.Println("*************************************")
		fmt.Println("           EDD GO DRIVE")
		fmt.Println("         1.Iniciar Sesion")
		fmt.Println("         2.Salir del Sistema")
		fmt.Println("*************************************")
		fmt.Scan(&opcion)

		switch opcion {
		case 1:
			fmt.Println("Ingresar Nombre")
			fmt.Scan(&Usuario)
			fmt.Println("Ingresar Password")
			fmt.Scan(&Password)
			if Usuario == "admin" && Password == "admin" {
				funcionesadministrador.RegistrarEstudiantes(Espera, Registrados)
			} else {

			}
		case 2:
			fmt.Println("Adios")
			Salida = true

		}

	}
}
