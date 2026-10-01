```javascript
// ========================================
// BLOG DA MIRANDA - INTERCÂMBIO NA FRANÇA
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    // Mensagem de boas-vindas no console
    console.log("🇫🇷 Blog da Miranda carregado com sucesso!");

    // ========================================
    // BOTÃO DE CURIOSIDADE
    // ========================================

    const botao = document.createElement("button");

    botao.textContent = "🥐 Ver curiosidade sobre a França";

    botao.style.display = "block";
    botao.style.margin = "25px auto";
    botao.style.padding = "12px 20px";
    botao.style.backgroundColor = "#1f4e79";
    botao.style.color = "white";
    botao.style.border = "none";
    botao.style.borderRadius = "8px";
    botao.style.cursor = "pointer";
    botao.style.fontSize = "16px";

    const inicio = document.querySelector("#inicio");

    if (inicio) {
        inicio.appendChild(botao);
    }

    // Quando o botão for clicado
    botao.addEventListener("click", function () {

        alert(
            "🇫🇷 Curiosidade!\n\n" +
            "A França é conhecida por sua culinária, " +
            "seus museus, sua arquitetura e sua grande " +
            "importância histórica e cultural."
        );

    });


    // ========================================
    // DESTAQUE DOS ARTIGOS
    // ========================================

    const artigos = document.querySelectorAll("article");

    artigos.forEach(function (artigo) {

        artigo.addEventListener("mouseenter", function () {
            artigo.style.transform = "scale(1.02)";
            artigo.style.transition = "0.3s";
            artigo.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.15)";
        });

        artigo.addEventListener("mouseleave", function () {
            artigo.style.transform = "scale(1)";
            artigo.style.boxShadow = "none";
        });

    });


    // ========================================
    // MENSAGEM AO CLICAR NAS DICAS
    // ========================================

    const dicas = document.querySelectorAll("#dicas li");

    dicas.forEach(function (dica) {

        dica.addEventListener("click", function () {

            dica.style.color = "#d64b5c";
            dica.style.fontWeight = "bold";

        });

    });

});
```
