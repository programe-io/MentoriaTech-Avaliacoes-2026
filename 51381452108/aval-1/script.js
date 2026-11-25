
// ===================================
// 1. SALVAR DADOS NO NAVEGADOR
// ===================================

let favoritos = JSON.parse(
    localStorage.getItem("favoritos") || "[]"
);

function salvarDados() {
    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
    );

    localStorage.setItem(
        "favoritos",
        JSON.stringify(favoritos)
    );
}

// Recuperar carrinho salvo
carrinho = JSON.parse(
    localStorage.getItem("carrinho") || "[]"
);


// ===================================
// 2. NOTIFICAÇÕES
// ===================================

function notificar(mensagem) {
    const aviso = document.getElementById("notificacao");

    aviso.textContent = mensagem;
    aviso.classList.add("ativa");

    clearTimeout(window.timerNotificacao);

    window.timerNotificacao = setTimeout(() => {
        aviso.classList.remove("ativa");
    }, 2500);
}


// ===================================
// 3. FAVORITAR PRODUTOS
// ===================================

function atualizarFavoritos() {
    document.getElementById("totalFavoritos").textContent =
        favoritos.length;
}

function alternarFavorito(id) {
    if (favoritos.includes(id)) {
        favoritos = favoritos.filter(item => item !== id);
        notificar("Produto removido dos favoritos!");
    } else {
        favoritos.push(id);
        notificar("Produto adicionado aos favoritos!");
    }

    salvarDados();
    atualizarFavoritos();

    filtrarProdutos();
}

function mostrarFavoritos() {
    const lista = produtos.filter(
        produto => favoritos.includes(produto.id)
    );

    mostrarProdutos(lista);
    document.getElementById("produtos").scrollIntoView({
        behavior: "smooth"
    });
}


// ===================================
// 4. ORDENAR PRODUTOS
// ===================================

function ordenarProdutos() {
    const tipo = document.getElementById("ordenacao").value;

    let lista = [...produtos];

    if (tipo === "menor") {
        lista.sort((a, b) => a.preco - b.preco);
    }

    if (tipo === "maior") {
        lista.sort((a, b) => b.preco - a.preco);
    }

    if (tipo === "nome") {
        lista.sort((a, b) => a.nome.localeCompare(b.nome));
    }

    const pesquisa = document.getElementById("pesquisa").value.toLowerCase();
    const categoria = document.getElementById("categoria").value;

    lista = lista.filter(p => {
        return p.nome.toLowerCase().includes(pesquisa) &&
        (categoria === "todos" || p.categoria === categoria);
    });

    mostrarProdutos(lista);
}


// ===================================
// 5. DETALHES DO PRODUTO
// ===================================

function abrirDetalhes(id) {
    const produto = produtos.find(p => p.id === id);

    document.getElementById("detalhesProduto").innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}">
        <h2>${produto.nome}</h2>
        <p>Categoria: ${produto.categoria}</p>
        <h3 class="preco">${dinheiro(produto.preco)}</h3>
        <p>Produto selecionado da coleção Sneakers Store.</p>
    `;

    document.getElementById("modalProduto")
        .classList.add("ativo");
}

function fecharModal() {
    document.getElementById("modalProduto")
        .classList.remove("ativo");
}


// ===================================
// 6. LIMPAR CARRINHO
// ===================================

function limparCarrinho() {
    carrinho = [];

    salvarDados();
    atualizarCarrinho();

    notificar("Carrinho esvaziado!");
}


// ===================================
// 7. ATUALIZAR PRODUTOS
// ===================================

// Complementa a renderização original.
const mostrarProdutosOriginal = mostrarProdutos;

mostrarProdutos = function(lista = produtos) {
    const area = document.getElementById("listaProdutos");

    area.innerHTML = "";

    if (lista.length === 0) {
        area.innerHTML = "<p>Nenhum produto encontrado.</p>";
        return;
    }

    lista.forEach(produto => {
        area.innerHTML += `
            <div class="produto">

                <button
                    class="favorito ${favoritos.includes(produto.id) ? "ativo" : ""}"
                    onclick="alternarFavorito(${produto.id})">
                    ${favoritos.includes(produto.id) ? "❤️" : "♡"}
                </button>

                <img src="${produto.imagem}" alt="${produto.nome}">

                <span class="categoria-label">
                    ${produto.categoria}
                </span>

                <h3>${produto.nome}</h3>

                <p class="preco">${dinheiro(produto.preco)}</p>

                <select id="tamanho-${produto.id}">
                    <option value="">Escolha o tamanho</option>
                    ${[37,38,39,40,41,42,43,44].map(t =>
                        `<option value="${t}">${t}</option>`
                    ).join("")}
                </select>

                <button onclick="adicionarCarrinho(${produto.id})">
                    ADICIONAR AO CARRINHO
                </button>

                <button class="ver-detalhes"
                    onclick="abrirDetalhes(${produto.id})">
                    VER DETALHES
                </button>

            </div>
        `;
    });
};


// ===================================
// 8. QUANTIDADE NO CARRINHO
// ===================================

// Substitui a função original.
atualizarCarrinho = function() {
    const area = document.getElementById("itensCarrinho");

    let soma = 0;
    let qtd = 0;

    area.innerHTML = "";

    carrinho.forEach((item, index) => {
        soma += item.preco * item.quantidade;
        qtd += item.quantidade;

        area.innerHTML += `
            <div class="item-carrinho">
                <h4>${item.nome}</h4>
                <p>Tamanho: ${item.tamanho}</p>
                <p>${dinheiro(item.preco)}</p>

                <div class="controle-quantidade">
                    <button onclick="alterarQuantidade(${index}, -1)">-</button>
                    <span>${item.quantidade}</span>
                    <button onclick="alterarQuantidade(${index}, 1)">+</button>
                </div>

                <button class="remover"
                    onclick="removerItem(${index})">
                    Remover
                </button>
            </div>
        `;
    });

    if (carrinho.length === 0) {
        area.innerHTML = "<p>Seu carrinho está vazio.</p>";
    }

    document.getElementById("quantidade").textContent = qtd;
    document.getElementById("total").textContent = dinheiro(soma);

    salvarDados();
};

function alterarQuantidade(index, valor) {
    carrinho[index].quantidade += valor;

    if (carrinho[index].quantidade <= 0) {
        carrinho.splice(index, 1);
    }

    atualizarCarrinho();
    notificar("Carrinho atualizado!");
}


// ===================================
// 9. FINALIZAÇÃO COM NOTIFICAÇÃO
// ===================================

const finalizarCompraOriginal = finalizarCompra;

finalizarCompra = function() {
    if (carrinho.length === 0) {
        notificar("Seu carrinho está vazio!");
        return;
    }

    finalizarCompraOriginal();
};


// ===================================
// 10. INICIALIZAR COMPLEMENTOS
// ===================================

atualizarFavoritos();
atualizarCarrinho();
mostrarProdutos();
