// Aguarda o HTML carregar completamente
document.addEventListener('DOMContentLoaded', () => {
    // Variáveis principais do jogo
    const celulas = document.querySelectorAll('.celula');
    const textoStatus = document.getElementById('status-jogo');
    const btnReiniciar = document.getElementById('btn-reiniciar');

    // Estado do jogo
    let tabuleiro = ["", "", "", "", "", "", "", "", ""];
    let jogadorAtual = "X";
    let jogoAtivo = true;

    // Combinações vencedoras
    const condicoesVitoria = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
        [0, 4, 8], [2, 4, 6]              // Diagonais
    ];

    // Inicia eventos de clique e teclado
    function inicializarJogo() {
        celulas.forEach((celula, indice) => {
            celula.addEventListener('click', () => clicouCelula(indice));
            celula.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    clicouCelula(indice);
                }
            });
        });
        btnReiniciar.addEventListener('click', reiniciarJogo);
    }

    // Lógica ao clicar numa célula
    function clicouCelula(indice) {
        if (tabuleiro[indice] !== "" || !jogoAtivo) return;

        tabuleiro[indice] = jogadorAtual;
        atualizarCelula(celulas[indice], jogadorAtual);
        checarVencedor();
    }

    // Atualiza visualmente a célula
    function atualizarCelula(celula, jogador) {
        celula.textContent = jogador;
        celula.classList.add(jogador.toLowerCase(), 'ocupada');
    }

    // Troca o jogador
    function trocarJogador() {
        jogadorAtual = jogadorAtual === "X" ? "O" : "X";
        textoStatus.textContent = `Vez do jogador: ${jogadorAtual}`;
    }

    // Verifica vitória ou empate
    function checarVencedor() {
        for (const combinacao of condicoesVitoria) {
            const [a, b, c] = combinacao;
            if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
                destacarLinhaVencedora(combinacao);
                textoStatus.textContent = `🎉 O jogador ${jogadorAtual} venceu!`;
                jogoAtivo = false;
                return;
            }
        }

        if (!tabuleiro.includes("")) {
            textoStatus.textContent = "🤝 Deu Velha! (Empate)";
            jogoAtivo = false;
        } else {
            trocarJogador();
        }
    }

    // Destaca as 3 células da vitória
    function destacarLinhaVencedora(indices) {
        indices.forEach(i => celulas[i].classList.add('vencedora'));
    }

    // Reinicia o jogo
    function reiniciarJogo() {
        jogadorAtual = "X";
        tabuleiro = ["", "", "", "", "", "", "", "", ""];
        jogoAtivo = true;
        textoStatus.textContent = `Vez do jogador: ${jogadorAtual}`;

        celulas.forEach(celula => {
            celula.textContent = "";
            celula.classList.remove("x", "o", "ocupada", "vencedora");
        });
    }

    // Inicia tudo!
    inicializarJogo();
});