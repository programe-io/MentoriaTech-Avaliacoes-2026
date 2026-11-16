
// Mensagem de boas-vindas
window.addEventListener("load", () => {
    console.log("Bem-vindo ao KATSEYE WORLD! 💗");
});

// Animação ao aparecer na tela
const elementos = document.querySelectorAll(".card, .music, .gallery img");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, {
    threshold: 0.15
});

elementos.forEach(elemento => {
    elemento.classList.add("hidden");
    observer.observe(elemento);
});

// Efeito de coração
document.addEventListener("click", (event) => {
    const heart = document.createElement("span");

    heart.innerHTML = "♡";
    heart.classList.add("heart");

    heart.style.left = event.clientX + "px";
    heart.style.top = event.clientY + "px";

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 1000);
});
