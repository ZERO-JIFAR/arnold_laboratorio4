export function pedirEdad(rl, nombre) {
    rl.question("", (edad) => {
        const añoNacimiento = new Date().getFullYear() - parseInt(edad);
        console.log(`${nombre} naciste en el año ${añoNacimiento}.`);
        //rl.close(); // Cerrar la interfaz de entrada
    });
}
