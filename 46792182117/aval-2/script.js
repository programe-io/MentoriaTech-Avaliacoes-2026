// Emojis que serão usados nas cartas
const emojis = ['🐱', '🐶', '🦊', '🐼', '🐸', '🦁', '🐯', '🐨'];
const tabuleiro = document.getElementById('tabuleiro');
const contadorElemento = document.getElementById('contador');
const paresEncontradosElemento = document.getElementById('pares-encontrados');
const btnReiniciar = document.getElementById('btn-reiniciar');

// Variáveis do jogo
let cartas = [];
let primeiraCarta = null;
let segundaCarta = null;
let podeVirar = true;
let contador = 0;
let paresEncontrados = 0;

// Inicializa o jogo
function iniciarJogo() {
    // Duplica os emojis para formar os pares
    cartas = [...emojis, ...emojis];
    embaralhar(cartas);
    
    // Reseta variáveis
    primeiraCarta = null;
    segundaCarta = null;
    podeVirar = true;
    contador = 0;
    paresEncontrados = 0;
    atualizarPainel();
    
    // Limpa e recria o tabuleiro
    tabuleiro.innerHTML = '';
    cartas.forEach((emoji, indice) => {
        const elementoCarta = criarCarta(emoji, indice);
        tabuleiro.appendChild(elementoCarta);
    });
}

// Embaralha as cartas
function embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Cria o elemento HTML de cada carta
function criarCarta(emoji, indice) {
    const div = document.createElement('div');
    div.classList.add('carta');
    div.dataset.emoji = emoji;
    div.dataset.indice = indice;
    
    div.innerHTML = `
        <div class="carta-verso">❓</div>
        <div class="carta-frente">${emoji}</div>
    `;
    
    div.addEventListener('click', () => virarCarta(div));
    return div;
}

// Ação ao clicar na carta
function virarCarta(carta) {
    // Bloqueia se não pode virar, se já está virada ou encontrada
    if (!podeVirar || carta === primeiraCarta || carta.classList.contains('encontrada')) {
        return;
    }
    
    // Vira a carta
    carta.classList.add('virada');
    
    // Define se é a primeira ou segunda carta virada
    if (!primeiraCarta) {
        primeiraCarta = carta;
        return;
    }
    
    segundaCarta = carta;
    contador++;
    atualizarPainel();
    podeVirar = false;
    
    verificarPar();
}

// Verifica se as cartas formam um par
function verificarPar() {
    const parEncontrado = primeiraCarta.dataset.emoji === segundaCarta.dataset.emoji;
    
    if (parEncontrado) {
        // Marca como encontrada e não vira de volta
        setTimeout(() => {
            primeiraCarta.classList.add('encontrada');
            segundaCarta.classList.add('encontrada');
            paresEncontrados++;
            atualizarPainel();
            verificarVitoria();
            resetarSelecao();
        }, 600);
    } else {
        // Desvira as cartas após um tempo
        setTimeout(() => {
            primeiraCarta.classList.remove('virada');
            segundaCarta.classList.remove('virada');
            resetarSelecao();
        }, 1000);
    }
}

// Reseta a seleção para a próxima jogada
function resetarSelecao() {
    [primeiraCarta, segundaCarta] = [null, null];
    podeVirar = true;
}

// Atualiza os números na tela
function atualizarPainel() {
    contadorElemento.textContent = contador;
    paresEncontradosElemento.textContent = paresEncontrados;
}

// Verifica se o jogador encontrou todos os pares
function verificarVitoria() {
    if (paresEncontrados === emojis.length) {
        setTimeout(() => {
            alert(`🎉 Parabéns! Você concluiu em ${contador} tentativas!`);
        }, 300);
    }
}

// Reinicia o jogo
btnReiniciar.addEventListener('click', iniciarJogo);

// Começa tudo!
iniciarJogo();