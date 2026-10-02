```javascript
// ================================
// CARRINHO DE COMPRAS
// ================================

let carrinho = [];

let total = 0;


// ================================
// ADICIONAR PRODUTO
// ================================

function adicionar(nome, preco) {

    carrinho.push({
        nome: nome,
        preco: preco
    });

    total += preco;

    atualizarCarrinho();

    alert(
        nome +
        " foi adicionado ao carrinho! 🛒"
    );
}


// ================================
// ATUALIZAR CARRINHO
// ================================

function atualizarCarrinho() {

    const lista =
        document.getElementById("lista");

    lista.innerHTML = "";


    carrinho.forEach(
        (item, index) => {

            lista.innerHTML += `
                <div class="item-carrinho">

                    <span>
                        ${item.nome}
                    </span>

                    <strong>
                        R$ ${item.preco
                            .toFixed(2)
                            .replace(".", ",")}
                    </strong>

                </div>
            `;
        }
    );


    document.getElementById("total")
        .textContent =
        total
            .toFixed(2)
            .replace(".", ",");


    document.getElementById("quantidade")
        .textContent =
        carrinho.length;
}


// ================================
// ABRIR / FECHAR CARRINHO
// ================================

function abrirCarrinho() {

    const carrinhoBox =
        document.getElementById("carrinho");


    if (
        carrinhoBox.style.display === "block"
    ) {

        carrinhoBox.style.display =
            "none";

    } else {

        carrinhoBox.style.display =
            "block";
    }
}


// ================================
// FINALIZAR COMPRA
// ================================

function finalizarCompra() {

    if (carrinho.length === 0) {

        alert(
            "Seu carrinho está vazio! 🛒"
        );

        return;
    }


    let mensagem =
        "Olá! Gostaria de comprar:%0A%0A";


    carrinho.forEach(
        (item) => {

            mensagem +=
                "• " +
                item.nome +
                " - R$ " +
                item.preco
                    .toFixed(2) +
                "%0A";
        }
    );


    mensagem +=
        "%0ATotal: R$ " +
        total.toFixed(2);


    // WhatsApp da loja
    window.open(
        "https://wa.me/5586999999999?text=" +
        mensagem,
        "_blank"
    );
}
```
