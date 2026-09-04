// Funcionalidade de Curtir (Like)
const likeButtons = document.querySelectorAll('.like-btn');

likeButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const postFooter = this.closest('.post-footer');
        const countSpan = postFooter.querySelector('.count');
        let currentLikes = parseInt(countSpan.textContent.replace('.', ''));

        if (this.classList.contains('fa-regular')) {
            // Curtiu
            this.classList.remove('fa-regular');
            this.classList.add('fa-solid');
            currentLikes += 1;
        } else {
            // Descurtiu
            this.classList.remove('fa-solid');
            this.classList.add('fa-regular');
            currentLikes -= 1;
        }
        countSpan.textContent = currentLikes.toLocaleString('pt-BR');
    });
});

// Funcionalidade de Salvar Publicação (Bookmark)
const saveButtons = document.querySelectorAll('.save-btn');

saveButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        if (this.classList.contains('fa-regular')) {
            this.classList.remove('fa-regular');
            this.classList.add('fa-solid');
        } else {
            this.classList.remove('fa-solid');
            this.classList.add('fa-regular');
        }
    });
});

// Dinâmica dos Comentários (Habilitar botão e inserir comentário)
const commentInputs = document.querySelectorAll('.add-comment input');

commentInputs.forEach(input => {
    const postContainer = input.closest('.post-footer');
    const postBtn = postContainer.querySelector('.post-comment-btn');
    const commentList = postContainer.querySelector('.comment-list');

    // Monitora digitação para ativar o botão 'Publicar'
    input.addEventListener('input', function() {
        if (this.value.trim().length > 0) {
            postBtn.classList.add('active');
        } else {
            postBtn.classList.remove('active');
        }
    });

    // Ação ao clicar em Publicar
    postBtn.addEventListener('click', function() {
        if (input.value.trim() === '') return;

        const newComment = document.createElement('p');
        newComment.innerHTML = `<strong>você_atual</strong> ${input.value}`;
        commentList.appendChild(newComment);

        input.value = '';
        postBtn.classList.remove('active');
    });
});