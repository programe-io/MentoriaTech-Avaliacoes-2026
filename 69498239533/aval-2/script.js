```javascript
// Aguarda o carregamento da página
document.addEventListener("DOMContentLoaded", function () {

    // Seleciona elementos
    const botao = document.querySelector("button");
    const titulo = document.querySelector("h2");
    const texto = document.querySelector("article p");
    const imagem = document.querySelector("img");
    const menu = document.querySelectorAll("nav a");

    // Mensagem inicial
    console.log("Projeto carregado com sucesso!");

    // Evento do botão
    botao.addEventListener("click", function () {

        titulo.textContent = "Conteúdo Atualizado";

        texto.textContent =
            "O JavaScript executou alterações na página com sucesso.";

        imagem.src =
            "https://via.placeholder.com/400x250/0066cc/ffffff";

        imagem.alt =
            "Imagem atualizada";

        alert("Botão clicado com sucesso!");

    });

    // Evento do menu
    menu.forEach(function(item){

        item.addEventListener("mouseover", function(){

            item.style.color = "#ffff66";

        });

        item.addEventListener("mouseout", function(){

            item.style.color = "white";

        });

    });

});
```
