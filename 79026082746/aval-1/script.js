
function mostrarMensagem() {
    alert("🏎️ VTEC? Não! Aqui é 2JZ! Bem-vindo ao mundo Supra!");
    }

    // Efeito de entrada nos cards
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        card.addEventListener("click", () => {
                const modelo = card.querySelector("h3").textContent;

                        alert("Você selecionou: " + modelo);
                            });
                            });
                            