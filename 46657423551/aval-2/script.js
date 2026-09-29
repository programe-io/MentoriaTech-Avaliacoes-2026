// Emojis para as cartas — 8 pares = 16 cartas no total
const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
let cartas = [...emojis, ...emojis]; // Duplica para formar os pares

const tabuleiro = document.getElementById('tabuleiro');
const contadorJogadas = document.getElementById('contador-jogadas');
const paresEncontrados = document.getElementById('pares-encontrados');
const cronometro = document.getElementById('cronometro');
const btnReiniciar = document.getElementById('btn-reiniciar');
const mensagemVitoria = document.getElementById('mensagem-vitoria');
const tempoFinal = document.getElementById('tempo-final');
const jogadasFinal = document.getElementById('jogadas-final');
const btnJogarNovamente = document.getElementById('btn-jogar-novamente');

// Variáveis de controle
let carta1 = null;
let carta2 = null;
let travarClique = false;
let totalJogadas = 0;
let paresCertos = 0;
let segundos = 0;
let minutos = 0;
let cron;
let jogoIniciado = false;

// Embaralha as cartas
function embaralhar(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Cria cada carta no tabuleiro
function criarCartas() {
    embaralhar(cartas);
    tabuleiro.innerHTML = '';
    
    cartas.forEach((emoji, indice) => {
        const elementoCarta = document.createElement('div');
        elementoCarta.classList.add('carta');
        elementoCarta.setAttribute('data-valor', emoji);
        elementoCarta.setAttribute('data-indice', indice);
        
        elementoCarta.innerHTML = `
            <div class="carta-face carta-verso"><i class="fas fa-question"></i></div>
            <div class="carta-face carta-frente">${emoji}</div>
        `;
        
        elementoCarta.addEventListener('click', clicouCarta);
        tabuleiro.appendChild(elementoCarta);
    });
}

// Lógica ao clicar na carta
function clicouCarta() {
    if (travarClique) return;
    if (this === carta1) return;
    
    // Inicia o cronômetro no primeiro clique
    if (!jogoIniciado) {
        jogoIniciado = true;
        iniciarCronometro();
    }
    
    this.classList.add('virada');
    
    if (!carta1) {
        // Primeira carta virada
        carta1 = this;
        return;
    }
    
    // Segunda carta virada
    carta2 = this;
    totalJogadas++;
    contadorJogadas.textContent = totalJogadas;
    travarClique = true;
    
    verificarPar();
}

// Verifica se as cartas são iguais
function verificarPar() {
    const saoIguais = carta1.dataset.valor === carta2.dataset.valor;
    
    if (saoIguais) {
        carta1.classList.add('acerto');
        carta2.classList.add('acerto');
        
        paresCertos++;
        paresEncontrados.textContent = `${paresCertos} / 8`;
        
        carta1.removeEventListener('click', clicouCarta);
        carta2.removeEventListener('click', clicouCarta);
        
        resetarCartas();
        verificarVitoria();
    } else {
        carta1.classList.add('erro');
        carta2.classList.add('erro');
        
        setTimeout(() => {
            carta1.classList.remove('virada', 'erro');
            carta2.classList.remove('virada', 'erro');
            resetarCartas();
        }, 1000);
    }
}

// Libera para jogar novamente
function resetarCartas() {
    [carta1, carta2] = [null, null];
    travarClique = false;
}

// Verifica se ganhou
function verificarVitoria() {
    if (paresCertos === 8) {
        clearInterval(cron);
        setTimeout(() => {
            tempoFinal.textContent = cronometro.textContent;
            jogadasFinal.textContent = totalJogadas;
            mensagemVitoria.classList.remove('oculto');
        }, 500);
    }
}

// Cronômetro
function iniciarCronometro() {
    cron = setInterval(() => {
        segundos++;
        if (segundos === 60) {
            minutos++;
            segundos = 0;
        }
        cronometro.textContent = 
            `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
    }, 1000);
}

// Reinicia o jogo
function reiniciarJogo() {
    clearInterval(cron);
    [carta1, carta2] = [null, null];
    travarClique = false;
    totalJogadas = 0;
    paresCertos = 0;
    segundos = 0;
    minutos = 0;
    jogoIniciado = false;
    
    contadorJogadas.textContent = '0';
    paresEncontrados.textContent = '0 / 8';
    cronometro.textContent = '00:00';
    mensagemVitoria.classList.add('oculto');
    
    criarCartas();
}

// Eventos dos botões
btnReiniciar.addEventListener('click', reiniciarJogo);
btnJogarNovamente.addEventListener('click', reiniciarJogo);

// Inicia o jogo ao carregar
criarCartas();