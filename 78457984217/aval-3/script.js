document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".destination-card");

    cards.forEach(card => {
        const button = card.querySelector(".explore-btn");
        // Captura o preço guardado no atributo HTML "data-price"
        const price = card.getAttribute("data-price");

        button.addEventListener("click", () => {
            // Altera o texto do botão para exibir o preço da viagem espacial
            button.textContent = `Orçamento: ${price}`;
            button.style.backgroundColor = "#818cf8"; // Cor roxa de ativo
            button.style.color = "#ffffff";
            
            // Efeito sonoro/visual simulado desativando cliques repetidos
            button.style.pointerEvents = "none";
        });
    });
});
