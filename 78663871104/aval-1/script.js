const playButton = document.getElementById("playButton");
const mineButton = document.getElementById("mineButton");
const message = document.getElementById("message");


// Botão começar aventura

playButton.addEventListener("click", () => {

    document.getElementById("blocos").scrollIntoView({
        behavior: "smooth"
    });

});


// Sistema de mineração

let blocksMined = 0;

mineButton.addEventListener("click", () => {

    blocksMined++;

    const messages = [
        "Você encontrou pedra! ⛏️",
        "Você encontrou carvão! 🪨",
        "Você encontrou ferro! ⚙️",
        "Você encontrou ouro! 🟨",
        "VOCÊ ENCONTROU DIAMANTE! 💎"
    ];

    let randomMessage =
        messages[Math.floor(Math.random() * messages.length)];

    message.textContent =
        randomMessage + ` | Blocos minerados: ${blocksMined}`;

    mineButton.textContent = "⛏️ MINERAR NOVAMENTE";

});


// Clique nos blocos

const cards = document.querySelectorAll(".block-card");

cards.forEach(card => {

    card.addEventListener("click", () => {

        const blockName = card.dataset.block;

        message.textContent =
            `Você selecionou o bloco: ${blockName}! 🟩`;

        document.getElementById("aventura").scrollIntoView({
            behavior: "smooth"
        });

    });

});