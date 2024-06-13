console.log('hola mundo');

const greeting = (string: string) => {
    console.log(`Hola ${string.toUpperCase()}`);
}

greeting('usuario!');

const sum = (num: number) => {
    console.log(num + 1);
}

sum(2);

const acceptPairs1to10 = (n: number) => {
    if (n % 2 === 0 && n <= 10) {
        console.log('Es válido');
    } else {
        console.log('No es válido');
    }
}

acceptPairs1to10(2);
acceptPairs1to10(3);
acceptPairs1to10(12);

// Que solo acepte inputs concretos. Así no es necesario poner un 'if'
type Words = ["hola", "adiós"];
// Agrupador de tipos que acepta
type parameters = string | number;

const frase = (frase: parameters, frase2: Words) => {
    console.log(frase, frase2);
}

// Si meto una palabra incorrecta, ya da error aquí
// frase("hasta luego", "hola");

enum COUNTRIES {
    SPA = 'SPA',
    GB = 'GB'
}

type TCOUNTRIES = COUNTRIES;

const spanishOrEnglish = (country: TCOUNTRIES) => {
    if (country === COUNTRIES.SPA) {
        console.log('Spanish');
    } else if (country === COUNTRIES.GB) {
        console.log('English');
    }
}

spanishOrEnglish(COUNTRIES.SPA);

type indexNumber = number;
type textNumber = string;

// Tuplas: asegurarse del orden
const numeroUno: [indexNumber, textNumber] = [1, 'uno'];

const BACKEND_API:string = 'google.es';

let PING: unknown = 80;

PING: null;

// void: para funciones que no esperan devolver nada
const validatePing = (): void => {
    if (typeof PING === 'number') {
        console.log('OK');
    } else {
        throw new Error('no number');
    }
}

/* En este caso, el never no tolera logs porque never es no devolver nunca nada. 
El Error no es un return. Los if tampoco los tolera porque quiere llegar a una finalidad directa.
No le gustan las bifurcaciones. */
const validatePing2 = (): never => {
    throw new Error('no number');
}

// Any es el comodín, se comporta como JS. Mala práctica abusar de él
// function anyFunc = (): any => {
//     return console.log('hello world');
// }

// opcional
type AUTHENTICATED = {
    userId: string,
    jwt: string,
    role: string,
    level?: number
}

// ? lo hace opcional. = son por defecto y no tienes que enviar argumentos
// El orden de los opcionales debe de ser el correcto: siempre los obligatorios primero
const isAuthenticated = (jwt: string, userId: string = 'admin', role: string = 'customer', level?: number): AUTHENTICATED => {
    return {
        userId,
        jwt,
        role,
        // retorna un valor por defecto
        level: level ?? 10
    }
}

const user = {
    name: 'Albert',
    age: 30,
    hobby: 'skate'
}

// Entonces, aquí no haría falta dar el level. Pero retornaría undefined
isAuthenticated('bbb1000', 'foo', 'bar');

type ARGS = number | string | boolean

const args = (...spreadargs: ARGS[]) => {
    console.log(...spreadargs);
    // console.log(...spreadargs[0]);
}

args(1, 2, true);
// args(user);

type ARGS2 = number | string;

// El : es lo que exiges que retorne
const numberTransform = (num: ARGS2): ARGS2 => {
    let transformedValue = num;
    if (typeof num === 'string') {
        // Esto permite que haya autocompletado de string
        transformedValue = num.toUpperCase();
    }
    return num;
}

// Interfaces, para datos más complejos
interface Base {
    id: string;
}

// Tendrá acceso a la id de Base
interface User extends Base {
    name: string;
    email: string;
    age: number;
    person: Persona;
}

interface Persona {
    phone: number;
}

const user1: User = {
    id: '91',
    name: 'hi',
    email: 'hi@gmail.com',
    age: 20,
    person: {
        phone: 980201839
    }
}

type address = string | undefined;

type city = address & {
    place: string
}

class User3 {
    private userName: string;
    public email: string;
    public age: number;

    constructor(userName: string, email: string, age: number) {
        this.userName = userName;
        this.email = email;
        this.age = age;
    }

    getName(): string {
        return this.userName;
    }
    
    setName(anotherName: string): void {
        this.userName = anotherName;
    }
}

const user7 = new User3('Hi', 'hi@gmail.com', 25);

class ErrorResponse {
    code: number = 404;
}

class SuccessResponse {
    code: number = 200;
    response: string = '';
}

type Req = ErrorResponse | SuccessResponse;

interface Res {
    data: string;
    code: number;
}

async function get (req: Req): Promise<Res | undefined> {
    try {
        const data = await fetch('www.google.es');
        // alternativa a poner undefined
        // let res: Res = {
        //     data: null,
        //     code: 500
        // }
        if (data) {
            if (req instanceof SuccessResponse) {
                return {
                    data,
                    code: req.code
                }
            }
        } else {
            if (req instanceOf ErrorResponse) {
                res = {
                    data,
                    code: req.code
                }
            }
        }
        // return res;
    } catch {
        throw new Error;
    }
}

type alphanumeric = string | number;
type numeric = number | undefined;
// Si pones |, no repetirá number entre ambos
type key = alphanumeric & numeric;

const num2: key = 2

// Hay que poner CanvasElement para que salga el autocompletado en context2d
const canvas = <HTMLCanvasElement>document.getElementById('canvas');
// también funciona con un as HTMLCanvasElement;

// Alternativa: (canvas as HTMLCanvasElement)
const context2D = canvas.getContext('2d');

// ! al final hace que ? no sea necesario abajo pero no recomendado
const btn = document.getElementById('btn');

// El ? es opcional. Te lo pone porque si no puede ser null. Optional chain
btn?.addEventListener('click', () => {
    alert('hola mundo');
});

const user10: User = {
    id: '91',
    name: 'hi',
    email: 'hi@gmail.com',
    age: 20,
    person: {
        phone: 980201839
    }
}

// ? para validar que existe
if (user?.name) {
    // código
}

// Decoradores
function Decorator(target: any) {
    console.log('I am a decorator');
    target.prototype.email = 'hi@hi.com';
}

interface User20 {
    name: string;
    age: number;
    email: string;
}

@Decorator
class User20 {
    name: string;
    age: number;

    constructor() {
        this.name = '';
        this.age = 0;
    }
}

const user20 = new User20();