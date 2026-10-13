```javascript
const produtos = [
    {
        nome: "Conjunto Infantil Colorido",
        preco: 49.90,
        antigo: 69.90,
        estoque: 12,
        imagem: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500"
    },
    {
        nome: "Camiseta Infantil",
        preco: 29.90,
        antigo: 39.90,
        estoque: 15,
        imagem: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=500"
    },
    {
        nome: "Vestido Infantil",
        preco: 59.90,
        antigo: 79.90,
        estoque: 8,
        imagem: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=500"
    },
    {
        nome: "Look Casual Kids",
        preco: 54.90,
        antigo: 74.90,
        estoque: 10,
        imagem: "https://images.unsplash.com/photo-1503919005314-30d93d07d823?w=500"
    },
    {
        nome: "Conjunto de Verão",
        preco: 44.90,
        antigo: 59.90,
        estoque: 14,
        imagem: "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=500"
    },
    {
        nome: "Jaqueta Infantil",
        preco: 69.90,
        antigo: 89.90,
        estoque: 6,
        imagem: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500"
    },
    {
        nome: "Moda Infantil Básica",
        preco: 34.90,
        antigo: 44.90,
        estoque: 18,
        imagem: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=500"
    },
    {
        nome: "Vestido Floral Kids",
        preco: 64.90,
        antigo: 84.90,
        estoque: 7,
        imagem: "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=500"
    },
    {
        nome: "Conjunto Esportivo",
        preco: 49.90,
        antigo: 64.90,
        estoque: 11,
        imagem: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500"
    },
    {
        nome: "Look Infantil Premium",
        preco: 79.90,
        antigo: 99.90,
        estoque: 5,
        imagem: "https://images.unsplash.com/photo-1503919005314-30d93d07d823?w=500"
    }
];

const lista = document.getElementById("listaProdutos");

function mostrarProdutos() {
    lista.innerHTML = "";

    produtos.forEach((produto, indice) => {
        const card = document.createElement("article");
        card.className = "produto";

        card.innerHTML = `
            <img
                src="${produto.imagem}"
                alt="${produto.nome}"
                loading="lazy"
            >

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

            <button
                onclick="comprar(${indice})"
                ${produto.estoque <= 0 ? "disabled" : ""}
            >
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
            "O estoque foi atualizado nesta página."
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