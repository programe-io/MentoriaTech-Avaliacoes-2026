/* ==========================================================================
   1. VARIÁVEIS, TIPOS DE DADOS E OPERADORES
   ========================================================================== */

// Declarando variáveis (const, let, var)
const PI = 3.14159; // Valor constante (não pode ser reatribuído)
let contador = 0;   // ES6 - Escopo de bloco (mutável)
var antigo = "var"; // ES5 - Escopo de função (evitar uso moderno)

// Tipos Primitivos
const texto = "Olá, Mundo!";                   // String
const numero = 42;                             // Number
const decimal = 99.9;                          // Number (ponto flutuante)
const bigIntNum = 9007199254740991n;           // BigInt (números inteiros grandes)
const booleano = true;                         // Boolean (true / false)
const indeferido = undefined;                  // Undefined (valor não definido)
const nulo = null;                             // Null (ausência intencional de valor)
const simbolo = Symbol("id");                  // Symbol (identificador único)

// Operadores Matemáticos, Lógicos e Modernos
const soma = 10 + 5;                          // 15
const incremento = ++contador;                 // Pré-incremento
const concatenacao = texto + " Seja bem-vindo.";
const templateString = `O resultado é: ${soma * 2}`; // Template Literals (ES6)

// Operadores Lógicos e Nulidade
const eLogico = booleano && contador > 0;      // AND
const ouLogico = booleano || false;            // OR
const valorPadrao = null ?? "Valor Padrão";     // Nullish Coalescing (??)
const acessoSeguro = { info: null }?.info?.nome; // Optional Chaining (?.)


/* ==========================================================================
   2. ESTRUTURAS DE CONTROLE (CONDICIONAIS E LAÇOS)
   ========================================================================== */

// Condicionais (if, else if, else, ternário, switch)
if (numero > 50) {
  console.log("Número maior que 50");
} else if (numero === 42) {
  console.log("A resposta para tudo!"); // Igualdade estrita (===)
} else {
  console.log("Número menor");
}

// Operador Ternário
const statusIdade = numero >= 18 ? "Maior de idade" : "Menor de idade";

// Switch Case
const dia = "segunda";
switch (dia) {
  case "segunda":
    console.log("Início da semana");
    break;
  case "sexta":
    console.log("Sextou!");
    break;
  default:
    console.log("Dia comum");
}

// Laços de Repetição (Looping)
for (let i = 0; i < 3; i++) {
  console.log(`For clássico: ${i}`);
}

let w = 0;
while (w < 2) {
  console.log(`While: ${w}`);
  w++;
}

// Loops de Iteração Modernos
const frutas = ["Maçã", "Banana", "Laranja"];