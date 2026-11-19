const produtos = [
    {
        id: 1,
        nome: "Fone Bluetooth",
        preco: 89.90,
        imagem: "🎧"
    },
    {
        id: 2,
        nome: "Relógio Digital",
        preco: 129.90,
        imagem: "⌚"
    },
    {
        id: 3,
        nome: "Celular",
        preco: 899.90,
        imagem: "📱"
    },
    {
        id: 4,
        nome: "Teclado Gamer",
        preco: 159.90,
        imagem: "⌨️"
    },
    {
        id: 5,
        nome: "Notebook",
        preco: 2499.90,
        imagem: "💻"
    }
];

// Carrinho
let carrinho = JSON.parse(
    localStorage.getItem("carrinho")
) || [];

// Formatar dinheiro
function dinheiro(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Mostrar produtos
function mostrarProdutos() {
    const area = document.getElementById("produtos");

    area.innerHTML = "";

    produtos.forEach(produto => {
        area.innerHTML += `
            <div class="produto">
                <div style="font-size:60px">
                    ${produto.imagem}
                </div>

                <h3>${produto.nome}</h3>

                <p>${dinheiro(produto.preco)}</p>

                <button onclick="adicionarCarrinho(${produto.id})">
                    Comprar
                </button>
            </div>
        `;
    });
}

// Adicionar ao carrinho
function adicionarCarrinho(id) {
    const produto = produtos.find(p => p.id === id);

    const existente = carrinho.find(p => p.id === id);

    if (existente) {
        existente.quantidade++;
    } else {
        carrinho.push({
            ...produto,
            quantidade: 1
        });
    }

    salvarCarrinho();
    mostrarCarrinho();

    alert(produto.nome + " adicionado ao carrinho!");
}

// Remover produto
function removerProduto(id) {
    carrinho = carrinho.filter(p => p.id !== id);

    salvarCarrinho();
    mostrarCarrinho();
}

// Alterar quantidade
function alterarQuantidade(id, quantidade) {
    const produto = carrinho.find(p => p.id === id);

    if (!produto) return;

    produto.quantidade += quantidade;

    if (produto.quantidade <= 0) {
        removerProduto(id);
        return;
    }

    salvarCarrinho();
    mostrarCarrinho();
}

// Salvar carrinho
function salvarCarrinho() {
    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
    );
}

// Mostrar carrinho
function mostrarCarrinho() {
    const area = document.getElementById("carrinho");

    let total = 0;
    let quantidadeTotal = 0;

    area.innerHTML = "";

    if (carrinho.length === 0) {
        area.innerHTML = "<p>Carrinho vazio!</p>";
    }

    carrinho.forEach(produto => {

        total += produto.preco * produto.quantidade;
        quantidadeTotal += produto.quantidade;

        area.innerHTML += `
            <div class="item-carrinho">

                <h3>${produto.imagem} ${produto.nome}</h3>

                <p>${dinheiro(produto.preco)}</p>

                <button onclick="alterarQuantidade(${produto.id}, -1)">
                    -
                </button>

                <span>${produto.quantidade}</span>

                <button onclick="alterarQuantidade(${produto.id}, 1)">
                    +
                </button>

                <button onclick="removerProduto(${produto.id})">
                    Remover
                </button>

            </div>
        `;
    });

    document.getElementById("total").innerText =
        dinheiro(total);

    document.getElementById("quantidade").innerText =
        quantidadeTotal;
}

// Finalizar compra
function finalizarCompra() {

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let total = carrinho.reduce(
        (soma, produto) =>
            soma + produto.preco * produto.quantidade,
        0
    );

    const confirmar = confirm(
        "Deseja finalizar seu pedido de " +
        dinheiro(total) + "?"
    );

    if (confirmar) {
        alert("Pedido registrado com sucesso!");

        carrinho = [];

        salvarCarrinho();
        mostrarCarrinho();
    }
}

// Inicializar loja
mostrarProdutos();
mostrarCarrinho();