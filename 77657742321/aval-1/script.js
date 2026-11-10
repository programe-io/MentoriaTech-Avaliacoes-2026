
const produtos = [
    {nome: "Batom Rosa", preco: 29.90, categoria: "labios", emoji: "💄"},
    {nome: "Gloss Labial", preco: 24.90, categoria: "labios", emoji: "💋"},
    {nome: "Blush Rosado", preco: 35.90, categoria: "rosto", emoji: "🌸"},
    {nome: "Base Líquida", preco: 49.90, categoria: "rosto", emoji: "🧴"},
    {nome: "Máscara de Cílios", preco: 32.90, categoria: "olhos", emoji: "👁️"},
    {nome: "Paleta de Sombras", preco: 59.90, categoria: "olhos", emoji: "🎨"},
    {nome: "Pó Compacto", preco: 39.90, categoria: "rosto", emoji: "✨"},
    {nome: "Delineador", preco: 27.90, categoria: "olhos", emoji: "🖤"}
];

let carrinho = [];

function mostrarProdutos(lista) {
    const area = document.getElementById("listaProdutos");

    area.innerHTML = "";

    lista.forEach((produto) => {
        area.innerHTML += `
            <div class="produto">
                <div class="produto-imagem">${produto.emoji}</div>
                <h3>${produto.nome}</h3>
                <p>Qualidade e beleza para você!</p>
                <div class="preco">
                    R$ ${produto.preco.toFixed(2).replace(".", ",")}
                </div>
                <button class="adicionar"
                    onclick="adicionarCarrinho('${produto.nome}')">
                    Adicionar ao carrinho
                </button>
            </div>
        `;
    });
}

function filtrar(categoria) {
    if (categoria === "todos") {
        mostrarProdutos(produtos);
    } else {
        const filtrados = produtos.filter(
            produto => produto.categoria === categoria
        );

        mostrarProdutos(filtrados);
    }
}

function adicionarCarrinho(nome) {
    const produto = produtos.find(p => p.nome === nome);

    carrinho.push(produto);

    atualizarCarrinho();

    alert(nome + " foi adicionado ao carrinho!");
}

function atualizarCarrinho() {
    document.getElementById("quantidade").textContent =
        carrinho.length;

    const area = document.getElementById("itensCarrinho");

    area.innerHTML = "";

    let total = 0;

    carrinho.forEach((produto, index) => {
        total += produto.preco;

        area.innerHTML += `
            <div class="item-carrinho">
                <span>${produto.nome}</span>
                <span>R$ ${produto.preco.toFixed(2).replace(".", ",")}</span>
                <button onclick="removerItem(${index})">❌</button>
            </div>
        `;
    });

    document.getElementById("total").textContent =
        total.toFixed(2).replace(".", ",");
}

function removerItem(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

function mostrarCarrinho() {
    document.getElementById("modal").style.display = "flex";
}

function fecharCarrinho() {
    document.getElementById("modal").style.display = "none";
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    alert("Compra demonstrativa realizada com sucesso! 💗");

    carrinho = [];
    atualizarCarrinho();
    fecharCarrinho();
}

mostrarProdutos(produtos);
