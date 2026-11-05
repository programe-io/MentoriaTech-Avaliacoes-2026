document.addEventListener("DOMContentLoaded", () => {
    const likeBtn = document.getElementById("like-btn");
    const likeCount = document.getElementById("like-count");
    let count = 0;

    // Sistema de curtidas simples com contador dinâmico
    likeBtn.addEventListener("click", () => {
        count++;
        likeCount.textContent = count;
        
        // Efeito visual rápido de pulso ao clicar
        likeBtn.style.transform = "scale(1.1)";
        setTimeout(() => {
            likeBtn.style.transform = "scale(1)";
        }, 100);
    });
});
