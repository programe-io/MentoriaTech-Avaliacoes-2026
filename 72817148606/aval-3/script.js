
// Selecionando os elementos do HTML
const botoesAdicionar = document.querySelectorAll(".adicionar");
const carrinho = document.getElementById("carrinho");
const contador = document.getElementById("contador");
const itensCarrinho = document.getElementById("itens-carrinho");
const totalElemento = document.getElementById("total");

const botaoAbrir = document.getElementById("abrir-carrinho");
const botaoFechar = document.getElementById("fechar-carrinho");
const botaoFinalizar = document.getElementById("finalizar");

// Lista de produtos do carrinho
let produtosCarrinho = [];

// Formatar valores em reais
function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Adicionar produto ao carrinho
botoesAdicionar.forEach(botao => {

    botao.addEventListener("click", () => {

        const nome = botao.dataset.nome;
        const preco = Number(botao.dataset.preco);

        produtosCarrinho.push({
            nome: nome,
            preco: preco
        });

        atualizarCarrinho();

        alert(nome + " foi adicionado ao carrinho!");

    });

});

// Atualizar informações do carrinho
function atualizarCarrinho() {

    itensCarrinho.innerHTML = "";

    contador.textContent = produtosCarrinho.length;

    let total = 0;

    if (produtosCarrinho.length === 0) {

        itensCarrinho.textContent = "Seu carrinho está vazio.";

    }

    produtosCarrinho.forEach((produto, indice) => {

        total += produto.preco;

        const item = document.createElement("div");
        item.classList.add("item-carrinho");

        const informacoes = document.createElement("span");
        informacoes.textContent =
            produto.nome + " - " + formatarMoeda(produto.preco);

        const botaoRemover = document.createElement("button");
        botaoRemover.textContent = "Remover";

        botaoRemover.addEventListener("click", () => {
            removerProduto(indice);
        });

        item.appendChild(informacoes);
        item.appendChild(botaoRemover);

        itensCarrinho.appendChild(item);

    });

    totalElemento.textContent = formatarMoeda(total);

}

// Remover produto do carrinho
function removerProduto(indice) {

    produtosCarrinho.splice(indice, 1);

    atualizarCarrinho();

}

// Abrir carrinho
botaoAbrir.addEventListener("click", () => {

    carrinho.classList.add("ativo");

});

// Fechar carrinho
botaoFechar.addEventListener("click", () => {

    carrinho.classList.remove("ativo");

});

// Fechar clicando fora do carrinho
carrinho.addEventListener("click", (evento) => {

    if (evento.target === carrinho) {
        carrinho.classList.remove("ativo");
    }

});

// Finalizar compra (simulação)
botaoFinalizar.addEventListener("click", () => {

    if (produtosCarrinho.length === 0) {

        alert("Seu carrinho está vazio!");

        return;

    }

    alert(
        "Compra realizada com sucesso!\nTotal: " +
        totalElemento.textContent +
        "\n\nEsta é uma simulação de compra."
    );

    produtosCarrinho = [];

    atualizarCarrinho();

    carrinho.classList.remove("ativo");

});
