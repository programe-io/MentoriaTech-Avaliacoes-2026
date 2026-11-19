let tocando = false;
let intervalo;
let audioCtx;

function tocarNota(frequencia) {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.value = frequencia;
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.8);
}

function alternarMusica() {
    const btn = document.getElementById('btn-play');
    const status = document.getElementById('status-musica');
    const notas = [261.63, 329.63, 392.00, 493.88];
    let passo = 0;

    if (!tocando) {
        tocando = true;
        btn.textContent = '⏸ Pausar';
        status.textContent = 'Tocando: Ainda Bem...';
        tocarNota(notas[passo]);
        intervalo = setInterval(() => {
            passo = (passo + 1) % notas.length;
            tocarNota(notas[passo]);
        }, 900);
    } else {
        tocando = false;
        clearInterval(intervalo);
        btn.textContent = '▶ Tocar Música';
        status.textContent = 'Pausado';
    }
}
