
let produtos = [
    { id: 1, nome: "Camiseta", preco: 49.90, quantidade: 20, imagem: "👕" },
    { id: 2, nome: "Calça Jeans", preco: 99.90, quantidade: 15, imagem: "👖" },
    { id: 3, nome: "Vestido", preco: 89.90, quantidade: 10, imagem: "👗" },
    { id: 4, nome: "Blusa", preco: 59.90, quantidade: 25, imagem: "👚" },
    { id: 5, nome: "Short", preco: 45.90, quantidade: 15, imagem: "🩳" },
    { id: 6, nome: "Tênis", preco: 129.90, quantidade: 8, imagem: "👟" }
];

let carrinho = [];

function mostrarProdutos() {
    let lista = document.getElementById("produtos");

    lista.innerHTML = "";

    produtos.forEach(produto => {
        lista.innerHTML += `
            <div class="card">
                <div class="emoji">${produto.imagem}</div>
                <h3>${produto.nome}</h3>
                <div class="preco">
                    R$ ${produto.preco.toFixed(2).replace(".", ",")}
                </div>
                <p>Estoque: ${produto.quantidade} unidades</p>

                <button onclick="adicionarCarrinho(${produto.id})"
                    ${produto.quantidade === 0 ? "disabled" : ""}>
                    Adicionar ao carrinho
                </button>
            </div>
        `;
    });

    mostrarEstoque();
}

function adicionarCarrinho(id) {
    let produto = produtos.find(p => p.id === id);

    let item = carrinho.find(p => p.id === id);

    let quantidadeCarrinho = item ? item.quantidade : 0;

    if (quantidadeCarrinho >= produto.quantidade) {
        alert("Quantidade máxima disponível no estoque!");
        return;
    }

    if (item) {
        item.quantidade++;
    } else {
        carrinho.push({
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            quantidade: 1
        });
    }

    mostrarCarrinho();
}

function mostrarCarrinho() {
    let lista = document.getElementById("itensCarrinho");

    lista.innerHTML = "";

    if (carrinho.length === 0) {
        lista.innerHTML = "<p>Seu carrinho está vazio.</p>";
    }

    carrinho.forEach(item => {
        lista.innerHTML += `
            <div class="item-carrinho">
                <span>${item.nome}</span>

                <input type="number"
                    min="1"
                    max="${produtos.find(p => p.id === item.id).quantidade}"
                    value="${item.quantidade}"
                    onchange="alterarQuantidade(${item.id}, this.value)">

                <span>
                    R$ ${(item.preco * item.quantidade).toFixed(2).replace(".", ",")}
                </span>

                <button onclick="removerCarrinho(${item.id})">
                    Remover
                </button>
            </div>
        `;
    });

    let total = carrinho.reduce(
        (soma, item) => soma + item.preco * item.quantidade, 0
    );

    document.getElementById("total").innerText =
        "Total: R$ " + total.toFixed(2).replace(".", ",");
}

function alterarQuantidade(id, valor) {
    let quantidade = Number(valor);

    let produto = produtos.find(p => p.id === id);
    let item = carrinho.find(p => p.id === id);

    if (!item) return;

    if (!Number.isInteger(quantidade) || quantidade < 1 ||
        quantidade > produto.quantidade) {
        alert("Quantidade inválida ou estoque insuficiente!");
        mostrarCarrinho();
        return;
    }

    item.quantidade = quantidade;
    mostrarCarrinho();
}

function removerCarrinho(id) {
    carrinho = carrinho.filter(item => item.id !== id);
    mostrarCarrinho();
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    for (let item of carrinho) {
        let produto = produtos.find(p => p.id === item.id);

        if (!produto || produto.quantidade < item.quantidade) {
            alert("Estoque insuficiente para " + item.nome);
            return;
        }
    }

    carrinho.forEach(item => {
        let produto = produtos.find(p => p.id === item.id);

        produto.quantidade -= item.quantidade;
    });

    alert("Compra realizada com sucesso! Obrigado pela preferência.");

    carrinho = [];

    mostrarCarrinho();
    mostrarProdutos();
}

function mostrarEstoque() {
    let lista = document.getElementById("listaEstoque");

    lista.innerHTML = "";

    produtos.forEach(produto => {
        lista.innerHTML += `
            <div class="item-estoque">
                <span>${produto.nome}</span>
                <strong>${produto.quantidade} unidades</strong>
            </div>
        `;
    });
}

mostrarProdutos();
mostrarCarrinho();
