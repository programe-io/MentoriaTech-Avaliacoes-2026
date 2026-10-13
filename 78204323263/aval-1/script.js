```javascript
const produtos = [
    {
        nome: "Tênis Urban Black",
        preco: 199.90,
        antigo: 249.90,
        estoque: 12,
        imagem: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    },
    {
        nome: "Tênis Esportivo Red",
        preco: 159.90,
        antigo: 199.90,
        estoque: 8,
        imagem: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500"
    },
    {
        nome: "Tênis Casual White",
        preco: 179.90,
        antigo: 219.90,
        estoque: 15,
        imagem: "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?w=500"
    },
    {
        nome: "Tênis Street Style",
        preco: 189.90,
        antigo: 239.90,
        estoque: 10,
        imagem: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500"
    },
    {
        nome: "Tênis Running Pro",
        preco: 229.90,
        antigo: 279.90,
        estoque: 7,
        imagem: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=500"
    },
    {
        nome: "Tênis Fashion Blue",
        preco: 149.90,
        antigo: 189.90,
        estoque: 9,
        imagem: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500"
    },
    {
        nome: "Tênis Sport Comfort",
        preco: 209.90,
        antigo: 259.90,
        estoque: 6,
        imagem: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=500"
    },
    {
        nome: "Tênis Classic",
        preco: 139.90,
        antigo: 179.90,
        estoque: 11,
        imagem: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500"
    },
    {
        nome: "Tênis Premium",
        preco: 269.90,
        antigo: 329.90,
        estoque: 5,
        imagem: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500"
    },
    {
        nome: "Tênis Street Pro",
        preco: 189.90,
        antigo: 229.90,
        estoque: 13,
        imagem: "https://images.unsplash.com/photo-1465453869711-7e174808ace9?w=500"
    }
];

const lista = document.getElementById("listaProdutos");

function mostrarProdutos() {
    lista.innerHTML = "";

    produtos.forEach((produto, indice) => {
        const card = document.createElement("div");
        card.className = "produto";

        card.innerHTML = `
            <img src="${produto.imagem}"
                 alt="${produto.nome}"
                 loading="lazy">

            <h3>${produto.nome}</h3>

            <p class="preco-antigo">
                De R$ ${produto.antigo.toFixed(2).replace(".", ",")}
            </p>

            <p class="preco">
                R$ ${produto.preco.toFixed(2).replace(".", ",")}
            </p>

            <p class="estoque">
                Estoque: ${produto.estoque} unidades
            </p>

            <button onclick="comprar(${indice})"
                ${produto.estoque <= 0 ? "disabled" : ""}>
                ${produto.estoque <= 0 ? "ESGOTADO" : "COMPRAR"}
            </button>
        `;

        lista.appendChild(card);
    });
}

function comprar(indice) {
    const produto = produtos[indice];

    if (produto.estoque <= 0) {
        alert("Produto esgotado!");
        return;
    }

    const confirmar = confirm(
        `Deseja comprar ${produto.nome} por R$ ${
            produto.preco.toFixed(2).replace(".", ",")
        }?`
    );

    if (confirmar) {
        produto.estoque--;
        mostrarProdutos();

        alert(
            "Compra demonstrativa realizada! " +
            "Estoque atualizado nesta página."
        );
    }
}

document.getElementById("formContato")
    .addEventListener("submit", function(event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value;

        document.getElementById("retorno").textContent =
            `Obrigado, ${nome}! Sua mensagem foi registrada nesta demonstração.`;

        this.reset();
    });

mostrarProdutos();
```