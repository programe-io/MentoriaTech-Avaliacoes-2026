// ===== Variáveis principais =====
const celulas = document.querySelectorAll('.celula');
const textoStatus = document.getElementById('status-jogo');
const btnReiniciar = document.getElementById('btn-reiniciar');
const btnZerar = document.getElementById('btn-zerar');
const cardX = document.getElementById('card-x');
const cardO = document.getElementById('card-o');
const pontosX = document.getElementById('pontos-x');
const pontosO = document.getElementById('pontos-o');
const modal = document.getElementById('modal');
const modalTitulo = document.getElementById('modal-titulo');
const modalMensagem = document.getElementById('modal-mensagem');
const btnProxima = document.getElementById('btn-proxima');

// ===== Estado do jogo =====
let tabuleiro = ["", "", "", "", "", "", "", "", ""];
let jogadorAtual = "X";
let jogoAtivo = true;
let placar = { X: 0, O: 0 };
let combinacaoVencedora = [];

// ===== Combinações de vitória =====
const condicoesVitoria = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
    [0, 4, 8], [2, 4, 6]              // Diagonais
];

// ===== Inicialização =====
function inicializarJogo() {
    celulas.forEach(celula => celula.addEventListener('click', clicouCelula));
    btnReiniciar.addEventListener('click', reiniciarJogo);
    btnZerar.addEventListener('click', zerarPlacar);
    btnProxima.addEventListener('click', () => {
        fecharModal();
        reiniciarJogo();
    });
    atualizarCards();
}

// ===== Clique na célula =====
function clicouCelula(evento) {
    const celula = evento.target;
    const indice = parseInt(celula.getAttribute('data-index'));

    if (tabuleiro[indice] !== "" || !jogoAtivo) return;

    atualizarCelula(celula, indice);
    checarVencedor();
}

// ===== Atualiza célula =====
function atualizarCelula(celula, indice) {
    tabuleiro[indice] = jogadorAtual;
    celula.textContent = jogadorAtual;
    celula.classList.add(jogadorAtual.toLowerCase());
}

// ===== Troca jogador =====
function trocarJogador() {
    jogadorAtual = (jogadorAtual === "X") ? "O" : "X";
    textoStatus.textContent = `Vez do jogador: ${jogadorAtual}`;
    atualizarCards();
}

// ===== Atualiza destaque dos cards =====
function atualizarCards() {
    if (jogadorAtual === "X") {
        cardX.classList.add('ativo');
        cardO.classList.remove('ativo');
    } else {
        cardO.classList.add('ativo');
        cardX.classList.remove('ativo');
    }
}

// ===== Verifica vencedor =====
function checarVencedor() {
    let alguemVenceu = false;
    combinacaoVencedora = [];

    for (let i = 0; i < condicoesVitoria.length; i++) {
        const [a, b, c] = condicoesVitoria[i];

        if (tabuleiro[a] === "" || tabuleiro[b] === "" || tabuleiro[c] === "") continue;

        if (tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
            alguemVenceu = true;
            combinacaoVencedora = [a, b, c];
            break;
        }
    }

    if (alguemVenceu) {
        destacarVencedoras();
        placar[jogadorAtual]++;
        atualizarPlacar();
        jogoAtivo = false;
        textoStatus.textContent = `🎉 Jogador ${jogadorAtual} venceu!`;
        setTimeout(() => mostrarModal(
            `🎉 Vitória do ${jogadorAtual}!`,
            `O jogador ${jogadorAtual} venceu a rodada!`
        ), 900);
    } else if (!tabuleiro.includes("")) {
        jogoAtivo = false;
        textoStatus.textContent = "🤝 Deu Velha! (Empate)";
        setTimeout(() => mostrarModal(
            "🤝 Deu Velha!",
            "Ninguém venceu. Tente novamente!"
        ), 500);
    } else {
        trocarJogador();
    }
}

// ===== Destaca células vencedoras =====
function destacarVencedoras() {
    combinacaoVencedora.forEach(i => {
        celulas[i].classList.add('vencedora');
    });
}

// ===== Atualiza placar =====
function atualizarPlacar() {
    pontosX.textContent = placar.X;
    pontosO.textContent = placar.O;
}

// ===== Modal =====
function mostrarModal(titulo, mensagem) {
    modalTitulo.textContent = titulo;
    modalMensagem.textContent = mensagem;
    modal.classList.add('ativo');
}

function fecharModal() {
    modal.classList.remove('ativo');
}

// ===== Reiniciar rodada =====
function reiniciarJogo() {
    jogadorAtual = "X";
    tabuleiro = ["", "", "", "", "", "", "", "", ""];
    jogoAtivo = true;
    combinacaoVencedora = [];
    textoStatus.textContent = `Vez do jogador: ${jogadorAtual}`;

    celulas.forEach(celula => {
        celula.textContent = "";
        celula.classList.remove("x", "o", "vencedora");
    });

    atualizarCards();
}

// ===== Zerar placar =====
function zerarPlacar() {
    placar = { X: 0, O: 0 };
    atualizarPlacar();
    reiniciarJogo();
}

// ===== Start =====
inicializarJogo();