// Adiciona interatividade aos botões de curtida do blog
document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll(".btn-like");

    buttons.forEach(button => {
        button.addEventListener("click", function() {
            const countSpan = this.querySelector(".like-count");
            let currentLikes = parseInt(countSpan.textContent);
            
            // Incrementa o contador de curtidas
            countSpan.textContent = currentLikes + 1;
            
            // Pequeno efeito visual ao clicar
            this.style.transform = "scale(1.15)";
            setTimeout(() => {
                this.style.transform = "scale(1.05)";
            }, 100);
        });
    });
});