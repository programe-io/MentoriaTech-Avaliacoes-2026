// Função para verificar se um número é par ou ímpar
function verificarParOuImpar(numero) {
    if (numero % 2 === 0) {
        return `O número ${numero} é PAR.`;
    } else {
        return `O número ${numero} é ÍMPAR.`;
    }
}

// Testando a função com alguns valores
const numero1 = 4;
const numero2 = 7;

console.log(verificarParOuImpar(numero1)); // Saída: O número 4 é PAR.
console.log(verificarParOuImpar(numero2)); // Saída: O número 7 é ÍMPAR.

// Exemplo usando um array e o método .map()
const numeros = [1, 2, 3, 4, 5, 6];
const resultados = numeros.map(num => `${num} é ${num % 2 === 0 ? 'Par' : 'Ímpar'}`);

console.log("\nLista completa:");
console.log(resultados)