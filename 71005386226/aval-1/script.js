// Função para mudar a imagem do banner principal dinamicamente
function mudarImagemBanner() {
    const heroBanner = document.querySelector('.hero');
    
    if (heroBanner) {
        // Nova imagem de praia paradisíaca vista de cima
        const novaImagemUrl = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1500&q=80";
        
        // Aplica o novo fundo mantendo o efeito de escurecimento (linear-gradient) para o texto continuar legível
        heroBanner.style.background = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${novaImagemUrl}') no-repeat center center/cover`;
    }
}

// Executa a função
mudarImagemBanner();