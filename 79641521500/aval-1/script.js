
const produtos = [
    {
        nome: "Camiseta Esportiva",
        categoria: "Roupas",
        preco: 59.90,
        imagem: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
        descricao: "Camiseta leve e confortável."
    },
    {
        nome: "Short Masculino",
        categoria: "Roupas",
        preco: 49.90,
        imagem: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500",
        descricao: "Short ideal para atividades físicas."
    },
    {
        nome: "Legging Feminina",
        categoria: "Roupas",
        preco: 89.90,
        imagem: "https://images.unsplash.com/photo-1506629905607-d9a8d2a1a9f1?w=500",
        descricao: "Legging confortável para academia."
    },
    {
        nome: "Tênis de Corrida",
        categoria: "Calçados",
        preco: 199.90,
        imagem: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
        descricao: "Tênis com conforto e amortecimento."
    },
    {
        nome: "Tênis Esportivo",
        categoria: "Calçados",
        preco: 179.90,
        imagem: "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?w=500",
        descricao: "Ideal para treinos e caminhadas."
    },
    {
        nome: "Chuteira de Futebol",
        categoria: "Calçados",
        preco: 159.90,
        imagem: "https://images.unsplash.com/photo-1511886929837-354d827aae26?w=500",
        descricao: "Chuteira para jogar futebol."
    },
    {
        nome: "Bola de Futebol",
        categoria: "Bolas",
        preco: 89.90,
        imagem: "https://images.unsplash.com/photo-1614632537190-23e4146777db?w=500",
        descricao: "Bola resistente para partidas."
    },
    {
        nome: "Bola de Basquete",
        categoria: "Bolas",
        preco: 99.90,
        imagem: "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=500",
        descricao: "Bola para treinos de basquete."
    },
    {
        nome: "Bola de Vôlei",
        categoria: "Bolas",
        preco: 79.90,
        imagem: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=500",
        descricao: "Bola ideal para jogar vôlei."
    },
    {
        nome: "Mochila Esportiva",
        categoria: "Acessórios",
        preco: 119.90,
        imagem: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
        descricao: "Mochila para academia e viagens."
    },
    {
        nome: "Garrafa de Água",
        categoria: "Acessórios",
        preco: 29.90,
        imagem: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500",
        descricao: "Garrafa para manter a hidratação."
    },
    {
        nome: "Luvas de Academia",
        categoria: "Acessórios",
        preco: 39.90,
        imagem: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500",
        descricao: "Proteção para seus treinos."
    }
];

let quantidade = 0;
let categoriaAtual = "Todos";

function mostrarProdutos(lista) {
    const area = document.getElementById("listaProdutos");

    area.innerHTML = "";

    if (lista.length === 0) {
        area.innerHTML = "<p>Nenhum produto encontrado.</p>";
        return;
    }

    lista.forEach((produto, index) => {
        area.innerHTML += `
            <div class="card">
                <img src="${produto.imagem}"
                     alt="${produto.nome}"
                     loading="lazy">

                <h3>${produto.nome}</h3>

                <p>${produto.descricao}</p>

                <p class="preco">
                    R$ ${produto.preco.toFixed(2).replace(".", ",")}
                </p>

                <button onclick="adicionarCarrinho()">
                    Adicionar ao carrinho
                </button>
            </div>
        `;
    });
}

function filtrar(categoria) {
    categoriaAtual = categoria;
    atualizarProdutos();
}

function atualizarProdutos() {
    const pesquisa = document
        .getElementById("pesquisa")
        .value.toLowerCase();

    const filtrados = produtos.filter(produto => {
        const combinaCategoria =
            categoriaAtual === "Todos" ||
            produto.categoria === categoriaAtual;

        const combinaPesquisa =
            produto.nome.toLowerCase().includes(pesquisa);

        return combinaCategoria && combinaPesquisa;
    });

    mostrarProdutos(filtrados);
}

function adicionarCarrinho() {
    quantidade++;

    document.getElementById("quantidade")
        .textContent = quantidade;

    alert("Produto adicionado ao carrinho!");
}

document.getElementById("pesquisa")
    .addEventListener("input", atualizarProdutos);

mostrarProdutos(produtos);
