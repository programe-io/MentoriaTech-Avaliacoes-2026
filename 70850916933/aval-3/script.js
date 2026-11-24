
let numero1 = Number(prompt("Digite o primeiro número:"));
let operador = prompt("Digite a operação (+, -, *, /):");
let numero2 = Number(prompt("Digite o segundo número:"));

let resultado;

if (operador === "+") {
    resultado = numero1 + numero2;
} else if (operador === "-") {
    resultado = numero1 - numero2;
} else if (operador === "*") {
    resultado = numero1 * numero2;
} else if (operador === "/") {
    if (numero2 !== 0) {
        resultado = numero1 / numero2;
    } else {
        resultado = "Não é possível dividir por zero!";
    }
} else {
    resultado = "Operação inválida!";
}

console.log("Resultado: " + resultado);
