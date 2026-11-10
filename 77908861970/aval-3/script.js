
const facts = [
    "Os Stands aparecem pela primeira vez em Stardust Crusaders.",

    "O nome de muitos Stands faz referência a músicas, bandas ou artistas.",

    "As habilidades dos Stands variam bastante: força, velocidade, estratégia e poderes especiais."
];

const button = document.querySelector("#standButton");
const output = document.querySelector("#standFact");

let current = -1;

button.addEventListener("click", () => {

    current = (current + 1) % facts.length;

    output.textContent = facts[current];

});
