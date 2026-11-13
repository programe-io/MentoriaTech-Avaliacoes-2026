const modal = document.getElementById('post-modal');
const modalImg = document.getElementById('modal-img');
const modalCaptionText = document.getElementById('modal-caption-text');
const modalLikes = document.getElementById('modal-likes');
const modalViews = document.getElementById('modal-views');
const modalCommentsContainer = document.getElementById('modal-comments-container');
const modalCommentInput = document.getElementById('modal-comment-input');
const modalCommentBtn = document.getElementById('modal-comment-btn');

function openModal(imgSrc, caption, likes, views) {
    modal.style.display = 'flex';
    modalImg.src = imgSrc;
    modalCaptionText.innerHTML = `<strong>paisagens.paradisiacas</strong> ${caption}`;
    modalLikes.textContent = `❤️ ${likes} curtidas`;
    modalViews.textContent = `👁️ ${views} visualizações`;
}

function closeModal() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}

function addModalComment() {
    const text = modalCommentInput.value.trim();
    if (text !== '') {
        const newC = document.createElement('div');
        newC.classList.add('comment');
        newC.innerHTML = `<strong>paisagens.paradisiacas</strong> ${text}`;
        modalCommentsContainer.appendChild(newC);
        modalCommentInput.value = '';
        modalCommentsContainer.scrollTop = modalCommentsContainer.scrollHeight;
    }
}

modalCommentBtn.addEventListener('click', addModalComment);
modalCommentInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addModalComment();
    }
});