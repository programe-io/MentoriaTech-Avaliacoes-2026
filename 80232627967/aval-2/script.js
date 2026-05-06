// Espera o carregamento da página
document.addEventListener("DOMContentLoaded", () => {

    // ===== DARK MODE =====
    const botaoDark = document.createElement("button");
    botaoDark.innerText = "🌙 Dark Mode";
    botaoDark.style.position = "fixed";
    botaoDark.style.top = "10px";
    botaoDark.style.right = "10px";

    document.body.appendChild(botaoDark);

    botaoDark.addEventListener("click", () => {
        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
            botaoDark.innerText = "☀️ Light Mode";
        } else {
            botaoDark.innerText = "🌙 Dark Mode";
        }
    });

    // ===== MENU RESPONSIVO =====
    const nav = document.querySelector("nav");
    const menuBtn = document.createElement("button");
    menuBtn.innerText = "☰ Menu";
    menuBtn.style.display = "none";

    document.querySelector("header").appendChild(menuBtn);

    function ajustarMenu() {
        if (window.innerWidth < 600) {
            menuBtn.style.display = "block";
            nav.style.display = "none";
        } else {
            menuBtn.style.display = "none";
            nav.style.display = "block";
        }
    }

    ajustarMenu();
    window.addEventListener("resize", ajustarMenu);

    menuBtn.addEventListener("click", () => {
        if (nav.style.display === "none") {
            nav.style.display = "block";
        } else {
            nav.style.display = "none";
        }
    });

    // ===== ANIMAÇÃO NOS CARDS =====
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            card.style.transform = "scale(1.05)";
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "scale(1)";
        });
    });

});