function mostrarMensagem() {
    alert("Salve! Bem-vindo ao blog do Alex 😎🔥");
}

/* Efeito de scroll suave */
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));
        target.scrollIntoView({
            behavior: "smooth"
        });
    });
});

/* Efeito dinâmico nos posts */
const posts = document.querySelectorAll(".post");

posts.forEach(post => {
    post.addEventListener("mouseover", () => {
        post.style.background = "rgba(0,255,136,0.2)";
    });

    post.addEventListener("mouseout", () => {
        post.style.background = "rgba(255,255,255,0.05)";
    });
});