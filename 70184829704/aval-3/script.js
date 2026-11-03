
/* =====================================
   ATELIÊ DE CROCHÊ
   JavaScript do site
===================================== */

// CARRINHO DE COMPRAS
let carrinho = [];

// NÚMERO DO WHATSAPP
// Troque pelo seu número com DDD e código do Brasil
const whatsapp = "5599999999999";


// =====================================
// ADICIONAR PRODUTO AO CARRINHO
// =====================================

function adicionarCarrinho(nome, preco) {

    const produto = {
        nome: nome,
        preco: preco
    };

    carrinho.push(produto);

    atualizarCarrinho();

    alert(nome + " foi adicionado ao carrinho!");
}


// =====================================
// ATUALIZAR CARRINHO
// =====================================

function atualizarCarrinho() {

    const lista = document.getElementById("lista-carrinho");

    const totalElemento = document.getElementById("total");

    const quantidadeElemento = document.getElementById("quantidade");

    if (!lista || !totalElemento || !quantidadeElemento) {
        return;
    }

    lista.innerHTML = "";

    let total = 0;

    carrinho.forEach((produto, index) => {

        total += produto.preco;

        const item = document.createElement("li");

        item.innerHTML = `
            ${produto.nome}
            - R$ ${produto.preco.toFixed(2).replace(".", ",")}

            <button onclick="removerProduto(${index})">
                Remover
            </button>
        `;

        lista.appendChild(item);

    });

    totalElemento.innerText =
        "R$ " + total.toFixed(2).replace(".", ",");

    quantidadeElemento.innerText = carrinho.length;

}


// =====================================
// REMOVER PRODUTO
// =====================================

function removerProduto(index) {

    carrinho.splice(index, 1);

    atualizarCarrinho();

}


// =====================================
// FINALIZAR PEDIDO NO WHATSAPP
// =====================================

function finalizarPedido() {

    if (carrinho.length === 0) {

        alert("Seu carrinho está vazio!");

        return;

    }

    let mensagem = "Olá! Gostaria de fazer um pedido:\n\n";

    let total = 0;

    carrinho.forEach((produto) => {

        mensagem +=
            produto.nome +
            " - R$ " +
            produto.preco.toFixed(2).replace(".", ",") +
            "\n";

        total += produto.preco;

    });

    mensagem += "\nTotal: R$ " +
        total.toFixed(2).replace(".", ",");

    mensagem += "\n\nGostaria de confirmar minha encomenda!";

    const link =
        "https://wa.me/" +
        whatsapp +
        "?text=" +
        encodeURIComponent(mensagem);

    window.open(link, "_blank");

}


// =====================================
// MENSAGEM DE BOAS-VINDAS
// =====================================

window.addEventListener("load", function() {

    console.log("🌸 Ateliê de Crochê carregado!");

});


// =====================================
// MENU SUAVE
// =====================================

document.querySelectorAll('nav a').forEach(function(link) {

    link.addEventListener("click", function(event) {

        const destino = this.getAttribute("href");

        if (destino && destino.startsWith("#")) {

            const secao = document.querySelector(destino);

            if (secao) {

                event.preventDefault();

                secao.scrollIntoView({
                    behavior: "smooth"
                });

            }

        }

    });

});


// =====================================
// BOTÃO DE ENCOMENDA
// =====================================

function encomendarProduto(nome, preco) {

    const mensagem =
        "Olá! Gostaria de encomendar " +
        nome +
        " por R$ " +
        preco.toFixed(2).replace(".", ",") +
        ". Poderia me passar mais informações?";

    const link =
        "https://wa.me/" +
        whatsapp +
        "?text=" +
        encodeURIComponent(mensagem);

    window.open(link, "_blank");

}
