document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".nav-link");
    const posts = document.querySelectorAll(".feed-post");

    // 1. Monitoramento da Rolagem da Tela para o Sumário (Trending Topics)
    function destacarTrending() {
        let index = posts.length;

        while(--index && window.scrollY + 130 < posts[index].offsetTop) {}
        
        links.forEach((link) => link.classList.remove("active"));
        if(links[index]) {
            links[index].classList.add("active");
        }
    }

    window.addEventListener("scroll", destacarTrending);
    destacarTrending();

    // 2. Sistema de Likes Interativo (Estilo Rede Social)
    const likeButtons = document.querySelectorAll(".btn-like");

    likeButtons.forEach(button => {
        button.addEventListener("click", () => {
            const countElement = button.querySelector(".like-count");
            let currentLikes = parseInt(countElement.textContent);

            if(button.classList.contains("liked")) {
                button.classList.remove("liked");
                countElement.textContent = currentLikes - 1;
            } else {
                button.classList.add("liked");
                countElement.textContent = currentLikes + 1;
            }
        });
    });
});
