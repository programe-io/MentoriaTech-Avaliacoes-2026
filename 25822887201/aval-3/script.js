// ============================
// Variáveis e Constantes
// ============================
let usuarioNome = "João";
const PI = 3.14159;

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
if (usuarioNome) {
    console.log("Usuário logado:", usuarioNome);
} else {
    console.log("Nenhum usuário logado");
}

// ============================
// Loops
// ============================
for (let i = 0; i < 3; i++) {
    console.log("For loop:", i);
}

let j = 0;
while (j < 3) {
    console.log("While loop:", j);
    j++;
}

// ============================
// Arrays e Objetos
// ============================
let frutas = ["maçã", "banana", "laranja"];
frutas.push("uva");
frutas.forEach((f, i) => console.log(`Fruta ${i}: ${f}`));

let pessoa = {
    nome: "Maria",
    idade: 30,
    saudacao: function() {
        console.log(`Oi, meu nome é ${this.nome}`);
    }
};
pessoa.saudacao();

// ============================
// DOM - Manipulação de Elementos
// ============================
document.addEventListener("DOMContentLoaded", () => {
    const titulo = document.querySelector("header h1");
    if (titulo) titulo.textContent = "Site Demo com JavaScript";

    const btn = document.querySelector("button");
    if (btn) {
        btn.addEventListener("click", () => alert("Botão clicado!"));
    }

    const inputNome = document.getElementById("nome");
    if (inputNome) {
        inputNome.addEventListener("input", e => console.log(`Digitou: ${e.target.value}`));
    }

    // ============================
    // Validação de Formulário
    // ============================
    const form = document.getElementById("formContato");
    if (form) {
        form.addEventListener("submit", e => {
            e.preventDefault();
            if (!inputNome.value || !document.getElementById("email").value) {
                alert("Preencha todos os campos!");
                return;
            }
            alert("Formulário enviado com sucesso!");
        });
    }

    // ============================
    // Canvas
    // ============================
    const canvas = document.getElementById("canvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "red";
        ctx.fillRect(10, 10, 100, 50);
    }

    // ============================
    // Animação da Caixa
    // ============================
    const caixa = document.getElementById("caixa");
    let pos = 0;
    function moverCaixa() {
        if (!caixa) return;
        pos += 2;
        caixa.style.left = pos + "px";
        if (pos < 300) requestAnimationFrame(moverCaixa);
    }
    requestAnimationFrame(moverCaixa);

    // ============================
    // Fetch API
    // ============================
    fetch("https://jsonplaceholder.typicode.com/posts/1")
        .then(res => res.json())
        .then(data => console.log("Fetch API:", data))
        .catch(err => console.error("Erro no fetch:", err));

    // ============================
    // Local Storage
    // ============================
    localStorage.setItem("usuario", usuarioNome);
    console.log("LocalStorage usuário:", localStorage.getItem("usuario"));
    localStorage.removeItem("usuario");

    // ============================
    // Eventos do Mouse
    // ============================
    document.addEventListener("mousemove", e => console.log(`Mouse X:${e.clientX}, Y:${e.clientY}`));

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
    // Classe ES6
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
    // Template Literals e Destructuring
    // ============================
    const pessoa2 = { nome: "Ana", idade: 28 };
    const { nome: n, idade: i } = pessoa2;
    console.log(`Nome: ${n}, Idade: ${i}`);
});