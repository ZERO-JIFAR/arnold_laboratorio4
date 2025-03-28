const fs = require('fs').promises;
const readline = require('readline');
const yargs = require('yargs');

const argv = yargs.option('file', {
    alias: 'f',
    type: 'string',
    default: 'productos.json',
    describe: 'Nombre del archivo JSON donde se guardaran los productos'
}).argv;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const preguntar = (pregunta) => {
    return new Promise((resolve) => {
        rl.question(pregunta, (respuesta) => {
            resolve(respuesta);
        });
    });
};

const obtenerDatos = async () => {
    try {
        const nombre = await preguntar('Producto: ');
        const precio = parseFloat(await preguntar('Precio: '));
        const cantidad = parseInt(await preguntar('Cantidad: '), 10);

        if (isNaN(precio) || isNaN(cantidad)) {
            console.error('Error: Precio y cantidad deben ser valores numericos');
            rl.close();
            return;
        }

        const nuevoProducto = { nombre, precio, cantidad };
        await guardarProducto(nuevoProducto);
    } catch (error) {
        console.error('Error obteniendo datos:', error);
    } finally {
        rl.close();
    }
};

const guardarProducto = async (producto) => {
    try {
        let productos = [];
        try {
            const data = await fs.readFile(argv.file, 'utf8');
            productos = JSON.parse(data);
        } catch (error) {
            if (error.code !== 'ENOENT') {
                console.error('Error leyendo el archivo:', error);
                return;
            }
        }

        productos.push(producto);
        await fs.writeFile(argv.file, JSON.stringify(productos, null, 2), 'utf8');
        console.log('Producto guardado');

        await mostrarArchivo();
    } catch (error) {
        console.error('Error guardando el producto:', error);
    }
};

const mostrarArchivo = async () => {
    try {
        const data = await fs.readFile(argv.file, 'utf8');
        console.log('Contenido del archivo:', JSON.parse(data));
    } catch (error) {
        console.error('Error leyendo el archivo:', error);
    }
};

obtenerDatos();
