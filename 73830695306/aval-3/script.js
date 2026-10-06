// ===============================
// CARRINHO DE COMPRAS
// ===============================

let carrinho = [];


// ===============================
// ADICIONAR PRODUTO
// ===============================

function adicionarCarrinho(nome, preco) {

    carrinho.push({
        nome: nome,
        preco: preco
    });

    atualizarCarrinho();

    alert(
        nome + " foi adicionado ao carrinho!"
    );
}


// ===============================
// ATUALIZAR CARRINHO
// ===============================

function atualizarCarrinho() {

    const lista =
        document.getElementById(
            "listaCarrinho"
        );

    const quantidade =
        document.getElementById(
            "quantidadeCarrinho"
        );

    const total =
        document.getElementById(
            "totalCarrinho"
        );


    // Atualiza quantidade

    quantidade.textContent =
        carrinho.length;


    // Limpa a lista

    lista.innerHTML = "";


    // Carrinho vazio

    if (carrinho.length === 0) {

        lista.innerHTML =
            "<p>Seu carrinho está vazio.</p>";

        total.textContent =
            "R$ 0,00";

        return;
    }


    let valorTotal = 0;


    // Mostra produtos

    carrinho.forEach(
        (produto, indice) => {

            valorTotal +=
                produto.preco;


            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "item-carrinho";


            item.innerHTML = `

                <span>
                    <strong>
                        ${produto.nome}
                    </strong>

                    -
                    R$ ${formatarPreco(
                        produto.preco
                    )}
                </span>

                <button
                    class="remover"
                    onclick="removerProduto(
                        ${indice}
                    )"
                >
                    Remover
                </button>

            `;


            lista.appendChild(item);

        }
    );


    // Atualiza total

    total.textContent =
        "R$ " +
        formatarPreco(valorTotal);
}


// ===============================
// REMOVER PRODUTO
// ===============================

function removerProduto(indice) {

    carrinho.splice(
        indice,
        1
    );

    atualizarCarrinho();
}


// ===============================
// FORMATAR PREÇO
// ===============================

function formatarPreco(valor) {

    return valor
        .toFixed(2)
        .replace(".", ",");
}


// ===============================
// PROMOÇÃO
// ===============================

function aplicarPromocao() {

    alert(
        "🎉 Promoção ativada!\n\n" +
        "Você ganhou 20% de desconto " +
        "em acessórios."
    );
}


// ===============================
// FINALIZAR COMPRA
// ===============================

function finalizarCompra() {

    if (carrinho.length === 0) {

        alert(
            "🛒 Seu carrinho está vazio!"
        );

        return;
    }


    let total = 0;


    carrinho.forEach(
        produto => {

            total +=
                produto.preco;

        }
    );


    alert(
        "✅ Compra finalizada!\n\n" +

        "Total: R$ " +
        formatarPreco(total) +

        "\n\n" +

        "Obrigado por comprar " +
        "na TechCell!"
    );


    carrinho = [];

    atualizarCarrinho();
}


// ===============================
// INICIALIZAÇÃO
// ===============================

atualizarCarrinho();