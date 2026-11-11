// Selecionando os elementos de interação do post
const postImages = document.querySelectorAll('.post-img-container');
const likeBtns = document.querySelectorAll('.like-btn');
const bookmarkBtns = document.querySelectorAll('.bookmark-btn');

// Lógica de Curtir (Like) pelo ícone de Coração abaixo do post
likeBtns.forEach((btn) => {
    btn.addEventListener('click', function() {
        // Encontra o contador de curtidas
        const likeCountElement = this.closest('.post-footer').querySelector('.like-count');
        
        // Remove os pontos para converter em número (ex: 1.243 -> 1243)
        let count = parseInt(likeCountElement.innerText.replace('.', ''));

        // Alterna entre classes sólido (curtido) e regular (não curtido)
        if (this.classList.contains('fa-regular')) {
            this.classList.remove('fa-regular');
            this.classList.add('fa-solid', 'liked');
            count++;
        } else {
            this.classList.remove('fa-solid', 'liked');
            this.classList.add('fa-regular');
            count--;
        }
        
        // Atualiza o texto formatando de volta
        likeCountElement.innerText = count.toLocaleString('pt-BR');
    });
});

// Lógica do Duplo Clique na Imagem para Curtir
postImages.forEach((imgContainer) => {
    imgContainer.addEventListener('dblclick', function() {
        const heartAnim = this.querySelector('.double-click-heart');
        const footerLikeBtn = this.closest('.post').querySelector('.like-btn');
        
        // Exibe a animação do coração na imagem
        heartAnim.classList.add('active');
        
        // Se a foto ainda não estiver curtida, curte ela
        if (footerLikeBtn.classList.contains('fa-regular')) {
            footerLikeBtn.click(); // Simula um clique no botão de curtir normal
        }

        // Esconde o coração animado após 800ms
        setTimeout(() => {
            heartAnim.classList.remove('active');
        }, 800);
    });
});

// Lógica para Salvar (Bookmark) o post
bookmarkBtns.forEach((btn) => {
    btn.addEventListener('click', function() {
        if (this.classList.contains('fa-regular')) {
            this.classList.remove('fa-regular');
            this.classList.add('fa-solid'); // Ícone preenchido
        } else {
            this.classList.remove('fa-solid');
            this.classList.add('fa-regular'); // Ícone vazio
        }
    });
});