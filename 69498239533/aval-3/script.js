```javascript id="lojajs2026"
// Aguarda carregar toda a página
document.addEventListener("DOMContentLoaded", function () {

    // Seleção dos elementos
    const botaoComprar = document.querySelector("button");
    const titulo = document.querySelector(".produto h2");
    const preco = document.querySelector(".preco");
    const imagem = document.querySelector("img");
    const menu = document.querySelectorAll("nav a");

    // Cria contador do carrinho
    let carrinho = 0;

    // Área para exibir compras
    const contador = document.createElement("p");
    contador.textContent = "Carrinho: 0 item";
    contador.style.marginTop = "15px";

    document.querySelector("article")
        .appendChild(contador);

    // Evento do botão comprar
    botaoComprar.addEventListener("click", function () {

        carrinho++;

        contador.textContent =
            `Carrinho: ${carrinho} item(s)`;

        titulo.textContent =
            "Produto Adicionado";

        preco.textContent =
            "Preço atualizado: R$ 179,90";

        imagem.style.transform =
            "scale(1.05)";

        imagem.style.transition =
            "0.4s";

        alert("Produto adicionado ao carrinho!");

    });

    // Efeito no menu
    menu.forEach(function (item) {

        item.addEventListener("mouseover", function () {

            item.style.opacity = "0.7";

        });

        item.addEventListener("mouseout", function () {

            item.style.opacity = "1";

        });

    });

    // Mensagem no console
    console.log("Loja carregada com sucesso.");

});
```
