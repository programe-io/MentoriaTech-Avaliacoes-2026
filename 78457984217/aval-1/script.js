document.addEventListener("DOMContentLoaded", () => {
    const playBtn = document.getElementById("play-btn");

    // Adiciona uma simulação de carregamento do player de vídeo ao clicar no banner
    playBtn.addEventListener("click", () => {
        playBtn.textContent = "⌛ Carregando filme...";
        playBtn.style.backgroundColor = "#e50914";
        playBtn.style.color = "#ffffff";
        
        setTimeout(() => {
            alert("🎬 Iniciando a reprodução de 'A Jornada Estelar' em Alta Definição!");
            playBtn.textContent = "▶️ Assistir Agora";
            playBtn.style.backgroundColor = "#ffffff";
            playBtn.style.color = "#000000";
        }, 1200);
    });
});
