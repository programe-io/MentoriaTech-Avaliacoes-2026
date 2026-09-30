/* ==========================================
   MENU MOBILE
========================================== */

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {

    nav.classList.toggle("active");

    if (nav.classList.contains("active")) {
        menuToggle.textContent = "✕";
    } else {
        menuToggle.textContent = "☰";
    }

});


/* Fecha o menu ao clicar em um link */

const navLinks = document.querySelectorAll(".nav a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("active");

        menuToggle.textContent = "☰";

    });

});


/* ==========================================
   DARK MODE
========================================== */

const themeButton = document.getElementById("themeButton");

themeButton.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const darkMode =
        document.body.classList.contains("dark");

    if (darkMode) {

        themeButton.textContent = "☀️";

        localStorage.setItem("theme", "dark");

    } else {

        themeButton.textContent = "🌙";

        localStorage.setItem("theme", "light");

    }

});


/* Recupera tema salvo */

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark");

    themeButton.textContent = "☀️";

}


/* ==========================================
   MODAL DE PERSONAGENS
========================================== */

const characterCards =
    document.querySelectorAll(".character-card");

const modal =
    document.getElementById("modal");

const modalClose =
    document.getElementById("modalClose");

const modalTitle =
    document.getElementById("modalTitle");

const modalDescription =
    document.getElementById("modalDescription");

const modalIcon =
    document.getElementById("modalIcon");

const modalButton =
    document.getElementById("modalButton");


characterCards.forEach(card => {

    card.addEventListener("click", () => {

        const name =
            card.dataset.name;

        const description =
            card.dataset.description;

        const icon =
            card.querySelector(".character-avatar").textContent;

        modalTitle.textContent = name;

        modalDescription.textContent = description;

        modalIcon.textContent = icon;

        modal.classList.add("active");

        document.body.style.overflow = "hidden";

    });

});


/* Fechar modal */

function closeModal() {

    modal.classList.remove("active");

    document.body.style.overflow = "";

}

modalClose.addEventListener("click", closeModal);

modalButton.addEventListener("click", closeModal);


/* Fechar clicando fora */

modal.addEventListener("click", event => {

    if (event.target === modal) {

        closeModal();

    }

});


/* Fechar com ESC */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        closeModal();

    }

});


/* ==========================================
   BOTÃO SURPRESA
========================================== */

const surpriseButton =
    document.getElementById("surpriseButton");

const surprises = [

    "🍍 Você encontrou a casa do Bob Esponja!",

    "⭐ Patrick apareceu de repente!",

    "🦀 O Sr. Siriguejo está contando moedas!",

    "🐿️ Sandy está preparando um novo experimento!",

    "🐙 Lula Molusco quer tocar clarinete!",

    "🦠 Plankton está planejando alguma coisa!",

    "🍔 Um hambúrguer de siri acabou de sair da cozinha!"

];


surpriseButton.addEventListener("click", () => {

    const randomIndex =
        Math.floor(Math.random() * surprises.length);

    alert(surprises[randomIndex]);

});


/* ==========================================
   CURIOSIDADES
========================================== */

const factButton =
    document.getElementById("factButton");

const factText =
    document.getElementById("factText");


const facts = [

    "🧽 Bob Esponja trabalha como cozinheiro no Siri Cascudo.",

    "⭐ Patrick é um dos melhores amigos do Bob Esponja.",

    "🍍 A casa do Bob tem o formato de um abacaxi.",

    "🐌 Gary é o animal de estimação do Bob Esponja.",

    "🐿️ Sandy é uma esquila que vive em uma cúpula submarina.",

    "🦀 O Sr. Siriguejo é dono do Siri Cascudo.",

    "🦠 Plankton é dono do Balde de Lixo."

];


let currentFact = 0;


factButton.addEventListener("click", () => {

    currentFact++;

    if (currentFact >= facts.length) {
        currentFact = 0;
    }

    factText.style.opacity = "0";

    setTimeout(() => {

        factText.textContent =
            facts[currentFact];

        factText.style.opacity = "1";

    }, 200);

});


/* ==========================================
   LOCAIS
========================================== */

const locationCards =
    document.querySelectorAll(".location-card");


locationCards.forEach(card => {

    card.addEventListener("click", () => {

        const location =
            card.dataset.location;

        alert(
            `🌊 Você está explorando: ${location}!`
        );

    });

});


/* ==========================================
   FORMULÁRIO
========================================== */

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


contactForm.addEventListener("submit", event => {

    event.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const message =
        document.getElementById("message").value.trim();


    if (!name || !email || !message) {

        formMessage.textContent =
            "⚠️ Preencha todos os campos.";

        formMessage.style.color = "#d62828";

        return;

    }


    formMessage.textContent =
        `🌊 Obrigado, ${name}! Sua mensagem foi enviada com sucesso.`;

    formMessage.style.color = "#168b43";


    contactForm.reset();

});


/* ==========================================
   ANO AUTOMÁTICO
========================================== */

const year =
    document.getElementById("year");

year.textContent =
    new Date().getFullYear();


/* ==========================================
   ANIMAÇÃO DE ENTRADA
========================================== */

const animatedElements =
    document.querySelectorAll(
        ".about-card, .character-card, .location-card"
    );


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );


animatedElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(30px)";

    element.style.transition =
        "opacity 0.6s ease, transform 0.6s ease";

    observer.observe(element);

});