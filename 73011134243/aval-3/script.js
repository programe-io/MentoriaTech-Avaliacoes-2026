
const canvas = document.getElementById("campo");
const ctx = canvas.getContext("2d");

const golsElemento = document.getElementById("gols");
const defesasElemento = document.getElementById("defesas");
const chutesElemento = document.getElementById("chutes");
const mensagem = document.getElementById("mensagem");

const botaoChutar = document.getElementById("chutar");
const botaoReiniciar = document.getElementById("reiniciar");

let gols = 0;
let defesas = 0;
let chutes = 10;

let bola = {
    x: 300,
    y: 365,
    tamanho: 17
};

let goleiro = {
    x: 300,
    destino: 300
};

let animando = false;
let resultado = null;

function desenharCampo() {
    // Gramado
    ctx.fillStyle = "#15803d";
    ctx.fillRect(0, 0, 600, 420);

    // Faixas do gramado
    for (let i = 0; i < 6; i++) {
        ctx.fillStyle = i % 2 === 0 ? "#16a34a" : "#15803d";
        ctx.fillRect(i * 100, 0, 100, 420);
    }

    // Linhas do campo
    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(0, 210);
    ctx.lineTo(600, 210);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(300, 210, 55, 0, Math.PI * 2);
    ctx.stroke();

    // Área do gol
    ctx.strokeRect(175, 20, 250, 120);
    ctx.strokeRect(225, 20, 150, 70);

    // Gol
    ctx.fillStyle = "#e2e8f0";
    ctx.fillRect(145, 15, 310, 12);

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 7;

    ctx.beginPath();
    ctx.moveTo(150, 20);
    ctx.lineTo(150, 115);
    ctx.lineTo(450, 115);
    ctx.lineTo(450, 20);
    ctx.stroke();

    // Rede do gol
    ctx.strokeStyle = "#ffffff88";
    ctx.lineWidth = 1;

    for (let x = 165; x < 450; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 25);
        ctx.lineTo(x, 110);
        ctx.stroke();
    }

    for (let y = 35; y < 115; y += 15) {
        ctx.beginPath();
        ctx.moveTo(150, y);
        ctx.lineTo(450, y);
        ctx.stroke();
    }
}

function desenharGoleiro() {
    const x = goleiro.x;
    const y = 85;

    // Corpo
    ctx.fillStyle = "#facc15";
    ctx.fillRect(x - 25, y - 15, 50, 40);

    // Cabeça
    ctx.fillStyle = "#f5c28b";
    ctx.beginPath();
    ctx.arc(x, y - 28, 13, 0, Math.PI * 2);
    ctx.fill();

    // Braços
    ctx.strokeStyle = "#facc15";
    ctx.lineWidth = 10;

    ctx.beginPath();
    ctx.moveTo(x - 20, y - 10);
    ctx.lineTo(x - 42, y + 8);
    ctx.moveTo(x + 20, y - 10);
    ctx.lineTo(x + 42, y + 8);
    ctx.stroke();

    // Luvas
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(x - 42, y + 8, 8, 0, Math.PI * 2);
    ctx.arc(x + 42, y + 8, 8, 0, Math.PI * 2);
    ctx.fill();

    // Pernas
    ctx.strokeStyle = "#1e40af";
    ctx.lineWidth = 9;

    ctx.beginPath();
    ctx.moveTo(x - 12, y + 25);
    ctx.lineTo(x - 18, y + 48);
    ctx.moveTo(x + 12, y + 25);
    ctx.lineTo(x + 18, y + 48);
    ctx.stroke();
}

function desenharBola() {
    ctx.fillStyle = "#00000044";
    ctx.beginPath();
    ctx.ellipse(
        bola.x + 3,
        bola.y + 10,
        bola.tamanho,
        7,
        0,
        0,
        Math.PI * 2
    );
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(bola.x, bola.y, bola.tamanho, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#111827";
    ctx.beginPath();
    ctx.arc(bola.x, bola.y, 6, 0, Math.PI * 2);
    ctx.fill();
}

function desenhar() {
    desenharCampo();
    desenharGoleiro();
    desenharBola();
}

function atualizarPlacar() {
    golsElemento.textContent = gols;
    defesasElemento.textContent = defesas;
    chutesElemento.textContent = chutes;
}

function chutar() {
    if (animando || chutes <= 0) return;

    animando = true;
    botaoChutar.disabled = true;

    chutes--;

    const mira = Number(document.getElementById("mira").value);
    const forca = Number(document.getElementById("forca").value);

    const destinoX = 165 + mira * 2.7;
    const destinoY = 65;

    const goleiroInicial = goleiro.x;

    // O goleiro escolhe uma posição para defender
    goleiro.destino = 170 + Math.random() * 260;

    // Resultado do chute
    const dentroDoGol = destinoX >= 165 && destinoX <= 435;

    const defendeu =
        dentroDoGol &&
        Math.abs(destinoX - goleiro.destino) < 48;

    const foiGol = dentroDoGol && !defendeu;

    const inicio = performance.now();
    const duracao = 1200 - forca * 55;

    const bolaInicial = {
        x: 300,
        y: 365
    };

    function animar(tempo) {
        let progresso = Math.min(
            (tempo - inicio) / duracao,
            1
        );

        // Movimento da bola
        bola.x =
            bolaInicial.x +
            (destinoX - bolaInicial.x) * progresso;

        bola.y =
            bolaInicial.y +
            (destinoY - bolaInicial.y) * progresso;

        // Efeito de altura
        bola.y -= Math.sin(progresso * Math.PI) * (30 + forca * 5);

        // Movimento do goleiro
        const movimentoGoleiro = Math.min(progresso * 1.5, 1);

        goleiro.x =
            goleiroInicial +
            (goleiro.destino - goleiroInicial) *
            movimentoGoleiro;

        // Aumentar o efeito de perspectiva da bola
        bola.tamanho = 17 - progresso * 7;

        desenhar();

        if (progresso < 1) {
            requestAnimationFrame(animar);
        } else {
            finalizarChute(foiGol, defendeu);
        }
    }

    atualizarPlacar();
    mensagem.textContent = "⚽ CHUTANDO!";

    requestAnimationFrame(animar);
}

function finalizarChute(foiGol, defendeu) {
    if (foiGol) {
        gols++;
        mensagem.textContent = "⚽ GOOOOOL! PARABÉNS!";
    } else if (defendeu) {
        defesas++;
        mensagem.textContent = "🧤 DEFESA DO GOLEIRO!";
    } else {
        defesas++;
        mensagem.textContent = "❌ CHUTE PARA FORA!";
    }

    atualizarPlacar();

    bola = {
        x: 300,
        y: 365,
        tamanho: 17
    };

    goleiro.x = 300;

    desenhar();

    animando = false;

    if (chutes === 0) {
        botaoChutar.disabled = true;
        botaoReiniciar.hidden = false;

        mensagem.textContent =
            `🏁 FIM DE JOGO! Você marcou ${gols} gol(s)!`;
    } else {
        botaoChutar.disabled = false;
    }
}

function reiniciar() {
    gols = 0;
    defesas = 0;
    chutes = 10;

    bola = {
        x: 300,
        y: 365,
        tamanho: 17
    };

    goleiro.x = 300;

    animando = false;

    botaoChutar.disabled = false;
    botaoReiniciar.hidden = true;

    mensagem.textContent = "Prepare-se para chutar!";

    atualizarPlacar();
    desenhar();
}

// Iniciar o jogo
atualizarPlacar();
desenhar();
