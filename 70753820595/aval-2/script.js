```javascript
let quantidade = 0;
let produtos = [];

function adicionarCarrinho(nomeProduto) {
    quantidade++;

    produtos.push(nomeProduto);

    document.getElementById("contador").innerHTML =
        "Você adicionou <strong>" + quantidade +
        "</strong> produto(s) ao carrinho.<br><br>" +
        produtos.join("<br>");

    alert(nomeProduto + " foi adicionado ao carrinho! 🛍️");
}

function mostrarMensagem() {
    alert("Bem-vindo à Fashion Store! 👗✨");
}
```
