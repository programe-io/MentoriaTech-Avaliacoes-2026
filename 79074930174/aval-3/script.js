// Interatividade do Clone do Instagram

document.addEventListener('DOMContentLoaded', () => {
    // 1. Funcionalidade de Curtir (Botão Coração e Duplo Clique na Foto)
    const postCards = document.querySelectorAll('.post-card');

    postCards.forEach((card) => {
        const likeBtn = card.querySelector('.like-btn');
        const likeIcon = likeBtn.querySelector('i');
        const likesText = card.querySelector('.likes-text');
        const postImageContainer = card.querySelector('.post-image').parentElement;
        let isLiked = false;

        const toggleLike = (forceLike = false) => {
            if (forceLike && isLiked) return;
            isLiked = !isLiked;

            if (isLiked) {
                likeIcon.classList.remove('bx-heart');
                likeIcon.classList.add('bxs-heart', 'text-red-500');
                likesText.textContent = 'Curtido por você e outras mil e poucas pessoas';
            } else {
                likeIcon.classList.remove('bxs-heart', 'text-red-500');
                likeIcon.classList.add('bx-heart');
                likesText.textContent = 'mil e poucas curtidas';
            }
        };

        likeBtn.addEventListener('click', () => toggleLike(false));

        // Duplo clique na imagem
        postImageContainer.addEventListener('dblclick', () => {
            toggleLike(true);
            const heartOverlay = document.createElement('i');
            heartOverlay.className = 'bx bxs-heart double-tap-heart';
            postImageContainer.appendChild(heartOverlay);
            setTimeout(() => heartOverlay.remove(), 800);
        });

        // 2. Funcionalidade de Salvar (Bookmark)
        const saveBtn = card.querySelector('.save-btn');
        const saveIcon = saveBtn.querySelector('i');
        let isSaved = false;

        saveBtn.addEventListener('click', () => {
            isSaved = !isSaved;
            if (isSaved) {
                saveIcon.classList.remove('bx-bookmark');
                saveIcon.classList.add('bxs-bookmark');
                mostrarNotificacao('Publicação salva nos itens favoritos');
            } else {
                saveIcon.classList.remove('bxs-bookmark');
                saveIcon.classList.add('bx-bookmark');
                mostrarNotificacao('Removido dos itens salvos');
            }
        });
    });

    // 3. Funcionalidade de Seguir na Barra Lateral (Aside)
    const followButtons = document.querySelectorAll('.follow-btn');
    followButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            if (btn.textContent.trim() === 'Seguir') {
                btn.textContent = 'Seguindo';
                btn.classList.remove('text-blue-500', 'hover:text-blue-700');
                btn.classList.add('text-slate-900');
                mostrarNotificacao('Você começou a seguir este perfil');
            } else {
                btn.textContent = 'Seguir';
                btn.classList.remove('text-slate-900');
                btn.classList.add('text-blue-500', 'hover:text-blue-700');
            }
        });
    });

    // 4. Visualização de Stories ao clicar
    const storyItems = document.querySelectorAll('.story-item');
    storyItems.forEach((story) => {
        story.addEventListener('click', () => {
            const user = story.getAttribute('data-user');
            const ring = story.querySelector('.bg-gradient-to-br');
            if (ring) {
                ring.classList.remove('from-pink-500', 'via-red-500', 'to-yellow-500');
                ring.classList.add('bg-gray-300');
            }
            mostrarNotificacao(`Visualizando story de ${user}`);
        });
    });

    // 5. Filtro rápido na barra de pesquisa (Desktop)
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const termo = e.target.value.toLowerCase().trim();
            postCards.forEach((card) => {
                const texto = card.textContent.toLowerCase();
                card.style.display = texto.includes(termo) ? 'block' : 'none';
            });
        });
    }
});

// Função auxiliar para exibir feedback visual discreto
function mostrarNotificacao(mensagem) {
    const toast = document.getElementById('toast-notification');
    if (!toast) return;
    toast.textContent = mensagem;
    toast.classList.remove('opacity-0');
    toast.classList.add('opacity-100');

    clearTimeout(window.toastTimeout);
    window.toastTimeout = setTimeout(() => {
        toast.classList.remove('opacity-100');
        toast.classList.add('opacity-0');
    }, 2500);
}

function adicionarStory() {
    mostrarNotificacao('Selecione uma foto para adicionar ao seu story');
}
