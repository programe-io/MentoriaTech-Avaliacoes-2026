
alert("🎮 BEM-VINDO AO JOGO!");

let numeroSecreto = Math.floor(Math.random() * 100) + 1;
let tentativas = 0;
let acertou = false;

while (!acertou) {
    let resposta = prompt("Digite um número de 1 a 100:");

    if (resposta === null) {
        break;
    }

    let numero = Number(resposta);
    tentativas++;

    if (!Number.isInteger(numero) || numero < 1 || numero > 100) {
        alert("Digite um número válido!");
    } 
    else if (numero === numeroSecreto) {
        alert("🎉 PARABÉNS! VOCÊ ACERTOU!");
        alert("Tentativas: " + tentativas);
        acertou = true;
    } 
    else if (numero < numeroSecreto) {
        alert("📈 Tente um número MAIOR!");
    } 
    else {
        alert("📉 Tente um número MENOR!");
    }
}

alert("Obrigado por jogar! 😎");