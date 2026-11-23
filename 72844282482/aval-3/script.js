
const tabuleiro = document.getElementById("tabuleiro");
const mensagem = document.getElementById("mensagem");
const vezTexto = document.getElementById("vez");

let casas = [];
let jogador = "preta";
let selecionada = null;
let movimentos = [];
let jogoAtivo = true;
let capturaObrigatoria = false;

function iniciarJogo() {
    casas = Array(8).fill(null).map(() => Array(8).fill(null));

    // Peças pretas
    for (let linha = 0; linha < 3; linha++) {
        for (let coluna = 0; coluna < 8; coluna++) {
            if ((linha + coluna) % 2 === 1) {
                casas[linha][coluna] = {
                    cor: "preta",
                    dama: false
                };
            }
        }
    }

    // Peças brancas
    for (let linha = 5; linha < 8; linha++) {
        for (let coluna = 0; coluna < 8; coluna++) {
            if ((linha + coluna) % 2 === 1) {
                casas[linha][coluna] = {
                    cor: "branca",
                    dama: false
                };
            }
        }
    }

    jogador = "preta";
    selecionada = null;
    movimentos = [];
    jogoAtivo = true;
    capturaObrigatoria = false;

    mensagem.textContent = "Escolha uma peça para começar!";
    atualizarTabuleiro();
}

function atualizarTabuleiro() {
    tabuleiro.innerHTML = "";

    for (let linha = 0; linha < 8; linha++) {
        for (let coluna = 0; coluna < 8; coluna++) {

            const casa = document.createElement("div");

            casa.className = "casa " +
                ((linha + coluna) % 2 === 0 ? "clara" : "escura");

            const peca = casas[linha][coluna];

            if (peca) {
                const elemento = document.createElement("div");

                elemento.className = "peca " + peca.cor;

                if (
                    selecionada &&
                    selecionada.linha === linha &&
                    selecionada.coluna === coluna
                ) {
                    elemento.classList.add("selecionada");
                }

                if (peca.dama) {
                    elemento.textContent = "♛";
                }

                casa.appendChild(elemento);
            }

            if (movimentos.some(m =>
                m.linha === linha && m.coluna === coluna
            )) {
                casa.classList.add("possivel");
            }

            casa.addEventListener("click", () => clicarCasa(linha, coluna));

            tabuleiro.appendChild(casa);
        }
    }

    vezTexto.textContent = "Vez das peças " +
        (jogador === "preta" ? "pretas" : "brancas");
}

function obterMovimentos(linha, coluna) {
    const peca = casas[linha][coluna];

    if (!peca) return [];

    const direcoes = peca.dama
        ? [-1, 1]
        : [peca.cor === "preta" ? 1 : -1];

    let resultado = [];

    for (const dl of direcoes) {
        for (const dc of [-1, 1]) {

            const novaLinha = linha + dl;
            const novaColuna = coluna + dc;

            if (
                novaLinha < 0 || novaLinha > 7 ||
                novaColuna < 0 || novaColuna > 7
            ) continue;

            if (!casas[novaLinha][novaColuna]) {
                resultado.push({
                    linha: novaLinha,
                    coluna: novaColuna,
                    captura: false
                });
            } else if (
                casas[novaLinha][novaColuna].cor !== peca.cor
            ) {
                const destinoLinha = linha + dl * 2;
                const destinoColuna = coluna + dc * 2;

                if (
                    destinoLinha >= 0 && destinoLinha < 8 &&
                    destinoColuna >= 0 && destinoColuna < 8 &&
                    !casas[destinoLinha][destinoColuna]
                ) {
                    resultado.push({
                        linha: destinoLinha,
                        coluna: destinoColuna,
                        captura: true,
                        comeLinha: novaLinha,
                        comeColuna: novaColuna
                    });
                }
            }
        }
    }

    return resultado;
}

function todasCapturas() {
    let capturas = [];

    for (let l = 0; l < 8; l++) {
        for (let c = 0; c < 8; c++) {
            const peca = casas[l][c];

            if (peca && peca.cor === jogador) {
                const lista = obterMovimentos(l, c)
                    .filter(m => m.captura);

                if (lista.length) {
                    capturas.push({ linha: l, coluna: c });
                }
            }
        }
    }

    return capturas;
}

function clicarCasa(linha, coluna) {
    if (!jogoAtivo) return;

    const peca = casas[linha][coluna];

    // Continuar uma sequência de capturas
    if (selecionada && movimentos.length > 0) {
        const movimento = movimentos.find(m =>
            m.linha === linha && m.coluna === coluna
        );

        if (movimento) {
            moverPeca(movimento);
            return;
        }
    }

    if (peca && peca.cor === jogador) {
        const capturas = todasCapturas();

        if (
            capturaObrigatoria &&
            !capturas.some(p =>
                p.linha === linha && p.coluna === coluna
            )
        ) {
            mensagem.textContent = "Você precisa escolher uma peça que possa capturar!";
            return;
        }

        selecionada = { linha, coluna };

        movimentos = obterMovimentos(linha, coluna)
            .filter(m => !capturaObrigatoria || m.captura);

        if (movimentos.length === 0) {
            mensagem.textContent = "Essa peça não pode se mover!";
        } else {
            mensagem.textContent = movimentos.some(m => m.captura)
                ? "Escolha onde capturar!"
                : "Escolha uma casa para mover!";
        }

        atualizarTabuleiro();
    } else {
        mensagem.textContent = "Selecione uma peça sua!";
    }
}

function moverPeca(movimento) {
    const { linha, coluna } = selecionada;

    const peca = casas[linha][coluna];

    casas[movimento.linha][movimento.coluna] = peca;
    casas[linha][coluna] = null;

    if (movimento.captura) {
        casas[movimento.comeLinha][movimento.comeColuna] = null;
    }

    // Transformar em dama
    if (
        (peca.cor === "preta" && movimento.linha === 7) ||
        (peca.cor === "branca" && movimento.linha === 0)
    ) {
        peca.dama = true;
    }

    // Verificar captura em sequência
    if (movimento.captura) {
        selecionada = {
            linha: movimento.linha,
            coluna: movimento.coluna
        };

        movimentos = obterMovimentos(
            movimento.linha,
            movimento.coluna
        ).filter(m => m.captura);

        if (movimentos.length > 0) {
            mensagem.textContent = "Você capturou! Continue jogando.";
            atualizarTabuleiro();
            return;
        }
    }

    selecionada = null;
    movimentos = [];

    jogador = jogador === "preta" ? "branca" : "preta";

    capturaObrigatoria = todasCapturas().length > 0;

    verificarVencedor();

    if (jogoAtivo) {
        mensagem.textContent = capturaObrigatoria
            ? "Existe uma captura obrigatória!"
            : "Sua vez de jogar!";
    }

    atualizarTabuleiro();
}

function verificarVencedor() {
    let pecas = casas.flat().filter(p => p);

    const adversarioTemPeca = pecas.some(p => p.cor === jogador);

    let temMovimento = false;

    for (let l = 0; l < 8; l++) {
        for (let c = 0; c < 8; c++) {
            if (casas[l][c] && casas[l][c].cor === jogador) {
                if (obterMovimentos(l, c).length > 0) {
                    temMovimento = true;
                }
            }
        }
    }

    if (!adversarioTemPeca || !temMovimento) {
        jogoAtivo = false;

        const vencedor = jogador === "preta" ? "brancas" : "pretas";

        mensagem.textContent = "🏆 As peças " + vencedor + " venceram!";
    }
}

function reiniciarJogo() {
    iniciarJogo();
}

iniciarJogo();
