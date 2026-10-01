```javascript
// Aguarda o carregamento completo da página
document.addEventListener("DOMContentLoaded", function () {

    // Seleciona todos os cards das anomalias
    const cards = document.querySelectorAll(".card");

    // Adiciona uma ação para cada card
    cards.forEach(function (card) {

        card.addEventListener("click", function () {

            // Pega o nome da anomalia
            const nome = card.querySelector("h3").textContent;

            // Pega o status
            const status = card.querySelector(".status").textContent;

            // Mostra as informações
            alert(
                "🔎 ARQUIVO DE INVESTIGAÇÃO\n\n" +
                "Anomalia: " + nome + "\n" +
                "Status: " + status + "\n\n" +
                "Este registro está sendo analisado."
            );

        });

    });


    // Mensagem de boas-vindas
    console.log("🐾 Arquivo das Anomalias Animais carregado.");


    // Cria um botão de investigação
    const botao = document.createElement("button");

    botao.textContent = "🔎 Iniciar investigação";

    // Estilo do botão
    botao.style.backgroundColor = "#45634b";
    botao.style.color = "white";
    botao.style.border = "none";
    botao.style.padding = "12px 20px";
    botao.style.borderRadius = "6px";
    botao.style.cursor = "pointer";
    botao.style.marginTop = "20px";
    botao.style.fontSize = "16px";


    // Coloca o botão na seção inicial
    const inicio = document.querySelector(".inicio");

    if (inicio) {
        inicio.appendChild(botao);
    }


    // Ação do botão
    botao.addEventListener("click", function () {

        alert(
            "📁 INVESTIGAÇÃO INICIADA\n\n" +
            "Explore os registros disponíveis e analise cada anomalia."
        );

    });

});
```
