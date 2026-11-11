
let produtos = [
    {
        nome: "Creme Hidratante",
        preco: 39.90,
        antigo: 49.90,
        estoque: 10,
        imagem: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500"
    },
    {
        nome: "Creme Facial",
        preco: 29.90,
        antigo: 39.90,
        estoque: 8,
        imagem: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=500"
    },
    {
        nome: "Creme Corporal",
        preco: 45.90,
        antigo: 59.90,
        estoque: 5,
        imagem: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=500"
    },
    {
        nome: "Creme Nutritivo",
        preco: 34.90,
        antigo: 44.90,
        estoque: 12,
        imagem: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500"
    }
];

let carrinho = [];

function mostrarProdutos() {
    let area = document.getElementById("listaProdutos");
    area.innerHTML = "";

    produtos.forEach((p, i) => {
        area.innerHTML += `
        <div class="card">
            <img src="${p.imagem}" alt="${p.nome}">
            <h3>${p.nome}</h3>
            <p class="antigo">R$ ${p.antigo.toFixed(2)}</p>
            <p class="preco">R$ ${p.preco.toFixed(2)}</p>
            <p class="estoque">
                ${p.estoque > 0
                    ? "Estoque: " + p.estoque + " unidades"
                    : "Produto esgotado"}
            </p>
            <button class="botao"
                onclick="adicionar(${i})"
                ${p.estoque <= 0 ? "disabled" : ""}>
                Adicionar ao carrinho
            </button>
        </div>`;
    });
}

function adicionar(i) {
    if (produtos[i].estoque <= 0) return;

    produtos[i].estoque--;

    let item = carrinho.find(
        p => p.nome === produtos[i].nome
    );

    if (item) {
        item.quantidade++;
    } else {
        carrinho.push({
            nome: produtos[i].nome,
            preco: produtos[i].preco,
            quantidade: 1
        });
    }

    mostrarProdutos();
    mostrarCarrinho();
}

function mostrarCarrinho() {
    let area = document.getElementById("itens");
    let total = 0;

    if (carrinho.length === 0) {
        area.innerHTML = "Seu carrinho está vazio.";
    } else {
        area.innerHTML = carrinho.map(p => {
            total += p.preco * p.quantidade;

            return `<p>
                ${p.nome} - ${p.quantidade}x -
                R$ ${(p.preco * p.quantidade).toFixed(2)}
            </p>`;
        }).join("");
    }

    document.getElementById("total").innerText =
        total.toFixed(2);
}

function finalizar() {
    if (carrinho.length === 0) {
        alert("Adicione produtos ao carrinho primeiro!");
        return;
    }

    let mensagem = "Olá! Quero fazer este pedido:\n";

    carrinho.forEach(p => {
        mensagem += `- ${p.nome} (${p.quantidade}x)\n`;
    });

    let total = carrinho.reduce(
        (s, p) => s + p.preco * p.quantidade, 0
    );

    mensagem += `\nTotal: R$ ${total.toFixed(2)}`;

    window.open(
        "https://wa.me/5586999999999?text=" +
        encodeURIComponent(mensagem),
        "_blank"
    );
}

mostrarProdutos();
