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
            btn.textContent = '💖';
        } else {
            btn.textContent = '🔖';
        }
    });
});

// Publicar novos comentários no post
const commentInputs = document.querySelectorAll('.add-comment-box input');
const commentButtons = document.querySelectorAll('.post-comment-btn');

commentButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const input = commentInputs[index];
        const text = input.value.trim();
        
        if (text !== "") {
            alert(`Comentário publicado com sucesso: "${text}" 💕`);
            input.value = "";
        }
    });
});
