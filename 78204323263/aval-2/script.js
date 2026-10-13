```javascript
const produtos = [
    {
        nome: "Batom Matte Rosa",
        preco: 19.90,
        antigo: 29.90,
        estoque: 20,
        imagem: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500"
    },
    {
        nome: "Paleta de Sombras",
        preco: 39.90,
        antigo: 54.90,
        estoque: 12,
        imagem: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500"
    },
    {
        nome: "Base Líquida",
        preco: 34.90,
        antigo: 44.90,
        estoque: 15,
        imagem: "https://images.unsplash.com/photo-1631214540242-6b5c3a8f6f8a?w=500"
    },
    {
        nome: "Pó Compacto",
        preco: 24.90,
        antigo: 32.90,
        estoque: 10,
        imagem: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500"
    },
    {
        nome: "Máscara para Cílios",
        preco: 22.90,
        antigo: 29.90,
        estoque: 18,
        imagem: "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=500"
    },
    {
        nome: "Blush Rosado",
        preco: 21.90,
        antigo: 28.90,
        estoque: 14,
        imagem: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=500"
    },
    {
        nome: "Iluminador Glow",
        preco: 27.90,
        antigo: 36.90,
        estoque: 9,
        imagem: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=500"
    },
    {
        nome: "Gloss Labial",
        preco: 17.90,
        antigo: 24.90,
        estoque: 25,
        imagem: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=500"
    },
    {
        nome: "Kit de Pincéis",
        preco: 44.90,
        antigo: 59.90,
        estoque: 8,
        imagem: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500"
    },
    {
        nome: "Delineador Preto",
        preco: 18.90,
        antigo: 25.90,
        estoque: 16,
        imagem: "https://images.unsplash.com/photo-1512207846876-bb54ef5056a7?w=500"
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
        alert("Este produto está esgotado!");
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
            `Obrigada, ${nome}! Sua mensagem foi registrada nesta demonstração.`;

        this.reset();
    });

mostrarProdutos();
```