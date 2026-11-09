
const listaProdutos = [
    {
        nome: "Smartphone Samsung",
        preco: 1200,
        categoria: "Eletrônicos",
        imagem: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"
    },
    {
        nome: "Notebook",
        preco: 2500,
        categoria: "Eletrônicos",
        imagem: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500"
    },
    {
        nome: "Sofá moderno",
        preco: 950,
        categoria: "Móveis",
        imagem: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500"
    },
    {
        nome: "Tênis esportivo",
        preco: 180,
        categoria: "Roupas",
        imagem: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    },
    {
        nome: "Relógio",
        preco: 250,
        categoria: "Outros",
        imagem: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
    },
    {
        nome: "Carro usado",
        preco: 35000,
        categoria: "Veículos",
        imagem: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500"
    },
    {
        nome: "Câmera fotográfica",
        preco: 1800,
        categoria: "Eletrônicos",
        imagem: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500"
    },
    {
        nome: "Mesa de madeira",
        preco: 400,
        categoria: "Móveis",
        imagem: "https://images.unsplash.com/photo-1499933374294-4584851497cc?w=500"
    }
];

const container = document.getElementById("produtos");

function mostrarProdutos(lista) {
    container.innerHTML = "";

    lista.forEach((produto, indice) => {
        container.innerHTML += `
            <div class="card">
                <img src="${produto.imagem}" alt="${produto.nome}">
                <div class="info">
                    <h3>${produto.nome}</h3>
                    <p class="categoria">${produto.categoria}</p>
                    <p class="preco">
                        R$ ${produto.preco.toLocaleString("pt-BR")}
                    </p>
                    <button class="comprar"
                        onclick="comprarProduto(${indice})">
                        Tenho interesse
                    </button>
                </div>
            </div>
        `;
    });

    if (lista.length === 0) {
        container.innerHTML = "<p>Nenhum produto encontrado.</p>";
    }
}

function filtrar(categoria) {
    if (categoria === "Todos") {
        mostrarProdutos(listaProdutos);
    } else {
        const resultado = listaProdutos.filter(
            produto => produto.categoria === categoria
        );
        mostrarProdutos(resultado);
    }
}

document.getElementById("pesquisa").addEventListener("input", function() {
    const busca = this.value.toLowerCase();

    const resultado = listaProdutos.filter(produto =>
        produto.nome.toLowerCase().includes(busca) ||
        produto.categoria.toLowerCase().includes(busca)
    );

    mostrarProdutos(resultado);
});

function comprarProduto(indice) {
    const produto = listaProdutos[indice];

    alert("Você demonstrou interesse em: " + produto.nome +
          "\nPreço: R$ " + produto.preco.toLocaleString("pt-BR"));
}

function anunciarProduto() {
    const nome = prompt("Qual é o nome do produto?");
    
    if (!nome || !nome.trim()) {
        alert("Digite um nome válido.");
        return;
    }

    const preco = Number(
        prompt("Qual é o preço do produto?")
            ?.replace(",", ".")
    );

    if (!Number.isFinite(preco) || preco <= 0) {
        alert("Digite um preço válido.");
        return;
    }

    const categoria = prompt(
        "Digite a categoria: Eletrônicos, Móveis, Roupas, Veículos ou Outros"
    );

    const categorias = [
        "Eletrônicos", "Móveis", "Roupas", "Veículos", "Outros"
    ];

    const categoriaValida = categorias.find(
        c => c.toLowerCase() === categoria?.trim().toLowerCase()
    );

    if (!categoriaValida) {
        alert("Categoria inválida.");
        return;
    }

    listaProdutos.push({
        nome: nome.trim(),
        preco: preco,
        categoria: categoriaValida,
        imagem: "https://placehold.co/500x300?text=Novo+Produto"
    });

    mostrarProdutos(listaProdutos);
    alert("Produto anunciado com sucesso!");
}

mostrarProdutos(listaProdutos);
