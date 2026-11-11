const produtos = [
    {
        nome: "PlayStation 5",
        preco: 3499.90,
        categoria: "Consoles",
        imagem: "https://placehold.co/300x200/19192a/ffffff?text=PlayStation+5"
    },
    {
        nome: "Controle Xbox",
        preco: 399.90,
        categoria: "Acessórios",
        imagem: "https://placehold.co/300x200/19192a/ffffff?text=Controle+Xbox"
    },
    {
        nome: "Headset Gamer",
        preco: 249.90,
        categoria: "Acessórios",
        imagem: "https://placehold.co/300x200/19192a/ffffff?text=Headset"
    },
    {
        nome: "Teclado Gamer",
        preco: 299.90,
        categoria: "Acessórios",
        imagem: "https://placehold.co/300x200/19192a/ffffff?text=Teclado"
    },
    {
        nome: "Jogo de Aventura",
        preco: 199.90,
        categoria: "Jogos",
        imagem: "https://placehold.co/300x200/19192a/ffffff?text=Jogo"
    },
    {
        nome: "Nintendo Switch",
        preco: 1899.90,
        categoria: "Consoles",
        imagem: "https://placehold.co/300x200/19192a/ffffff?text=Nintendo+Switch"
    }
];

let carrinho = [];
let categoriaAtual = "Todos";

function mostrarProdutos(lista = produtos) {
    const area = document.getElementById("lista-produtos");

    area.innerHTML = "";

    lista.forEach((produto) => {
        const indice = produtos.indexOf(produto);

        area.innerHTML += `
            <div class="produto">
                <img src="${produto.imagem}" alt="${produto.nome}">
                <h3>${produto.nome}</h3>
                <p>${produto.preco.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                })}</p>
                <button onclick="adicionarCarrinho(${indice})">
                    Adicionar ao carrinho
                </button>
            </div>
        `;
    });
}

function filtrarCategoria(categoria) {
    categoriaAtual = categoria;
    filtrarProdutos();
}

function filtrarProdutos() {
    const busca = document.getElementById("pesquisa")
        .value.toLowerCase();

    const resultado = produtos.filter(produto => {
        const nomeCorresponde = produto.nome.toLowerCase()
            .includes(busca);

        const categoriaCorresponde =
            categoriaAtual === "Todos" ||
            produto.categoria === categoriaAtual;

        return nomeCorresponde && categoriaCorresponde;
    });

    mostrarProdutos(resultado);
}

function adicionarCarrinho(indice) {
    carrinho.push(produtos[indice]);
    atualizarCarrinho();
}

function atualizarCarrinho() {
    document.getElementById("quantidade").textContent =
        carrinho.length;

    const area = document.getElementById("itens-carrinho");
    let total = 0;

    area.innerHTML = "";

    carrinho.forEach((produto, indice) => {
        total += produto.preco;

        area.innerHTML += `
            <div class="item-carrinho">
                <span>${produto.nome} - ${produto.preco.toLocaleString(
                    "pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    })}</span>
                <button onclick="removerCarrinho(${indice})">
                    Remover
                </button>
            </div>
        `;
    });

    document.getElementById("total").textContent =
        "Total: " + total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
}

function removerCarrinho(indice) {
    carrinho.splice(indice, 1);
    atualizarCarrinho();
}

function abrirCarrinho() {
    document.getElementById("carrinho").style.display = "flex";
}

function fecharCarrinho() {
    document.getElementById("carrinho").style.display = "none";
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    alert("Compra demonstrativa! O pagamento não foi realizado.");
}

mostrarProdutos();

