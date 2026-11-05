// Funcionalidade do Botão de Curtir estilo Instagram
const likeButtons = document.querySelectorAll('.insta-like-btn');

likeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.textContent === '🤍') {
            btn.textContent = '❤️';
            btn.style.transform = 'scale(1.2)';
            setTimeout(() => btn.style.transform = 'scale(1)', 100);
        } else {
            btn.textContent = '🤍';
        }
    });
});

// Funcionalidade do Botão de Favoritar/Salvar (Bookmark)
const bookmarkButtons = document.querySelectorAll('.bookmark-btn');

bookmarkButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.textContent === '🔖') {
            btn.textContent = '💝'; 
        } else {
            btn.textContent = '🔖';
        }
    });
});
