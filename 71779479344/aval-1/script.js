/**
 * Podcast CETI Paulo Freire - Controle do Player de Áudio
 */
document.addEventListener('DOMContentLoaded', () => {
    // --- Seleção de Elementos do DOM ---
    const audio = document.getElementById('main-audio');
    const playPauseBtn = document.getElementById('btn-play-pause');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeText = document.getElementById('current-time');
    const durationText = document.getElementById('duration');
    const currentTitle = document.getElementById('current-title');
    const currentDesc = document.getElementById('current-description');
    
    // Todos os cards de episódios da página
    const episodeCards = document.querySelectorAll('.episode-card');

    // --- Configuração dos Cliques nos Cards ---
    episodeCards.forEach(card => {
        card.querySelector('.listen-btn').addEventListener('click', () => {
            // Captura os dados configurados no HTML do card
            const audioSrc = card.getAttribute('data-src');
            const title = card.getAttribute('data-title');
            const desc = card.getAttribute('data-desc');

            // 1. Atualiza os textos do player principal
            currentTitle.textContent = title;
            currentDesc.textContent = desc;

            // 2. Injeta o novo arquivo de áudio no player
            audio.src = audioSrc;