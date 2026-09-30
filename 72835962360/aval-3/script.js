// MENU MOBILE

const menuButton = document.getElementById("menu-btn");
const navLinks = document.querySelector(".nav-links");

menuButton.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    if (navLinks.classList.contains("active")) {
        menuButton.textContent = "✕";
    } else {
        menuButton.textContent = "☰";
    }
});


// FECHAR MENU AO CLICAR EM UM LINK

const links = document.querySelectorAll(".nav-links a");

links.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuButton.textContent = "☰";
    });
});


// FRASES

const quotes = [
    "OH? VOCÊ ESTÁ SE APROXIMANDO DE MIM?",
    "MUDA MUDA MUDA MUDA!",
    "ORA ORA ORA ORA!",
    "DORARARARARARA!",
    "WRYYYYYYYY!",
    "YARE YARE DAZE...",
    "GOOD GRIEF...",
    "NÃO EXISTE DESTINO QUE NÃO POSSA SER ALTERADO."
];

const quoteElement = document.getElementById("quote");
const quoteButton = document.getElementById("quote-btn");

quoteButton.addEventListener("click", () => {

    const randomIndex =
        Math.floor(Math.random() * quotes.length);

    quoteElement.style.opacity = "0";

    setTimeout(() => {

        quoteElement.textContent =
            `"${quotes[randomIndex]}"`;

        quoteElement.style.opacity = "1";

    }, 250);
});


// ANIMAÇÃO DOS CARDS

const cards = document.querySelectorAll(
    ".card, .character, .stand-card"
);

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform =
                    "translateY(0)";

            }

        });

    },
    {
        threshold: 0.15
    }
);


cards.forEach(card => {

    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition =
        "opacity 0.6s ease, transform 0.6s ease";

    observer.observe(card);

});