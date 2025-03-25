export function pedirEdad(rl, nombre) {
    return new Promise((resolve) => {
        rl.question("Cuantos años tienes? ", (edad) => {
            const añoNacimiento = new Date().getFullYear() - parseInt(edad);
            console.log(`${nombre} naciste en el año ${añoNacimiento}.`);
            resolve(edad);
            //rl.close(); // Cerrar la interfaz de entrada
        });
    });
}
