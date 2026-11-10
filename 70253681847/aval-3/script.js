
let carrinho = [];

const telefone = "5500000000000";

function adicionar(nome, preco) {
    carrinho.push({
        nome: nome,
        preco: preco
    });

    atualizarCarrinho();

    alert(nome + " adicionado ao carrinho!");
}

function atualizarCarrinho() {
    const quantidade = document.getElementById("quantidade");
    const itens = document.getElementById("itens");
    const totalElemento = document.getElementById("total");

    quantidade.textContent = carrinho.length;

    itens.innerHTML = "";

    let total = 0;

    carrinho.forEach((produto, indice) => {
        total += produto.preco;

        const item = document.createElement("div");

        item.innerHTML = `
            <p>
                ${produto.nome} -
                R$ ${produto.preco.toFixed(2).replace(".", ",")}
                <button onclick="remover(${indice})">Excluir</button>
            </p>
        `;

        itens.appendChild(item);
    });

    totalElemento.textContent =
        total.toFixed(2).replace(".", ",");
}

function remover(indice) {
    carrinho.splice(indice, 1);
    atualizarCarrinho();
}

function mostrarCarrinho() {
    document.getElementById("carrinho")
        .classList.toggle("escondido");
}

function alternarTema() {
    document.body.classList.toggle("dark");
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let mensagem = "Olá! Quero fazer este pedido:\n";
    let total = 0;

    carrinho.forEach(produto => {
        mensagem += `\n${produto.nome} - R$ ${produto.preco.toFixed(2)}`;
        total += produto.preco;
    });

    mensagem += `\n\nTotal: R$ ${total.toFixed(2)}`;

    const link = "https://wa.me/" + telefone +
        "?text=" + encodeURIComponent(mensagem);

    window.open(link, "_blank");
}
