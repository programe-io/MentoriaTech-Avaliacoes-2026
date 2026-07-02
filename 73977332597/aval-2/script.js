// Aguarda o carregamento total da página
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');

    // Adiciona efeitos dinâmicos ao passar o rato nos cards
    cards.forEach(card => {
        const icon = card.querySelector('.card-icon');

        card.addEventListener('mouseenter', () => {
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
                icon.style.transition = 'transform 0.2s ease';
            }
        });

        card.addEventListener('mouseleave', () => {
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
});