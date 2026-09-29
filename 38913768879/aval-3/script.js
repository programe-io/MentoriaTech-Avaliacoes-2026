document.addEventListener('DOMContentLoaded', () => {
    // Inicializador do Web Audio Context
    let audioCtx = null;

    // Seletores HTML
    const canvas = document.getElementById('visualizer');
    const ctx = canvas.getContext('2d');
    const btnLoop = document.getElementById('btn-loop');
    const bpmInput = document.getElementById('bpm');
    const bpmVal = document.getElementById('bpm-val');
    const leds = document.querySelectorAll('.step-led');
    const pads = document.querySelectorAll('.pad-btn');

    // Variáveis do Estado de Áudio & Sequenciador
    let loopAtivo = false;
    let timerLoop = null;
    let passoAtual = 0;
    let pulsoVisualizador = 0;

    // Garante inicialização do áudio no primeiro clique (Política de Autoplay dos navegadores)
    function iniciarAudioContext() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    // --- SINTETIZADORES DE ÁUDIO (Pura matemática via Web Audio API) ---
    function tocarSom(tipo) {
        iniciarAudioContext();
        pulsoVisualizador = 25; // Dispara pulso visual no Canvas

        const tempo = audioCtx.currentTime;

        if (tipo === 'kick') {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.frequency.setValueAtTime(150, tempo);
            osc.frequency.exponentialRampToValueAtTime(0.01, tempo + 0.5);
            gain.gain.setValueAtTime(1, tempo);
            gain.gain.exponentialRampToValueAtTime(0.01, tempo + 0.5);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(tempo);
            osc.stop(tempo + 0.5);
        } 
        else if (tipo === 'snare') {
            // Ruído branco para a caixa
            const bufferSize = audioCtx.sampleRate * 0.2;
            const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
            
            const noise = audioCtx.createBufferSource();
            noise.buffer = buffer;
            const gain = audioCtx.createGain();
            gain.gain.setValueAtTime(0.8, tempo);
            gain.gain.exponentialRampToValueAtTime(0.01, tempo + 0.2);
            noise.connect(gain);
            gain.connect(audioCtx.destination);
            noise.start(tempo);
        }
        else if (tipo === 'hihat') {
            const bufferSize = audioCtx.sampleRate * 0.05;
            const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
            
            const noise = audioCtx.createBufferSource();
            noise.buffer = buffer;
            const filter = audioCtx.createBiquadFilter();
            filter.type = 'highpass';
            filter.frequency.value = 7000;
            const gain = audioCtx.createGain();
            gain.gain.setValueAtTime(0.3, tempo);
            gain.gain.exponentialRampToValueAtTime(0.01, tempo + 0.05);
            noise.connect(filter);
            filter.connect(gain);
            gain.connect(audioCtx.destination);
            noise.start(tempo);
        }
        else if (tipo === 'clap') {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(800, tempo);
            gain.gain.setValueAtTime(0.5, tempo);
            gain.gain.exponentialRampToValueAtTime(0.01, tempo + 0.15);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(tempo);
            osc.stop(tempo + 0.15);
        }
        else if (tipo === 'bass1') {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(110, tempo);
            osc.frequency.exponentialRampToValueAtTime(40, tempo + 0.4);
            gain.gain.setValueAtTime(0.7, tempo);
            gain.gain.exponentialRampToValueAtTime(0.01, tempo + 0.4);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(tempo);
            osc.stop(tempo + 0.4);
        }
        else if (tipo === 'synth1' || tipo === 'synth2') {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sine';
            const freq = tipo === 'synth1' ? 440 : 659.25; // Notas Lá / Mi
            osc.frequency.setValueAtTime(freq, tempo);
            gain.gain.setValueAtTime(0.5, tempo);
            gain.gain.exponentialRampToValueAtTime(0.01, tempo + 0.3);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(tempo);
            osc.stop(tempo + 0.3);
        }
        else if (tipo === 'laser') {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.frequency.setValueAtTime(850, tempo);
            osc.frequency.exponentialRampToValueAtTime(100, tempo + 0.15);
            gain.gain.setValueAtTime(0.6, tempo);
            gain.gain.exponentialRampToValueAtTime(0.01, tempo + 0.15);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(tempo);
            osc.stop(tempo + 0.15);
        }
    }

    // --- ANIMAÇÃO DO VISUALIZADOR (CANVAS 2D) ---
    function renderizarVisualizador() {
        ctx.fillStyle = '#05050a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);

        // Desenha a onda central reativa ao pulso de áudio
        for (let x = 0; x < canvas.width; x += 5) {
            const amplitude = (Math.sin(x * 0.05 + Date.now() * 0.01) * pulsoVisualizador);
            ctx.lineTo(x, (canvas.height / 2) + amplitude);
        }

        ctx.strokeStyle = pulsoVisualizador > 5 ? '#ff0055' : '#00f3ff';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Amortecimento suave da onda
        if (pulsoVisualizador > 0) pulsoVisualizador *= 0.92;

        requestAnimationFrame(renderizarVisualizador);
    }
    renderizarVisualizador();

    // --- SEQUENCIADOR AUTOMÁTICO DE RITMO (BEAT) ---
    const padroesRitmo = ['kick', 'hihat', 'snare', 'hihat', 'kick', 'clap', 'snare', 'synth2'];

    function avançarPasso() {
        leds.forEach(led => led.classList.remove('ativo'));
        leds[passoAtual].classList.add('ativo');

        // Toca o som pré-programado do passo atual
        const somPasso = padroesRitmo[passoAtual];
        tocarSom(somPasso);

        // Anima visualmente o pad correspondente
        const padCorrespondente = Array.from(pads).find(p => p.dataset.sound === somPasso);
        if (padCorrespondente) {
            padCorrespondente.classList.add('tocado');
            setTimeout(() => padCorrespondente.classList.remove('tocado'), 120);
        }

        passoAtual = (passoAtual + 1) % 8;
    }

    function alternarLoop() {
        iniciarAudioContext();
        if (loopAtivo) {
            clearInterval(timerLoop);
            loopAtivo = false;
            btnLoop.textContent = "▶ INICIAR RITMO";
            btnLoop.style.backgroundColor = "#ff0055";
            leds.forEach(led => led.classList.remove('ativo'));
        } else {
            loopAtivo = true;
            passoAtual = 0;
            btnLoop.textContent = "⏹ PARAR RITMO";
            btnLoop.style.backgroundColor = "#00f3ff";
            btnLoop.style.color = "#000";
            
            const intervaloMs = (60 / parseInt(bpmInput.value)) * 1000 / 2;
            timerLoop = setInterval(avançarPasso, intervaloMs);
        }
    }

    // --- EVENTOS ---
    // Clique nos Pads
    pads.forEach(pad => {
        pad.addEventListener('click', () => {
            const tipoSom = pad.dataset.sound;
            tocarSom(tipoSom);
            pad.classList.add('tocado');
            setTimeout(() => pad.classList.remove('tocado'), 150);
        });
    });

    // Teclas de atalho (1 a 8)
    document.addEventListener('keydown', (e) => {
        const pad = Array.from(pads).find(p => p.dataset.key === e.key);
        if (pad) pad.click();
    });

    // Controle de BPM
    bpmInput.addEventListener('input', (e) => {
        bpmVal.textContent = e.target.value;
        if (loopAtivo) {
            // Reinicia o intervalo para aplicar o novo tempo imediatamente
            clearInterval(timerLoop);
            const intervaloMs = (60 / parseInt(e.target.value)) * 1000 / 2;
            timerLoop = setInterval(avançarPasso, intervaloMs);
        }
    });

    btnLoop.addEventListener('click', alternarLoop);
});