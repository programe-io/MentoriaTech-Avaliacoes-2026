// Número aleatório entre 1 e 100
const numeroSecreto = Math.floor(Math.random() * 100) + 1;
let tentativas = 0;

function verificar() {
    const palpite = Number(document.getElementById("palpite").value);
    const resultado = document.getElementById("resultado");

    tentativas++;

    if (palpite < 1 || palpite > 100) {
        resultado.textContent = "Digite um número entre 1 e 100.";
        return;
    }

    if (palpite === numeroSecreto) {
        resultado.innerHTML =
            `🎉 Você acertou o número ${numeroSecreto} em ${tentativas} tentativas!`;
        resultado.style.color = "green";
    } else if (palpite < numeroSecreto) {
        resultado.textContent = "📈 O número secreto é maior.";
        resultado.style.color = "blue";
    } else {
        resultado.textContent = "📉 O número secreto é menor.";
        resultado.style.color = "red";
    }
}