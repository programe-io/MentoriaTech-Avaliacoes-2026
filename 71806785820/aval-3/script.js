let carrinho = [];
let total = 0;

function atualizar() {

    const lista = document.getElementById("carrinho");
    const totalSpan = document.getElementById("total");

    lista.innerHTML = "";

    carrinho.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.nome} - R$ ${item.preco}`;
        lista.appendChild(li);
    });

    totalSpan.textContent = `R$ ${total}`;
}

function adicionar(nome, preco) {

    carrinho.push({ nome, preco });
    total += preco;

    atualizar();
}

function limpar() {

    carrinho = [];
    total = 0;

    atualizar();
}