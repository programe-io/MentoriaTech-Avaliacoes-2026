document.addEventListener("DOMContentLoaded", function () {

    // Mensagem de boas-vindas
    alert("🌼 Bem-vindo ao Explorando Flores Silvestres!");

    // Cria um botão para mostrar uma mensagem
    const botao = document.createElement("button");

    botao.textContent = "🌱 Explorar a natureza";
    botao.style.padding = "12px 20px";
    botao.style.marginTop = "20px";
    botao.style.border = "none";
    botao.style.borderRadius = "8px";
    botao.style.backgroundColor = "#356b3d";
    botao.style.color = "white";
    botao.style.cursor = "pointer";

    const inicio = document.querySelector(".inicio");
    inicio.appendChild(botao);

    // Ação do botão
    botao.addEventListener("click", function () {
        alert(
            "🌻 Observe as flores sem arrancá-las, não deixe lixo na natureza e respeite o ambiente!"
        );
    });

    // Interação com os cards das flores
    const cards = document.querySelectorAll(".card");

    cards.forEach(function (card) {

        card.addEventListener("click", function () {

            const nomeFlor = card.querySelector("h3").textContent;

            alert(
                "Você está explorando: " + nomeFlor + " 🌼"
            );
        });

    });

});