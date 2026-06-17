function mostrarMensagem() {
    alert("🎮 Jogar videogame é um hobby divertido que ajuda a desenvolver criatividade, raciocínio e trabalho em equipe!");
}

const cards = document.querySelectorAll(".card");

cards.forEach(card => {
    card.addEventListener("click", () => {
        const jogo = card.querySelector("h3").textContent;
        alert("Você clicou em: " + jogo);
    });
});