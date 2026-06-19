// ===========================
// VARIÁVEIS
// ===========================
let nome = "João";
const idade = 25;
var cidade = "Teresina";

console.log(nome, idade, cidade);

// ===========================
// FUNÇÕES
// ===========================
function saudacao(nome) {
    return `Olá, ${nome}!`;
}

console.log(saudacao("Maria"));

// Arrow Function
const soma = (a, b) => a + b;

console.log(soma(10, 20));

// ===========================
// CONDIÇÕES
// ===========================
let nota = 8;

if (nota >= 7) {
    console.log("Aprovado");
} else {
    console.log("Reprovado");
}

// Operador ternário
let status = nota >= 7 ? "Passou" : "Não passou";
console.log(status);

// ===========================
// LOOPS
// ===========================
for (let i = 1; i <= 5; i++) {
    console.log("Número:", i);
}

let contador = 0;

while (contador < 3) {
    console.log("While:", contador);
    contador++;
}

// ===========================
// ARRAYS
// ===========================
const frutas = [
    "Maçã",
    "Banana",
    "Laranja",
    "Uva"
];

frutas.forEach(fruta => {
    console.log(fruta);
});

const numeros = [1, 2, 3, 4, 5];

const dobrados = numeros.map(n => n * 2);

console.log(dobrados);

// ===========================
// OBJETOS
// ===========================
const pessoa = {
    nome: "Carlos",
    idade: 30,
    profissao: "Programador",

    apresentar() {
        console.log(`Meu nome é ${this.nome}`);
    }
};

pessoa.apresentar();

// ===========================
// CLASSES
// ===========================
class Animal {
    constructor(nome) {
        this.nome = nome;
    }

    falar() {
        console.log(`${this.nome} fez um som.`);
    }
}

class Cachorro extends Animal {
    falar() {
        console.log(`${this.nome} latiu.`);
    }
}

const rex = new Cachorro("Rex");

rex.falar();

// ===========================
// DOM
// ===========================
document.addEventListener("DOMContentLoaded", () => {

    const botao = document.getElementById("botao");

    if (botao) {

        botao.addEventListener("click", () => {

            const titulo =
                document.getElementById("titulo");

            titulo.textContent =
                "Texto alterado pelo JavaScript!";

            titulo.style.color = "red";
        });

    }

});

// ===========================
// TEMPORIZADORES
// ===========================
setTimeout(() => {
    console.log("Executou após 2 segundos");
}, 2000);

let segundos = 0;

const intervalo = setInterval(() => {

    segundos++;

    console.log(`Tempo: ${segundos}s`);

    if (segundos === 5) {
        clearInterval(intervalo);
    }

}, 1000);

// ===========================
// LOCAL STORAGE
// ===========================
localStorage.setItem(
    "usuario",
    "Administrador"
);

console.log(
    localStorage.getItem("usuario")
);

// ===========================
// JSON
// ===========================
const usuario = {
    nome: "Pedro",
    idade: 22
};

const json = JSON.stringify(usuario);

console.log(json);

const objeto = JSON.parse(json);

console.log(objeto);

// ===========================
// PROMISES
// ===========================
function carregarDados() {

    return new Promise((resolve, reject) => {

        let sucesso = true;

        setTimeout(() => {

            if (sucesso) {
                resolve("Dados carregados!");
            } else {
                reject("Erro ao carregar.");
            }

        }, 2000);

    });

}

carregarDados()
    .then(resposta => {
        console.log(resposta);
    })
    .catch(erro => {
        console.error(erro);
    });

// ===========================
// ASYNC / AWAIT
// ===========================
async function buscarDados() {

    try {

        const resposta =
            await carregarDados();

        console.log(resposta);

    } catch (erro) {

        console.error(erro);

    }

}

buscarDados();

// ===========================
// FETCH API
// ===========================
async function buscarUsuarios() {

    try {

        const resposta =
            await fetch(
                "https://jsonplaceholder.typicode.com/users"
            );

        const dados =
            await resposta.json();

        console.log(dados);

    } catch (erro) {

        console.error(
            "Erro:",
            erro
        );

    }

}

buscarUsuarios();

// ===========================
// DATA E HORA
// ===========================
const agora = new Date();

console.log(
    agora.toLocaleString()
);

// ===========================
// MATH
// ===========================
console.log(
    Math.random()
);

console.log(
    Math.floor(5.9)
);

console.log(
    Math.max(10, 20, 30)
);

// ===========================
// DESESTRUTURAÇÃO
// ===========================
const usuario2 = {
    nome: "Ana",
    idade: 28
};

const {
    nome: nomeUsuario,
    idade: idadeUsuario
} = usuario2;

console.log(
    nomeUsuario,
    idadeUsuario
);

// ===========================
// SPREAD OPERATOR
// ===========================
const lista1 = [1, 2, 3];
const lista2 = [...lista1, 4, 5];

console.log(lista2);

// ===========================
// EVENTOS DE TECLADO
// ===========================
document.addEventListener(
    "keydown",
    (evento) => {

        console.log(
            "Tecla:",
            evento.key
        );

    }
);

// ===========================
// EVENTOS DO MOUSE
// ===========================
document.addEventListener(
    "mousemove",
    (evento) => {

        console.log(
            evento.clientX,
            evento.clientY
        );

    }
);

console.log("JavaScript carregado com sucesso!");