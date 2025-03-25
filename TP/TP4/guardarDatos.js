import readline from "readline";
import fs from "fs";

export function pedirDatos() {
    const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("Cual es tu nombre? ", (nombre) => {
    rl.question("Cuantos años tienes? ", (edad) => {
        rl.question("Cual es tu correo electronico? ", (correo) => {
            // Formatear los datos
            const datos = `Nombre: ${nombre}\nEdad: ${edad}\nCorreo: ${correo}\n`;

            // Guardar los datos en un archivo
            fs.writeFile("datos_usuario.txt", datos, (err) => {
                if (err) {
                    console.error("Error al guardar los datos:", err);
                } else {
                    console.log("Datos guardados correctamente en datos_usuario.txt\n");

                    // Leer el archivo y mostrar su contenido
                    fs.readFile("datos_usuario.txt", "utf8", (err, contenido) => {
                        if (err) {
                            console.error("Error al leer el archivo:", err);
                        } else {
                            console.log("Contenido del archivo:\n");
                            console.log(contenido);
                        }
                    });
                }
                rl.close(); // Cerrar la interfaz de entrada
            });
        });
    });
});
}
