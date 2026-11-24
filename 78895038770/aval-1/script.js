
const produtos = [
    {
        nome: "Smartphone Samsung",
        preco: 1299.90,
        imagem: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"
    },
    {
        nome: "Notebook",
        preco: 2499.90,
        imagem: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500"
    },
    {
        nome: "Fone Bluetooth",
        preco: 149.90,
        imagem: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
    },
    {
        nome: "Relógio",
        preco: 199.90,
        imagem: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
    }
];

let carrinho = [];

const lista = document.getElementById("listaProdutos");

function carregarProdutos(filtro = "") {
    lista.innerHTML = "";

    produtos
        .filter(p => p.nome.toLowerCase().includes(filtro.toLowerCase()))
        .forEach((produto, index) => {
            lista.innerHTML += `
                <div class="produto">
                    <img src="${produto.imagem}" alt="${produto.nome}">
                    <h3>${produto.nome}</h3>
                    <p class="preco">
                        R$ ${produto.preco.toFixed(2).replace(".", ",")}
                    </p>
                    <button onclick="adicionarCarrinho(${index})">
                        Adicionar ao carrinho
                    </button>
                </div>
            `;
        });
}

function adicionarCarrinho(index) {
    carrinho.push(produtos[index]);
    atualizarCarrinho();
    alert("Produto adicionado ao carrinho!");
}

function atualizarCarrinho() {
    document.getElementById("quantidade").textContent =
        carrinho.length;

    let total = 0;
    const itens = document.getElementById("itensCarrinho");

    itens.innerHTML = "";

    carrinho.forEach((produto, index) => {
        total += produto.preco;

        itens.innerHTML += `
            <p>
                ${produto.nome} -
                R$ ${produto.preco.toFixed(2).replace(".", ",")}
                <button onclick="removerItem(${index})">Remover</button>
            </p>
        `;
    });

    document.getElementById("total").textContent =
        "Total: R$ " + total.toFixed(2).replace(".", ",");
}

function removerItem(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

function mostrarCarrinho() {
    document.getElementById("carrinho").style.display = "flex";
}

function fecharCarrinho() {
    document.getElementById("carrinho").style.display = "none";
}

document.getElementById("pesquisa").addEventListener("input", function() {
    carregarProdutos(this.value);
});

carregarProdutos();
