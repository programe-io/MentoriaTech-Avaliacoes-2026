// Lista para armazenar os produtos do carrinho
let carrinho = [];

function adicionarAoCarrinho(nome, preco) {
    // Adiciona o produto como um objeto na lista
    carrinho.push({ nome: nome, preco: preco });
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const listaCarrinho = document.getElementById('listaCarrinho');
    const contadorCarrinho = document.getElementById('contadorCarrinho');
    const valorTotal = document.getElementById('valorTotal');

    // Limpa a lista atual na tela
    listaCarrinho.innerHTML = "";

    if (carrinho.length === 0) {
        listaCarrinho.innerHTML = '<li class="carrinho-vazio">O carrinho está vazio.</li>';
        contadorCarrinho.textContent = "0";
        valorTotal.textContent = "0,00";
        return;
    }

    let total = 0;

    // Percorre os itens do carrinho para exibi-los
    carrinho.forEach((item, index) => {
        total += item.preco;

        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.nome}</span>
            <span>R$ ${item.preco.toFixed(2)}</span>
        `;
        listaCarrinho.appendChild(li);
    });

    // Atualiza contadores e total formatado
    contadorCarrinho.textContent = carrinho.length;
    valorTotal.textContent = total.toFixed(2);
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    alert("Compra finalizada com sucesso! Obrigado pela preferência.");
    
    // Esvazia o carrinho após a compra
    carrinho = [];
    atualizarCarrinho();
}