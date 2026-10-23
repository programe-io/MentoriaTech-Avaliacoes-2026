
const campoNumero = document.getElementById("numero");
const botaoJogar = document.getElementById("btnJogar");
const botaoNovo = document.getElementById("btnNovo");
const mensagem = document.getElementById("mensagem");
const placarTentativas = document.getElementById("tentativas");

let numeroSecreto;
let tentativas;
let terminou;

function iniciarJogo() {
    numeroSecreto = Math.floor(Math.random() * 10) + 1;
    tentativas = 0;
    terminou = false;

    campoNumero.value = "";
    campoNumero.disabled = false;
    botaoJogar.disabled = false;

    mensagem.textContent = "Boa sorte! Tente adivinhar.";
    placarTentativas.textContent = tentativas;

    campoNumero.focus();
}

function jogar() {
    if (terminou) return;

    const numero = Number(campoNumero.value);

    if (
        campoNumero.value.trim() === "" ||
        !Number.isInteger(numero) ||
        numero < 1 ||
        numero > 10
    ) {
        mensagem.textContent = "Digite um número de 1 a 10!";
        return;
    }

    tentativas++;
    placarTentativas.textContent = tentativas;

    if (numero === numeroSecreto) {
        mensagem.textContent =
            `🎉 Parabéns! Você acertou em ${tentativas} tentativa(s)!`;

        terminou = true;
        campoNumero.disabled = true;
        botaoJogar.disabled = true;
    } else if (numero < numeroSecreto) {
        mensagem.textContent = "📈 Tente um número maior!";
    } else {
        mensagem.textContent = "📉 Tente um número menor!";
    }

    campoNumero.value = "";

    if (!terminou) {
        campoNumero.focus();
    }
}

botaoJogar.addEventListener("click", jogar);
botaoNovo.addEventListener("click", iniciarJogo);

campoNumero.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        jogar();
    }
});

iniciarJogo();
