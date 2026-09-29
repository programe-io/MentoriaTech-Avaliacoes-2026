// Variáveis principais do jogo
const elementoTabuleiro = document.getElementById('tabuleiro');
const textoStatus = document.getElementById('status-jogo');
const btnReiniciar = document.getElementById('btn-reiniciar');
const contagemBrancas = document.getElementById('contagem-brancas');
const contagemPretas = document.getElementById('contagem-pretas');

const TAMANHO = 8;
let tabuleiro = [];
let jogadorAtual = 'branca'; // 'branca' inicia no fundo (sobe), 'preta' no topo (desce)
let pecaSelecionada = null; // { l, c }
let movimentosValidos = [];
let jogoAtivo = true;

// Inicialização do Tabuleiro
function inicializarJogo() {
    tabuleiro = Array(TAMANHO).fill(null).map(() => Array(TAMANHO).fill(null));
    jogadorAtual = 'branca';
    pecaSelecionada = null;
    movimentosValidos = [];
    jogoAtivo = true;

    // Posicionamento inicial das peças nas casas escuras
    for (let l = 0; l < TAMANHO; l++) {
        for (let c = 0; c < TAMANHO; c++) {
            if ((l + c) % 2 === 1) {
                if (l < 3) {
                    tabuleiro[l][c] = { cor: 'preta', ehDama: false };
                } else if (l > 4) {
                    tabuleiro[l][c] = { cor: 'branca', ehDama: false };
                }
            }
        }
    }

    atualizarStatus();
    renderizarTabuleiro();
}

// Renderização e Atualização Visual
function renderizarTabuleiro() {
    elementoTabuleiro.innerHTML = '';

    for (let l = 0; l < TAMANHO; l++) {
        for (let c = 0; c < TAMANHO; c++) {
            const casa = document.createElement('div');
            casa.classList.add('casa');
            casa.classList.add((l + c) % 2 === 0 ? 'clara' : 'escura');
            casa.dataset.linha = l;
            casa.dataset.coluna = c;

            const ehMovimentoValido = movimentosValidos.some(m => m.paraL === l && m.paraC === c);
            if (ehMovimentoValido) {
                casa.classList.add('possivel-movimento');
                casa.addEventListener('click', () => executarMovimento(l, c));
            }

            const peca = tabuleiro[l][c];
            if (peca) {
                const elementoPeca = document.createElement('div');
                elementoPeca.classList.add('peca', peca.cor);
                
                if (peca.ehDama) {
                    elementoPeca.classList.add('dama');
                    elementoPeca.textContent = '👑';
                }

                if (pecaSelecionada && pecaSelecionada.l === l && pecaSelecionada.c === c) {
                    elementoPeca.classList.add('selecionada');
                }

                if (jogoAtivo && peca.cor === jogadorAtual) {
                    elementoPeca.addEventListener('click', (e) => {
                        e.stopPropagation();
                        selecionarPeca(l, c);
                    });
                }

                casa.appendChild(elementoPeca);
            }

            elementoTabuleiro.appendChild(casa);
        }
    }

    atualizarContadores();
}

// Seleção de Peça e Cálculo de Movimentos
function selecionarPeca(linha, coluna) {
    if (!jogoAtivo) return;

    if (pecaSelecionada && pecaSelecionada.l === linha && pecaSelecionada.c === coluna) {
        pecaSelecionada = null;
        movimentosValidos = [];
    } else {
        pecaSelecionada = { l: linha, c: coluna };
        movimentosValidos = calcularMovimentosValidos(linha, coluna);
    }

    renderizarTabuleiro();
}

function calcularMovimentosValidos(l, c) {
    const peca = tabuleiro[l][c];
    if (!peca) return [];

    const movimentos = [];
    const direcoes = peca.ehDama 
        ? [[-1, -1], [-1, 1], [1, -1], [1, 1]] 
        : (peca.cor === 'branca' ? [[-1, -1], [-1, 1]] : [[1, -1], [1, 1]]);

    // Movimentos Simples e Capturas
    direcoes.forEach(([dl, dc]) => {
        const destL = l + dl;
        const destC = c + dc;

        // Movimento simples
        if (posicaoValida(destL, destC) && !tabuleiro[destL][destC]) {
            movimentos.push({ paraL: destL, paraC: destC, captura: null });
        }

        // Captura
        const saltoL = l + dl * 2;
        const saltoC = c + dc * 2;
        if (
            posicaoValida(saltoL, saltoC) &&
            tabuleiro[destL][destC] &&
            tabuleiro[destL][destC].cor !== peca.cor &&
            !tabuleiro[saltoL][saltoC]
        ) {
            movimentos.push({
                paraL: saltoL,
                paraC: saltoC,
                captura: { l: destL, c: destC }
            });
        }
    });

    return movimentos;
}

function posicaoValida(l, c) {
    return l >= 0 && l < TAMANHO && c >= 0 && c < TAMANHO;
}

// Execução de Movimentos e Promoção
function executarMovimento(paraL, paraC) {
    const movimento = movimentosValidos.find(m => m.paraL === paraL && m.paraC === paraC);
    if (!movimento || !pecaSelecionada) return;

    const { l: deL, c: deC } = pecaSelecionada;
    const peca = tabuleiro[deL][deC];

    // Move a peça
    tabuleiro[paraL][paraC] = peca;
    tabuleiro[deL][deC] = null;

    // Remove peça capturada se houver
    if (movimento.captura) {
        tabuleiro[movimento.captura.l][movimento.captura.c] = null;
    }

    // Promove a Dama se atingir a extremidade oposta
    if ((peca.cor === 'branca' && paraL === 0) || (peca.cor === 'preta' && paraL === TAMANHO - 1)) {
        peca.ehDama = true;
    }

    pecaSelecionada = null;
    movimentosValidos = [];

    if (checarFimDeJogo()) return;

    trocarJogador();
    renderizarTabuleiro();
}

// Controle de Turno e Placar
function trocarJogador() {
    jogadorAtual = (jogadorAtual === 'branca') ? 'preta' : 'branca';
    atualizarStatus();
}

function atualizarStatus() {
    const nomeJogador = jogadorAtual === 'branca' ? 'Brancas' : 'Pretas (Vermelhas)';
    textoStatus.textContent = `Vez das ${nomeJogador}`;
}

function atualizarContadores() {
    let brancas = 0;
    let pretas = 0;

    for (let l = 0; l < TAMANHO; l++) {
        for (let c = 0; c < TAMANHO; c++) {
            if (tabuleiro[l][c]?.cor === 'branca') brancas++;
            if (tabuleiro[l][c]?.cor === 'preta') pretas++;
        }
    }

    contagemBrancas.textContent = brancas;
    contagemPretas.textContent = pretas;
}

function checarFimDeJogo() {
    let brancas = 0;
    let pretas = 0;

    for (let l = 0; l < TAMANHO; l++) {
        for (let c = 0; c < TAMANHO; c++) {
            if (tabuleiro[l][c]?.cor === 'branca') brancas++;
            if (tabuleiro[l][c]?.cor === 'preta') pretas++;
        }
    }

    if (brancas === 0) {
        textoStatus.textContent = '🎉 As Pretas (Vermelhas) venceram!';
        jogoAtivo = false;
        return true;
    } else if (pretas === 0) {
        textoStatus.textContent = '🎉 As Brancas venceram!';
        jogoAtivo = false;
        return true;
    }

    return false;
}

btnReiniciar.addEventListener('click', inicializarJogo);

// Inicia o jogo automaticamente
inicializarJogo();