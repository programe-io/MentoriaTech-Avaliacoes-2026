document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".nav-link");
    const posts = document.querySelectorAll(".insta-post");

    // 1. Destaque inteligente baseado no scroll da tela
    function rastrearFeedScroll() {
        let index = posts.length;

        while(--index && window.scrollY + 120 < posts[index].offsetTop) {}
        
        links.forEach((link) => link.classList.remove("active"));
        if(links[index]) {
            links[index].classList.add("active");
        }
    }

    window.addEventListener("scroll", rastrearFeedScroll);
    rastrearFeedScroll();

    // 2. Sistema de curtidas de clique direto (Ativa o filtro de cor)
    const likeBtns = document.querySelectorAll(".btn-like");
    likeBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            btn.classList.toggle("active-liked");
        });
    });
});
