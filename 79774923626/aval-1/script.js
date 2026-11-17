
const produtos = [
    {
        id: 1,
        nome: "Honda CG 160 Titan",
        preco: 22000,
        imagem: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800",
        descricao: "Potência e economia para o dia a dia."
    },
    {
        id: 2,
        nome: "Honda CB 300F",
        preco: 25000,
        imagem: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800",
        descricao: "Design esportivo e desempenho."
    },
    {
        id: 3,
        nome: "Honda XRE 300",
        preco: 32000,
        imagem: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800",
        descricao: "Aventura e liberdade em qualquer caminho."
    },
    {
        id: 4,
        nome: "Honda Biz 125",
        preco: 15000,
        imagem: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800",
        descricao: "Praticidade e conforto."
    },
    {
        id: 5,
        nome: "Honda PCX 160",
        preco: 21000,
        imagem: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800",
        descricao: "Tecnologia e sofisticação."
    },
    {
        id: 6,
        nome: "Honda CB 500F",
        preco: 42000,
        imagem: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800",
        descricao: "Performance para grandes emoções."
    }
];

let carrinho = [];

function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// MOSTRAR PRODUTOS

function mostrarProdutos() {
    const lista = document.getElementById("listaProdutos");

    lista.innerHTML = produtos.map(produto => `
        <div class="produto">
            <img src="${produto.imagem}" alt="${produto.nome}">

            <h3>${produto.nome}</h3>

            <p>${produto.descricao}</p>

            <p class="preco">
                R$ ${formatarPreco(produto.preco)}
            </p>

            <button onclick="adicionarCarrinho(${produto.id})">
                ADICIONAR AO CARRINHO
            </button>
        </div>
    `).join("");
}

// ADICIONAR AO CARRINHO

function adicionarCarrinho(id) {
    const produto = produtos.find(p => p.id === id);

    const item = carrinho.find(p => p.id === id);

    if (item) {
        item.quantidade++;
    } else {
        carrinho.push({
            ...produto,
            quantidade: 1
        });
    }

    atualizarCarrinho();

    alert(produto.nome + " adicionado ao carrinho!");
}

// ATUALIZAR CARRINHO

function atualizarCarrinho() {
    const lista = document.getElementById("itensCarrinho");

    lista.innerHTML = "";

    let total = 0;
    let quantidadeTotal = 0;

    carrinho.forEach(item => {

        total += item.preco * item.quantidade;
        quantidadeTotal += item.quantidade;

        lista.innerHTML += `
            <div class="item-carrinho">

                <div>
                    <strong>${item.nome}</strong>
                    <p>Quantidade: ${item.quantidade}</p>
                    <p>R$ ${formatarPreco(item.preco * item.quantidade)}</p>
                </div>

                <button onclick="removerProduto(${item.id})">
                    Remover
                </button>

            </div>
        `;
    });

    document.getElementById("total").textContent =
        formatarPreco(total);

    document.getElementById("contador").textContent =
        quantidadeTotal;
}

// REMOVER PRODUTO

function removerProduto(id) {
    carrinho = carrinho.filter(item => item.id !== id);

    atualizarCarrinho();
}

// ABRIR E FECHAR CARRINHO

function abrirCarrinho() {
    document.getElementById("carrinho")
        .classList.toggle("ativo");
}

// FINALIZAR COMPRA

function finalizarCompra() {

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    const total = carrinho.reduce(
        (soma, item) => soma + item.preco * item.quantidade,
        0
    );

    alert(
        "Pedido realizado com sucesso!\n" +
        "Valor total: R$ " + formatarPreco(total) +
        "\n\nEsta é uma demonstração. Nenhum pagamento foi realizado."
    );

    carrinho = [];
    atualizarCarrinho();
    abrirCarrinho();
}

// INICIALIZAR SITE

mostrarProdutos();
atualizarCarrinho();
