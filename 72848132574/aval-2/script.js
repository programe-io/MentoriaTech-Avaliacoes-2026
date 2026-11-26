
const canvas = document.getElementById("jogo");
const ctx = canvas.getContext("2d");

let nave, meteoros, pontos, vidas, jogando;
let teclas = {};
let tempo = 0;

function iniciar() {
    nave = {
        x: 180,
        y: 465,
        largura: 40,
        altura: 45,
        velocidade: 6
    };

    meteoros = [];
    pontos = 0;
    vidas = 3;
    tempo = 0;
    jogando = true;

    atualizarInfo();
    desenhar();
}

function atualizarInfo() {
    document.getElementById("pontos").textContent = pontos;
    document.getElementById("vidas").textContent = vidas;
}

function desenharNave() {
    ctx.fillStyle = "#00eaff";

    ctx.beginPath();
    ctx.moveTo(nave.x + 20, nave.y);
    ctx.lineTo(nave.x, nave.y + 45);
    ctx.lineTo(nave.x + 40, nave.y + 45);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(nave.x + 20, nave.y + 23, 7, 0, Math.PI * 2);
    ctx.fill();
}

function criarMeteoro() {
    meteoros.push({
        x: Math.random() * 365,
        y: -30,
        tamanho: 20 + Math.random() * 15,
        velocidade: 2 + Math.random() * 2
    });
}

function desenharMeteoro(m) {
    ctx.fillStyle = "#ff684a";
    ctx.beginPath();
    ctx.arc(m.x, m.y, m.tamanho, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#ffb16b";
    ctx.beginPath();
    ctx.arc(m.x - 7, m.y - 5, 5, 0, Math.PI * 2);
    ctx.fill();
}

function colisao(m) {
    return (
        nave.x < m.x + m.tamanho &&
        nave.x + nave.largura > m.x - m.tamanho &&
        nave.y < m.y + m.tamanho &&
        nave.y + nave.altura > m.y - m.tamanho
    );
}

function desenhar() {
    if (!jogando) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";

    for (let i = 0; i < 35; i++) {
        let x = (i * 83) % 400;
        let y = (i * 137 + tempo * 2) % 550;
        ctx.fillRect(x, y, 2, 2);
    }

    if (teclas["ArrowLeft"] && nave.x > 0) {
        nave.x -= nave.velocidade;
    }

    if (teclas["ArrowRight"] && nave.x < 360) {
        nave.x += nave.velocidade;
    }

    desenharNave();

    tempo++;

    if (tempo % 40 === 0) {
        criarMeteoro();
    }

    for (let i = meteoros.length - 1; i >= 0; i--) {
        let m = meteoros[i];

        m.y += m.velocidade + pontos / 500;

        desenharMeteoro(m);

        if (colisao(m)) {
            meteoros.splice(i, 1);
            vidas--;
            atualizarInfo();

            if (vidas <= 0) {
                fimDeJogo();
                return;
            }

            continue;
        }

        if (m.y > 570) {
            meteoros.splice(i, 1);
            pontos += 10;
            atualizarInfo();
        }
    }

    requestAnimationFrame(desenhar);
}

function fimDeJogo() {
    jogando = false;

    ctx.fillStyle = "rgba(0,0,0,0.8)";
    ctx.fillRect(0, 0, 400, 550);

    ctx.fillStyle = "#ff5555";
    ctx.font = "bold 35px Arial";
    ctx.textAlign = "center";
    ctx.fillText("FIM DE JOGO!", 200, 250);

    ctx.fillStyle = "white";
    ctx.font = "22px Arial";
    ctx.fillText("Pontos: " + pontos, 200, 295);
    ctx.fillText("Clique em reiniciar!", 200, 340);
}

document.addEventListener("keydown", e => {
    teclas[e.key] = true;
});

document.addEventListener("keyup", e => {
    teclas[e.key] = false;
});

function controle(botao, tecla) {
    const elemento = document.getElementById(botao);

    elemento.addEventListener("pointerdown", e => {
        e.preventDefault();
        teclas[tecla] = true;
    });

    elemento.addEventListener("pointerup", () => {
        teclas[tecla] = false;
    });

    elemento.addEventListener("pointerleave", () => {
        teclas[tecla] = false;
    });

    elemento.addEventListener("pointercancel", () => {
        teclas[tecla] = false;
    });
}

controle("esquerda", "ArrowLeft");
controle("direita", "ArrowRight");

iniciar();
