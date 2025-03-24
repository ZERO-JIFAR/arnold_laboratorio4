const yargs = require("yargs");
const fs = require("fs");

// Configurar los comandos con Yargs
const argv = yargs

// Ejercico de teoria y 4
    .command("saludar", "Muestra un saludo", {
        nombre: {
            describe: "Nombre de la persona a saludar",
            demandOption: false, //Solo asi funciona la validacion manual
            type: "string",
        },
    })

// Ejercico 1
    .command("despedir", "Muestra una despedida", {
        nombre: {
            describe: "Nombre de la persona a despedir",
            demandOption: true, //Asi funciona la validacion de yargs
            type: "string",
        },
    })

// Ejercico 2
    .command("sumar", "Suma dos números", {
        n1: {
            describe: "Primer número a sumar",
            demandOption: true,
            type: "number",
        },
        n2: {
            describe: "Segundo número a sumar",
            demandOption: true,
            type: "number",
        },
    })

// Ejercicio 3
    .command("leer", "Lee un archivo JSON y muestra su contenido", {
        archivo: {
            describe: "Ruta del archivo JSON",
            demandOption: true,
            type: "string",
        },
    })

    .help()
    .argv;

// Logica de los comandos
// Ejercico de teoria y 4
// Comando: node index.js saludar --nombre="Juan"
if (argv._.includes("saludar")) {
    if (!argv.nombre) {
        console.error("Error: Debes proporcionar un nombre usando --nombre=<tu_nombre>");
        process.exit(1);
    }
    console.log(`Hola, ${argv.nombre}!`);
}

// Ejercico 1
// Comando: node index.js despedir --nombre="Juan" 
if (argv._.includes("despedir")) {
    console.log(`Adiós, ${argv.nombre}!`);
}

// Ejercico 2
// Comando: node index.js sumar --n1=5 --n2=3
if (argv._.includes("sumar")) {
    const resultado = argv.n1 + argv.n2;
    console.log(`Resultado: ${resultado}`);
}

// Ejercicio 3
// Comando: node index.js leer --archivo=package.json
if (argv._.includes("leer")) {
    try {
        const data = fs.readFileSync(argv.archivo, "utf-8");
        const jsonData = JSON.parse(data);
        console.log("Contenido del archivo JSON:", jsonData);
    } catch (error) {
        console.error("Error al leer el archivo:", error.message);
    }
}
