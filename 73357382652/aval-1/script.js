// Capturando os elementos da tela
const audio = document.getElementById('main-audio');
const playBtn = document.getElementById('play-btn');
const progressBar = document.getElementById('progress-bar');
const currentTitle = document.getElementById('current-title');
const currentDesc = document.getElementById('current-desc');
const listenButtons = document.querySelectorAll('.listen-btn');

// Monitora o clique em qualquer botão "Ouvir" da lista
listenButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Coleta os dados personalizados do botão clicado
        const audioSrc = this.getAttribute('data-src');
        const title = this.getAttribute('data-title');
        const desc = this.getAttribute('data-desc');

        // Atualiza as informações no player em destaque
        currentTitle.textContent = title;
        currentDesc.textContent = desc;
        audio.src = audioSrc;

        // Libera o botão de play e começa a tocar
        playBtn.disabled = false;
        audio.play();
        playBtn.textContent = "⏸ Pausar";
    });
});

// Controla o botão Play/Pausar do player principal
playBtn.addEventListener('click', function() {
    if (audio.paused) {
        audio.play();
        playBtn.textContent = "⏸ Pausar";
    } else {
        audio.pause();
        playBtn.textContent = "▶ Escutar";
    }
});

// Atualiza a barra de progresso conforme o áudio toca
audio.addEventListener('timeupdate', function() {
    if (audio.duration) {
        const percentage = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = percentage + "%";
    }
});

// Quando o áudio acabar, resgata o visual do botão
audio.addEventListener('ended', function() {
    playBtn.textContent = "▶ Escutar";
    progressBar.style.width = "0%";
});