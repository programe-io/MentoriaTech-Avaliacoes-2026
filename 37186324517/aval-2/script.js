// Lista de ícones ( FontAwesome ) - 8 pares
const icones = [
    'fa-ghost',
    'fa-gamepad',
    'fa-rocket',
    'fa-dragon',
    'fa-bolt',
    'fa-gem',
    'fa-robot',
    'fa-skull'
];

// Elementos do HTML
const tabuleiro = document.getElementById('tabuleiro');
const textoStatus = document.getElementById('status-jogo');
const contadorJogadas = document.getElementById('contador-jogadas');
const contadorPares = document.getElementById('contador-pares');
const btnReiniciar = document.getElementById('btn-reiniciar');

// Variáveis de controle do jogo
let cartasViradas = [];
let bloquearTabuleiro = false;
let jogadas = 0;
let paresEncontrados = 0;

// Inicializa o jogo ao carregar a página
function inicializarJogo() {
    tabuleiro.innerHTML = '';
    cartasViradas = [];
    bloquearTabuleiro = false;
    jogadas = 0;
    paresEncontrados = 0;

    contadorJogadas.textContent = jogadas;
    contadorPares.textContent = `${paresEncontrados} / ${icones.length}`;
    textoStatus.textContent = 'Encontre todos os pares!';

    // Duplica os ícones para criar pares e embaralha
    const baralho = [...icones, ...icones];
    baralho.sort(() => Math.random() - 0.5);

    // Cria as cartas no HTML
    baralho.forEach(icone => {
        const carta = document.createElement('div');
        carta.classList.add('carta');
        carta.dataset.icone = icone;

        carta.innerHTML = `
            <div class="carta-verso"><i class="fas fa-question"></i></div>
            <div class="carta-frente"><i class="fas ${icone}"></i></div>
        `;

        carta.addEventListener('click', virarCarta);
        tabuleiro.appendChild(carta);
    });
}

// Ação de clicar na carta
function virarCarta() {
    // Evita clicar na mesma carta duas vezes ou durante a animação
    if (bloquearTabuleiro || this === cartasViradas[0] || this.classList.contains('combinada')) {
        return;
    }

    this.classList.add('virada');
    cartasViradas.push(this);

    // Quando duas cartas forem selecionadas
    if (cartasViradas.length === 2) {
        jogadas++;
        contadorJogadas.textContent = jogadas;
        checarPar();
    }
}

// Verifica se os dois ícones são iguais
function checarPar() {
    const [carta1, carta2] = cartasViradas;
    const ehIgual = carta1.dataset.icone === carta2.dataset.icone;

    if (ehIgual) {
        desativarCartas();
    } else {
        desvirarCartas();
    }
}

// Quando encontra um par correto
function desativarCartas() {
    cartasViradas[0].classList.add('combinada');
    cartasViradas[1].classList.add('combinada');

    paresEncontrados++;
    contadorPares.textContent = `${paresEncontrados} / ${icones.length}`;
    cartasViradas = [];

    // Checa vitória
    if (paresEncontrados === icones.length) {
        textoStatus.textContent = `🎉 Parabéns! Você venceu em ${jogadas} jogadas!`;
    }
}

// Quando as cartas são diferentes (espera 1 segundo e desvira)
function desvirarCartas() {
    bloquearTabuleiro = true;

    setTimeout(() => {
        cartasViradas[0].classList.remove('virada');
        cartasViradas[1].classList.remove('virada');
        cartasViradas = [];
        bloquearTabuleiro = false;
    }, 1000);
}

// Evento do botão reiniciar
btnReiniciar.addEventListener('click', inicializarJogo);

// Começa o jogo automaticamente
inicializarJogo();