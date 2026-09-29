// Emojis para as cartas
const emojis = ['🐱', '🐶', '🦊', '🐼', '🦁', '🐯', '🐨', '🐸'];
let cartas = [...emojis, ...emojis]; // Duplica para formar os pares

let cartaVirada = null;
let travarJogo = false;
let tentativas = 0;
let paresEncontrados = 0;
let tempo = 0;
let cronometro;

const tabuleiro = document.getElementById('tabuleiro');
const elCronometro = document.getElementById('cronometro');
const elTentativas = document.getElementById('tentativas');
const mensagemVitoria = document.getElementById('mensagem-vitoria');
const btnReiniciar = document.getElementById('btn-reiniciar');

// Embaralha as cartas
function embaralhar(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Cria o tabuleiro
function criarTabuleiro() {
    tabuleiro.innerHTML = '';
    mensagemVitoria.classList.remove('visivel');
    cartas = embaralhar(cartas);
    
    cartas.forEach((emoji, indice) => {
        const carta = document.createElement('div');
        carta.classList.add('carta');
        carta.setAttribute('data-indice', indice);
        carta.setAttribute('data-emoji', emoji);
        
        carta.innerHTML = `
            <div class="face verso">❓</div>
            <div class="face frente">${emoji}</div>
        `;
        
        carta.addEventListener('click', virarCarta);
        tabuleiro.appendChild(carta);
    });
}

// Vira a carta ao clicar
function virarCarta() {
    if (travarJogo) return;
    if (this === cartaVirada) return;
    if (this.classList.contains('combinada')) return;

    // Inicia o cronômetro no primeiro clique
    if (tentativas === 0 && tempo === 0) {
        cronometro = setInterval(() => {
            tempo++;
            elCronometro.textContent = tempo;
        }, 1000);
    }

    this.classList.add('virada');

    if (!cartaVirada) {
        cartaVirada = this;
        return;
    }

    // Segunda carta virada — verifica par
    tentativas++;
    elTentativas.textContent = tentativas;
    travarJogo = true;

    verificarPar(this);
}

// Verifica se formou par
function verificarPar(segundaCarta) {
    const parEncontrado = cartaVirada.dataset.emoji === segundaCarta.dataset.emoji;

    setTimeout(() => {
        if (parEncontrado) {
            cartaVirada.classList.add('combinada');
            segundaCarta.classList.add('combinada');
            paresEncontrados++;
            
            // Verifica vitória
            if (paresEncontrados === emojis.length) {
                clearInterval(cronometro);
                mensagemVitoria.classList.add('visivel');
            }
        } else {
            cartaVirada.classList.remove('virada');
            segundaCarta.classList.remove('virada');
        }

        cartaVirada = null;
        travarJogo = false;
    }, 1000);
}

// Reinicia tudo
function reiniciarJogo() {
    clearInterval(cronometro);
    cartaVirada = null;
    travarJogo = false;
    tentativas = 0;
    paresEncontrados = 0;
    tempo = 0;
    elCronometro.textContent = '0';
    elTentativas.textContent = '0';
    criarTabuleiro();
}

// Inicia o jogo
btnReiniciar.addEventListener('click', reiniciarJogo);
criarTabuleiro();