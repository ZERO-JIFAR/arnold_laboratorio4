const fs = require('fs');
const readline = require('readline');

// interfaz
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// leer
function leerContactos() {
    try {
        const data = fs.readFileSync('contactos.json', 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// escribir
function escribirContactos(contactos) {
    fs.writeFileSync('contactos.json', JSON.stringify(contactos, null, 4));
}

// agregar
function agregarContacto(nombre, telefono, email) {
    const contactos = leerContactos();
    contactos.push({ nombre, telefono, email });
    escribirContactos(contactos);
    console.log(`Contacto agregado: ${nombre}`);
}

// mostrar
function mostrarContactos() {
    const contactos = leerContactos();
    console.log("Lista de contactos:");
    console.table(contactos);
}

// eliminar
function eliminarContacto(nombre) {
    let contactos = leerContactos();
    const contactosFiltrados = contactos.filter(contacto => contacto.nombre !== nombre);

    if (contactos.length === contactosFiltrados.length) {
        console.log(`No se encontró el contacto: ${nombre}`);
    } else {
        escribirContactos(contactosFiltrados);
        console.log(`Contacto eliminado: ${nombre}`);
    }
}

// menu
function mostrarMenu() {
    console.log("\n--- MENU ---");
    console.log("1. Agregar contacto");
    console.log("2. Mostrar contactos");
    console.log("3. Eliminar contacto");
    console.log("4. Salir");
    
    rl.question("Seleccione una opción: ", (opcion) => {
        if (opcion === "1") {
            rl.question("Nombre: ", (nombre) => {
                rl.question("Telefono: ", (telefono) => {
                    rl.question("Email: ", (email) => {
                        agregarContacto(nombre, telefono, email);
                        mostrarMenu();
                    });
                });
            });
        } else if (opcion === "2") {
            mostrarContactos();
            mostrarMenu();
        } else if (opcion === "3") {
            rl.question("Ingrese el nombre del contacto a eliminar: ", (nombre) => {
                eliminarContacto(nombre);
                mostrarMenu();
            });
        } else if (opcion === "4") {
            console.log("Saliendo del programa...");
            rl.close();
        } else {
            console.log("Opción invalida. Intente nuevamente.");
            mostrarMenu();
        }
    });
}

// programa
mostrarMenu();
