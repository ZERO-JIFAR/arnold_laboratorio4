const fs = require('fs');

// Escribir en consola: node index.js archivo.txt "la palabra a contar"
// Ejemplo: node index.js archivo.txt palabras
// Respuesta: La palabra "palabras" aparece 5 veces en el archivo "archivo.txt".

// Obtiene los argumentos
const nombreArchivo = process.argv[2];
const palabraBuscada = process.argv[3].toLowerCase();

function contarPalabraEnArchivo(archivo, palabra) {

    // Lee
    const contenido = fs.readFileSync(archivo, 'utf8');

    // Convierte a min y elimina signos
    const palabras = contenido.toLowerCase().replace(/[.,;!?]/g, "").split(/\s+/);

    // Contador
    const contador = palabras.filter(word => word === palabra).length;

    console.log(`La palabra "${palabra}" aparece ${contador} veces en el archivo "${archivo}".`);
}

// Programa
contarPalabraEnArchivo(nombreArchivo, palabraBuscada);
