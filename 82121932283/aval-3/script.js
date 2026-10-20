
const menuBtn = document.getElementById("menuBtn");
const nav = document.querySelector("nav");
const toast = document.getElementById("toast");

// Abrir e fechar o menu no celular
menuBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");

    menuBtn.textContent = isOpen ? "✕" : "☰";
    menuBtn.setAttribute("aria-expanded", String(isOpen));
});

// Fechar o menu depois de clicar em um link
document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuBtn.textContent = "☰";
        menuBtn.setAttribute("aria-expanded", "false");
    });
});

// Mensagem ao selecionar um perfume
let toastTimer;

document.querySelectorAll(".buy-btn").forEach((button) => {
    button.addEventListener("click", () => {
        const product = button.dataset.product;

        toast.textContent =
            `${product}: uma fragrância exclusiva da VELÛRE.`;

        toast.classList.add("show");

        clearTimeout(toastTimer);

        toastTimer = setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    });
});

// Efeito de entrada suave nas seções
const sections = document.querySelectorAll(
    ".hero-content, .hero-image, .product, .about"
);

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12
    });

    sections.forEach((section) => {
        section.classList.add("reveal");
        observer.observe(section);
    });
}
