
"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const themeButton = document.getElementById("themeButton");
    const infoButton = document.getElementById("infoButton");
    const fact = document.getElementById("fact");

    // Verificar se os elementos necessários existem
    if (!themeButton || !infoButton || !fact) {
        console.error("Erro: não foi possível encontrar os elementos HTML.");
        return;
    }

    // Alternar entre tema escuro e claro
    themeButton.addEventListener("click", () => {
        const isLight = document.body.classList.toggle("light");

        themeButton.textContent = isLight ? "🌙" : "☀️";
        themeButton.setAttribute(
            "aria-label",
            isLight ? "Ativar tema escuro" : "Ativar tema claro"
        );
    });

    // Curiosidades sobre a internet
    const facts = [
        "A World Wide Web foi inventada por Tim Berners-Lee em 1989.",
        "A internet conecta redes de computadores do mundo inteiro.",
        "HTML estrutura páginas, CSS estiliza e JavaScript adiciona interatividade.",
        "O DNS ajuda a transformar nomes de domínio em endereços IP."
    ];

    let lastFact = -1;

    infoButton.addEventListener("click", () => {
        let nextFact = Math.floor(Math.random() * facts.length);

        // Evita repetir a curiosidade anterior
        if (facts.length > 1) {
            while (nextFact === lastFact) {
                nextFact = Math.floor(Math.random() * facts.length);
            }
        }

        lastFact = nextFact;
        fact.textContent = "💡 " + facts[nextFact];
    });
});
