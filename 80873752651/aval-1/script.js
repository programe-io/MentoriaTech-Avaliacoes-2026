
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Caça às Moedas</title>

<style>
    * {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        font-family: Arial, sans-serif;
        background: linear-gradient(135deg, #111827, #312e81);
        color: white;
        text-align: center;
        min-height: 100vh;
        padding: 20px;
    }

    h1 {
        color: #facc15;
        font-size: 36px;
    }

    .painel {
        display: flex;
        justify-content: center;
        gap: 25px;
        margin: 15px;
        font-size: 20px;
        font-weight: bold;
    }

    #jogo {
        position: relative;
        width: 100%;
        max-width: 600px;
        height: 400px;
        margin: 20px auto;
        background: linear-gradient(#0f172a, #1e3a8a);
        border: 3px solid #60a5fa;
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0 0 25px #3b82f6;
    }

    #jogador {
        position: absolute;
        bottom: 15px;
        left: 275px;
        font-size: 42px;
        width: 45px;
        height: 50px;
        user-select: none;
    }

    .objeto {
        position: absolute;
        top: 0;
        font-size: 30px;
        line-height: 35px;
        width: 35px;
        height: 35px;
    }

    button {
        border: none;
        border-radius: 10px;
        padding: 12px 22px;
        margin: 5px;
        background: #facc15;
        color: #111827;
        font-size: 17px;
        font-weight: bold;
        cursor: pointer;
    }

    button:hover {
        background: #fde68a;
        transform: scale(1.04);
    }

    .controles {
        display: flex;
        justify-content: center;
        gap: 20px;
    }

    .controles button {
        font-size: 25px;
        min-width: 75px;
    }

    #mensagem {
        font-size: 20px;
        font-weight: bold;
        min-height: 28px;
        color: #facc15;
    }

    p {
        color: #dbeafe;
    }
</style>
</head>

<body>

<h1>🪙 Caça às Moedas</h1>
<p>Pegue as moedas e fuja das bombas!</p>

<div class="painel">
    <div>⭐ Pontos: <span id="pontos">0</span></div>
    <div>❤️ Vidas: <span id="vidas">3</span></div>
</div>

<div id="jogo">
    <div id="jogador">🧑</div>
</div>

<div id="mensagem">Clique em começar para jogar!</div>

<button onclick="iniciar()">▶ Começar / Reiniciar</button>

<div class="controles">
    <button id="esquerda">⬅️</button>
    <button id="direita">➡️</button>
</div>

<p>Use as setas do teclado ou os botões para se mover.</p>

<script>
const jogo = document.getElementById("jogo");
const jogador = document.getElementById("jogador");
const pontosTexto = document.getElementById("pontos");
const vidasTexto = document.getElementById("vidas");
const mensagem = document.getElementById("mensagem");

let pontos = 0;
let vidas = 3;
let posicao = 0;
let objetos = [];
let rodando = false;
let quadro;
let ultimoObjeto = 0;
let velocidade = 3;
let teclas = {};

function moverJogador() {
    const limite = jogo.clientWidth - jogador.offsetWidth;

    if (teclas["ArrowLeft"] || teclas["a"]) {
        posicao -= 5;
    }

    if (teclas["ArrowRight"] || teclas["d"]) {
        posicao += 5;
    }

    posicao = Math.max(0, Math.min(limite, posicao));
    jogador.style.left = posicao + "px";
}

document.addEventListener("keydown", e => {
    teclas[e.key] = true;

    if (["ArrowLeft", "ArrowRight", " "].includes(e.key)) {
        e.preventDefault();
    }
});

document.addEventListener("keyup", e => {
    teclas[e.key] = false;
});

function controlarBotao(id, tecla) {
    const botao = document.getElementById(id);

    botao.addEventListener("pointerdown", e => {
        e.preventDefault();
        teclas[tecla] = true;
    });

    function soltar() {
        teclas[tecla] = false;
    }

    botao.addEventListener("pointerup", soltar);
    botao.addEventListener("pointerleave", soltar);
    botao.addEventListener("pointercancel", soltar);
}

controlarBotao("esquerda", "ArrowLeft");
controlarBotao("direita", "ArrowRight");

function criarObjeto() {
    const bomba = Math.random() < 0.3;
    const elemento = document.createElement("div");

    elemento.className = "objeto";
    elemento.textContent = bomba ? "💣" : "🪙";

    const x = Math.random() * (jogo.clientWidth - 35);
    elemento.style.left = x + "px";
    elemento.style.top = "-35px";

    jogo.appendChild(elemento);

    objetos.push({
        elemento: elemento,
        x: x,
        y: -35,
        bomba: bomba
    });
}

function encerrar() {
    rodando = false;
    cancelAnimationFrame(quadro);
    mensagem.textContent = "Fim de jogo! Sua pontuação: " + pontos;
}

function atualizar() {
    if (!rodando) return;

    moverJogador();

    const agora = performance.now();

    if (agora - ultimoObjeto > Math.max(350, 900 - pontos * 8)) {
        criarObjeto();
        ultimoObjeto = agora;
    }

    const larguraJogador = jogador.offsetWidth;
    const alturaJogador = jogador.offsetHeight;

    for (let i = objetos.length - 1; i >= 0; i--) {
        const obj = objetos[i];

        obj.y += velocidade;
        obj.elemento.style.top = obj.y + "px";

        const acertou =
            obj.x < posicao + larguraJogador - 5 &&
            obj.x + 30 > posicao + 5 &&
            obj.y + 30 > jogo.clientHeight - alturaJogador - 15 &&
            obj.y < jogo.clientHeight - 15;

        if (acertou) {
            if (obj.bomba) {
                vidas--;
                vidasTexto.textContent = vidas;
                mensagem.textContent = "💥 Cuidado com as bombas!";
            } else {
                pontos += 10;
                pontosTexto.textContent = pontos;
                mensagem.textContent = "🪙 Você pegou uma moeda!";
                velocidade = Math.min(8, 3 + pontos / 100);
            }

            obj.elemento.remove();
            objetos.splice(i, 1);

            if (vidas <= 0) {
                encerrar();
                return;
            }

            continue;
        }

        if (obj.y > jogo.clientHeight) {
            obj.elemento.remove();
            objetos.splice(i, 1);
        }
    }

    quadro = requestAnimationFrame(atualizar);
}

function iniciar() {
    cancelAnimationFrame(quadro);

    objetos.forEach(obj => obj.elemento.remove());
    objetos = [];

    pontos = 0;
    vidas = 3;
    velocidade = 3;
    posicao = (jogo.clientWidth - jogador.offsetWidth) / 2;
    ultimoObjeto = performance.now();

    pontosTexto.textContent = pontos;
    vidasTexto.textContent = vidas;
    mensagem.textContent = "Boa sorte! Pegue as moedas!";
    jogador.style.left = posicao + "px";

    teclas = {};
    rodando = true;

    atualizar();
}
</script>

</body>
</html>
