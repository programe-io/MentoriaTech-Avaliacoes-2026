
// MENU MOBILE

const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

menuBtn.addEventListener("click", () => {
    navbar.classList.toggle("active");
});

document.querySelectorAll("#navbar a").forEach(link => {
    link.addEventListener("click", () => {
        navbar.classList.remove("active");
    });
});


// PESQUISA DOS JOGOS

const search = document.getElementById("search");

search.addEventListener("input", () => {

    const value = search.value.toLowerCase();

    document.querySelectorAll(".game-card").forEach(card => {

        const name = card.dataset.name;

        card.style.display =
            name.includes(value) ? "block" : "none";

    });

});


// MODAL DOS JOGOS

const modal = document.getElementById("modal");

document.querySelectorAll(".info-btn").forEach(button => {

    button.addEventListener("click", () => {

        document.getElementById("modalTitle").textContent =
            button.dataset.title;

        document.getElementById("modalInfo").textContent =
            button.dataset.info;

        modal.style.display = "flex";

    });

});

document.getElementById("close").addEventListener("click", () => {
    modal.style.display = "none";
});

modal.addEventListener("click", event => {

    if (event.target === modal) {
        modal.style.display = "none";
    }

});

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        modal.style.display = "none";
    }

});


// CURIOSIDADES

const curiosities = [

    "Resident Evil foi lançado originalmente em 1996.",

    "Leon Kennedy apareceu pela primeira vez em Resident Evil 2.",

    "Raccoon City é um dos cenários mais importantes da franquia.",

    "A Umbrella Corporation é uma organização fictícia central na história.",

    "Albert Wesker é um dos antagonistas mais conhecidos da franquia.",

    "Resident Evil 7 introduziu a perspectiva em primeira pessoa na série principal."

];

document.getElementById("factBtn").addEventListener("click", () => {

    const random = Math.floor(
        Math.random() * curiosities.length
    );

    document.getElementById("fact").textContent =
        curiosities[random];

});


// QUIZ INTERATIVO

document.querySelectorAll(".answers button").forEach(button => {

    button.addEventListener("click", () => {

        const result = document.getElementById("result");

        if (button.dataset.answer === "correct") {

            result.textContent =
                "VOCÊ SOBREVIVEU! Parabéns, sobrevivente!";

            result.style.color = "#00ff88";

        } else {

            result.textContent =
                "GAME OVER! Tente novamente.";

            result.style.color = "#ff304c";

        }

    });

});


// ANIMAÇÃO AO ROLAR A PÁGINA

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

        }

    });

}, {
    threshold: 0.15
});

document.querySelectorAll(
    ".game-card, .character-card, .history-content"
).forEach(element => {

    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "all .7s";

    observer.observe(element);

});

const animationStyle = document.createElement("style");

animationStyle.textContent = `
    .visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;

document.head.appendChild(animationStyle);
