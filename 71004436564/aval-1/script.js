const audio = document.getElementById('audio-player');
const btnPlayPause = document.getElementById('btn-play-pause');
const barraProgresso = document.getElementById('barra-progresso');
const tempoAtual = document.getElementById('tempo-atual');
const tempoTotal = document.getElementById('tempo-total');

const tituloAtual = document.getElementById('titulo-atual');
const descricaoAtual = document.getElementById('descricao-atual');

// Função Play / Pause
btnPlayPause.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        btnPlayPause.textContent = "⏸ Pause";
    } else {
        audio.pause();
        btnPlayPause.textContent = "▶ Play";
    }
});

// Atualiza a barra de progresso e o tempo em texto conforme o áudio toca
audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        const porcentagem = (audio.currentTime / audio.duration) * 100;
        barraProgresso.value = porcentagem;
        
        tempoAtual.textContent = formatarTempo(audio.currentTime);
        tempoTotal.textContent = formatarTempo(audio.duration);
    }
});

// Permite arrastar a barra para avançar ou voltar o áudio
barraProgresso.addEventListener('input', () => {
    const tempoDestino = (barraProgresso.value / 100) * audio.duration;
    audio.currentTime = tempoDestino;
});

// Reseta o botão quando o áudio termina
audio.addEventListener('ended', () => {
    btnPlayPause.textContent = "▶ Play";
    barraProgresso.value = 0;
    tempoAtual.textContent = "0:00";
});

// Função para formatar segundos em Minutos:Segundos
function formatarTempo(segundos) {
    const min = Math.floor(segundos / 60);
    const seg = Math.floor(segundos % 60);
    return `${min}:${seg < 10 ? '0' : ''}${seg}`;
}

// Função para trocar de episódio ao clicar nos cards inferiores
function mudarEpisodio(titulo, descricao, urlAudio, elementoCard) {
    // Altera os textos do destaque
    tituloAtual.textContent = titulo;
    descricaoAtual.textContent = descricao;
    
    // Altera a origem do áudio e carrega
    audio.src = urlAudio;
    audio.load();
    
    // Dá play automaticamente no novo episódio
    audio.play();
    btnPlayPause.textContent = "⏸ Pause";

    // Atualiza a classe visual 'ativo' nos cards
    document.querySelectorAll('.card-episodio').forEach(card => {
        card.classList.remove('ativo');
        card.querySelector('.status-ouvir').textContent = "Clique para ouvir";
    });
    
    elementoCard.classList.add('ativo');
    elementoCard.querySelector('.status-ouvir').textContent = "Ouvindo agora";
}