
// ================================
// CONFIGURAÇÕES
// ================================

let carrinho = [];

const telefone = "5511999999999";

// ================================
// ADICIONAR AO CARRINHO
// ================================

function adicionarCarrinho(nome, preco) {

    let produtoExistente = carrinho.find(
        item => item.nome === nome
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

    alert(nome + " adicionado ao carrinho!");
}

// ================================
// ATUALIZAR CARRINHO
// ================================

function atualizarCarrinho() {

    let quantidade = document.getElementById("quantidade");

    let lista = document.getElementById("listaCarrinho");

    let total = document.getElementById("total");

    let quantidadeTotal = carrinho.reduce(
        (soma, item) => soma + item.quantidade, 0
    );

    let valorTotal = carrinho.reduce(
        (soma, item) => soma + item.preco * item.quantidade, 0
    );

    if (quantidade) {
        quantidade.textContent = quantidadeTotal;
    }

    if (total) {
        total.textContent = valorTotal.toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL"
            }
        );
    }

    if (lista) {

        lista.innerHTML = "";

        carrinho.forEach((item, index) => {

            let produto = document.createElement("div");

            produto.className = "item-carrinho";

            let nome = document.createElement("p");

            nome.textContent =
                item.nome + " x" + item.quantidade;

            let preco = document.createElement("p");

            preco.textContent =
                (item.preco * item.quantidade).toLocaleString(
                    "pt-BR",
                    {
                        style: "currency",
                        currency: "BRL"
                    }
                );

            let remover = document.createElement("button");

            remover.textContent = "Remover";

            remover.onclick = function() {
                removerCarrinho(index);
            };

            produto.appendChild(nome);
            produto.appendChild(preco);
            produto.appendChild(remover);

            lista.appendChild(produto);
        });
    }
}

// ================================
// REMOVER PRODUTO
// ================================

function removerCarrinho(index) {

    carrinho[index].quantidade--;

    if (carrinho[index].quantidade <= 0) {
        carrinho.splice(index, 1);
    }

    atualizarCarrinho();
}

// ================================
// PESQUISAR PRODUTOS
// ================================

function pesquisarProduto() {

    let pesquisa = document
        .getElementById("pesquisa")
        .value.toLowerCase();

    let produtos = document.querySelectorAll(".card");

    produtos.forEach(produto => {

        let nome = produto
            .querySelector("h3")
            .textContent.toLowerCase();

        let descricao = produto
            .querySelector("p")
            .textContent.toLowerCase();

        if (
            nome.includes(pesquisa) ||
            descricao.includes(pesquisa)
        ) {
            produto.style.display = "";
        } else {
            produto.style.display = "none";
        }
    });
}

// ================================
// FINALIZAR COMPRA
// ================================

function finalizarCompra() {

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let mensagem = "Olá! Gostaria de fazer um pedido na Nexus Gaming:\n\n";

    carrinho.forEach(item => {

        mensagem +=
            item.nome +
            " - Quantidade: " +
            item.quantidade +
            "\n";
    });

    let total = carrinho.reduce(
        (soma, item) => soma + item.preco * item.quantidade,
        0
    );

    mensagem += "\nTotal: " + total.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

    let link =
        "https://wa.me/" +
        telefone +
        "?text=" +
        encodeURIComponent(mensagem);

    window.open(link, "_blank");
}

// ================================
// MENSAGEM DE BOAS-VINDAS
// ================================

console.log("NEXUS GAMING carregada com sucesso!");
