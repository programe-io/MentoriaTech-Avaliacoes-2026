// =========================================================
// PROJETO AULA 01 - AMBIENTE E PRIMEIROS PASSOS EM JS
// =========================================================

// 1. Saída básica apresentada na aula
console.log("Olá, mundo! Estou estudando JS.");
console.log("-----------------------------------------");

// 2. Variáveis e Tipos de Dados (prévia dos próximos tópicos)
const nomeAluno = "Estudante de JS";
const ambienteEscolhido = "VS Code + Node.js"; // ou "Programiz Online"
let aulaAtual = 1;
const ambienteConfigurado = true;

console.log("Aluno:", nomeAluno);
console.log("Ambiente:", ambienteEscolhido);
console.log("Aula atual:", aulaAtual);

// 3. Estrutura Condicional (verificando se está tudo pronto)
if (ambienteConfigurado) {
    console.log("Status: Ambiente pronto para codar!");
} else {
    console.log("Status: Verifique a instalação do Node.js.");
}

console.log("-----------------------------------------");

// 4. Estrutura de Dados (Array) e Repetição (Listando o cronograma da aula)
const conteudosFormacao = [
    "Tipos de dados e Variáveis",
    "Operadores",
    "Estruturas condicionais",
    "Estruturas de repetição",
    "Funções",
    "Introdução a estruturas de dados"
];

console.log("Próximos conteúdos da formação:");
for (let i = 0; i < conteudosFormacao.length; i++) {
    console.log(`${i + 1}. ${conteudosFormacao[i]}`);
}