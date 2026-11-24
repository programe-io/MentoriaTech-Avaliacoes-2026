// Função para calcular o MDC
function mdc(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// Função para calcular o MMC
function mmc(a, b) {
    return (a * b) / mdc(a, b);
}

// Exemplo
let num1 = 12;
let num2 = 18;

console.log("MMC de " + num1 + " e " + num2 + " = " + mmc(num1, num2));
