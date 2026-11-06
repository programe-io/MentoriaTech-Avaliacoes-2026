document.addEventListener("DOMContentLoaded", () => {
    const followBtn = document.getElementById("js-follow-btn");

    // Lógica Interativa do Botão Seguir/Seguindo
    if (followBtn) {
        followBtn.addEventListener("click", () => {
            if (followBtn.classList.contains("following")) {
                followBtn.classList.remove("following");
                followBtn.textContent = "Seguir";
                followBtn.style.backgroundColor = "var(--insta-blue)";
            } else {
                followBtn.classList.add("following");
                followBtn.textContent = "Seguindo";
                followBtn.style.backgroundColor = "#363636";
            }
        });
    }

    // Adiciona interatividade de clique nos posts simulando um "Like" rápido
    const posts = document.querySelectorAll(".grid-post");
    posts.forEach(post => {
        post.addEventListener("dblclick", () => {
            // Animação visual ou alerta simples simulando a curtida dupla da rede social
            const heartAnimation = document.createElement("div");
            heartAnimation.innerHTML = "❤️";
            heartAnimation.style.position = "absolute";
            heartAnimation.style.top = "50%";
            heartAnimation.style.left = "50%";
            heartAnimation.style.transform = "translate(-50%, -50%) scale(2)";
            heartAnimation.style.fontSize = "3rem";
            heartAnimation.style.transition = "all 0.4s ease";
            heartAnimation.style.zIndex = "10";
            
            post.appendChild(heartAnimation);
            
            setTimeout(() => {
                heartAnimation.style.opacity = "0";
                heartAnimation.style.transform = "translate(-50%, -50%) scale(0)";
                setTimeout(() => heartAnimation.remove(), 400);
            }, 500);
        });
    });
});
