const fs = require("fs");
const path = require("path");

// Obtener fecha y hora actual en formato [YYYY-MM-DD HH:MM:SS]
function obtenerFechaHora() {
    return new Date().toISOString().replace("T", " ").substring(0, 19);
}

// Definir la ruta del archivo log.txt
const logFilePath = path.join(__dirname, "log.txt");

// Función para escribir en el log
function escribirEnLog(mensaje) {
    const linea = `[${obtenerFechaHora()}] - ${mensaje}\n`;
    fs.appendFileSync(logFilePath, linea, "utf8");
}

// Inicio del programa
escribirEnLog("Inicio del programa");

console.log("Ejecutando tarea, espera 5 segundos...");

// Simular tarea de 5 segundos
setTimeout(() => {
    escribirEnLog("Ejecutando tarea...");

    setTimeout(() => {
        escribirEnLog("Tarea completada");
        console.log("Tarea completada. Revisa log.txt");
    }, 5000);

}, 0);
