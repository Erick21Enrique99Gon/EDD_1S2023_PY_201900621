package funcionesadministrador

import (
	"fmt"

	"edd.com/proyectofase1/cola"
	"edd.com/proyectofase1/estructura"
	"edd.com/proyectofase1/lista_doble"
)

func RegistrarEstudiantes(cola_espera *cola.Cola, lista_registrados *lista_doble.Lista_doble) {
	var (
		carnet   int
		nombre   string
		apellido string
		password string
	)

	opcion := 0
	validar := 0
	registrar := 0
	for opcion != 5 {
		fmt.Println("***Dashboard Administrador - EDD Drive***")
		fmt.Println("         1.Ver Estudiantes pendientes")
		fmt.Println("         2.Ver Estudiantes en el sistema")
		fmt.Println("         3.Registrar Estudiante")
		fmt.Println("         4.Carga Masiva de Estudiantes")
		fmt.Println("         5.Cerrar Sesion")
		fmt.Println("*****************************************")

		fmt.Scanln(&opcion)
		fmt.Println((opcion))
		switch opcion {
		case 1:
			if !cola_espera.Vacio() {
				fmt.Println("************Estudiantes ************")
				cola_espera.I()
				fmt.Println("************************************")

			} else {
				fmt.Println("Vacio")
			}
		case 2:
			if !lista_registrados.Vacio() {
				fmt.Println("************Estudiantes ************")
				lista_registrados.I()
				fmt.Println("************************************")

			} else {
				fmt.Println("Vacio")
			}
		case 3:
			for registrar != 3 {
				fmt.Println("***Registrar Estudiante******************")
				fmt.Println("         1.Registrar Estudiantes")
				fmt.Println("         2.Aceptar Estudiantes")
				fmt.Println("         3.Regresar")
				fmt.Println("*****************************************")
				fmt.Scanln(&registrar)
				switch registrar {
				case 1:
					fmt.Println("**********Registrar estudiante***********")
					fmt.Println("Ingresar Nombre")
					fmt.Scanln(&nombre)
					fmt.Println("Ingresar Apellido")
					fmt.Scanln(&apellido)
					fmt.Println("Ingresar Carnet")
					fmt.Scanln(&carnet)
					fmt.Println("Ingresar Password")
					fmt.Scanln(&password)
					fmt.Println("*****************************************")
					NuevoEstudiante := &estructura.Estudiante{Carnet: carnet, Nombre: nombre, Apellido: apellido}
					cola_espera.Insertar(NuevoEstudiante)
				case 2:
					fmt.Println("*******Aceptar Estudianes****************")
					fmt.Println("*****************************************")
					for validar != 3 {
						if !cola_espera.Vacio() {
							fmt.Printf("************Pendientes %d *****************\n", cola_espera.Tamaño)
							temp := cola_espera.Sacar()
							fmt.Printf("Nombre: %s %s\n", temp.Nombre, temp.Apellido)
							fmt.Printf("Carnet: %d\n", temp.Carnet)
							fmt.Println("         1.Aceptar al Estudiantes")
							fmt.Println("         2.Rechazar al Estudiantes")
							fmt.Println("         3.Regresar")
							fmt.Scanln(&validar)
							switch validar {
							case 1:
								lista_registrados.Insertar_en_Orden(temp)
								fmt.Println("         Aceptado")

							case 2:
								fmt.Println("         Rechazado")
							case 3:
								cola_espera.Insertar(temp)
							}
						} else {
							validar = 3
							fmt.Println("Vacio")

						}
					}
					validar = 0
					fmt.Println("*****************************************")
				}
			}
			registrar = 0
		}
	}
}
