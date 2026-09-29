const jogo = document.getElementById("jogo");

const pontuacaoTexto = document.getElementById("pontuacao");
const tempoTexto = document.getElementById("tempo");
const acertosTexto = document.getElementById("acertos");

const mensagem = document.getElementById("mensagem");

const btnIniciar = document.getElementById("btn-iniciar");
const btnReiniciar = document.getElementById("btn-reiniciar");

const mira = document.getElementById("mira");

let pontuacao = 0;
let acertos = 0;
let tempo = 30;

let jogoAtivo = false;

let intervaloAlvo;
let intervaloTempo;


/* INICIAR JOGO */

function iniciarJogo() {

    pontuacao = 0;
    acertos = 0;
    tempo = 30;

    jogoAtivo = true;

    atualizarPlacar();

    mensagem.style.display = "none";

    mira.style.display = "block";

    criarAlvo();

    intervaloAlvo = setInterval(criarAlvo, 900);

    intervaloTempo = setInterval(contarTempo, 1000);
}


/* CRIA UM NOVO ALVO */

function criarAlvo() {

    if (!jogoAtivo) {
        return;
    }

    const alvo = document.createElement("div");

    alvo.classList.add("alvo");

    const largura = jogo.clientWidth;
    const altura = jogo.clientHeight;

    const tamanho = 65;

    const x = Math.random() * (largura - tamanho);
    const y = Math.random() * (altura - tamanho);

    alvo.style.left = `${x}px`;
    alvo.style.top = `${y}px`;


    /* QUANDO O ALVO É ACERTADO */

    alvo.addEventListener("click", function(evento) {

        evento.stopPropagation();

        if (!jogoAtivo) {
            return;
        }

        pontuacao += 10;

        acertos++;

        atualizarPlacar();

        alvo.remove();
    });


    jogo.appendChild(alvo);


    /* O ALVO DESAPARECE SE NÃO FOR CLICADO */

    setTimeout(() => {

        if (alvo.parentElement) {
            alvo.remove();
        }

    }, 1800);
}


/* CONTAGEM DO TEMPO */

function contarTempo() {

    tempo--;

    tempoTexto.textContent = tempo;

    if (tempo <= 0) {
        terminarJogo();
    }
}


/* TERMINAR JOGO */

function terminarJogo() {

    jogoAtivo = false;

    clearInterval(intervaloAlvo);
    clearInterval(intervaloTempo);

    document.querySelectorAll(".alvo").forEach(alvo => {
        alvo.remove();
    });

    mira.style.display = "none";

    mensagem.style.display = "flex";

    mensagem.innerHTML = `
        <h2>🏁 Fim de jogo!</h2>

        <p>
            Pontuação: <strong>${pontuacao}</strong>
        </p>

        <p>
            Alvos acertados: <strong>${acertos}</strong>
        </p>

        <button id="btn-novo-jogo">
            JOGAR NOVAMENTE
        </button>
    `;

    document
        .getElementById("btn-novo-jogo")
        .addEventListener("click", iniciarJogo);
}


/* ATUALIZAR PLACAR */

function atualizarPlacar() {

    pontuacaoTexto.textContent = pontuacao;

    acertosTexto.textContent = acertos;

    tempoTexto.textContent = tempo;
}


/* MOVER A MIRA */

jogo.addEventListener("mousemove", function(evento) {

    if (!jogoAtivo) {
        return;
    }

    const area = jogo.getBoundingClientRect();

    const x = evento.clientX - area.left;
    const y = evento.clientY - area.top;

    mira.style.left = `${x}px`;
    mira.style.top = `${y}px`;
});


/* CLIQUE FORA DO ALVO */

jogo.addEventListener("click", function(evento) {

    if (!jogoAtivo) {
        return;
    }

    if (!evento.target.classList.contains("alvo")) {

        pontuacao -= 2;

        if (pontuacao < 0) {
            pontuacao = 0;
        }

        atualizarPlacar();
    }
});


/* BOTÕES */

btnIniciar.addEventListener("click", iniciarJogo);

btnReiniciar.addEventListener("click", function() {

    clearInterval(intervaloAlvo);
    clearInterval(intervaloTempo);

    document.querySelectorAll(".alvo").forEach(alvo => {
        alvo.remove();
    });

    iniciarJogo();
});