// Conjunto de ícones para compor os pares
const simbolos = ['🚀', '🐍', '⚡', '🎮', '💡', '🔥', '💻', '🎯'];

// Elementos do DOM
const tabuleiro = document.getElementById('tabuleiro');
const contadorJogadas = document.getElementById('contador-jogadas');
const contadorPares = document.getElementById('contador-pares');
const textoStatus = document.getElementById('status-jogo');
const btnReiniciar = document.getElementById('btn-reiniciar');

// Estados da partida
let primeiraCarta = null;
let segundaCarta = null;
let tabuleiroBloqueado = false;
let jogadas = 0;
let paresEncontrados = 0;

// Algoritmo Fisher-Yates para embaralhar os pares
function embaralhar(array) {
    const copia = [...array];
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
}

// Inicia ou reseta a mesa de jogo
function inicializarJogo() {
    tabuleiro.innerHTML = '';
    primeiraCarta = null;
    segundaCarta = null;
    tabuleiroBloqueado = false;
    jogadas = 0;
    paresEncontrados = 0;

    contadorJogadas.textContent = jogadas;
    contadorPares.textContent = `${paresEncontrados} / ${simbolos.length}`;
    textoStatus.textContent = 'Encontre os pares!';

    // Duplica o array para criar os pares e embaralha
    const baralho = embaralhar([...simbolos, ...simbolos]);

    baralho.forEach(simbolo => {
        const carta = document.createElement('div');
        carta.classList.add('carta');
        carta.dataset.simbolo = simbolo;

        carta.innerHTML = `
            <div class="face face-frente"></div>
            <div class="face face-verso">${simbolo}</div>
        `;

        carta.addEventListener('click', virarCarta);
        tabuleiro.appendChild(carta);
    });
}

// Lógica ao clicar em uma carta
function virarCarta() {
    if (tabuleiroBloqueado || this === primeiraCarta || this.classList.contains('combinada')) return;

    this.classList.add('virada');

    if (!primeiraCarta) {
        primeiraCarta = this;
        return;
    }

    segundaCarta = this;
    jogadas++;
    contadorJogadas.textContent = jogadas;
    checarCombinacao();
}

// Verifica se as duas cartas selecionadas são iguais
function checarCombinacao() {
    const eIgual = primeiraCarta.dataset.simbolo === segundaCarta.dataset.simbolo;

    if (eIgual) {
        marcarComoEncontrado();
    } else {
        desvirarCartas();
    }
}

// Quando encontra o par
function marcarComoEncontrado() {
    primeiraCarta.classList.add('combinada');
    segundaCarta.classList.add('combinada');

    paresEncontrados++;
    contadorPares.textContent = `${paresEncontrados} / ${simbolos.length}`;

    resetarRodada();

    if (paresEncontrados === simbolos.length) {
        textoStatus.textContent = `🎉 Vitória em ${jogadas} jogadas!`;
    }
}

// Quando as cartas são diferentes
function desvirarCartas() {
    tabuleiroBloqueado = true;
    textoStatus.textContent = 'Errado... Tente de novo!';

    setTimeout(() => {
        primeiraCarta.classList.remove('virada');
        segundaCarta.classList.remove('virada');
        resetarRodada();
        textoStatus.textContent = 'Sua vez!';
    }, 900);
}

// Libera o tabuleiro para o próximo movimento
function resetarRodada() {
    [primeiraCarta, segundaCarta] = [null, null];
    tabuleiroBloqueado = false;
}

btnReiniciar.addEventListener('click', inicializarJogo);

// Inicializa no carregamento
inicializarJogo();