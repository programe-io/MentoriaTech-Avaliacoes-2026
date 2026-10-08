```javascript
let carrinho = [];
let total = 0;

// ADICIONAR PRODUTO
function adicionarCarrinho(nome, preco) {

    carrinho.push({
        nome: nome,
        preco: preco
    });

    total += preco;

    atualizarCarrinho();

    alert(nome + " foi adicionado ao carrinho!");
}

// ATUALIZAR CARRINHO
function atualizarCarrinho() {

    const lista = document.getElementById("listaCarrinho");
    const contador = document.getElementById("contador");
    const totalElemento = document.getElementById("total");

    contador.textContent = carrinho.length;

    if (carrinho.length === 0) {

        lista.innerHTML = "<p>Seu carrinho está vazio.</p>";

    } else {

        lista.innerHTML = "";

        carrinho.forEach((produto, index) => {

            const item = document.createElement("div");

            item.classList.add("item-carrinho");

            item.innerHTML = `
                <span>
                    ${produto.nome} -
                    R$ ${produto.preco.toFixed(2).replace(".", ",")}
                </span>

                <button
                    class="remover"
                    onclick="removerProduto(${index})">
                    Remover
                </button>
            `;

            lista.appendChild(item);
        });
    }

    totalElemento.textContent =
        total.toFixed(2).replace(".", ",");
}

// REMOVER PRODUTO
function removerProduto(index) {

    total -= carrinho[index].preco;

    carrinho.splice(index, 1);

    atualizarCarrinho();
}

// PROMOÇÃO
function mostrarPromocao() {

    alert(
        "🔥 Promoção especial!\n\n" +
        "Use o cupom LUXE30 e ganhe até 30% OFF em peças selecionadas!"
    );
}

// FINALIZAR COMPRA
function finalizarCompra() {

    if (carrinho.length === 0) {

        alert("Seu carrinho está vazio!");

        return;
    }

    alert(
        "Compra realizada com sucesso! 💎\n\n" +
        "Total: R$ " +
        total.toFixed(2).replace(".", ",") +
        "\n\nObrigado por comprar na LUXE JOIAS!"
    );

    carrinho = [];
    total = 0;

    atualizarCarrinho();
}
```
