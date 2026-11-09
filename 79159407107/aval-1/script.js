document.addEventListener("DOMContentLoaded", () => {
    // Sistema interativo de Likes do Blog
    const likeBtn = document.getElementById("likeBtn");
    const likeCount = document.getElementById("likeCount");
    let count = 42;

    likeBtn.addEventListener("click", () => {
        count++;
        likeCount.textContent = count;
        
        // Efeito visual rápido de pulo estilo desenho animado
        likeBtn.style.transform = "scale(1.2) rotate(-5deg)";
        setTimeout(() => {
            likeBtn.style.transform = "scale(1) rotate(0deg)";
        }, 150);
    });

    // Animação rústica ao enviar comentário
    const form = document.querySelector(".comment-form");
    form.addEventListener("submit", (e) => {
        alert("🍞 Osmar diz: Comentário enviado para a fila da torradeira!");
        form.reset();
    });
});
