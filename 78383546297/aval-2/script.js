```javascript
// ===============================
// CARRINHO DE COMPRAS
// ===============================

let carrinho = [];


// ADICIONAR PRODUTO

function addCarrinho(nome, preco) {

    carrinho.push({
        nome: nome,
        preco: preco
    });

    atualizarCarrinho();

    alert(
        nome + " foi adicionado ao carrinho! 💖"
    );
}


// ATUALIZAR CARRINHO

function atualizarCarrinho() {

    const contador =
        document.getElementById("count");

    contador.textContent =
        carrinho.length;


    const produtos =
        document.getElementById("cartItems");


    // Carrinho vazio

    if (carrinho.length === 0) {

        produtos.innerHTML =
            "<p>Seu carrinho está vazio.</p>";

    }

    // Carrinho com produtos

    else {

        produtos.innerHTML =
            carrinho.map((produto, indice) => {

                return `
                    <div class="cart-item">

                        <span>
                            ${produto.nome}
                        </span>

                        <b>
                            R$
                            ${produto.preco
                                .toFixed(2)
                                .replace(".", ",")}

                            <button
                                onclick="removerProduto(${indice})"
                                style="
                                    border:none;
                                    background:none;
                                    cursor:pointer;
                                "
                            >
                                ❌
                            </button>

                        </b>

                    </div>
                `;

            }).join("");
    }


    // CALCULAR TOTAL

    const total =
        carrinho.reduce(
            function(soma, produto) {

                return soma + produto.preco;

            },
            0
        );


    document.getElementById("total").textContent =
        total.toFixed(2).replace(".", ",");
}


// REMOVER PRODUTO

function removerProduto(indice) {

    carrinho.splice(indice, 1);

    atualizarCarrinho();
}


// ABRIR CARRINHO

function abrirCarrinho() {

    document.getElementById("modal").style.display =
        "flex";

    atualizarCarrinho();
}


// FECHAR CARRINHO

function fecharCarrinho() {

    document.getElementById("modal").style.display =
        "none";
}


// FINALIZAR PEDIDO

function finalizarPedido() {

    if (carrinho.length === 0) {

        alert(
            "Seu carrinho está vazio."
        );

        return;
    }


    alert(
        "Pedido recebido! 💖\n\n" +
        "Entre em contato pelo WhatsApp " +
        "para confirmar o pagamento e a entrega."
    );
}


// FORMULÁRIO DE CONTATO

function enviarMensagem(event) {

    event.preventDefault();

    alert(
        "Mensagem enviada com sucesso! 💌"
    );

    event.target.reset();
}
```
