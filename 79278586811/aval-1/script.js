
function somar(a, b) {
    return a + b;
}

function subtrair(a, b) {
    return a - b;
}

function multiplicar(a, b) {
    return a * b;
}

function dividir(a, b) {
    if (b === 0) {
        return "Erro: não é possível dividir por zero!";
    }

    return a / b;
}

// Números para calcular
let numero1 = 20;
let numero2 = 5;

// Resultados
console.log("Soma: " + somar(numero1, numero2));

console.log("Subtração: " + subtrair(numero1, numero2));

console.log("Multiplicação: " + multiplicar(numero1, numero2));

console.log("Divisão: " + dividir(numero1, numero2));
