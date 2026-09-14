// ========================================
// REVISÃO DE JAVASCRIPT - PARTE 2
// ========================================


// ========================================
// 1. FOR
// ========================================

// Soma dos números pares de 1 até 10

let somaPares = 0;

for (let numero = 1; numero <= 10; numero++) {

    if (numero % 2 === 0) {
        somaPares += numero;
    }
}

console.log("Soma dos números pares:", somaPares);
// Resultado: 30



// ========================================
// 2. WHILE
// ========================================

// Exemplo simples de while

let contador = 1;

while (contador <= 5) {

    console.log("Contador:", contador);

    contador++;
}



// ========================================
// 3. DO...WHILE
// ========================================

let numero = 1;

do {

    console.log("Número:", numero);

    numero++;

} while (numero <= 5);



// ========================================
// 4. FUNÇÃO TRADICIONAL
// ========================================

function saudacao() {

    console.log("Olá! Seja bem-vindo!");

}

saudacao();



// ========================================
// 5. FUNÇÃO COM PARÂMETROS
// ========================================

function somar(a, b) {

    return a + b;

}

let resultado = somar(10, 20);

console.log("Resultado da soma:", resultado);
// Resultado: 30



// ========================================
// 6. EXPRESSÃO DE FUNÇÃO
// ========================================

const multiplicar = function(a, b) {

    return a * b;

};

console.log("Multiplicação:", multiplicar(5, 4));
// Resultado: 20



// ========================================
// 7. ARROW FUNCTION
// ========================================

const subtrair = (a, b) => {

    return a - b;

};

console.log("Subtração:", subtrair(10, 3));
// Resultado: 7



// ========================================
// 8. ARROW FUNCTION SIMPLIFICADA
// ========================================

const dividir = (a, b) => a / b;

console.log("Divisão:", dividir(20, 4));
// Resultado: 5



// ========================================
// 9. FUNÇÃO ANÔNIMA
// ========================================

const mensagem = function() {

    console.log("Esta é uma função anônima.");

};

mensagem();



// ========================================
// 10. SETINTERVAL
// ========================================

// Executa uma função a cada 2 segundos.

// Para testar, retire os comentários abaixo.

/*
setInterval(function() {

    console.log("Mensagem exibida a cada 2 segundos.");

}, 2000);
*/



// ========================================
// 11. ARRAYS
// ========================================

let frutas = [
    "Maçã",
    "Banana",
    "Laranja"
];

console.log("Array de frutas:", frutas);



// ========================================
// 12. ACESSANDO ELEMENTOS
// ========================================

console.log("Primeira fruta:", frutas[0]);
console.log("Segunda fruta:", frutas[1]);
console.log("Terceira fruta:", frutas[2]);



// ========================================
// 13. LENGTH
// ========================================

console.log("Quantidade de frutas:", frutas.length);



// ========================================
// 14. PUSH
// ========================================

// Adiciona um elemento no final

frutas.push("Uva");

console.log("Depois do push:", frutas);



// ========================================
// 15. POP
// ========================================

// Remove o último elemento

frutas.pop();

console.log("Depois do pop:", frutas);



// ========================================
// 16. UNSHIFT
// ========================================

// Adiciona um elemento no início

frutas.unshift("Morango");

console.log("Depois do unshift:", frutas);



// ========================================
// 17. SHIFT
// ========================================

// Remove o primeiro elemento

frutas.shift();

console.log("Depois do shift:", frutas);



// ========================================
// 18. PERCORRENDO UM ARRAY COM FOR
// ========================================

let nomes = [
    "Ana",
    "João",
    "Maria",
    "Pedro"
];

for (let i = 0; i < nomes.length; i++) {

    console.log("Nome:", nomes[i]);

}



// ========================================
// 19. EXEMPLO PRÁTICO
// ========================================

// Soma dos números pares de um array

let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 10];

let soma = 0;

for (let i = 0; i < numeros.length; i++) {

    if (numeros[i] % 2 === 0) {

        soma += numeros[i];

    }
}

console.log("Soma dos números pares do array:", soma);



// ========================================
// 20. MENSAGEM NO HTML
// ========================================

console.log("JavaScript carregado com sucesso!");
