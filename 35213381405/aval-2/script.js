// ============ BANCO DE PALAVRAS ============
const PALAVRAS = [
    // Animais
    { p: 'ELEFANTE',  c: 'Animal',    d: 'O maior mamífero terrestre' },
    { p: 'GIRAFA',    c: 'Animal',    d: 'Tem o pescoço mais longo' },
    { p: 'TARTARUGA', c: 'Animal',    d: 'Réptil lento com casco' },
    { p: 'GOLFINHO',  c: 'Animal',    d: 'Mamífero marinho inteligente' },
    { p: 'CORUJA',    c: 'Animal',    d: 'Ave noturna símbolo de sabedoria' },
    { p: 'JACARE',    c: 'Animal',    d: 'Réptil de rio com dentes afiados' },

    // Países
    { p: 'BRASIL',    c: 'País',      d: 'Maior país da América do Sul' },
    { p: 'JAPAO',     c: 'País',      d: 'Terra do sol nascente' },
    { p: 'CANADA',    c: 'País',      d: 'Famoso pela folha de bordo' },
    { p: 'EGITO',     c: 'País',      d: 'Terra das pirâmides' },
    { p: 'ITALIA',    c: 'País',      d: 'Berço do Renascimento' },
    { p: 'AUSTRALIA', c: 'País',      d: 'Continente dos cangurus' },

    // Frutas
    { p: 'ABACAXI',   c: 'Fruta',     d: 'Fruta tropical com coroa' },
    { p: 'MELANCIA',  c: 'Fruta',     d: 'Fruta grande, verde por fora, vermelha por dentro' },
    { p: 'MORANGO',   c: 'Fruta',     d: 'Fruta vermelha com sementes por fora' },
    { p: 'BANANA',    c: 'Fruta',     d: 'Fruta amarela curva' },
    { p: 'UVA',       c: 'Fruta',     d: 'Usada para fazer vinho' },

    // Tecnologia
    { p: 'JAVASCRIPT', c: 'Tecnologia', d: 'Linguagem da web' },
    { p: 'PYTHON',     c: 'Tecnologia', d: 'Serpente que virou linguagem' },
    { p: 'INTERNET',   c: 'Tecnologia', d: 'Rede mundial de computadores' },
    { p: 'COMPUTADOR', c: 'Tecnologia', d: 'Máquina que processa dados' },
    { p: 'ALGORITMO',  c: 'Tecnologia', d: 'Sequência de passos para resolver algo' },

    // Profissões
    { p: 'MEDICO',     c: 'Profissão', d: 'Cuida da saúde das pessoas' },
    { p: 'PROFESSOR',  c: 'Profissão', d: 'Ensina e forma mentes' },
    { p: 'ENGENHEIRO', c: 'Profissão', d: 'Projeta e constrói soluções' },
    { p: 'PILOTO',     c: 'Profissão', d: 'Comanda aeronaves' },
    { p: 'ASTRONAUTA', c: 'Profissão', d: 'Viaja para o espaço' },
];

const ALFABETO = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const MAX_ERROS = 6;
const ORDEM_PARTES = ['cabeca', 'corpo', 'braco-esq', 'braco-dir', 'perna-esq', 'perna-dir'];

// ============ ESTADO ============
const estado = {
    palavra: '',
    categoria: '',
    dica: '',
    acertos: [],
    erros: [],
    jogoAtivo: true,
    vitorias: 0,
    derrotas: 0,
    sequencia: 0,
};

// ============ ELEMENTOS ============
const elPalavra = document.getElementById('palavra');
const elCategoria = document.getElementById('categoria');
const elDica = document.getElementById('dica');
const elMensagem = document.getElementById('mensagem');
const elVidas = document.getElementById('vidas');
const elTeclado = document.getElementById('teclado');
const elVitorias = document.getElementById('vitorias');
const elDerrotas = document.getElementById('derrotas');
const elSequencia = document.getElementById('sequencia');
const btnReiniciar = document.getElementById('btn-reiniciar');
const btnPular = document.getElementById('btn-pular');
const partes = document.querySelectorAll('.parte');

// ============ ÁUDIO ============
let ctx;
function som(tipo) {
    try {
        if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = tipo === 'erro' ? 'sawtooth' : 'sine';
        osc.frequency.value = tipo === 'acerto' ? 660 : tipo === 'erro' ? 160 : 880;
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(); osc.stop(ctx.currentTime + 0.35);
    } catch (e) { /* áudio opcional */ }
}

// ============ TECLADO VIRTUAL ============
function construirTeclado() {
    elTeclado.innerHTML = '';
    ALFABETO.forEach(letra => {
        const btn = document.createElement('button');
        btn.className = 'tecla';
        btn.textContent = letra;
        btn.dataset.letra = letra;
        btn.addEventListener('click', () => tentarLetra(letra));
        elTeclado.appendChild(btn);
    });
}

// ============ NOVA PARTIDA ============
function novaPartida(pular = false) {
    // Sorteia uma palavra
    const sorteada = PALAVRAS[Math.floor(Math.random() * PALAVRAS.length)];
    estado.palavra = sorteada.p;
    estado.categoria = sorteada.c;
    estado.dica = sorteada.d;
    estado.acertos = [];
    estado.erros = [];
    estado.jogoAtivo = true;

    // Atualiza UI
    elCategoria.textContent = estado.categoria;
    elDica.textContent = estado.dica;
    elMensagem.textContent = pular ? 'Palavra pulada! Boa sorte 🍀' : 'Boa sorte! 🍀';
    elMensagem.classList.remove('vitoria', 'derrota');

    // Esconde as partes do boneco
    partes.forEach(p => p.classList.remove('visivel'));

    // Reseta o teclado
    document.querySelectorAll('.tecla').forEach(btn => {
        btn.disabled = false;
        btn.classList.remove('acerto', 'erro');
    });

    renderizarPalavra();
    atualizarVidas();
}

// ============ RENDERIZA PALAVRA ============
function renderizarPalavra() {
    elPalavra.innerHTML = '';

    // Suporta espaços e hífens (por ex: "SÃO PAULO")
    [...estado.palavra].forEach(char => {
        const slot = document.createElement('div');
        slot.className = 'letra-slot';

        if (char === ' ') {
            slot.classList.add('espaco');
            elPalavra.appendChild(slot);
            return;
        }

        if (estado.acertos.includes(char)) {
            slot.textContent = char;
            slot.classList.add('revelada');
        } else {
            slot.textContent = '';
        }
        elPalavra.appendChild(slot);
    });
}

// ============ TENTAR LETRA ============
function tentarLetra(letra) {
    if (!estado.jogoAtivo) return;
    if (estado.acertos.includes(letra) || estado.erros.includes(letra)) return;

    const btn = document.querySelector(`.tecla[data-letra="${letra}"]`);
    if (btn) btn.disabled = true;

    if (estado.palavra.includes(letra)) {
        // Acertou
        estado.acertos.push(letra);
        if (btn) btn.classList.add('acerto');
        som('acerto');
        renderizarPalavra();
        verificarVitoria();
    } else {
        // Errou
        estado.erros.push(letra);
        if (btn) btn.classList.add('erro');
        som('erro');
        mostrarParte();
        atualizarVidas();
        verificarDerrota();
    }
}

// ============ MOSTRAR PARTE DO BONECO ============
function mostrarParte() {
    const idx = estado.erros.length - 1;
    if (idx >= 0 && idx < ORDEM_PARTES.length) {
        const parte = document.querySelector(`.parte[data-parte="${ORDEM_PARTES[idx]}"]`);
        if (parte) parte.classList.add('visivel');
    }
    if (navigator.vibrate) navigator.vibrate(60);
}

// ============ ATUALIZAR VIDAS ============
function atualizarVidas() {
    const vidas = MAX_ERROS - estado.erros.length;
    elVidas.textContent = vidas;
    elVidas.classList.remove('baixo', 'critico');
    if (vidas <= 1) elVidas.classList.add('critico');
    else if (vidas <= 3) elVidas.classList.add('baixo');
}

// ============ VERIFICAR VITÓRIA ============
function verificarVitoria() {
    const todasReveladas = [...estado.palavra]
        .filter(c => c !== ' ')
        .every(c => estado.acertos.includes(c));

    if (!todasReveladas) return;

    estado.jogoAtivo = false;
    estado.vitorias++;
    estado.sequencia++;
    atualizarPlacar();

    elMensagem.textContent = `🎉 Você venceu! A palavra era "${estado.palavra}".`;
    elMensagem.classList.add('vitoria');
    som('vitoria');

    if (navigator.vibrate) navigator.vibrate([80, 40, 80, 40, 200]);
    desabilitarTeclado();
}

// ============ VERIFICAR DERROTA ============
function verificarDerrota() {
    if (estado.erros.length < MAX_ERROS) return;

    estado.jogoAtivo = false;
    estado.derrotas++;
    estado.sequencia = 0;
    atualizarPlacar();

    elMensagem.textContent = `💀 Você perdeu! A palavra era "${estado.palavra}".`;
    elMensagem.classList.add('derrota');
    som('erro');

    if (navigator.vibrate) navigator.vibrate([200, 80, 200]);
    desabilitarTeclado();

    // Revela a palavra
    elPalavra.innerHTML = '';
    [...estado.palavra].forEach(char => {
        const slot = document.createElement('div');
        slot.className = 'letra-slot revelada';
        if (char === ' ') slot.classList.add('espaco');
        else slot.textContent = char;
        elPalavra.appendChild(slot);
    });
}

// ============ DESABILITAR TECLADO ============
function desabilitarTeclado() {
    document.querySelectorAll('.tecla').forEach(btn => btn.disabled = true);
}

// ============ ATUALIZAR PLACAR ============
function atualizarPlacar() {
    elVitorias.textContent = estado.vitorias;
    elDerrotas.textContent = estado.derrotas;
    elSequencia.textContent = estado.sequencia;
}

// ============ EVENTOS GLOBAIS ============
btnReiniciar.addEventListener('click', () => novaPartida());
btnPular.addEventListener('click', () => {
    if (estado.jogoAtivo) {
        // Conta como derrota parcial? Aqui apenas troca a palavra
        novaPartida(true);
    } else {
        novaPartida(true);
    }
});

// Teclado físico
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        novaPartida();
        return;
    }
    const letra = e.key.toUpperCase();
    if (/^[A-Z]$/.test(letra)) {
        tentarLetra(letra);
    }
});

// ============ INICIALIZAÇÃO ============
construirTeclado();
novaPartida();