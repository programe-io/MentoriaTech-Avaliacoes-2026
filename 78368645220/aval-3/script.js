```javascript
const produtos = [
    {
        nome: "Camisa Social Preta",
        preco: 89.90,
        antigo: 119.90,
        estoque: 12,
        imagem: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500"
    },
    {
        nome: "Camisa Social Branca",
        preco: 79.90,
        antigo: 99.90,
        estoque: 15,
        imagem: "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?w=500"
    },
    {
        nome: "Camisa Casual Azul",
        preco: 69.90,
        antigo: 89.90,
        estoque: 10,
        imagem: "https://images.unsplash.com/photo-1620012253295-c15a3e7a8b5b?w=500"
    },
    {
        nome: "Camisa Polo Masculina",
        preco: 59.90,
        antigo: 79.90,
        estoque: 18,
        imagem: "https://images.unsplash.com/photo-1625910513413-5fc45e5e8f8b?w=500"
    },
    {
        nome: "Camisa Estampada",
        preco: 74.90,
        antigo: 94.90,
        estoque: 8,
        imagem: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500"
    },
    {
        nome: "Camisa Slim Fit",
        preco: 99.90,
        antigo: 129.90,
        estoque: 9,
        imagem: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500"
    },
    {
        nome: "Camisa Casual Bege",
        preco: 84.90,
        antigo: 109.90,
        estoque: 11,
        imagem: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=500"
    },
    {
        nome: "Camisa Jeans",
        preco: 109.90,
        antigo: 139.90,
        estoque: 7,
        imagem: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500"
    },
    {
        nome: "Camisa Manga Curta",
        preco: 54.90,
        antigo: 69.90,
        estoque: 14,
        imagem: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
    },
    {
        nome: "Camisa Premium",
        preco: 119.90,
        antigo: 149.90,
        estoque: 5,
        imagem: "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?w=500"
    }
];

const lista = document.getElementById("listaProdutos");

function mostrarProdutos() {
    lista.innerHTML = "";

    produtos.forEach((produto, indice) => {
        const card = document.createElement("article");
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