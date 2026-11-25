
const produtos = [
    {
        id: 1,
        nome: "Mochila Escolar",
        preco: 89.90,
        estoque: 50,
        imagem: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400"
    },
    {
        id: 2,
        nome: "Caderno 10 Matérias",
        preco: 25.90,
        estoque: 100,
        imagem: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400"
    },
    {
        id: 3,
        nome: "Estojo Escolar",
        preco: 19.90,
        estoque: 70,
        imagem: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=400"
    },
    {
        id: 4,
        nome: "Lápis de Escrever",
        preco: 2.50,
        estoque: 300,
        imagem: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400"
    },
    {
        id: 5,
        nome: "Canetas Coloridas",
        preco: 15.90,
        estoque: 120,
        imagem: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400"
    },
    {
        id: 6,
        nome: "Kit de Réguas",
        preco: 12.90,
        estoque: 80,
        imagem: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400"
    },
    {
        id: 7,
        nome: "Borracha",
        preco: 3.50,
        estoque: 200,
        imagem: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400"
    },
    {
        id: 8,
        nome: "Calculadora",
        preco: 39.90,
        estoque: 40,
        imagem: "https://images.unsplash.com/photo-1574607383476-f517f260d30b?w=400"
    }
];

let carrinho = [];

function dinheiro(valor) {
    return valor.toFixed(2).replace(".", ",");
}

function mostrarProdutos() {
    const area = document.getElementById("produtos");

    area.innerHTML = produtos.map(p => `
        <div class="produto">
            <img src="${p.imagem}" alt="${p.nome}">
            <h3>${p.nome}</h3>
            <p class="preco">R$ ${dinheiro(p.preco)}</p>
            <p class="estoque">
                Estoque disponível: ${p.estoque} unidades
            </p>
            <button onclick="adicionar(${p.id})">
                Adicionar ao carrinho
            </button>
        </div>
    `).join("");
}

function adicionar(id) {
    const produto = produtos.find(p => p.id === id);
    const item = carrinho.find(p => p.id === id);

    if (produto.estoque <= 0) {
        alert("Produto sem estoque!");
        return;
    }

    produto.estoque--;

    if (item) {
        item.quantidade++;
    } else {
        carrinho.push({
            ...produto,
            quantidade: 1
        });
    }

    atualizarCarrinho();
    mostrarProdutos();
}

function alterarQuantidade(id, valor) {
    const item = carrinho.find(p => p.id === id);
    const produto = produtos.find(p => p.id === id);

    if (!item) return;

    if (valor > 0) {
        if (produto.estoque <= 0) {
            alert("Não temos mais unidades disponíveis!");
            return;
        }

        item.quantidade++;
        produto.estoque--;
    } else {
        item.quantidade--;
        produto.estoque++;

        if (item.quantidade <= 0) {
            carrinho = carrinho.filter(p => p.id !== id);
        }
    }

    atualizarCarrinho();
    mostrarProdutos();
}

function remover(id) {
    const item = carrinho.find(p => p.id === id);
    const produto = produtos.find(p => p.id === id);

    if (item) {
        produto.estoque += item.quantidade;
    }

    carrinho = carrinho.filter(p => p.id !== id);

    atualizarCarrinho();
    mostrarProdutos();
}

function atualizarCarrinho() {
    const area = document.getElementById("itensCarrinho");

    area.innerHTML = "";

    carrinho.forEach(item => {
        area.innerHTML += `
            <div class="item">
                <img src="${item.imagem}">
                <div class="item-info">
                    <strong>${item.nome}</strong>
                    <p>R$ ${dinheiro(item.preco)}</p>

                    <div class="quantidade">
                        <button onclick="alterarQuantidade(${item.id}, -1)">-</button>
                        <strong>${item.quantidade}</strong>
                        <button onclick="alterarQuantidade(${item.id}, 1)">+</button>
                    </div>

                    <p>Subtotal: R$ ${dinheiro(item.preco * item.quantidade)}</p>

                    <button class="remover" onclick="remover(${item.id})">
                        Remover produto
                    </button>
                </div>
            </div>
        `;
    });

    if (carrinho.length === 0) {
        area.innerHTML = "<p>Seu carrinho está vazio!</p>";
    }

    const quantidade = carrinho.reduce(
        (soma, item) => soma + item.quantidade, 0
    );

    const total = carrinho.reduce(
        (soma, item) => soma + item.preco * item.quantidade, 0
    );

    document.getElementById("contador").textContent = quantidade;
    document.getElementById("totalItens").textContent = quantidade;
    document.getElementById("total").textContent = dinheiro(total);
}

function abrirCarrinho() {
    document.getElementById("carrinho").classList.add("ativo");
    document.getElementById("fundo").classList.add("ativo");
}

function fecharCarrinho() {
    document.getElementById("carrinho").classList.remove("ativo");
    document.getElementById("fundo").classList.remove("ativo");
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Adicione produtos antes de finalizar!");
        return;
    }

    const total = carrinho.reduce(
        (soma, item) => soma + item.preco * item.quantidade, 0
    );

    alert(
        "Compra realizada com sucesso!\n" +
        "Quantidade de produtos: " +
        carrinho.reduce((soma, item) => soma + item.quantidade, 0) +
        "\nTotal: R$ " + dinheiro(total)
    );

    carrinho.forEach(item => {
        item.quantidade = 0;
    });

    carrinho = [];
    atualizarCarrinho();
    fecharCarrinho();
}

mostrarProdutos();
atualizarCarrinho();
