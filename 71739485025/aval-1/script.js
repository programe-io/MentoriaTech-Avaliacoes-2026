const audio = document.getElementById('audio-element');
const playBtn = document.getElementById('play-btn');
const progressBar = document.querySelector('.progress-bar');
const progressArea = document.querySelector('.progress-area');
const timeDisplay = document.querySelector('.time');

const currentTitle = document.getElementById('current-title');
const currentDescription = document.getElementById('current-description');
const currentBadge = document.querySelector('.badge');

// Tocar ou Pausar
playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    } else {
        audio.pause();
        playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
});

// Atualizar barra de progresso e tempo
audio.addEventListener('timeupdate', (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    
    // Atualiza largura da barra
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    // Atualiza texto do tempo
    if(duration) {
        let currentMin = Math.floor(currentTime / 60);
        let currentSec = Math.floor(currentTime % 60);
        if(currentSec < 10) currentSec = `0${currentSec}`;
        timeDisplay.innerText = `${currentMin}:${currentSec}`;
    }
});

// Avançar áudio ao clicar na barra
progressArea.addEventListener('click', (e) => {
    let progressWidthValue = progressArea.clientWidth;
    let clickedOffSetX = e.offsetX;
    let songDuration = audio.duration;
    
    audio.currentTime = (clickedOffSetX / progressWidthValue) * songDuration;
});

// Resetar botão quando o áudio terminar
audio.addEventListener('ended', () => {
    playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    progressBar.style.width = '0%';
});

// Função para trocar o episódio tocando
function changeAudio(title, description, audioUrl, badgeText) {
    audio.src = audioUrl;
    currentTitle.innerText = title;
    currentDescription.innerText = description;
    currentBadge.innerText = badgeText;
    
    // Reseta o player e dá play automaticamente
    progressBar.style.width = '0%';
    audio.play();
    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    
    // Rola a página suavemente para o player
    window.scrollTo({ top: 0, behavior: 'smooth' });
}