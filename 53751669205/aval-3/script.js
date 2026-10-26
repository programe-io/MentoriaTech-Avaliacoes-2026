const jogo = document.getElementById("jogo");
const carro = document.getElementById("carro");
const pontosTexto = document.getElementById("pontos");
const recordeTexto = document.getElementById("recorde");
const menu = document.getElementById("menu");
const botaoIniciar = document.getElementById("iniciar");

let jogando = false;
let pontos = 0;
let velocidade = 4;
let posicaoCarro = 150;
let inimigos = [];
let teclas = {};
let ultimoTempo = 0;
let tempoInimigo = 0;
let estradaPosicao = 0;

let recorde = Number(localStorage.getItem("recordeCarro")) || 0;
recordeTexto.textContent = recorde;

// CONTROLES DO TECLADO

document.addEventListener("keydown", (evento) => {
    const tecla = evento.key.toLowerCase();

    if (["arrowleft", "arrowright", "a", "d"].includes(tecla)) {
        evento.preventDefault();
    }

    teclas[tecla] = true;
});

document.addEventListener("keyup", (evento) => {
    teclas[evento.key.toLowerCase()] = false;
});

// CONTROLES DOS BOTÕES

function configurarBotao(id, tecla) {
    const botao = document.getElementById(id);

    botao.addEventListener("pointerdown", (evento) => {
        evento.preventDefault();
        teclas[tecla] = true;
    });

    botao.addEventListener("pointerup", () => {
        teclas[tecla] = false;
    });

    botao.addEventListener("pointerleave", () => {
        teclas[tecla] = false;
    });

    botao.addEventListener("pointercancel", () => {
        teclas[tecla] = false;
    });
}

configurarBotao("esquerda", "arrowleft");
configurarBotao("direita", "arrowright");

// INICIAR JOGO

function iniciarJogo() {
    inimigos.forEach(inimigo => inimigo.elemento.remove());

    inimigos = [];
    pontos = 0;
    velocidade = 4;
    tempoInimigo = 0;
    estradaPosicao = 0;
    ultimoTempo = 0;
    teclas = {};

    posicaoCarro = (jogo.clientWidth - carro.offsetWidth) / 2;
    carro.style.left = posicaoCarro + "px";

    pontosTexto.textContent = pontos;

    menu.style.display = "none";

    jogando = true;

    requestAnimationFrame(atualizarJogo);
}

botaoIniciar.addEventListener("click", iniciarJogo);

// CRIAR CARROS INIMIGOS

function criarInimigo() {
    const inimigo = document.createElement("div");

    inimigo.classList.add("inimigo");

    const larguraPista = jogo.clientWidth;
    const larguraInimigo = 45;

    const posicao = Math.random() *
        (larguraPista - larguraInimigo);

    inimigo.style.left = posicao + "px";
    inimigo.style.top = "-100px";

    const cores = [
        "blue",
        "yellow",
        "purple",
        "orange",
        "lime"
    ];

    inimigo.style.background =
        cores[Math.floor(Math.random() * cores.length)];

    jogo.appendChild(inimigo);

    inimigos.push({
        elemento: inimigo,
        x: posicao,
        y: -100
    });
}

// DETECTAR COLISÃO

function verificarColisao(elemento1, elemento2) {
    const a = elemento1.getBoundingClientRect();
    const b = elemento2.getBoundingClientRect();

    return (
        a.left < b.right &&
        a.right > b.left &&
        a.top < b.bottom &&
        a.bottom > b.top
    );
}

// FINALIZAR JOGO

function finalizarJogo() {
    jogando = false;

    if (pontos > recorde) {
        recorde = pontos;
        localStorage.setItem("recordeCarro", recorde);
        recordeTexto.textContent = recorde;
    }

    menu.innerHTML = `
        <h2>💥 GAME OVER!</h2>
        <p>Sua pontuação: ${pontos}</p>
        <p>Recorde: ${recorde}</p>
        <button id="reiniciar">JOGAR NOVAMENTE</button>
    `;

    menu.style.display = "flex";

    document.getElementById("reiniciar")
        .addEventListener("click", iniciarJogo);
}

// ATUALIZAR JOGO

function atualizarJogo(tempoAtual) {
    if (!jogando) return;

    if (!ultimoTempo) {
        ultimoTempo = tempoAtual;
    }

    const delta = Math.min(
        (tempoAtual - ultimoTempo) / 16.67,
        3
    );

    ultimoTempo = tempoAtual;

    // MOVIMENTAÇÃO DO JOGADOR

    if (teclas["arrowleft"] || teclas["a"]) {
        posicaoCarro -= 6 * delta;
    }

    if (teclas["arrowright"] || teclas["d"]) {
        posicaoCarro += 6 * delta;
    }

    const limite = jogo.clientWidth - carro.offsetWidth;

    posicaoCarro = Math.max(
        0,
        Math.min(posicaoCarro, limite)
    );

    carro.style.left = posicaoCarro + "px";

    // MOVIMENTO DA ESTRADA

    estradaPosicao += velocidade * delta;

    document.getElementById("estrada")
        .style.backgroundPositionY =
        estradaPosicao + "px";

    // CRIAÇÃO DOS INIMIGOS

    tempoInimigo += 16.67 * delta;

    if (tempoInimigo > Math.max(450, 1200 - pontos * 3)) {
        criarInimigo();
        tempoInimigo = 0;
    }

    // MOVIMENTO DOS INIMIGOS

    for (let i = inimigos.length - 1; i >= 0; i--) {
        const inimigo = inimigos[i];

        inimigo.y += velocidade * delta;

        inimigo.elemento.style.top =
            inimigo.y + "px";

        // COLISÃO

        if (verificarColisao(carro, inimigo.elemento)) {
            finalizarJogo();
            return;
        }

        // PONTUAÇÃO

        if (inimigo.y > jogo.clientHeight) {
            inimigo.elemento.remove();

            inimigos.splice(i, 1);

            pontos += 10;

            pontosTexto.textContent = pontos;

            velocidade = Math.min(12, 4 + pontos / 100);
        }
    }

    requestAnimationFrame(atualizarJogo);
}