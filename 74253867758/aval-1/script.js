
const produtos = [
    {
        id: 1,
        nome: "Tênis Esportivo",
        preco: 199.90,
        imagem: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    },
    {
        id: 2,
        nome: "Relógio Digital",
        preco: 149.90,
        imagem: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
    },
    {
        id: 3,
        nome: "Fone Bluetooth",
        preco: 89.90,
        imagem: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
    },
    {
        id: 4,
        nome: "Mochila",
        preco: 119.90,
        imagem: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"
    }
];

let carrinho = [];

const formatar = valor =>
    valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

// Mostrar produtos
function mostrarProdutos() {
    const area = document.getElementById("produtos");

    area.innerHTML = produtos.map(produto => `
        <div class="produto">
            <img src="${produto.imagem}" alt="${produto.nome}">
            <h3>${produto.nome}</h3>
            <p class="preco">${formatar(produto.preco)}</p>
            <button onclick="adicionarCarrinho(${produto.id})">
                Adicionar ao carrinho
            </button>
        </div>
    `).join("");
}

// Adicionar produto
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

    atualizarCarrinho();
}

// Alterar quantidade
function alterarQuantidade(id, valor) {
    const produto = carrinho.find(p => p.id === id);

    if (!produto) return;

    produto.quantidade += valor;

    if (produto.quantidade <= 0) {
        carrinho = carrinho.filter(p => p.id !== id);
    }

    atualizarCarrinho();
}

// Remover produto
function removerProduto(id) {
    carrinho = carrinho.filter(p => p.id !== id);
    atualizarCarrinho();
}

// Atualizar carrinho e valores
function atualizarCarrinho() {
    const area = document.getElementById("itensCarrinho");

    area.innerHTML = carrinho.map(produto => `
        <div class="item-carrinho">
            <img src="${produto.imagem}" alt="${produto.nome}">

            <div class="item-info">
                <h4>${produto.nome}</h4>

                <p>${formatar(produto.preco)}</p>

                <div class="quantidade">
                    <button onclick="alterarQuantidade(${produto.id}, -1)">-</button>

                    <strong>${produto.quantidade}</strong>

                    <button onclick="alterarQuantidade(${produto.id}, 1)">+</button>
                </div>

                <p>
                    Total: <strong>
                    ${formatar(produto.preco * produto.quantidade)}
                    </strong>
                </p>

                <button class="remover"
                    onclick="removerProduto(${produto.id})">
                    Remover
                </button>
            </div>
        </div>
    `).join("");

    const total = carrinho.reduce(
        (soma, produto) =>
            soma + produto.preco * produto.quantidade,
        0
    );

    const quantidadeTotal = carrinho.reduce(
        (soma, produto) => soma + produto.quantidade,
        0
    );

    document.getElementById("subtotal").textContent = formatar(total);
    document.getElementById("total").textContent = formatar(total);
    document.getElementById("contador").textContent = quantidadeTotal;

    if (carrinho.length === 0) {
        area.innerHTML = "<p>Seu carrinho está vazio!</p>";
    }
}

// Abrir carrinho
document.getElementById("abrirCarrinho").onclick = () => {
    document.getElementById("carrinho").classList.add("ativo");
    document.getElementById("fundo").classList.add("ativo");
};

// Fechar carrinho
function fecharCarrinho() {
    document.getElementById("carrinho").classList.remove("ativo");
    document.getElementById("fundo").classList.remove("ativo");
}

document.getElementById("fecharCarrinho").onclick = fecharCarrinho;
document.getElementById("fundo").onclick = fecharCarrinho;

// Finalizar compra
function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Adicione produtos ao carrinho primeiro!");
        return;
    }

    const total = carrinho.reduce(
        (soma, produto) =>
            soma + produto.preco * produto.quantidade,
        0
    );

    alert(
        "Compra realizada com sucesso!\n" +
        "Total: " + formatar(total)
    );
    
    carrinho = [];
    atualizarCarrinho();
    fecharCarrinho();
}

mostrarProdutos();
atualizarCarrinho();
