```javascript
// ==========================================
// CARRINHO
// ==========================================

let carrinho = [];


// ==========================================
// ADICIONAR PRODUTO
// ==========================================

function adicionarCarrinho(nome, preco) {

    const produtoExistente =
        carrinho.find(
            produto => produto.nome === nome
        );


    if (produtoExistente) {

        produtoExistente.quantidade++;

    } else {

        carrinho.push({

            nome: nome,

            preco: preco,

            quantidade: 1

        });

    }


    atualizarCarrinho();

    mostrarNotificacao(
        nome + " foi adicionado ao carrinho! 🛒"
    );

}



// ==========================================
// ATUALIZAR CARRINHO
// ==========================================

function atualizarCarrinho() {

    const cartItems =
        document.getElementById("cartItems");


    const cartCount =
        document.getElementById("cartCount");


    const cartTotal =
        document.getElementById("cartTotal");


    // Limpar carrinho
    cartItems.innerHTML = "";


    // Contar produtos
    let quantidadeTotal = 0;

    let total = 0;


    carrinho.forEach(
        produto => {

            quantidadeTotal +=
                produto.quantidade;


            total +=
                produto.preco *
                produto.quantidade;


            const item =
                document.createElement("div");


            item.className =
                "cart-item";


            item.innerHTML = `

                <div>

                    <h4>
                        ${produto.nome}
                    </h4>

                    <p>
                        ${produto.quantidade}x
                        R$ ${produto.preco
                            .toFixed(2)
                            .replace(".", ",")}
                    </p>

                </div>


                <button
                    class="remove-item"
                    onclick="removerProduto('${produto.nome}')"
                >
                    Remover
                </button>

            `;


            cartItems.appendChild(item);

        }
    );


    // Carrinho vazio

    if (carrinho.length === 0) {

        cartItems.innerHTML = `

            <p class="empty-cart">
                Seu carrinho está vazio.
            </p>

        `;

    }


    // Atualizar contador

    cartCount.innerText =
        quantidadeTotal;


    // Atualizar total

    cartTotal.innerText =
        "R$ " +
        total
            .toFixed(2)
            .replace(".", ",");
}



// ==========================================
// REMOVER PRODUTO
// ==========================================

function removerProduto(nome) {

    carrinho =
        carrinho.filter(
            produto =>
                produto.nome !== nome
        );


    atualizarCarrinho();

}



// ==========================================
// ABRIR CARRINHO
// ==========================================

function abrirCarrinho() {

    document
        .getElementById("cartOverlay")
        .classList.add("show");

}



// ==========================================
// FECHAR CARRINHO
// ==========================================

function fecharCarrinho(event) {

    if (
        event &&
        event.target !== event.currentTarget
    ) {
        return;
    }


    document
        .getElementById("cartOverlay")
        .classList.remove("show");

}



// ==========================================
// FINALIZAR COMPRA
// ==========================================

function finalizarCompra() {

    if (carrinho.length === 0) {

        alert(
            "Seu carrinho está vazio! 🛒"
        );
```
