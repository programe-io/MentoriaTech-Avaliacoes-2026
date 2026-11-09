// --- FILTRAGEM VIA STORIES DO FEED ---
const storyButtons = document.querySelectorAll('.story-btn');
const posts = document.querySelectorAll('.feed-card');

storyButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Alterna botão de story ativo
        storyButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        posts.forEach(post => {
            if (filterValue === 'all' || post.getAttribute('data-fairy') === filterValue) {
                post.style.display = 'block';
                post.style.animation = 'popIn 0.35s ease forwards';
            } else {
                post.style.display = 'none';
            }
        });
    });
});

// --- SISTEMA INTERATIVO DE CURTIDAS (LIKE) ---
function toggleLike(button) {
    button.classList.toggle('liked');
    const countSpan = button.querySelector('.count');
    let currentCount = parseInt(countSpan.textContent);

    if (button.classList.contains('liked')) {
        countSpan.textContent = currentCount + 1;
    } else {
        countSpan.textContent = currentCount - 1;
    }
}

// --- PARTILHA MÁGICA ---
function magicAlert() {
    alert("✨ Feitiço de Transmissão Ativado! Link copiado para a tua Ciber-Asa! 🌈");
}
