// ============================================
// Dados simulados
// ============================================
const storiesData = [
    { user: 'ana_costa', avatar: 'https://i.pravatar.cc/80?u=ana' },
    { user: 'pedro_lima', avatar: 'https://i.pravatar.cc/80?u=pedro' },
    { user: 'julia_88', avatar: 'https://i.pravatar.cc/80?u=julia' },
    { user: 'lucas.dev', avatar: 'https://i.pravatar.cc/80?u=lucas' },
    { user: 'carol_foto', avatar: 'https://i.pravatar.cc/80?u=carol' },
    { user: 'rafael_m', avatar: 'https://i.pravatar.cc/80?u=rafael' },
];

const suggestionsData = [
    { user: 'mariana_k', name: 'Mariana K.', avatar: 'https://i.pravatar.cc/80?u=mariana', reason: 'Segue você' },
    { user: 'bruno_art', name: 'Bruno Art', avatar: 'https://i.pravatar.cc/80?u=bruno', reason: 'Novo no Instagram' },
    { user: 'leticia.v', name: 'Letícia V.', avatar: 'https://i.pravatar.cc/80?u=leticia', reason: 'Sugerido para você' },
    { user: 'gustavo_99', name: 'Gustavo', avatar: 'https://i.pravatar.cc/80?u=gustavo', reason: 'Segue pedro_lima' },
    { user: 'amanda_p', name: 'Amanda P.', avatar: 'https://i.pravatar.cc/80?u=amanda', reason: 'Popular' },
];

// ============================================
// Renderização dos Stories
// ============================================
function renderStories() {
    const list = document.getElementById('stories-list');
    list.innerHTML = storiesData.map(story => `
        <li class="story-item" tabindex="0" aria-label="Story de ${story.user}">
            <div class="story-avatar">
                <img src="${story.avatar}" alt="Avatar de ${story.user}">
            </div>
            <span>${story.user}</span>
        </li>
    `).join('');

    // Clique para abrir story (simulação)
    list.querySelectorAll('.story-item').forEach(item => {
        item.addEventListener('click', () => {
            const user = item.querySelector('span').textContent;
            alert(`📖 Abrindo story de: ${user}`);
        });
    });
}

// ============================================
// Renderização das sugestões
// ============================================
function renderSuggestions() {
    const list = document.getElementById('suggestions-list');
    list.innerHTML = suggestionsData.map(s => `
        <li class="suggestion-item">
            <img src="${s.avatar}" alt="Avatar de ${s.user}">
            <div class="suggestion-info">
                <strong>${s.user}</strong>
                <span>${s.reason}</span>
            </div>
            <button class="follow-btn" data-user="${s.user}">Seguir</button>
        </li>
    `).join('');

    // Botões seguir/seguindo
    list.querySelectorAll('.follow-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const isFollowing = btn.classList.toggle('following');
            btn.textContent = isFollowing ? 'Seguindo' : 'Seguir';
        });
    });
}

// ============================================
// Curtir posts (com duplo clique na imagem)
// ============================================
function setupLikes() {
    document.querySelectorAll('.post').forEach(post => {
        const likeBtn = post.querySelector('.like-btn');
        const likesCount = post.querySelector('.likes-count');
        const postImage = post.querySelector('.post-image img');

        // Toggle no botão de curtir
        likeBtn.addEventListener('click', () => toggleLike(likeBtn, likesCount));

        // Duplo clique na imagem para curtir
        postImage.addEventListener('dblclick', () => {
            if (!likeBtn.classList.contains('liked')) {
                toggleLike(likeBtn, likesCount);
            }
            showHeartAnimation(postImage);
        });
    });
}

function toggleLike(btn, countEl) {
    const icon = btn.querySelector('i');
    const isLiked = btn.classList.toggle('liked');
    icon.className = isLiked ? 'fa-solid fa-heart' : 'fa-regular fa-heart';

    // Atualiza contador
    let count = parseInt(countEl.textContent.replace(/\./g, ''));
    count = isLiked ? count + 1 : count - 1;
    countEl.textContent = count.toLocaleString('pt-BR');
}

function showHeartAnimation(imageEl) {
    const heart = document.createElement('div');
    heart.innerHTML = '<i class="fa-solid fa-heart"></i>';
    heart.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        font-size: 5rem;
        color: white;
        text-shadow: 0 0 20px rgba(0,0,0,0.5);
        pointer-events: none;
        animation: heartBurst 1s ease forwards;
    `;
    imageEl.parentElement.style.position = 'relative';
    imageEl.parentElement.appendChild(heart);

    // Adiciona keyframe dinamicamente
    if (!document.getElementById('heart-keyframes')) {
        const style = document.createElement('style');
        style.id = 'heart-keyframes';
        style.textContent = `
            @keyframes heartBurst {
                0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
                30% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
                70% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    setTimeout(() => heart.remove(), 1000);
}

// ============================================
// Salvar posts
// ============================================
function setupSave() {
    document.querySelectorAll('.save-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const icon = btn.querySelector('i');
            const isSaved = btn.classList.toggle('saved');
            icon.className = isSaved ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark';
        });
    });
}

// ============================================
// Comentários
// ============================================
function setupComments() {
    document.querySelectorAll('.comment-form').forEach(form => {
        const input = form.querySelector('input');
        const button = form.querySelector('button');

        input.addEventListener('input', () => {
            button.style.opacity = input.value.trim() ? '1' : '0.5';
        });

        button.addEventListener('click', () => {
            if (input.value.trim()) {
                alert(`💬 Comentário publicado: "${input.value}"`);
                input.value = '';
                button.style.opacity = '0.5';
            }
        });

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') button.click();
        });
    });
}

// ============================================
// Pesquisa
// ============================================
function setupSearch() {
    const search = document.getElementById('search');
    search.addEventListener('input', (e) => {
        console.log('Pesquisando por:', e.target.value);
    });
}

// ============================================
// Inicialização
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    renderStories();
    renderSuggestions();
    setupLikes();
    setupSave();
    setupComments();
    setupSearch();
    console.log('✨ InstaClone carregado com sucesso!');
});