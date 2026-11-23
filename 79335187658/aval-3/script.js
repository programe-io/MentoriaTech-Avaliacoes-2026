// Interação de Curtir Postagem
const likeButtons = document.querySelectorAll('.like-btn');

likeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const icon = btn.querySelector('i');
        btn.classList.toggle('liked');
        
        if (btn.classList.contains('liked')) {
            icon.classList.replace('bx-heart', 'bxs-heart');
        } else {
            icon.classList.replace('bxs-heart', 'bx-heart');
        }
    });
});

// Interação de Seguir / Seguindo nas Sugestões
const followButtons = document.querySelectorAll('.follow-btn');

followButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.textContent === 'Seguir') {
            btn.textContent = 'Seguindo';
            btn.style.color = '#6b7280';
        } else {
            btn.textContent = 'Seguir';
            btn.style.color = '#3b82f6';
        }
    });
});