document.addEventListener('DOMContentLoaded', () => {

    // 1. SEGUIR / DEIXAR DE SEGUIR
    const btnFollow = document.getElementById('btn-follow');
    const followersCount = document.getElementById('followers-count');

    btnFollow.addEventListener('click', () => {
        if (btnFollow.classList.contains('following')) {
            btnFollow.classList.remove('following');
            btnFollow.textContent = 'Seguir';
            followersCount.textContent = '128k';
        } else {
            btnFollow.classList.add('following');
            btnFollow.textContent = 'A seguir';
            followersCount.textContent = '128.1k';
        }
    });

    // 2. ALTERNAR ABAS (POSTS VS REELS)
    const tabButtons = document.querySelectorAll('.tab-btn');
    const feedPosts = document.getElementById('feed-posts');
    const feedReels = document.getElementById('feed-reels');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const targetTab = btn.getAttribute('data-tab');
            if (targetTab === 'posts') {
                feedPosts.classList.remove('hidden');
                feedReels.classList.add('hidden');
            } else {
                feedPosts.classList.add('hidden');
                feedReels.classList.remove('hidden');
            }
        });
    });

    // 3. BASE DE DADOS DOS POSTS
    const postsData = {
        "1": { emoji: "📸", likes: 4500, comments: ["<strong>amigo1</strong> Que foto espetacular! 🔥", "<strong>creative_mind</strong> Adorei o ângulo."] },
        "2": { emoji: "🎨", likes: 8200, comments: ["<strong>design_hub</strong> Cores fantásticas.", "<strong>maria.designer</strong> Super inspirador!"] },
        "3": { emoji: "🚀", likes: 5900, comments: ["<strong>tech_guru</strong> Rumo ao topo!", "<strong>ana_silva</strong> Excelente conteúdo."] }
    };

    // 4. VISUALIZAR POSTS (MODAL)
    const gridItems = document.querySelectorAll('#feed-posts .grid-item');
    const postModal = document.getElementById('post-modal');
    const closePost = document.getElementById('close-post');
    const modalImage = document.getElementById('modal-image-placeholder');
    const modalLikes = document.getElementById('modal-likes-display');
    const modalCommentsList = document.getElementById('modal-comments-list');
    let activePostId = null;

    gridItems.forEach(item => {
        item.addEventListener('click', () => {
            activePostId = item.getAttribute('data-id');
            const data = postsData[activePostId];

            modalImage.textContent = data.emoji;
            modalLikes.textContent = data.likes.toLocaleString();
            modalCommentsList.innerHTML = data.comments.map(c => `<p>${c}</p>`).join('');

            postModal.classList.remove('hidden');
        });
    });

    closePost.addEventListener('click', () => postModal.classList.add('hidden'));

    // 5. DAR LIKE NO MODAL
    const btnModalLike = document.getElementById('btn-modal-like');
    btnModalLike.addEventListener('click', () => {
        if(activePostId) {
            postsData[activePostId].likes += 1;
            modalLikes.textContent = postsData[activePostId].likes.toLocaleString();
            document.querySelector(`[data-id="${activePostId}"] .like-num`).textContent = postsData[activePostId].likes.toLocaleString();
        }
    });

    // 6. ADICIONAR COMENTÁRIOS NO MODAL
    const inputComment = document.getElementById('input-comment');
    const btnSubmitComment = document.getElementById('btn-submit-comment');

    btnSubmitComment.addEventListener('click', () => {
        const text = inputComment.value.trim();
        if(text && activePostId) {
            const formattedComment = `<strong>tu</strong> ${escapeHTML(text)}`;
            postsData[activePostId].comments.push(formattedComment);
            
            const p = document.createElement('p');
            p.innerHTML = formattedComment;
            modalCommentsList.appendChild(p);
            
            const commentNumSpan = document.querySelector(`[data-id="${activePostId}"] .comment-num`);
            commentNumSpan.textContent = parseInt(commentNumSpan.textContent) + 1;

            inputComment.value = '';
        }
    });

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag));
    }

    // 7. SISTEMA AUTOMÁTICO DE STORIES
    const storyTrigger = document.getElementById('story-trigger');
    const storyModal = document.getElementById('story-modal');
    const closeStory = document.getElementById('close-story');
    const progressFill = document.getElementById('story-progress');
    const storyContentText = document.getElementById('story-content-text');
    let progressTimer = null;

    const storiesTexts = [
        "Bom dia! Novo projeto a começar hoje... 🛠️",
        "Café obrigatório antes de abrir o editor de código. ☕",
        "O que gostariam de ver no próximo Reels? Deixem sugestões! 👇"
    ];
    let currentStoryIdx = 0;

    function openStory() {
        storyModal.classList.remove('hidden');
        currentStoryIdx = 0;
        playStorySequence();
    }

    function playStorySequence() {
        if(currentStoryIdx >= storiesTexts.length) {
            closeStoryModal();
            return;
        }

        storyContentText.textContent = storiesTexts[currentStoryIdx];
        let width = 0;
        progressFill.style.width = '0%';
        clearInterval(progressTimer);
        
        progressTimer = setInterval(() => {
            width += 1;
            progressFill.style.width = width + '%';
            if (width >= 100) {
                clearInterval(progressTimer);
                currentStoryIdx++;
                playStorySequence();
            }
        }, 35); // Transição total de ~3.5 segundos por Story
    }

    function closeStoryModal() {
        storyModal.classList.add('hidden');
        clearInterval(progressTimer);
        progressFill.style.width = '0%';
    }

    storyTrigger.addEventListener('click', openStory);
    closeStory.addEventListener('click', closeStoryModal);

    // Destaques estáticos inferiores
    document.querySelectorAll('.highlight-item').forEach((item) => {
        item.addEventListener('click', () => {
            storyModal.classList.remove('hidden');
            storyContentText.textContent = `A abrir arquivo da categoria: [${item.innerText}] 📂`;
            progressFill.style.width = '100%';
            clearInterval(progressTimer);
        });
    });
});
