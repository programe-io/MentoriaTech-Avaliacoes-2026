// Capturando os elementos do DOM
const commentInput = document.getElementById('comment-input');
const commentBtn = document.getElementById('comment-btn');
const commentsContainer = document.getElementById('comments-container');
const commentsCountLabel = document.getElementById('comments-count-label');
const likeBtn = document.getElementById('like-btn');
const likesCount = document.getElementById('likes-count');
const focusCommentBtn = document.getElementById('focus-comment-btn');
const postImgContainer = document.getElementById('post-img-container');
const bigHeart = document.getElementById('big-heart');
// Contadores iniciais
let liked = false;
let currentLikes = 12485;
let totalComments = 8;

// Formata números com ponto de milhar (ex: 12.486)
function formatNumber(num) {
    return num.toLocaleString('pt-BR');
}

// Função para adicionar novo comentário
function addComment() {
    const commentText = commentInput.value.trim();
    
    if (commentText !== '') {
        const newComment = document.createElement('div');
        newComment.classList.add('comment');
        newComment.innerHTML = `<strong>paisagens.paradisiacas</strong> ${commentText}`;
        
        commentsContainer.appendChild(newComment);
        
        totalComments++;
        commentsCountLabel.textContent = `Ver todos os ${totalComments} comentários`;
        
        commentInput.value = '';
        commentsContainer.scrollTop = commentsContainer.scrollHeight;
    }
}

// Publicar comentário ao clicar ou apertar Enter
commentBtn.addEventListener('click', addComment);

commentInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addComment();
    }
});

// Focar na caixa de comentário ao clicar no ícone 💬
focusCommentBtn.addEventListener('click', () => {
    commentInput.focus();
});

// Função de curtir/descurtir
function toggleLike(forceLike = false) {
    if (forceLike && liked) return; // Se já estiver curtido e der duplo clique, mantém curtido

    liked = !liked;
    
    if (liked) {
        likeBtn.textContent = '❤️';
        currentLikes++;
        likeBtn.style.transform = 'scale(1.3)';
    } else {
        likeBtn.textContent = '🤍';
        currentLikes--;
        likeBtn.style.transform = 'scale(1)';
    }
    
    likesCount.textContent = `${formatNumber(currentLikes)} curtidas`;
    
    setTimeout(() => {
        likeBtn.style.transform = 'scale(1)';
    }, 200);
}

// Clique no botão de coração
likeBtn.addEventListener('click', () => toggleLike(false));

// Duplo clique na foto para curtir com animação
postImgContainer.addEventListener('dblclick', () => {
    toggleLike(true);
    
    bigHeart.classList.add('show');
    setTimeout(() => {
        bigHeart.classList.remove('show');
    }, 700);
});