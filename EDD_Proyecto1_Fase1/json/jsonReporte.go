package jsonReporte

import (
	"fmt"
	"os"
)

func EscribirJson(code string, fileName string, path string) {
	var _, err = os.Stat(path + "\\" + fileName)

	if os.IsNotExist(err) {
		// Si no existe lo crea
		var file, err = os.Create(fileName)
		if err != nil {
			fmt.Println(err.Error())
		}
		defer file.Close()
	} else {
		// Si existe lo elimina, para crearlo de nuevo
		// Y actualizar el archivo si fuese necesario
		err := os.Remove(fileName)
		if err == nil {
			var file, err = os.Create(fileName)
			if err != nil {
				fmt.Println(err.Error())
			}
			defer file.Close()
		}
	}
	var file, _ = os.OpenFile(fileName, os.O_RDWR, 0644)
	_, err = file.WriteString(code)
	if err != nil {
		fmt.Println(err.Error())
	}
	// Guardar los cambios
	err = file.Sync()
	if err != nil {
		fmt.Println(err.Error())
	}
	fmt.Println("Archivo .json creado.")
}
