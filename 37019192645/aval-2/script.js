// Variáveis principais do jogo
const celulas = document.querySelectorAll('.celula');
const textoStatus = document.getElementById('status-jogo');
const btnReiniciar = document.getElementById('btn-reiniciar');

// Representação do tabuleiro vazio (9 espaços)
let tabuleiro = ["", "", "", "", "", "", "", "", ""];
let jogadorAtual = "X";
let jogoAtivo = true;

// Todas as combinações possíveis para vencer
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

// O que acontece quando o jogador clica em uma célula
function clicouCelula(evento) {
    const celula = evento.target;
    const indice = celula.getAttribute('data-index');

    // Se o espaço já estiver preenchido ou o jogo já acabou, não faz nada
    if (tabuleiro[indice] !== "" || !jogoAtivo) {
        return;
    }

    atualizarCelula(celula, indice);
    checarVencedor();
}

// Atualiza a interface e a array do tabuleiro
function atualizarCelula(celula, indice) {
    tabuleiro[indice] = jogadorAtual;
    celula.textContent = jogadorAtual;
    
    // Adiciona uma classe CSS específica (x ou o) para mudar a cor
    celula.classList.add(jogadorAtual.toLowerCase());
}

// Troca o turno entre X e O
function trocarJogador() {
    jogadorAtual = (jogadorAtual === "X") ? "O" : "X";
    textoStatus.textContent = `Vez do jogador: ${jogadorAtual}`;
}

// Analisa as combinações para ver se há um vencedor
function checarVencedor() {
    let alguemVenceu = false;

    for (let i = 0; i < condicoesVitoria.length; i++) {
        const [a, b, c] = condicoesVitoria[i];
        
        // Se alguma das casas estiver vazia, pula para a próxima combinação
        if (tabuleiro[a] === "" || tabuleiro[b] === "" || tabuleiro[c] === "") {
            continue;
        }

        // Se as 3 posições da combinação forem iguais, temos um vencedor
        if (tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
            alguemVenceu = true;
            break;
        }
    }

    if (alguemVenceu) {
        textoStatus.textContent = `🎉 O jogador ${jogadorAtual} venceu!`;
        jogoAtivo = false;
    } else if (!tabuleiro.includes("")) {
        // Se não tem vencedor e não tem espaço vazio, é empate (velha)
        textoStatus.textContent = "Deu Velha! (Empate)";
        jogoAtivo = false;
    } else {
        // Se o jogo não acabou, passa a vez
        trocarJogador();
    }
}

// Limpa tudo e começa de novo
function reiniciarJogo() {
    jogadorAtual = "X";
    tabuleiro = ["", "", "", "", "", "", "", "", ""];
    jogoAtivo = true;
    textoStatus.textContent = `Vez do jogador: ${jogadorAtual}`;
    
    celulas.forEach(celula => {
        celula.textContent = "";
        celula.classList.remove("x", "o");
    });
}

// Chama a função para ligar o jogo assim que o script carrega
inicializarJogo();