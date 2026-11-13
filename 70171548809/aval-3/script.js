
// CARRINHO DE COMPRAS

let carrinho = [];

// PREÇOS DOS PRODUTOS
const precos = {
    "Brigadeiro Gourmet": 4.00,
    "Cupcake Especial": 8.00,
    "Bolo de Chocolate": 45.00,
    "Brownie Gourmet": 7.00,
    "Trufas Recheadas": 5.00,
    "Biscoitos Artesanais": 12.00
};


// FORMATAR VALORES EM REAIS
function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}


// ADICIONAR PRODUTOS AO CARRINHO
function adicionarCarrinho(produto) {

    carrinho.push(produto);

    atualizarQuantidade();

    alert(
        "🍓 Doce Encanto 🍓\n\n" +
        produto +
        " foi adicionado ao carrinho!"
    );

    console.log("Produto adicionado:", produto);
}


// ATUALIZAR QUANTIDADE
function atualizarQuantidade() {

    document.getElementById("quantidade").innerText =
        carrinho.length;

}


// MOSTRAR CARRINHO
function mostrarCarrinho() {

    if (carrinho.length === 0) {

        alert("Seu carrinho está vazio! 🍬");

        return;
    }

    let mensagem = "🧁 SEU CARRINHO 🧁\n\n";

    let total = 0;

    carrinho.forEach(function(produto, index) {

        mensagem +=
            (index + 1) + " - " +
            produto + " - " +
            formatarPreco(precos[produto]) + "\n";

        total += precos[produto];

    });

    mensagem += "\n------------------------";

    mensagem += "\nTotal: " + formatarPreco(total);

    alert(mensagem);

}


// REMOVER PRODUTO DO CARRINHO
function removerProduto(produto) {

    const indice = carrinho.indexOf(produto);

    if (indice !== -1) {

        carrinho.splice(indice, 1);

        atualizarQuantidade();

        alert(produto + " foi removido do carrinho!");

    } else {

        alert("Produto não encontrado!");

    }

}


// BOTÃO DO CARRINHO
document.querySelector(".carrinho")
    .addEventListener("click", function() {

        mostrarCarrinho();

    });


// MENSAGEM DE BOAS-VINDAS
window.addEventListener("load", function() {

    console.log("Bem-vindo à Doce Encanto! 🍫");

});


// EFEITOS NOS BOTÕES
const botoes = document.querySelectorAll(".card button");

botoes.forEach(function(botao) {

    botao.addEventListener("mouseenter", function() {

        botao.style.transform = "scale(1.05)";

    });

    botao.addEventListener("mouseleave", function() {

        botao.style.transform = "scale(1)";

    });

});


// NAVEGAÇÃO DO SITE
const links = document.querySelectorAll("nav a");

links.forEach(function(link) {

    link.addEventListener("click", function() {

        console.log(
            "Você acessou: " + link.textContent
        );

    });

});
