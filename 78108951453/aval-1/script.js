
const produtos = [

    {
        nome: "Camiseta Básica Premium",
        categoria: "Camisetas",
        preco: 69.90,
        antigo: 89.90,
        estoque: 20,
        imagem: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=700",
        promocao: true
    },

    {
        nome: "Calça Jeans Moderna",
        categoria: "Calças",
        preco: 139.90,
        antigo: 169.90,
        estoque: 12,
        imagem: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=700",
        promocao: true
    },

    {
        nome: "Vestido Elegante",
        categoria: "Vestidos",
        preco: 159.90,
        antigo: 199.90,
        estoque: 8,
        imagem: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=700",
        promocao: true
    },

    {
        nome: "Tênis Casual",
        categoria: "Tênis",
        preco: 189.90,
        antigo: 0,
        estoque: 10,
        imagem: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700",
        promocao: false
    },

    {
        nome: "Jaqueta Estilosa",
        categoria: "Jaquetas",
        preco: 199.90,
        antigo: 249.90,
        estoque: 6,
        imagem: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=700",
        promocao: true
    },

    {
        nome: "Camiseta Oversized",
        categoria: "Camisetas",
        preco: 79.90,
        antigo: 0,
        estoque: 15,
        imagem: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=700",
        promocao: false
    },

    {
        nome: "Vestido Casual",
        categoria: "Vestidos",
        preco: 119.90,
        antigo: 149.90,
        estoque: 9,
        imagem: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=700",
        promocao: true
    },

    {
        nome: "Calça Casual",
        categoria: "Calças",
        preco: 129.90,
        antigo: 0,
        estoque: 7,
        imagem: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=700",
        promocao: false
    }
];

const lista = document.getElementById("lista-produtos");
const pesquisa = document.getElementById("pesquisa");
const categoria = document.getElementById("categoria");

function moeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function mostrarProdutos() {

    const termo = pesquisa.value.toLowerCase();
    const tipo = categoria.value;

    const filtrados = produtos.filter(produto => {

        const nomeEncontrado =
            produto.nome.toLowerCase().includes(termo);

        const categoriaEncontrada =
            tipo === "todos" || produto.categoria === tipo;

        return nomeEncontrado && categoriaEncontrada;
    });

    lista.innerHTML = "";

    if (filtrados.length === 0) {
        lista.innerHTML = "<p>Nenhum produto encontrado.</p>";
        return;
    }

    filtrados.forEach(produto => {

        const mensagem = encodeURIComponent(
            `Olá! Tenho interesse em ${produto.nome}. Preço: ${moeda(produto.preco)}.`
        );

        lista.innerHTML += `

            <div class="card">

                <img
                    src="${produto.imagem}"
                    alt="${produto.nome}"
                >

                <div class="card-info">

                    ${produto.promocao ?
                    "<p style='color:#c5965b;font-weight:bold'>🔥 PROMOÇÃO</p>"
                    : ""}

                    <p class="categoria">
                        ${produto.categoria}
                    </p>

                    <h3>${produto.nome}</h3>

                    <p class="preco">
                        ${moeda(produto.preco)}

                        ${produto.antigo > 0 ?
                        `<span class="preco-antigo">
                            ${moeda(produto.antigo)}
                        </span>`
                        : ""}
                    </p>

                    <p class="estoque">
                        ${produto.estoque > 0 ?
                        `✓ ${produto.estoque} unidades disponíveis`
                        : "Produto indisponível"}
                    </p>

                    <a
                        class="btn"
                        href="https://wa.me/5586999999999?text=${mensagem}"
                        target="_blank"
                    >
                        Comprar pelo WhatsApp
                    </a>

                </div>

            </div>
        `;
    });
}

pesquisa.addEventListener("input", mostrarProdutos);

categoria.addEventListener("change", mostrarProdutos);

mostrarProdutos();
