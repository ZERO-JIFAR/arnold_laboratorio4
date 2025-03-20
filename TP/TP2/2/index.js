const fs = require("fs");
const path = require("path");

// Obtener fecha y hora actual en formato [YYYY-MM-DD HH:MM:SS]
function obtenerFechaHora() {
    return new Date().toISOString().replace("T", " ").substring(0, 19);
}

const fecha = `Fecha de modificacion: [${obtenerFechaHora()}]`;

// Definir la ruta del archivo datos.txt
const datosFilePath = path.join(__dirname, "datos.txt");
const infoFilePath = path.join(__dirname, "informacion.txt");

// Funcion para escribir en el archivo datos.txt
function escribirEnDatos(mensaje) {
    const linea = `${mensaje}\n`;
    fs.appendFileSync(datosFilePath, linea, "utf8");
}

// Inicio del programa
escribirEnDatos("Nombre: Arnold");
escribirEnDatos("Edad: 29");
escribirEnDatos("Carrera: Sistemas");
escribirEnDatos(fecha);

// Leer y mostrar por consola el contenido de datos.txt
fs.readFile(datosFilePath, "utf8", (err, data) => {
    if (err) {
        console.error("Error al leer el archivo:", err);
        return;
    }
    console.log("Contenido del archivo:\n", data);
});

// Renombrar el archivo datos.txt a informacion.txt
fs.rename(datosFilePath, infoFilePath, (err) => {
    if (err) {
        console.error("Error al renombrar el archivo:", err);
        return;
    }
    console.log("Archivo renombrado");

    // Borrar el archivo tras 10 segundos
    setTimeout(() => {
        fs.unlink(infoFilePath, (err) => {
            if (err) {
                console.error("Error al eliminar el archivo:", err);
                return;
            }
            console.log("Archivo eliminado después de 10 segundos.");
        });
    }, 10000);
});
