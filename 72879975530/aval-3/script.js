// =========================
// 1. VARIÁVEIS E TIPOS
// =========================
let nome = "Maria";       // String
const idade = 25;         // Número (constante)
let ativo = true;         // Booleano
let indefinido;           // undefined
let nulo = null;          // null

console.log(typeof nome, typeof idade, typeof ativo);

// =========================
// 2. OPERADORES
// =========================
let soma = 5 + 3;         // 8
let sub = 10 - 4;         // 6
let mult = 2 * 3;         // 6
let div = 10 / 2;         // 5
let resto = 10 % 3;       // 1

// =========================
// 3. ESTRUTURAS CONDICIONAIS
// =========================
if (idade >= 18) {
    console.log("Maior de idade");
} else {
    console.log("Menor de idade");
}

// Operador ternário
let statusIdade = idade >= 18 ? "Adulto" : "Menor";

// =========================
// 4. LAÇOS DE REPETIÇÃO
// =========================
for (let i = 0; i < 5; i++) {
    console.log("For:", i);
}

let contador = 0;
while (contador < 3) {
    console.log("While:", contador);
    contador++;
}

// =========================
// 5. FUNÇÕES
// =========================
function saudacao(nome) {
    return `Olá, ${nome}!`;
}
console.log(saudacao("João"));

// Função anônima
const dobro = function (x) {
    return x * 2;
};

// Arrow function
const triplo = x => x * 3;

// =========================
// 6. ARRAYS
// =========================
let frutas = ["Maçã", "Banana", "Laranja"];
frutas.push("Uva"); // adiciona
frutas.pop();       // remove último
frutas.forEach(f => console.log(f));

// =========================
// 7. OBJETOS
// =========================
let pessoa = {
    nome: "Carlos",
    idade: 30,
    falar: function () {
        console.log(`Meu nome é ${this.nome}`);
    }
};
pessoa.falar();

// =========================
// 8. MANIPULAÇÃO DE STRINGS
// =========================
let texto = "JavaScript é incrível!";
console.log(texto.toUpperCase());
console.log(texto.includes("incrível"));

// =========================
// 9. MANIPULAÇÃO DE DATAS
// =========================
let agora = new Date();
console.log(agora.toLocaleString());

// =========================
// 10. PROMISES E ASYNC/AWAIT
// =========================
function esperar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function executar() {
    console.log("Esperando 2 segundos...");
    await esperar(2000);
    console.log("Pronto!");
}
executar();

// =========================
// 11. DOM (para navegador)
// =========================
// document.getElementById("meuBotao").addEventListener("click", () => {
//     alert("Botão clicado!");
// });
