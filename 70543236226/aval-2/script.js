// Funções Interativas do Site

// Abrir e fechar menu mobile
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

// Simulação de reprodução de vídeo/entrevista
function playInterview() {
    const icon = document.getElementById('play-icon');
    if (icon.classList.contains('fa-play')) {
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
        alert("Simulando reprodução de vídeo exclusivo dos bastidores de Culpables!");
    } else {
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
    }
}