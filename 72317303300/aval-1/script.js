const produtos = [
    {
        id: 1,
        nome: "Camisa Social Premium",
        categoria: "camisas",
        preco: 149.90,
        imagem: "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        nome: "Camiseta Básica Black",
        categoria: "camisas",
        preco: 79.90,
        imagem: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        nome: "Calça Jeans Slim",
        categoria: "calcas",
        preco: 189.90,
        imagem: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        nome: "Calça Chino Bege",
        categoria: "calcas",
        preco: 159.90,
        imagem: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        nome: "Tênis Urban White",
        categoria: "tenis",
        preco: 249.90,
        imagem: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        nome: "Tênis Street Black",
        categoria: "tenis",
        preco: 279.90,
        imagem: "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 7,
        nome: "Relógio Masculino",
        categoria: "acessorios",
        preco: 299.90,
        imagem: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 8,
        nome: "Óculos de Sol Classic",
        categoria: "acessorios",
        preco: 129.90,
        imagem: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80"
    }
];

let carrinho = [];

function mostrarProdutos(lista = produtos) {

    const container = document.getElementById("listaProdutos");

    container.innerHTML = "";

    lista.forEach(produto => {

        container.innerHTML += `
            <div class="produto">

                <img src="${produto.imagem}" alt="${produto.nome}">

                <div class="produto-info">

                    <span class="categoria">
                        ${produto.categoria.toUpperCase()}
                    </span>

                    <h3>${produto.nome}</h3>

                    <div class="preco">
                        R$ ${produto.preco.toFixed(2).replace(".", ",")}
                    </div>

                    <button
                        class="add"
                        onclick="adicionarCarrinho(${produto.id})">
                        Adicionar ao carrinho
                    </button>

                </div>

            </div>
        `;
    });
}

function filtrar(categoria) {

    if (categoria === "todos") {
        mostrarProdutos();
        return;
    }

    const produtosFiltrados = produtos.filter(
        produto => produto.categoria === categoria
    );

    mostrarProdutos(produtosFiltrados);
}

function adicionarCarrinho(id) {

    const produto = produtos.find(p => p.id === id);

    carrinho.push(produto);

    atualizarCarrinho();

    document.getElementById("carrinho").classList.add("aberto");
}

function removerCarrinho(index) {

    carrinho.splice(index, 1);

    atualizarCarrinho();
}

function atualizarCarrinho() {

    const container = document.getElementById("itensCarrinho");

    const contador = document.getElementById("contador");

    const totalElement = document.getElementById("total");

    contador.textContent = carrinho.length;

    container.innerHTML = "";

    let total = 0;

    carrinho.forEach((produto, index) => {

        total += produto.preco;

        container.innerHTML += `

            <div class="item-carrinho">

                <img src="${produto.imagem}">

                <div>

                    <h4>${produto.nome}</h4>

                    <p>
                        R$ ${produto.preco
                            .toFixed(2)
                            .replace(".", ",")}
                    </p>

                    <button
                        class="remover"
                        onclick="removerCarrinho(${index})">
                        Remover
                    </button>

                </div>

            </div>
        `;
    });

    totalElement.textContent =
        "R$ " + total.toFixed(2).replace(".", ",");
}

function abrirCarrinho() {

    document
        .getElementById("carrinho")
        .classList.add("aberto");
}

function fecharCarrinho() {

    document
        .getElementById("carrinho")
        .classList.remove("aberto");
}

function finalizarCompra() {

    if (carrinho.length === 0) {

        alert("Seu carrinho está vazio!");

        return;
    }

    alert(
        "Compra realizada com sucesso! Obrigado por comprar na UrbanMan."
    );

    carrinho = [];

    atualizarCarrinho();

    fecharCarrinho();
}

function mostrarMensagem() {

    alert(
        "Cupom PRIMEIRACOMPRA20 aplicado! Você ganhou 20% de desconto."
    );
}

mostrarProdutos();