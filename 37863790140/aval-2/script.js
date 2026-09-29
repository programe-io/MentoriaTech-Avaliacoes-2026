// Variáveis principais do jogo
const canvas = document.getElementById('tabuleiro');
const ctx = canvas.getContext('2d');
const canvasProxima = document.getElementById('proxima');
const ctxProxima = canvasProxima.getContext('2d');
const textoStatus = document.getElementById('status-jogo');
const textoPontos = document.getElementById('pontos');
const textoLinhas = document.getElementById('linhas');
const textoNivel = document.getElementById('nivel');
const textoRecorde = document.getElementById('recorde');
const btnReiniciar = document.getElementById('btn-reiniciar');
const botoesControle = document.querySelectorAll('[data-acao]');

// Tabuleiro de 10 colunas x 20 linhas, cada quadrado com 30px
const colunas = 10;
const linhas = 20;
const tamanho = 30;

// As 7 peças do jogo (1 = bloco) e suas cores
const pecas = {
    I: { cor: "#00d2ff", forma: [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]] },
    O: { cor: "#eccc68", forma: [[1,1],[1,1]] },
    T: { cor: "#a55eea", forma: [[0,1,0],[1,1,1],[0,0,0]] },
    S: { cor: "#2ed573", forma: [[0,1,1],[1,1,0],[0,0,0]] },
    Z: { cor: "#ff4757", forma: [[1,1,0],[0,1,1],[0,0,0]] },
    J: { cor: "#5352ed", forma: [[1,0,0],[1,1,1],[0,0,0]] },
    L: { cor: "#ffa502", forma: [[0,0,1],[1,1,1],[0,0,0]] }
};
const nomesPecas = Object.keys(pecas);

// Pontos ganhos por quantidade de linhas limpas de uma vez
const tabelaPontos = [0, 100, 300, 500, 800];

let grade;            // matriz do tabuleiro (guarda a cor de cada bloco fixo)
let peca;             // peça que está caindo
let proximaPeca;      // próxima peça
let pontos;
let totalLinhas;
let nivel;
let recorde = 0;
let jogoAtivo;
let pausado;
let acumulado;        // tempo acumulado para a peça descer
let ultimoTempo;

// Inicia o jogo adicionando os eventos
function inicializarJogo() {
    document.addEventListener('keydown', teclaPressionada);
    btnReiniciar.addEventListener('click', reiniciarJogo);
    botoesControle.forEach(botao => {
        botao.addEventListener('click', () => executarAcao(botao.dataset.acao));
    });
    reiniciarJogo();
    requestAnimationFrame(loop);
}

// Lê as teclas do teclado
function teclaPressionada(evento) {
    const teclas = {
        ArrowLeft: 'esquerda', a: 'esquerda',
        ArrowRight: 'direita', d: 'direita',
        ArrowDown: 'baixo', s: 'baixo',
        ArrowUp: 'girar', w: 'girar',
        " ": 'queda',
        p: 'pausa', P: 'pausa'
    };
    const acao = teclas[evento.key];
    if (acao) {
        evento.preventDefault();
        executarAcao(acao);
    }
}

// Faz o que o jogador pediu
function executarAcao(acao) {
    if (acao === 'pausa') {
        alternarPausa();
        return;
    }
    if (!jogoAtivo || pausado) return;

    if (acao === 'esquerda') mover(-1, 0);
    if (acao === 'direita') mover(1, 0);
    if (acao === 'baixo') descer();
    if (acao === 'girar') girar();
    if (acao === 'queda') quedaRapida();
    desenhar();
}

// Cria uma peça nova sorteada
function criarPeca() {
    const nome = nomesPecas[Math.floor(Math.random() * nomesPecas.length)];
    const forma = pecas[nome].forma.map(linha => [...linha]);
    return {
        forma: forma,
        cor: pecas[nome].cor,
        x: Math.floor((colunas - forma[0].length) / 2),
        y: 0
    };
}

// Verifica se a forma bate na parede, no chão ou em outros blocos
function colide(forma, x, y) {
    for (let l = 0; l < forma.length; l++) {
        for (let c = 0; c < forma[l].length; c++) {
            if (!forma[l][c]) continue;
            const nx = x + c;
            const ny = y + l;
            if (nx < 0 || nx >= colunas || ny >= linhas) return true;
            if (ny >= 0 && grade[ny][nx]) return true;
        }
    }
    return false;
}

// Move a peça para o lado
function mover(dx, dy) {
    if (!colide(peca.forma, peca.x + dx, peca.y + dy)) {
        peca.x += dx;
        peca.y += dy;
        return true;
    }
    return false;
}

// Gira a peça 90 graus (tenta empurrar para o lado se bater na parede)
function girar() {
    const n = peca.forma.length;
    const nova = peca.forma.map(linha => linha.map(() => 0));

    for (let l = 0; l < n; l++) {
        for (let c = 0; c < n; c++) {
            nova[c][n - 1 - l] = peca.forma[l][c];
        }
    }

    for (const ajuste of [0, -1, 1, -2, 2]) {
        if (!colide(nova, peca.x + ajuste, peca.y)) {
            peca.forma = nova;
            peca.x += ajuste;
            return;
        }
    }
}

// Desce a peça uma linha; se não der, fixa no tabuleiro
function descer() {
    if (mover(0, 1)) {
        acumulado = 0;
    } else {
        fixarPeca();
    }
}

// Derruba a peça direto até o chão
function quedaRapida() {
    let caiu = 0;
    while (mover(0, 1)) {
        caiu++;
    }
    pontos += caiu * 2;
    fixarPeca();
}

// Grava a peça na grade e prepara a próxima
function fixarPeca() {
    peca.forma.forEach((linha, l) => {
        linha.forEach((valor, c) => {
            if (valor && peca.y + l >= 0) {
                grade[peca.y + l][peca.x + c] = peca.cor;
            }
        });
    });

    limparLinhas();

    peca = proximaPeca;
    proximaPeca = criarPeca();
    acumulado = 0;

    // Se a nova peça já nasce batendo, acabou o jogo
    if (colide(peca.forma, peca.x, peca.y)) {
        fimDeJogo();
    }
    atualizarPlacar();
}

// Remove as linhas completas e dá pontos
function limparLinhas() {
    const restantes = grade.filter(linha => linha.some(bloco => !bloco));
    const removidas = linhas - restantes.length;

    if (removidas === 0) return;

    while (restantes.length < linhas) {
        restantes.unshift(new Array(colunas).fill(0));
    }
    grade = restantes;

    pontos += tabelaPontos[removidas] * nivel;
    totalLinhas += removidas;
    nivel = Math.floor(totalLinhas / 10) + 1;
    textoStatus.textContent = removidas === 4 ? "GUSTAVOBLOCK! 🔥" : "Boa!";
}

// Quanto tempo (ms) a peça leva para descer uma linha
function velocidade() {
    return Math.max(100, 800 - (nivel - 1) * 70);
}

// Repete o tempo todo e faz a peça cair sozinha
function loop(tempo) {
    const passou = tempo - ultimoTempo;
    ultimoTempo = tempo;

    if (jogoAtivo && !pausado) {
        acumulado += passou;
        if (acumulado >= velocidade()) {
            acumulado = 0;
            descer();
            desenhar();
        }
    }
    requestAnimationFrame(loop);
}

// Desenha um bloco com um brilho leve
function desenharBloco(contexto, x, y, cor) {
    contexto.fillStyle = cor;
    contexto.fillRect(x * tamanho + 1, y * tamanho + 1, tamanho - 2, tamanho - 2);
    contexto.fillStyle = "rgba(255, 255, 255, 0.25)";
    contexto.fillRect(x * tamanho + 1, y * tamanho + 1, tamanho - 2, 5);
}

// Desenha o tabuleiro, a sombra da peça e a peça atual
function desenhar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Linhas de grade suaves
    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    for (let c = 1; c < colunas; c++) {
        ctx.beginPath();
        ctx.moveTo(c * tamanho, 0);
        ctx.lineTo(c * tamanho, canvas.height);
        ctx.stroke();
    }
    for (let l = 1; l < linhas; l++) {
        ctx.beginPath();
        ctx.moveTo(0, l * tamanho);
        ctx.lineTo(canvas.width, l * tamanho);
        ctx.stroke();
    }

    // Blocos já fixos
    for (let l = 0; l < linhas; l++) {
        for (let c = 0; c < colunas; c++) {
            if (grade[l][c]) desenharBloco(ctx, c, l, grade[l][c]);
        }
    }

    if (!jogoAtivo) return;

    // Sombra: mostra onde a peça vai cair
    let sombraY = peca.y;
    while (!colide(peca.forma, peca.x, sombraY + 1)) sombraY++;
    peca.forma.forEach((linha, l) => {
        linha.forEach((valor, c) => {
            if (valor) desenharBloco(ctx, peca.x + c, sombraY + l, "rgba(255, 255, 255, 0.15)");
        });
    });

    // Peça atual
    peca.forma.forEach((linha, l) => {
        linha.forEach((valor, c) => {
            if (valor) desenharBloco(ctx, peca.x + c, peca.y + l, peca.cor);
        });
    });

    desenharProxima();
}

// Desenha a próxima peça na caixinha
function desenharProxima() {
    ctxProxima.clearRect(0, 0, canvasProxima.width, canvasProxima.height);
    const forma = proximaPeca.forma;
    const desvioX = (4 - forma[0].length) * tamanho / 2;
    const desvioY = (4 - forma.length) * tamanho / 2;

    forma.forEach((linha, l) => {
        linha.forEach((valor, c) => {
            if (!valor) return;
            ctxProxima.fillStyle = proximaPeca.cor;
            ctxProxima.fillRect(desvioX + c * tamanho + 1, desvioY + l * tamanho + 1, tamanho - 2, tamanho - 2);
        });
    });
}

// Atualiza os números na tela
function atualizarPlacar() {
    textoPontos.textContent = pontos;
    textoLinhas.textContent = totalLinhas;
    textoNivel.textContent = nivel;
    textoRecorde.textContent = recorde;
}

// Pausa e volta ao jogo
function alternarPausa() {
    if (!jogoAtivo) return;
    pausado = !pausado;
    textoStatus.textContent = pausado ? "⏸ Pausado (aperte P)" : "Boa sorte!";
}

// Termina o jogo e salva o recorde
function fimDeJogo() {
    jogoAtivo = false;
    if (pontos > recorde) recorde = pontos;
    textoStatus.textContent = `💀 Fim de jogo! ${pontos} pontos`;
}

// Limpa tudo e começa de novo
function reiniciarJogo() {
    grade = Array.from({ length: linhas }, () => new Array(colunas).fill(0));
    pontos = 0;
    totalLinhas = 0;
    nivel = 1;
    jogoAtivo = true;
    pausado = false;
    acumulado = 0;
    ultimoTempo = performance.now();

    peca = criarPeca();
    proximaPeca = criarPeca();

    textoStatus.textContent = "Boa sorte!";
    atualizarPlacar();
    desenhar();
}

// Chama a função para ligar o jogo assim que o script carrega
inicializarJogo();