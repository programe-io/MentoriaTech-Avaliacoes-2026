// Mensagem de boas-vindas
window.onload = function () {
    alert("🎮 Bem-vindo ao Game Zone!");
    };

    // Efeito ao clicar nos cards
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        card.addEventListener("click", () => {
                alert("Você selecionou: " + card.querySelector("h2").textContent);
                    });
                    });