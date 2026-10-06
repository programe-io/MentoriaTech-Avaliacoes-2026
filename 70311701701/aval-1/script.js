```javascript
// ===============================
// MENU MOBILE
// ===============================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});


// ===============================
// FECHAR MENU AO CLICAR
// ===============================

const links = document.querySelectorAll(".nav-links a");

links.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});


// ===============================
// BOTÃO DE CONTATO
// ===============================

const contactBtn = document.getElementById("contactBtn");

contactBtn.addEventListener("click", () => {
    alert(
        "Obrigado pelo interesse! Entre em contato para começar a planejar sua viagem."
    );
});


// ===============================
// ANIMAÇÃO AO APARECER NA TELA
// ===============================

const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    },
    {
        threshold: 0.2
    }
);

cards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "0.6s ease";

    observer.observe(card);
});
```
