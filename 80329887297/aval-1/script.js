// Aguarda o carregamento do documento
document.addEventListener("DOMContentLoaded", () => {
    
    // Seleciona todos os botões de curtir
    const likeButtons = document.querySelectorAll(".btn-like");

    likeButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Seleciona o contador de curtidas dentro do botão clicado
            const likeCountSpan = button.querySelector(".like-count");
            
            // Obtém o número atual e soma 1
            let currentLikes = parseInt(likeCountSpan.textContent);
            currentLikes++;
            
            // Atualiza o texto exibido
            likeCountSpan.textContent = currentLikes;
            
            // Efeito visual rápido de clique
            button.style.transform = "scale(0.95)";
            setTimeout(() => {
                button.style.transform = "scale(1)";
            }, 100);
        });
    });
    
});