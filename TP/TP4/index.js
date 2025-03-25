// Cargar variables con requiere
//require("dotenv").config();

// Cargar variables con import
import "dotenv/config"; 
import { sumar } from "./math.js"; 

// Ejercicio 3
import readline from 'readline';
import {pedirEdad} from './edad.js'

// Ejercicio 4
import { pedirDatos } from "./guardarDatos.js"; 
import { console } from "inspector";

console.log("Las respuestas a las preguntas estan en tu corazon y en el archivo llamado: ejerTeorico.txt")

// Obtener variables
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

// Mostrar en consola
console.log("Configuración de la base de datos:");
console.log(`. Host: ${dbHost}`);
console.log(`. Usuario: ${dbUser}`);
console.log(`. Contraseña: ${dbPass}`);

// Importar usando require
//const { sumar } = require("./math"); 
//const resultado = sumar(5, 3);
//console.log(`Resultado de la suma: ${resultado}`);


// Importar usando ES6
const resultado = sumar(5, 3);
console.log(`Resultado de la suma: ${resultado}`);


// Ejercicio 3
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('¿Cuál es tu nombre? ', (nombre) => {
    console.log(`Hola, ${nombre}!`);
    pedirEdad(rl, nombre);
});

pedirDatos();
