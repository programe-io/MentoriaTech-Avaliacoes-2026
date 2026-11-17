
const menuBtn = document.getElementById("menuBtn");
const nav = document.querySelector("nav");

// Menu para celular
menuBtn.addEventListener("click", () => {
    nav.classList.toggle("active");
});

// Fechar menu ao clicar em um link
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("active");
    });
});

// Animação dos cards ao aparecer na tela
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, {
    threshold: 0.2
});

document.querySelectorAll(".card, .news article").forEach(item => {
    item.style.opacity = "0";
    item.style.transform = "translateY(30px)";
    item.style.transition = "all .7s ease";

    observer.observe(item);
});
