
const produtos = [
    {
        nome: "Tênis Esportivo",
        categoria: "Tênis",
        preco: 199.90,
        imagem: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    },
    {
        nome: "Tênis de Corrida",
        categoria: "Tênis",
        preco: 249.90,
        imagem: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500"
    },
    {
        nome: "Camiseta Esportiva",
        categoria: "Roupas",
        preco: 79.90,
        imagem: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
    },
    {
        nome: "Short Esportivo",
        categoria: "Roupas",
        preco: 69.90,
        imagem: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500"
    },
    {
        nome: "Bola de Futebol",
        categoria: "Bolas",
        preco: 99.90,
        imagem: "https://images.unsplash.com/photo-1614632537423-1e6c2e7e0b6e?w=500"
    },
    {
        nome: "Bola de Basquete",
        categoria: "Bolas",
        preco: 119.90,
        imagem: "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=500"
    },
    {
        nome: "Mochila Esportiva",
        categoria: "Acessórios",
        preco: 89.90,
        imagem: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"
    },
    {
        nome: "Garrafa Esportiva",
        categoria: "Acessórios",
        preco: 39.90,
        imagem: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500"
    }
];

let carrinho = [];

function mostrarProdutos(lista) {
    const area = document.getElementById("listaProdutos");

    area.innerHTML = "";

    lista.forEach((produto) => {
        const card = document.createElement("div");
        card.className = "produto";

        const imagem = document.createElement("img");
        imagem.src = produto.imagem;
        imagem.alt = produto.nome;

        const nome = document.createElement("h3");
        nome.textContent = produto.nome;

        const preco = document.createElement("p");
        preco.className = "preco";
        preco.textContent = "R$ " + produto.preco.toFixed(2).replace(".", ",");

        const botao = document.createElement("button");
        botao.className = "adicionar";
        botao.textContent = "Adicionar ao carrinho";

        botao.addEventListener("click", () => {
            adicionarCarrinho(produto);
        });

        card.append(imagem, nome, preco, botao);
        area.appendChild(card);
    });
}

function filtrar(categoria) {
    if (categoria === "Todos") {
        mostrarProdutos(produtos);
    } else {
        const resultado = produtos.filter(
            produto => produto.categoria === categoria
        );

        mostrarProdutos(resultado);
    }
}

function adicionarCarrinho(produto) {
    const item = carrinho.find(p => p.nome === produto.nome);

    if (item) {
        item.quantidade++;
    } else {
        carrinho.push({
            ...produto,
            quantidade: 1
        });
    }

    atualizarCarrinho();
}

function atualizarCarrinho() {
    const area = document.getElementById("itensCarrinho");

    area.innerHTML = "";

    let total = 0;
    let quantidadeTotal = 0;

    carrinho.forEach((produto, index) => {
        total += produto.preco * produto.quantidade;
        quantidadeTotal += produto.quantidade;

        const item = document.createElement("div");
        item.className = "item-carrinho";

        const nome = document.createElement("span");
        nome.textContent =
            produto.nome + " x " + produto.quantidade;

        const preco = document.createElement("span");
        preco.textContent =
            "R$ " + (produto.preco * produto.quantidade)
            .toFixed(2).replace(".", ",");

        const remover = document.createElement("button");
        remover.textContent = "Remover";

        remover.addEventListener("click", () => {
            carrinho.splice(index, 1);
            atualizarCarrinho();
        });

        item.append(nome, preco, remover);
        area.appendChild(item);
    });

    document.getElementById("total").textContent =
        total.toFixed(2).replace(".", ",");

    document.getElementById("contador").textContent =
        quantidadeTotal;
}

document.getElementById("pesquisa").addEventListener("input", function() {
    const termo = this.value.toLowerCase();

    const resultado = produtos.filter(produto =>
        produto.nome.toLowerCase().includes(termo)
    );

    mostrarProdutos(resultado);
});

document.getElementById("abrirCarrinho").onclick = () => {
    document.getElementById("carrinho").classList.add("ativo");
};

document.getElementById("fecharCarrinho").onclick = () => {
    document.getElementById("carrinho").classList.remove("ativo");
};

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    alert("Pedido demonstrativo realizado com sucesso!");

    carrinho = [];
    atualizarCarrinho();

    document.getElementById("carrinho").classList.remove("ativo");
}

mostrarProdutos(produtos);
