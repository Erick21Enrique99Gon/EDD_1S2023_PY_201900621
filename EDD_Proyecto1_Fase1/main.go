package main

import (
	"fmt"
	//"go/printer"
	"log"
	"os"
	"strconv"

	"edd.com/proyectofase1/cola"
	"edd.com/proyectofase1/dot"
	funcionesadministrador "edd.com/proyectofase1/funciones_administrador"
	jsonReporte "edd.com/proyectofase1/json"
	"edd.com/proyectofase1/lista_doble"
	"edd.com/proyectofase1/pila"
)

func main() {

	Registrados := &lista_doble.Lista_doble{}
	Espera := &cola.Cola{}
	LogAdministrador := &pila.Pila{}

	var (
		Usuario  string
		Password string
		Salida   bool
	)

	opcion := 0
	path, err := os.Getwd()
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
				funcionesadministrador.RegistrarEstudiantes(Espera, Registrados, LogAdministrador)

				if err != nil {
					log.Println(err)
				} else {
					if !LogAdministrador.Vacio() {
						dot.EscribirDot(LogAdministrador.Graph(), "Pila admin.dot", path)
						dot.GeneratePNG("Pila admin.dot", path)
					}
					if !Registrados.Vacio() {
						jsonReporte.EscribirJson(Registrados.ToJson(), "Reporte.json", path)
					}
					if !Espera.Vacio() {
						dot.EscribirDot(Espera.GraphCode(), "Cola.dot", path)
						dot.GeneratePNG("Cola.dot", path)
					}
				}

			} else {
				u, er := strconv.Atoi(Usuario)
				estudiante := Registrados.EncontrarEstudiante(u, Password)
				if estudiante != nil && er == nil {
					estudiante.Log.Push("Inicio Sesion")
				}
			}
		case 2:
			if !Registrados.Vacio() {
				dot.EscribirDot(Registrados.GraphCode(), "Registrados.dot", path)
				dot.GeneratePNG("Registrados.dot", path)
			}
			fmt.Println("Adios")
			Salida = true

		}

	}
}
