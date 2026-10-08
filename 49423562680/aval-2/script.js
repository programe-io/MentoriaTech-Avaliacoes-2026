// ===== Estado da Aplicação =====
const state = {
    likedPosts: new Set(),
    savedPosts: new Set(),
    followingUsers: new Set(),
    theme: localStorage.getItem('theme') || 'light'
};

// ===== Inicialização =====
document.addEventListener('DOMContentLoaded', () => {
    applyTheme(state.theme);
    initLikeButtons();
    initSaveButtons();
    initFollowButtons();
    initThemeToggle();
    initStories();
    initDoubleTapLike();
    console.log('✨ InstaClone carregado com sucesso!');
});

// ===== Sistema de Temas =====
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const toggleBtn = document.getElementById('themeToggle');
    if (toggleBtn) {
        toggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

function initThemeToggle() {
    const toggleBtn = document.getElementById('themeToggle');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
        state.theme = state.theme === 'light' ? 'dark' : 'light';
        applyTheme(state.theme);
        localStorage.setItem('theme', state.theme);
    });
}

// ===== Sistema de Curtidas =====
function initLikeButtons() {
    const likeButtons = document.querySelectorAll('.like-btn');

    likeButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            toggleLike(btn, index);
        });
    });
}

function toggleLike(btn, postIndex) {
    const icon = btn.querySelector('.icon');
    const post = btn.closest('.post');
    const likesCount = post.querySelector('.likes-count strong');
    const currentLikes = parseInt(likesCount.textContent.replace(/\./g, ''));

    if (state.likedPosts.has(postIndex)) {
        // Descurtir
        state.likedPosts.delete(postIndex);
        btn.classList.remove('liked');
        icon.textContent = '🤍';
        likesCount.textContent = formatNumber(currentLikes - 1);
    } else {
        // Curtir
        state.likedPosts.add(postIndex);
        btn.classList.add('liked');
        icon.textContent = '❤️';
        likesCount.textContent = formatNumber(currentLikes + 1);
    }
}

// ===== Duplo Clique na Imagem para Curtir =====
function initDoubleTapLike() {
    const postImages = document.querySelectorAll('.post-image');

    postImages.forEach((imgContainer, index) => {
        let lastTap = 0;

        imgContainer.addEventListener('click', (e) => {
            const currentTime = new Date().getTime();
            const tapLength = currentTime - lastTap;

            if (tapLength < 300 && tapLength > 0) {
                // Duplo clique detectado
                if (!state.likedPosts.has(index)) {
                    const likeBtn = imgContainer.closest('.post').querySelector('.like-btn');
                    toggleLike(likeBtn, index);
                }
                showHeartAnimation(imgContainer);
            } else {
                lastTap = currentTime;
            }
        });
    });
}

function showHeartAnimation(container) {
    const heart = document.createElement('div');
    heart.textContent = '❤️';
    heart.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        font-size: 6rem;
        pointer-events: none;
        z-index: 10;
        animation: heartPop 0.8s ease-out forwards;
    `;

    container.style.position = 'relative';
    container.appendChild(heart);

    // Adiciona a animação se ainda não existir
    if (!document.getElementById('heart-style')) {
        const style = document.createElement('style');
        style.id = 'heart-style';
        style.textContent = `
            @keyframes heartPop {
                0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
                30% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
                60% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    setTimeout(() => heart.remove(), 800);
}

// ===== Sistema de Salvar =====
function initSaveButtons() {
    const saveButtons = document.querySelectorAll('.save-btn');

    saveButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            toggleSave(btn, index);
        });
    });
}

function toggleSave(btn, postIndex) {
    if (state.savedPosts.has(postIndex)) {
        state.savedPosts.delete(postIndex);
        btn.classList.remove('saved');
        btn.textContent = '🔖';
    } else {
        state.savedPosts.add(postIndex);
        btn.classList.add('saved');
        btn.textContent = '📑';
    }
}

// ===== Sistema de Seguir =====
function initFollowButtons() {
    const followButtons = document.querySelectorAll('.follow-btn');

    followButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const username = btn.closest('li').querySelector('strong').textContent;

            if (state.followingUsers.has(username)) {
                state.followingUsers.delete(username);
                btn.textContent = 'Seguir';
                btn.classList.remove('following');
            } else {
                state.followingUsers.add(username);
                btn.textContent = 'Seguindo';
                btn.classList.add('following');
            }
        });
    });
}

// ===== Stories =====
function initStories() {
    const stories = document.querySelectorAll('.story-item');

    stories.forEach((story) => {
        story.addEventListener('click', () => {
            const username = story.querySelector('span')?.textContent || 'usuário';
            if (story.classList.contains('story-add')) {
                showNotification('📸 Abrir câmera para criar story...');
            } else {
                showNotification(`👁️ Visualizando story de ${username}`);
                story.querySelector('.story-ring').style.background = 'var(--border-color)';
            }
        });
    });
}

// ===== Utilitários =====
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%);
        background-color: var(--text-primary);
        color: var(--bg-secondary);
        padding: 0.875rem 1.5rem;
        border-radius: 8px;
        font-size: 0.875rem;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        animation: slideUp 0.3s ease-out;
    `;

    if (!document.getElementById('notification-style')) {
        const style = document.createElement('style');
        style.id = 'notification-style';
        style.textContent = `
            @keyframes slideUp {
                from { transform: translateX(-50%) translateY(20px); opacity: 0; }
                to { transform: translateX(-50%) translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s';
        setTimeout(() => notification.remove(), 300);
    }, 2500);
}

// ===== Botões de Ação Adicionais =====
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('comment-btn')) {
        showNotification('💬 Abrindo comentários...');
    }
    if (e.target.classList.contains('share-btn')) {
        showNotification('📤 Link copiado para a área de transferência!');
    }
    if (e.target.classList.contains('more-options')) {
        showNotification('⚙️ Opções da publicação');
    }
});