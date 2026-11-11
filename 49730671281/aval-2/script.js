// Função para curtir a notícia (incrementa contador e alterna o ícone)
function toggleLike(button) {
    const span = button.querySelector('span');
    let count = parseInt(span.textContent);

    if (button.classList.contains('liked')) {
        button.classList.remove('liked');
        button.querySelector('i').classList.remove('fa-solid');
        button.querySelector('i').classList.add('fa-regular');
        span.textContent = count - 1;
    } else {
        button.classList.add('liked');
        button.querySelector('i').classList.remove('fa-regular');
        button.querySelector('i').classList.add('fa-solid');
        span.textContent = count + 1;
    }
}

// Função para filtrar as notícias por categoria
function filterNews(category) {
    const cards = document.querySelectorAll('.news-card');
    const buttons = document.querySelectorAll('.filter-btn');

    // Atualiza o botão ativo
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Mostra ou oculta os cards baseados na categoria
    cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}