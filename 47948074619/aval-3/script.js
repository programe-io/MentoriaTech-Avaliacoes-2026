// Curtir publicação
document.querySelectorAll(".like").forEach((button) => {
    button.addEventListener("click", () => {
        button.classList.toggle("active");

        button.textContent =
            button.classList.contains("active") ? "❤️" : "♡";
    });
});

// Seguir perfil
document.querySelectorAll(".follow").forEach((button) => {
    button.addEventListener("click", () => {
        const seguindo = button.textContent === "Seguindo";

        button.textContent = seguindo ? "Seguir" : "Seguindo";
    });
});

// Visualizar stories
document.querySelectorAll(".story").forEach((story) => {
    story.addEventListener("click", () => {
        const nome = story.querySelector("span").textContent;

        alert("Você está visualizando o story de " + nome);
    });
});

// Compartilhar publicação
document.querySelectorAll(".share").forEach((button) => {
    button.addEventListener("click", async () => {
        const dados = {
            title: "Instagram Clone",
            text: "Confira esta publicação!"
        };

        if (navigator.share) {
            await navigator.share(dados);
        } else {
            alert("Compartilhamento não disponível neste navegador.");
        }
    });
});