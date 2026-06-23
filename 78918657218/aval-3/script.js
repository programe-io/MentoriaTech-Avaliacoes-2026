```javascript
// Variável para armazenar a quantidade de produtos
let carrinho = 0;

// Função para adicionar produto ao carrinho
function adicionarAoCarrinho() {
    carrinho++;

    document.getElementById("quantidade").innerHTML =
        "Itens no carrinho: " + carrinho;

    alert("Produto adicionado ao carrinho!");
}

// Função para finalizar compra
function finalizarCompra() {
    if (carrinho > 0) {
        alert("Compra realizada com sucesso!");
        carrinho = 0;

        document.getElementById("quantidade").innerHTML =
            "Itens no carrinho: 0";
    } else {
        alert("Seu carrinho está vazio!");
    }
}
```

