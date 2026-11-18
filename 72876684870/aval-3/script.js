
const tabuleiro = document.getElementById("tabuleiro");
const pontosEl = document.getElementById("pontos");
const tentativasEl = document.getElementById("tentativas");
const mensagem = document.getElementById("mensagem");
const botaoReiniciar = document.getElementById("reiniciar");

const figuras = [
    "🍓", "🎀", "🌸", "🧁",
    "🍒", "🦋", "💗", "🐰"
];

let primeiraCarta = null;
let segundaCarta = null;
let bloqueado = false;
let pontos = 0;
let tentativas = 0;
let pares = 0;

function iniciarJogo() {
    tabuleiro.innerHTML = "";

    primeiraCarta = null;
    segundaCarta = null;
    bloqueado = false;

    pontos = 0;
    tentativas = 0;
    pares = 0;

    atualizarPainel();

    mensagem.textContent = "Encontre os pares fofinhos! 💗";

    const cartas = [...figuras, ...figuras];

    // Embaralhar cartas
    cartas.sort(() => Math.random() - 0.5);

    cartas.forEach(figura => {
        const carta = document.createElement("button");

        carta.className = "carta";
        carta.textContent = "❔";
        carta.dataset.figura = figura;

        carta.addEventListener("click", () => {
            virarCarta(carta);
        });

        tabuleiro.appendChild(carta);
    });
}

function virarCarta(carta) {
    if (bloqueado) return;
    if (carta.classList.contains("aberta")) return;
    if (carta.classList.contains("acertada")) return;

    carta.textContent = carta.dataset.figura;
    carta.classList.add("aberta");

    if (primeiraCarta === null) {
        primeiraCarta = carta;
        return;
    }

    segundaCarta = carta;
    tentativas++;

    atualizarPainel();

    if (
        primeiraCarta.dataset.figura ===
        segundaCarta.dataset.figura
    ) {
        primeiraCarta.classList.add("acertada");
        segundaCarta.classList.add("acertada");

        primeiraCarta = null;
        segundaCarta = null;

        pontos += 10;
        pares++;

        atualizarPainel();

        if (pares === figuras.length) {
            mensagem.textContent =
                "🎉 Parabéns! Você encontrou todos os pares! 💖";
        } else {
            mensagem.textContent = "Muito bem! Você acertou! 💕";
        }

    } else {
        bloqueado = true;

        mensagem.textContent = "Ops! Tente novamente! 🌸";

        setTimeout(() => {
            primeiraCarta.textContent = "❔";
            segundaCarta.textContent = "❔";

            primeiraCarta.classList.remove("aberta");
            segundaCarta.classList.remove("aberta");

            primeiraCarta = null;
            segundaCarta = null;

            bloqueado = false;
        }, 900);
    }
}

function atualizarPainel() {
    pontosEl.textContent = pontos;
    tentativasEl.textContent = tentativas;
}

botaoReiniciar.addEventListener("click", iniciarJogo);

// Começar o jogo automaticamente
iniciarJogo();
