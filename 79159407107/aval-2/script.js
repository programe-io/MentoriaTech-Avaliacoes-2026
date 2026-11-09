document.addEventListener("DOMContentLoaded", () => {
    
    // Sistema Avançado de Interação de Likes Individuais do Mini Feed
    const likeButtons = document.querySelectorAll(".action-btn-like");

    likeButtons.forEach(button => {
        button.addEventListener("click", () => {
            const labelNum = button.querySelector(".like-number");
            let currentLikes = parseInt(labelNum.textContent, 10);
            
            // Incrementa o valor
            currentLikes++;
            labelNum.textContent = currentLikes;
            
            // Dispara um efeito visual pop estilo cartoon
            button.style.backgroundColor = "#FF007A";
            button.style.color = "#FFFFFF";
            button.style.transform = "scale(1.1) rotate(-4deg)";
            
            setTimeout(() => {
                button.style.backgroundColor = "#FFFFFF";
                button.style.color = "#000000";
                button.style.transform = "scale(1) rotate(0deg)";
            }, 200);
        });
    });

    // Simulação de clique nos botões de filtro lateral
    const filtros = document.querySelectorAll(".filter-btn");
    filtros.forEach(f => {
        f.addEventListener("click", () => {
            filtros.forEach(btn => btn.classList.remove("active"));
            f.classList.add("active");
            
            // Feedback estético ao trocar de filtro
            const feed = document.querySelector(".mini-feed");
            feed.style.opacity = "0.5";
            setTimeout(() => {
                feed.style.opacity = "1";
            }, 100);
        });
    });
});
