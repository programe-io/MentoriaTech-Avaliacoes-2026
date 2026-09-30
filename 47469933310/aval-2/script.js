// Variáveis principais do jogo
const celulas = document.querySelectorAll('.celula');
const textoStatus = document.getElementById('status-jogo');
const btnReiniciar = document.getElementById('btn-reiniciar');

// Representação do tabuleiro vazio (9 espaços)
let tabuleiro = ["", "", "", "", "", "", "", "", ""];
let jogadorAtual = "X";
let jogoAtivo = true;

// Nomes personalizados para dar o clima de Judô
const nomesJogadores = {
    "X": "🥋 Atleta Vermelho (X)",
    "O": "🥋 Atleta Branco (O)"
};

// Todas as combinações possíveis para vencer (Ippon)
const condicoesVitoria = [
    [0, 1, 2], // Linha 1
    [3, 4, 5], // Linha 2
    [6, 7, 8], // Linha 3
    [0, 3, 6], // Coluna 1
    [1, 4, 7], // Coluna 2
    [2, 5, 8], // Coluna 3
    [0, 4, 8], // Diagonal 1
    [2, 4, 6]  // Diagonal 2
];

// Inicia o jogo adicionando os eventos de clique
function inicializarJogo() {
    celulas.forEach(celula => celula.addEventListener('click', clicouCelula));
    btnReiniciar.addEventListener('click', reiniciarJogo);
}

// O que acontece quando o judoca executa um golpe (clique na célula)
function clicouCelula(evento) {
    const celula = evento.target;
    const indice = celula.getAttribute('data-index');

    // Se o espaço já estiver preenchido ou a luta acabou, não faz nada
    if (tabuleiro[indice] !== "" || !jogoAtivo) {
        return;
    }

    atualizarCelula(celula, indice);
    checarVencedor();
}

// Atualiza a interface e a matriz do tabuleiro
function atualizarCelula(celula, indice) {
    tabuleiro[indice] = jogadorAtual;
    celula.textContent = jogadorAtual;
    celula.classList.add(jogadorAtual.toLowerCase());
}

// Troca o turno entre os atletas
function trocarJogador() {
    jogadorAtual = (jogadorAtual === "X") ? "O" : "X";
    textoStatus.textContent = `Vez do Judoca: ${nomesJogadores[jogadorAtual]}`;
}

// Analisa se houve Ippon ou combate empatado
function checarVencedor() {
    let alguemVenceu = false;

    for (let i = 0; i < condicoesVitoria.length; i++) {
        const [a, b, c] = condicoesVitoria[i];
        
        if (tabuleiro[a] === "" || tabuleiro[b] === "" || tabuleiro[c] === "") {
            continue;
        }

        if (tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
            alguemVenceu = true;
            break;
        }
    }

    if (alguemVenceu) {
        textoStatus.textContent = `🏆 IPPON! ${nomesJogadores[jogadorAtual]} venceu a luta!`;
        jogoAtivo = false;
    } else if (!tabuleiro.includes("")) {
        textoStatus.textContent = "🤝 Empate Técnico! Combate encerrado sem Ippon.";
        jogoAtivo = false;
    } else {
        trocarJogador();
    }
}

// Reinicia o tatame para uma nova luta
function reiniciarJogo() {
    jogadorAtual = "X";
    tabuleiro = ["", "", "", "", "", "", "", "", ""];
    jogoAtivo = true;
    textoStatus.textContent = `Vez do Judoca: ${nomesJogadores[jogadorAtual]}`;
    
    celulas.forEach(celula => {
        celula.textContent = "";
        celula.classList.remove("x", "o");
    });
}

// Inicializa a aplicação
inicializarJogo();