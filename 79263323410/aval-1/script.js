// Seleciona o elemento do cabeçalho
const header = document.getElementById('header');

// Adiciona um "ouvinte de evento" para o scroll (rolagem) da página
window.addEventListener('scroll', () => {
    // Se a rolagem for maior que 50 pixels
    if (window.scrollY > 50) {
        // Adiciona a classe 'scrolled' ao cabeçalho (que tem fundo escuro no CSS)
        header.classList.add('scrolled');
    } else {
        // Remove a classe 'scrolled' se voltar para o topo
        header.classList.remove('scrolled');
    }
});

// Animação simples nos cards de filme ao passar o mouse
const movieCards = document.querySelectorAll('.movie-card');

movieCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.boxShadow = '0 8px 20px rgba(229, 9, 20, 0.3)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.boxShadow = 'none';
    });
});