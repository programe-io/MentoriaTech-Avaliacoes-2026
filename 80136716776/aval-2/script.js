// Seleciona todos os botões de curtir da página
const likeButtons = document.querySelectorAll('.btn-like');

// Adiciona a funcionalidade de clique para cada um deles
likeButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Encontra o contador de texto dentro do botão clicado
        const countSpan = this.querySelector('.like-count');
        let currentLikes = parseInt(countSpan.textContent);
        
        // Aumenta o número de curtidas
        currentLikes++;
        countSpan.textContent = currentLikes;
        
        // Efeito visual rápido de clique
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);
    });
});
