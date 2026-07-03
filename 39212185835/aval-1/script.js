let carrinho = [];
let total = 0;

// Adiciona um produto ao carrinho
function adicionar(nome, preco) {

    carrinho.push({
        nome: nome,
        preco: preco
    });

    atualizarCarrinho();

}

// Atualiza o carrinho na tela
function atualizarCarrinho() {

    const lista = document.getElementById("lista");
    const totalElemento = document.getElementById("total");

    lista.innerHTML = "";

    total = 0;

    carrinho.forEach((produto, indice) => {

        total += produto.preco;

        const item = document.createElement("li");

        item.innerHTML = `
            <span>${produto.nome}<br>R$ ${produto.preco.toFixed(2)}</span>
            <button onclick="remover(${indice})">🗑️</button>
        `;

        lista.appendChild(item);

    });

    totalElemento.textContent = total.toFixed(2);

}

// Remove um produto
function remover(indice) {

    carrinho.splice(indice, 1);

    atualizarCarrinho();

}

// Finaliza a compra
function finalizar() {

    if (carrinho.length === 0) {

        alert("Seu carrinho está vazio!");

        return;

    }

    let mensagem = "===== COMPRA REALIZADA =====\n\n";

    carrinho.forEach(produto => {

        mensagem += `${produto.nome} - R$ ${produto.preco.toFixed(2)}\n`;

    });

    mensagem += `\nTotal: R$ ${total.toFixed(2)}`;

    alert(mensagem);

    carrinho = [];

    atualizarCarrinho();

}

// Limpar carrinho
function limparCarrinho() {

    carrinho = [];

    atualizarCarrinho();

}