"use strict";
console.log('hola mundo');
const saludo = (string) => {
    console.log(`Hola ${string.toUpperCase()}`);
};
saludo('usuario!');
const suma = (num) => {
    console.log(num + 1);
};
suma(2);
const aceptaPares1a10 = (n) => {
    if (n % 2 === 0) {
        console.log('Es válido');
    }
};
aceptaPares1a10(2);
