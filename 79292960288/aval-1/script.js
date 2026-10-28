
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Fechar menu" : "Abrir menu"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Fecha o menu depois de clicar em um link
document.querySelectorAll("#navMenu a").forEach((link) => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
        menuToggle.textContent = "☰";
    });
});

// Curiosidades aleatórias
const curiosidades = [
    "Toji não possui energia amaldiçoada devido à sua Restrição Celestial.",
    "Ele é o pai de Megumi Fushiguro.",
    "Toji ficou conhecido como o Assassino de Feiticeiros.",
    "Seus sentidos físicos são fundamentais para seu estilo de combate.",
    "Ele pertence originalmente à família Zenin."
];

const surpriseBtn = document.getElementById("surpriseBtn");
const surpriseText = document.getElementById("surpriseText");

surpriseBtn.addEventListener("click", () => {
    const atual = surpriseText.dataset.index;
    let indice;

    do {
        indice = Math.floor(Math.random() * curiosidades.length);
    } while (curiosidades.length > 1 && String(indice) === atual);

    surpriseText.dataset.index = indice;
    surpriseText.textContent = "⚡ " + curiosidades[indice];
});

// Animação de entrada das seções
const sections = document.querySelectorAll(".section");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.animate(
                    [
                        { opacity: 0.5, transform: "translateY(18px)" },
                        { opacity: 1, transform: "translateY(0)" }
                    ],
                    {
                        duration: 500,
                        easing: "ease-out",
                        fill: "both"
                    }
                );

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    sections.forEach((section) => observer.observe(section));
}
