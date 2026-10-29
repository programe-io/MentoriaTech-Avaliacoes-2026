// ELEMENTOS EXISTENTES (FEED)
const likeBtn = document.getElementById('like-btn');
const likesNumber = document.getElementById('likes-number');
const commentInput = document.getElementById('comment-input');
const postCommentBtn = document.getElementById('post-comment-btn');
const commentsList = document.getElementById('comments-list');

let isLiked = false;
let currentLikes = parseInt(likesNumber.innerText);

likeBtn.addEventListener('click', () => {
    isLiked = !isLiked;
    if (isLiked) {
        likeBtn.innerHTML = '<i class="fa-solid fa-heart"></i>';
        currentLikes++;
    } else {
        likeBtn.innerHTML = '<i class="fa-regular fa-heart"></i>';
        currentLikes--;
    }
    likesNumber.innerText = currentLikes;
});

function addComment() {
    const commentText = commentInput.value.trim();
    if (commentText !== "") {
        const commentItem = document.createElement('div');
        commentItem.classList.add('comment-item');
        commentItem.innerHTML = `<p><span class="username">voce_comentou</span> ${commentText}</p>`;
        commentsList.appendChild(commentItem);
        commentInput.value = "";
    }
}
postCommentBtn.addEventListener('click', addComment);
commentInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') addComment(); });


// --- SISTEMA DE NAVEGAÇÃO ENTRE ABAS ---
const navHome = document.getElementById('nav-home');
const navReels = document.getElementById('nav-reels');
const feedSection = document.getElementById('feed-section');
const reelsSection = document.getElementById('reels-section');
const allVideos = document.querySelectorAll('.reel-card video');

// Ir para os Reels
navReels.addEventListener('click', (e) => {
    e.preventDefault();
    navHome.classList.remove('active');
    navReels.classList.add('active');
    feedSection.classList.add('hidden');
    reelsSection.classList.remove('hidden');
    
    // Dá play no primeiro vídeo ao entrar na aba
    if(allVideos.length > 0) allVideos[0].play();
});

// Voltar para a Página Inicial (Feed)
navHome.addEventListener('click', (e) => {
    e.preventDefault();
    navReels.classList.remove('active');
    navHome.classList.add('active');
    reelsSection.classList.add('hidden');
    feedSection.classList.remove('hidden');
    
    // Pausa todos os vídeos dos Reels ao sair da aba
    allVideos.forEach(video => video.pause());
});


// --- INTERAÇÕES DOS REELS ---

// 1. Clique no vídeo para Pausar / Dar Play
allVideos.forEach(video => {
    video.addEventListener('click', () => {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    });
});

// 2. Curtir os Reels de forma independente
const reelLikeButtons = document.querySelectorAll('.like-reel');
reelLikeButtons.forEach(btn => {
    let liked = false;
    btn.addEventListener('click', () => {
        liked = !liked;
        const icon = btn.querySelector('i');
        const countSpan = btn.querySelector('span');
        let currentCount = parseInt(countSpan.innerText);

        if (liked) {
            icon.className = 'fa-solid fa-heart';
            countSpan.innerText = currentCount + 1 + "K";
        } else {
            icon.className = 'fa-regular fa-heart';
            countSpan.innerText = currentCount - 1 + "K";
        }
    });
});

// 3. Controle Automático de Play/Pause baseado no Scroll (Rolagem)
const reelsContainer = document.querySelector('.reels-container');
reelsContainer.addEventListener('scroll', () => {
    allVideos.forEach(video => {
        const rect = video.getBoundingClientRect();
        // Verifica se o vídeo está centralizado verticalmente na tela
        const isVisible = (rect.top >= 0 && rect.bottom <= window.innerHeight);
        
        if (isVisible && !reelsSection.classList.contains('hidden')) {
            video.play();
        } else {
            video.pause();
        }
    });
});
