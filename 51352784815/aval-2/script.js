// Referências do DOM
const celulas = document.querySelectorAll('.celula-boxe');
const textoStatus = document.getElementById('status-jogo');
const btnIniciar = document.getElementById('btn-iniciar');
const elPontos = document.getElementById('pontos');
const elTempo = document.getElementById('tempo');
const elRecorde = document.getElementById('recorde-pro');
const btnsModo = document.querySelectorAll('.btn-modo');

// Estado do Jogo
let jogoAtivo = false;
let pontos = 0;
let tempoRestante = 30;
let temporizadorJogo = null;
let temporizadorAlvo = null;
let alvoAtual = null; // { index, tipo: 'jab' ou 'esquiva' }
let modoJogo = 'normal'; // 'normal' ou 'pro'
let tempoAparicao = 1000;

// Mapeamento de Teclas para o Modo PRO
const mapaTeclas = {
    'w': 0, 'W': 0,
    'a': 1, 'A': 1,
    's': 2, 'S': 2,
    'd': 3, 'D': 3
};

// Gerador de Áudio com Web Audio API
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function tocarSom(frequencia, tipo, duracao) {
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = tipo;
    osc.frequency.setValueAtTime(frequencia, audioCtx.currentTime);
    
    gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duracao);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + duracao);
}

function somAcerto() { tocarSom(600, 'sine', 0.15); }
function somErro() { tocarSom(150, 'sawtooth', 0.25); }
function somFim() { tocarSom(300, 'triangle', 0.5); }

// Inicialização
function init() {
    celulas.forEach(celula => {
        celula.addEventListener('click', () => {
            const index = parseInt(celula.getAttribute('data-index'));
            processarAcao(index);
        });
    });

    window.addEventListener('keydown', (e) => {
        if (!jogoAtivo) return;
        const tecla = e.key;
        if (mapaTeclas.hasOwnProperty(tecla)) {
            processarAcao(mapaTeclas[tecla]);
        }
    });

    btnsModo.forEach(btn => {
        btn.addEventListener('click', () => {
            if (jogoAtivo) return;
            btnsModo.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            modoJogo = btn.getAttribute('data-modo');
            
            if (modoJogo === 'pro') {
                document.body.classList.add('modo-pro');
            } else {
                document.body.classList.remove('modo-pro');
            }
        });
    });

    btnIniciar.addEventListener('click', toggleJogo);

    // Carregar Recorde Salvo
    const recordeSalvo = localStorage.getItem('boxe_recorde_pro') || 0;
    elRecorde.textContent = recordeSalvo;
}

function toggleJogo() {
    if (jogoAtivo) {
        pararJogo();
    } else {
        iniciarJogo();
    }
}

function iniciarJogo() {
    jogoAtivo = true;
    pontos = 0;
    tempoRestante = 30;
    tempoAparicao = 1000;

    elPontos.textContent = pontos;
    elTempo.textContent = `${tempoRestante}s`;
    textoStatus.textContent = "EM COMBATE! REAJA RÁPIDO!";
    btnIniciar.textContent = "PARAR TREINO 🛑";

    limparAlvos();

    // Loop do Temporizador principal (Segundos)
    temporizadorJogo = setInterval(() => {
        tempoRestante--;
        elTempo.textContent = `${tempoRestante}s`;

        // Aumentar a velocidade do treino com o passar do tempo
        if (tempoRestante % 5 === 0 && tempoAparicao > 400) {
            tempoAparicao -= 80;
        }

        if (tempoRestante <= 0) {
            pararJogo();
        }
    }, 1000);

    gerarNovoAlvo();
}

function pararJogo() {
    jogoAtivo = false;
    clearInterval(temporizadorJogo);
    clearTimeout(temporizadorAlvo);

    limparAlvos();
    somFim();

    btnIniciar.textContent = "INICIAR TREINO 🥊";
    textoStatus.textContent = `Fim de treino! Você fez ${pontos} pontos.`;

    // Atualizar Recorde do Modo PRO
    if (modoJogo === 'pro') {
        const recordeAtual = parseInt(localStorage.getItem('boxe_recorde_pro') || 0);
        if (pontos > recordeAtual) {
            localStorage.setItem('boxe_recorde_pro', pontos);
            elRecorde.textContent = pontos;
            textoStatus.textContent = `🎉 NOVO RECORDE PRO: ${pontos} PONTOS!`;
        }
    }
}

function gerarNovoAlvo() {
    if (!jogoAtivo) return;

    limparAlvos();

    // Escolhe um quadrante aleatório (0 a 3)
    const novoIndex = Math.floor(Math.random() * 4);
    // Tipos: 'jab' (🥊 Golpe) ou 'esquiva' (🛡️ Esquiva)
    const tipo = Math.random() > 0.3 ? 'jab' : 'esquiva';

    alvoAtual = { index: novoIndex, tipo: tipo };

    const celula = celulas[novoIndex];
    const conteudo = celula.querySelector('.conteudo-celula');

    if (tipo === 'jab') {
        celula.classList.add('alvo-jab');
        conteudo.textContent = '🥊';
    } else {
        celula.classList.add('alvo-esquiva');
        conteudo.textContent = '🛡️';
    }

    // Tempo limite para reagir ao alvo
    temporizadorAlvo = setTimeout(() => {
        if (jogoAtivo) {
            // Se o tempo esgotou sem acertar: penalidade
            pontos = Math.max(0, pontos - 1);
            elPontos.textContent = pontos;
            somErro();
            efeitoFeedback(novoIndex, 'erro');
            gerarNovoAlvo();
        }
    }, tempoAparicao);
}

function processarAcao(indexClicado) {
    if (!jogoAtivo || !alvoAtual) return;

    clearTimeout(temporizadorAlvo);

    if (indexClicado === alvoAtual.index) {
        // Acertou o alvo
        const pontosGanhos = alvoAtual.tipo === 'esquiva' ? 2 : 1;
        pontos += pontosGanhos;
        elPontos.textContent = pontos;
        somAcerto();
        efeitoFeedback(indexClicado, 'acerto');
    } else {
        // Clicou/Pressionou no local errado
        pontos = Math.max(0, pontos - 2);
        elPontos.textContent = pontos;
        somErro();
        efeitoFeedback(indexClicado, 'erro');
    }

    alvoAtual = null;
    setTimeout(gerarNovoAlvo, 150);
}

function efeitoFeedback(index, classe) {
    const celula = celulas[index];
    celula.classList.add(classe);
    setTimeout(() => {
        celula.classList.remove(classe);
    }, 200);
}

function limparAlvos() {
    celulas.forEach(celula => {
        celula.classList.remove('alvo-jab', 'alvo-esquiva', 'acerto', 'erro');
        celula.querySelector('.conteudo-celula').textContent = '';
    });
}

// Inicia os ouvintes assim que o documento carregar
document.addEventListener('DOMContentLoaded', init);