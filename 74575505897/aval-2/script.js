// REVISÃO GERAL DE JAVASCRIPT

// 1. Variáveis
let nome = "Maria";
const idade = 17;

// 2. Condições
if (idade >= 18) {
    console.log("Maior de idade");
} else {
    console.log("Menor de idade");
}

// 3. Laços de repetição
for (let i = 1; i <= 5; i++) {
    console.log(i);
}

// 4. Funções
function somar(a, b) {
    return a + b;
}

console.log(somar(10, 5));

// 5. Arrays
let frutas = ["Maçã", "Banana", "Uva"];

frutas.push("Laranja");
console.log(frutas);

// 6. Objetos
let aluno = {
    nome: "João",
    idade: 16,
    curso: "Informática"
};

console.log(aluno.nome);

// 7. Métodos de array
let numeros = [1, 2, 3, 4, 5];

console.log(numeros.map(n => n * 2));
console.log(numeros.filter(n => n > 2));
console.log(numeros.find(n => n === 3));

// 8. Eventos
function mensagem() {
    console.log("Botão clicado!");
}

// 9. Manipulação de dados
let tarefas = [];

tarefas.push("Estudar JavaScript");
tarefas.push("Fazer exercícios");

tarefas.forEach(tarefa => {
    console.log(tarefa);
});

// 10. Remover elemento
tarefas.pop();

console.log(tarefas);