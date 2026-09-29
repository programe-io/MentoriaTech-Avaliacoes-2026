/* ============================================================
   💰 SHOW DO MILHÃO — Quiz com premiação progressiva
   ============================================================ */

// ============ BANCO DE PERGUNTAS ============
// nivel: 1 = fácil, 2 = médio, 3 = difícil
const PERGUNTAS = [
    // ===== FÁCEIS (1-5) =====
    { q: 'Qual é a capital do Brasil?', c: 'Geografia', nivel: 1,
      a: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador'], correta: 2,
      dica: 'Foi inaugurada em 1960, no planalto central.' },

    { q: 'Quantos lados tem um triângulo?', c: 'Matemática', nivel: 1,
      a: ['2', '3', '4', '5'], correta: 1,
      dica: 'É o polígono com o menor número de lados possível.' },

    { q: 'Qual animal é conhecido como "rei da selva"?', c: 'Animais', nivel: 1,
      a: ['Tigre', 'Leão', 'Elefante', 'Urso'], correta: 1,
      dica: 'Tem juba e vive em savanas africanas.' },

    { q: 'Qual é a cor resultante da mistura de azul e amarelo?', c: 'Arte', nivel: 1,
      a: ['Verde', 'Roxo', 'Laranja', 'Marrom'], correta: 0,
      dica: 'É a cor da maioria das folhas.' },

    { q: 'Quantos dias tem um ano bissexto?', c: 'Ciências', nivel: 1,
      a: ['364', '365', '366', '367'], correta: 2,
      dica: 'Acontece a cada 4 anos, em fevereiro.' },

    // ===== MÉDIAS (6-10) =====
    { q: 'Quem escreveu "Dom Casmurro"?', c: 'Literatura', nivel: 2,
      a: ['José de Alencar', 'Machado de Assis', 'Carlos Drummond', 'Graciliano Ramos'], correta: 1,
      dica: 'É o patrono da Academia Brasileira de Letras.' },

    { q: 'Qual é o maior planeta do Sistema Solar?', c: 'Astronomia', nivel: 2,
      a: ['Saturno', 'Netuno', 'Júpiter', 'Urano'], correta: 2,
      dica: 'Tem uma grande mancha vermelha visível da Terra.' },

    { q: 'Em que ano o Brasil foi "descoberto" pelos portugueses?', c: 'História', nivel: 2,
      a: ['1492', '1500', '1522', '1550'], correta: 1,
      dica: 'A frota era comandada por Pedro Álvares Cabral.' },

    { q: 'Qual linguagem de programação foi criada por Guido van Rossum?', c: 'Tecnologia', nivel: 2,
      a: ['Java', 'Python', 'Ruby', 'PHP'], correta: 1,
      dica: 'O nome vem de um grupo de comédia britânico.' },

    { q: 'Quantos estados tem o Brasil?', c: 'Geografia', nivel: 2,
      a: ['25', '26', '27', '28'], correta: 1,
      dica: 'Mais o Distrito Federal, formam 27 unidades federativas.' },

    // ===== DIFÍCEIS (11-15) =====
    { q: 'Qual é o único mamífero capaz de voar?', c: 'Biologia', nivel: 3,
      a: ['Esquilo-voador', 'Morcego', 'Colugo', 'Pteropus'], correta: 1,
      dica: 'Usa ecolocalização para se orientar no escuro.' },

    { q: 'Em que ano caiu o Muro de Berlim?', c: 'História', nivel: 3,
      a: ['1987', '1988', '1989', '1991'], correta: 2,
      dica: 'Dois anos antes da dissolução da URSS.' },

    { q: 'Qual é o elemento químico de símbolo "W"?', c: 'Química', nivel: 3,
      a: ['Tungstênio', 'Titânio', 'Estanho', 'Zinco'], correta: 0,
      dica: 'Tem o maior ponto de fusão entre os metais.' },

    { q: 'Quem pintou o teto da Capela Sistina?', c: 'Arte', nivel: 3,
      a: ['Leonardo da Vinci', 'Rafael', 'Michelangelo', 'Donatello'], correta: 2,
      dica: 'Também esculpiu a famosa estátua de Davi.' },

    { q: 'Qual é o rio mais extenso do mundo?', c: 'Geografia', nivel: 3,
      a: ['Nilo', 'Amazonas', 'Yangtzé', 'Mississippi'], correta: 1,
      dica: 'Tem a maior bacia hidrográfica do planeta.' },
];

// ============ PREMIAÇÃO PROGRESSIVA ============
const PREMIOS = [
    1000, 2000, 5000, 10000, 20000,
    50000, 100000, 200000, 300000, 400000,
    500000, 600000, 700000, 800000, 1000000
];

const TEMPO_PERGUNTA = 30; // segundos

// ============ ESTADO ============
const estado = {
    perguntaAtual: 0,
    perguntasSorteadas: [],
    premioAtual: 0,
    premioGarantido: 0,
    acertos: 0,
    jogoAtivo: false,
    ajudas: { pular: 1, eliminar: 1, dica: 1 },
    timer: null,
    tempoRestante: TEMPO_PERGUNTA,
    respondeu: false,
};

// ============ LOCALSTORAGE ============
const STORAGE_KEY = 'show-milhao-recorde';

function carregarRecorde() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || 0;
    } catch { return 0; }
}

function salvarRecorde(valor) {
    const atual = carregarRecorde();
    if (valor > atual) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(valor));
        return true;
    }
    return false;
}

function formatarDinheiro(valor) {
    return 'R$ ' + valor.toLocaleString('pt-BR');
}

// ============ ÁUDIO ============
let ctxAudio;
function tocarSequencia(notas, tipo = 'sine') {
    try {
        if (!ctxAudio) ctxAudio = new (window.AudioContext || window.webkitAudioContext)();
        let tempo = ctxAudio.currentTime;
        notas.forEach(({ freq, dur }) => {
            const osc = ctxAudio.createOscillator();
            const gain = ctxAudio.createGain();
            osc.type = tipo;
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.12, tempo);
            gain.gain.exponentialRampToValueAtTime(0.001, tempo + dur);
            osc.connect(gain);
            gain.connect(ctxAudio.destination);
            osc.start(tempo);
            osc.stop(tempo + dur);
            tempo += dur * 0.8;
        });
    } catch { /* áudio opcional */ }
}

const SOM = {
    acerto:  () => tocarSequencia([{ freq: 660, dur: 0.15 }, { freq: 880, dur: 0.25 }]),
    erro:    () => tocarSequencia([{ freq: 200, dur: 0.3 }], 'sawtooth'),
    vitoria: () => tocarSequencia([
        { freq: 523, dur: 0.15 }, { freq: 659, dur: 0.15 },
        { freq: 784, dur: 0.15 }, { freq: 1047, dur: 0.5 },
    ]),
    derrota: () => tocarSequencia([
        { freq: 392, dur: 0.25 }, { freq: 330, dur: 0.25 }, { freq: 262, dur: 0.6 },
    ], 'triangle'),
    dinheiro: () => tocarSequencia([
        { freq: 880, dur: 0.1 }, { freq: 1108, dur: 0.1 }, { freq: 1318, dur: 0.2 },
    ]),
};

// ============ ELEMENTOS ============
const elTelaInicio    = document.getElementById('tela-inicio');
const elTelaJogo      = document.getElementById('tela-jogo');
const elTelaFinal     = document.getElementById('tela-final');
const elPremiosLista  = document.getElementById('premios-lista');
const elRecordeInicio = document.getElementById('recorde-inicio');
const elNumPergunta   = document.getElementById('num-pergunta');
const elPremioAtual   = document.getElementById('premio-atual');
const elTimer         = document.getElementById('timer');
const elProgressoBarra = document.getElementById('progresso-barra');
const elCategoriaTag  = document.getElementById('categoria-tag');
const elPerguntaTexto = document.getElementById('pergunta-texto');
const elAlternativas  = document.getElementById('alternativas');
const elMensagem      = document.getElementById('mensagem');
const elAjudaPular    = document.getElementById('ajuda-pular');
const elAjudaEliminar = document.getElementById('ajuda-eliminar');
const elAjudaDica     = document.getElementById('ajuda-dica');
const elUsosPular     = document.getElementById('usos-pular');
const elUsosEliminar  = document.getElementById('usos-eliminar');
const elUsosDica      = document.getElementById('usos-dica');
const elFinalEmoji    = document.getElementById('final-emoji');
const elFinalTitulo   = document.getElementById('final-titulo');
const elFinalTexto    = document.getElementById('final-texto');
const elFinalPremio   = document.getElementById('final-premio');
const btnComecar      = document.getElementById('btn-comecar');
const btnJogarNov    = document.getElementById('btn-jogar-novamente');

// ============ RENDERIZAR LISTA DE PRÊMIOS ============
function renderizarListaPremios() {
    elPremiosLista.innerHTML = '';
    PREMIOS.slice().reverse().forEach((valor, i) => {
        const idx = PREMIOS.length - i;
        const linha = document.createElement('div');
        linha.className = 'premio-linha';
        if ([4, 9, 14].includes(idx - 1)) linha.classList.add('destaque');
        linha.innerHTML = `<span>Pergunta ${idx}</span><strong>${formatarDinheiro(valor)}</strong>`;
        elPremiosLista.appendChild(linha);
    });
}

// ============ TROCAR TELA ============
function mostrarTela(tela) {
    document.querySelectorAll('.tela').forEach(t => t.classList.remove('ativa'));
    tela.classList.add('ativa');
}

// ============ INICIAR JOGO ============
function iniciarJogo() {
    // Sorteia 15 perguntas mantendo ordem de dificuldade
    const faceis  = PERGUNTAS.filter(p => p.nivel === 1).sort(() => Math.random() - 0.5);
    const medias  = PERGUNTAS.filter(p => p.nivel === 2).sort(() => Math.random() - 0.5);
    const dificeis = PERGUNTAS.filter(p => p.nivel === 3).sort(() => Math.random() - 0.5);

    estado.perguntasSorteadas = [
        ...faceis.slice(0, 5),
        ...medias.slice(0, 5),
        ...dificeis.slice(0, 5),
    ];

    estado.perguntaAtual = 0;
    estado.premioAtual = 0;
    estado.premioGarantido = 0;
    estado.acertos = 0;
    estado.jogoAtivo = true;
    estado.ajudas = { pular: 1, eliminar: 1, dica: 1 };

    mostrarTela(elTelaJogo);
    atualizarAjudasUI();
    carregarPergunta();
}

// ============ CARREG