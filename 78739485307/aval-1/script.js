
// MENU PARA CELULAR
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active");

    menuToggle.textContent =
        nav.classList.contains("active") ? "✕" : "☰";
});

// FECHAR MENU AO CLICAR EM UM LINK
document.querySelectorAll("#nav a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("active");
        menuToggle.textContent = "☰";
    });
});

// CHECKLIST E BARRA DE PROGRESSO
const checkboxes = document.querySelectorAll(
    '.tasks input[type="checkbox"]'
);

const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");

function updateProgress() {
    const total = checkboxes.length;

    const completed = document.querySelectorAll(
        '.tasks input[type="checkbox"]:checked'
    ).length;

    const percentage = Math.round((completed / total) * 100);

    progressBar.style.width = percentage + "%";

    progressText.textContent =
        percentage + "% concluído (" +
        completed + " de " + total + " etapas)";

    checkboxes.forEach(checkbox => {
        const label = checkbox.closest("label");

        if (checkbox.checked) {
            label.classList.add("completed");
        } else {
            label.classList.remove("completed");
        }
    });

    if (percentage === 100) {
        progressText.textContent =
            "🏆 PARABÉNS! VOCÊ COMPLETOU SUA JORNADA!";
    }
}

checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", updateProgress);
});

// ANO AUTOMÁTICO NO RODAPÉ
document.getElementById("year").textContent =
    new Date().getFullYear();

// ANIMAÇÃO DE ENTRADA DAS SEÇÕES
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12
});

document.querySelectorAll(".section, .final-section").forEach(section => {
    section.style.opacity = "0";
    section.style.transform = "translateY(25px)";
    section.style.transition = "opacity .7s ease, transform .7s ease";

    observer.observe(section);
});

// CLASSE DE ANIMAÇÃO
const style = document.createElement("style");

style.textContent = `
    .section.visible,
    .final-section.visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;

document.head.appendChild(style);
