const fs = require("fs/promises");
const readline = require("readline");
const yargs = require("yargs");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const argv = yargs
    .option("file", {
        alias: "f",
        type: "string",
        description: "Nombre del archivo JSON",
        default: "productos.json"
    })
    .help()
    .argv;

async function solicitarDato(pregunta) {
    return new Promise((resolve) => {
        rl.question(pregunta, (respuesta) => resolve(respuesta));
    });
}

async function main() {
    try {
        const nombre = await solicitarDato("Ingrese el nombre del producto: ");
        const precio = parseFloat(await solicitarDato("Ingrese el precio del producto: "));
        const cantidad = parseInt(await solicitarDato("Ingrese la cantidad del producto: "), 10);
        rl.close();

        if (isNaN(precio) || isNaN(cantidad)) {
            console.error("El precio y la cantidad deben ser valores numericos");
            return;
        }

        const producto = { nombre, precio, cantidad };
        const fileName = argv.file;

        let productos = [];
        try {
            const data = await fs.readFile(fileName, "utf-8");
            productos = JSON.parse(data);
            if (!Array.isArray(productos)) {
                throw new Error("El archivo JSON no contiene un array valido.");
            }
        } catch (error) {
            if (error.code !== "ENOENT") {
                console.error("Error al leer el archivo JSON:", error);
                return;
            }
        }

        productos.push(producto);
        await fs.writeFile(fileName, JSON.stringify(productos, null, 2));
        console.log("Producto guardado exitosamente.");

        const contenidoFinal = await fs.readFile(fileName, "utf-8");
        console.log("Contenido del archivo:", contenidoFinal);
    } catch (error) {
        console.error("Ocurrio un error:", error);
    }
}

main();
