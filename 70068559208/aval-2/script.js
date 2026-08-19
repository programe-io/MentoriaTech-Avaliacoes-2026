// Função para curtir / descurtir o post
function toggleLike(button) {
    const icon = button.querySelector('i');
    const likesContainer = button.closest('.post').querySelector('.likes-count span');
    let currentLikes = parseInt(likesContainer.innerText.replace('.', ''));

    if (button.classList.contains('active')) {
        button.classList.remove('active');
        icon.classList.replace('fa-solid', 'fa-regular');
        currentLikes--;
    } else {
        button.classList.add('active');
        icon.classList.replace('fa-regular', 'fa-solid');
        currentLikes++;
    }

    // Formata o número com ponto para milhares
    likesContainer.innerText = currentLikes.toLocaleString('pt-BR');
}

// Função para adicionar comentários dinamicamente
function addComment(button) {
    const postFooter = button.parentElement;
    const input = postFooter.querySelector('.comment-input');
    const commentText = input.value.trim();
    const commentsList = postFooter.parentElement.querySelector('.comments-list');

    if (commentText !== "") {
        const newComment = document.createElement('p');
        newComment.innerHTML = `<strong>voce</strong> ${commentText}`;
        commentsList.appendChild(newComment);
        
        // Limpa o campo de texto
        input.value = "";
    }
}
