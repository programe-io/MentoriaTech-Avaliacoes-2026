
const produtos = [

    {
        nome: "iPhone 15 Pro Max",
        marca: "Apple",
        preco: 5999.90,
        antigo: 6999.90,
        estoque: 8,
        imagem: "https://images.unsplash.com/photo-1696446702183-cbd13d9a4c76?w=700",
        promocao: true
    },

    {
        nome: "Samsung Galaxy S24",
        marca: "Samsung",
        preco: 3299.90,
        antigo: 3799.90,
        estoque: 12,
        imagem: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=700",
        promocao: true
    },

    {
        nome: "iPhone 14",
        marca: "Apple",
        preco: 3799.90,
        antigo: 4299.90,
        estoque: 5,
        imagem: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=700",
        promocao: true
    },

    {
        nome: "Motorola Edge 50",
        marca: "Motorola",
        preco: 2199.90,
        antigo: 0,
        estoque: 10,
        imagem: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=700",
        promocao: false
    },

    {
        nome: "Xiaomi Redmi Note 13",
        marca: "Xiaomi",
        preco: 1499.90,
        antigo: 1799.90,
        estoque: 15,
        imagem: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=700",
        promocao: true
    },

    {
        nome: "Samsung Galaxy A55",
        marca: "Samsung",
        preco: 1999.90,
        antigo: 0,
        estoque: 7,
        imagem: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=700",
        promocao: false
    }
];

const lista = document.getElementById("lista-produtos");
const pesquisa = document.getElementById("pesquisa");
const marca = document.getElementById("marca");

function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function mostrarProdutos() {

    const termo = pesquisa.value.toLowerCase();
    const filtroMarca = marca.value;

    const filtrados = produtos.filter(produto => {

        const nomeEncontrado =
            produto.nome.toLowerCase().includes(termo);

        const marcaEncontrada =
            filtroMarca === "todos" ||
            produto.marca === filtroMarca;

        return nomeEncontrado && marcaEncontrada;
    });

    lista.innerHTML = "";

    if (filtrados.length === 0) {
        lista.innerHTML = "<p>Nenhum celular encontrado.</p>";
        return;
    }

    filtrados.forEach(produto => {

        const mensagem = encodeURIComponent(
            `Olá! Tenho interesse no ${produto.nome}. Valor: ${formatarPreco(produto.preco)}.`
        );

        lista.innerHTML += `

            <div class="card">

                <img
                    src="${produto.imagem}"
                    alt="${produto.nome}"
                >

                <div class="card-info">

                    ${produto.promocao ?
                    "<p style='color:#009edb;font-weight:bold'>🔥 PROMOÇÃO</p>"
                    : ""}

                    <p class="marca">${produto.marca}</p>

                    <h3>${produto.nome}</h3>

                    <p class="preco">
                        ${formatarPreco(produto.preco)}

                        ${produto.antigo > 0 ?
                        `<span class="preco-antigo">
                            ${formatarPreco(produto.antigo)}
                        </span>`
                        : ""}
                    </p>

                    <p class="estoque">
                        ${produto.estoque > 0 ?
                        `✓ ${produto.estoque} unidades em estoque`
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
marca.addEventListener("change", mostrarProdutos);

mostrarProdutos();
