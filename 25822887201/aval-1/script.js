// ============================
// Variáveis e Constantes
// ============================
let nome = "João";
const PI = 3.14159;
var idade = 25; // var é antigo, mas ainda funciona

// ============================
// Funções
// ============================
function saudacao(nome) {
    console.log(`Olá, ${nome}!`);
}

const soma = (a, b) => a + b;

// ============================
// Condicionais
// ============================
if (idade >= 18) {
    console.log("Maior de idade");
} else {
    console.log("Menor de idade");
}

// ============================
// Loops
// ============================
for (let i = 0; i < 5; i++) {
    console.log(`Contagem for: ${i}`);
}

let j = 0;
while (j < 5) {
    console.log(`Contagem while: ${j}`);
    j++;
}

// ============================
// Arrays e Métodos
// ============================
let frutas = ["maçã", "banana", "laranja"];
frutas.push("uva");      // adiciona
frutas.pop();            // remove último
frutas.shift();          // remove primeiro
frutas.unshift("pera");  // adiciona no início

frutas.forEach((item, index) => {
    console.log(`Fruta ${index}: ${item}`);
});

// ============================
// Objetos
// ============================
let pessoa = {
    nome: "Maria",
    idade: 30,
    profissao: "Designer",
    saudacao: function() {
        console.log(`Oi, meu nome é ${this.nome}`);
    }
};

console.log(pessoa.nome);
pessoa.saudacao();

// ============================
// DOM - Manipulação de Elementos
// ============================
document.addEventListener("DOMContentLoaded", () => {
    const titulo = document.getElementById("titulo");
    titulo.textContent = "Título alterado pelo JavaScript";

    const btn = document.getElementById("btnClique");
    btn.addEventListener("click", () => {
        alert("Você clicou no botão!");
        titulo.style.color = "red";
    });

    const input = document.getElementById("inputNome");
    input.addEventListener("input", (e) => {
        console.log(`Você digitou: ${e.target.value}`);
    });
});

// ============================
// Eventos do Mouse
// ============================
document.addEventListener("mousemove", (e) => {
    console.log(`Mouse em X:${e.clientX}, Y:${e.clientY}`);
});

// ============================
// Timer
// ============================
setTimeout(() => console.log("Executa após 2 segundos"), 2000);

let contador = 0;
const intervalo = setInterval(() => {
    console.log(`Intervalo: ${contador}`);
    contador++;
    if (contador >= 5) clearInterval(intervalo);
}, 1000);

// ============================
// Manipulação de CSS via JS
// ============================
const caixa = document.getElementById("caixa");
if (caixa) {
    caixa.style.width = "200px";
    caixa.style.height = "200px";
    caixa.style.backgroundColor = "blue";
    caixa.style.transition = "all 0.5s";
    caixa.addEventListener("mouseover", () => caixa.style.backgroundColor = "green");
    caixa.addEventListener("mouseout", () => caixa.style.backgroundColor = "blue");
}

// ============================
// Fetch API - Requisições HTTP
// ============================
fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then(response => response.json())
    .then(data => console.log("Fetch:", data))
    .catch(error => console.error("Erro no fetch:", error));

// ============================
// Local Storage
// ============================
localStorage.setItem("usuario", "João");
console.log("LocalStorage:", localStorage.getItem("usuario"));
localStorage.removeItem("usuario");

// ============================
// Validação de Formulário
// ============================
function validarForm() {
    const nomeInput = document.getElementById("inputNome").value;
    if (nomeInput === "") {
        alert("O campo nome não pode estar vazio!");
        return false;
    }
    return true;
}

// ============================
// Classes ES6
// ============================
class Animal {
    constructor(nome, especie) {
        this.nome = nome;
        this.especie = especie;
    }

    falar() {
        console.log(`${this.nome} faz barulho.`);
    }
}

const cachorro = new Animal("Rex", "Cachorro");
cachorro.falar();

// ============================
// Animações Simples
// ============================
let pos = 0;
function moverCaixa() {
    if (!document.getElementById("caixa")) return;
    const caixa = document.getElementById("caixa");
    pos += 5;
    caixa.style.left = pos + "px";
    if (pos < 300) {
        requestAnimationFrame(moverCaixa);
    }
}
requestAnimationFrame(moverCaixa);

// ============================
// Template Literals e Destructuring
// ============================
const pessoa2 = { nome: "Ana", idade: 28 };
const { nome: n, idade: i } = pessoa2;
console.log(`Nome: ${n}, Idade: ${i}`);