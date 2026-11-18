
const personagem = document.getElementById("personagem");
const obstaculo = document.getElementById("obstaculo");
const pontosTexto = document.getElementById("pontos");
const mensagem = document.getElementById("mensagem");

let pontos = 0;
let velocidade = 5;
let jogando = false;
let pulando = false;
let posicaoObstaculo = 0;
let intervalo;

function iniciarJogo() {
    pontos = 0;
    velocidade = 5;
    posicaoObstaculo = -50;
    jogando = true;

    pontosTexto.textContent = pontos;
    obstaculo.style.right = "-50px";
    personagem.style.bottom = "25px";

    mensagem.style.display = "none";

    clearInterval(intervalo);

    intervalo = setInterval(atualizarJogo, 20);
}

function pular() {
    if (!jogando || pulando) return;

    pulando = true;
    personagem.classList.add("pular-animacao");

    setTimeout(() => {
        personagem.classList.remove("pular-animacao");
        pulando = false;
    }, 600);
}

function atualizarJogo() {
    if (!jogando) return;

    posicaoObstaculo += velocidade;

    obstaculo.style.right = posicaoObstaculo + "px";

    if (posicaoObstaculo > 650) {
        posicaoObstaculo = -50;

        pontos++;
        pontosTexto.textContent = pontos;

        if (pontos % 5 === 0) {
            velocidade += 1;
        }
    }

    verificarColisao();
}

function verificarColisao() {
    const personagemRect = personagem.getBoundingClientRect();
    const obstaculoRect = obstaculo.getBoundingClientRect();

    if (
        personagemRect.right - 10 > obstaculoRect.left + 10 &&
        personagemRect.left + 10 < obstaculoRect.right - 10 &&
        personagemRect.bottom > obstaculoRect.top + 10
    ) {
        fimDeJogo();
    }
}

function fimDeJogo() {
    jogando = false;
    clearInterval(intervalo);

    mensagem.innerHTML = `
        <h2>💀 Fim de jogo!</h2>
        <h3>Pontuação: ${pontos}</h3>
        <button onclick="iniciarJogo()">JOGAR NOVAMENTE</button>
    `;

    mensagem.style.display = "flex";
}

document.addEventListener("keydown", (evento) => {
    if (evento.code === "Space") {
        evento.preventDefault();
        pular();
    }
});
