/* ==================================
   PRODUTOS DA LOJA
================================== */

const produtos = [
    {
        id: 1,
        nome: "Base Glow",
        categoria: "face",
        descricao: "Base de alta cobertura com acabamento luminoso.",
        preco: 59.90,
        precoAntigo: 79.90,
        estoque: 12,
        emoji: "✨"
    },

    {
        id: 2,
        nome: "Batom Velvet",
        categoria: "labios",
        descricao: "Batom matte confortável e de longa duração.",
        preco: 29.90,
        precoAntigo: 39.90,
        estoque: 8,
        emoji: "💄"
    },

    {
        id: 3,
        nome: "Paleta Sunset",
        categoria: "olhos",
        descricao: "Paleta com 12 cores modernas e pigmentadas.",
        preco: 69.90,
        precoAntigo: 99.90,
        estoque: 5,
        emoji: "🎨"
    },

    {
        id: 4,
        nome: "Blush Rosé",
        categoria: "face",
        descricao: "Blush compacto com acabamento natural.",
        preco: 34.90,
        precoAntigo: 44.90,
        estoque: 15,
        emoji: "🌸"
    },

    {
        id: 5,
        nome: "Gloss Crystal",
        categoria: "labios",
        descricao: "Gloss brilhante para lábios hidratados.",
        preco: 24.90,
        precoAntigo: 34.90,
        estoque: 20,
        emoji: "💋"
    },

    {
        id: 6,
        nome: "Máscara Volume",
        categoria: "olhos",
        descricao: "Máscara para cílios com efeito de volume.",
        preco: 39.90,
        precoAntigo: 49.90,
        estoque: 3,
        emoji: "👁️"
    },

    {
        id: 7,
        nome: "Iluminador Gold",
        categoria: "face",
        descricao: "Iluminador dourado para um brilho sofisticado.",
        preco: 44.90,
        precoAntigo: 59.90,
        estoque: 10,
        emoji: "🌟"
    },

    {
        id: 8,
        nome: "Delineador Black",
        categoria: "olhos",
        descricao: "Delineador preto de alta precisão.",
        preco: 27.90,
        precoAntigo: 35.90,
        estoque: 0,
        emoji: "🖤"
    }
];


/* ==================================
   CARRINHO
================================== */

let carrinho = [];


/* ==================================
   FORMATAR PREÇO
================================== */

function formatarPreco(valor) {

    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}


/* ==================================
   MOSTRAR PRODUTOS
================================== */

function mostrarProdutos(lista = produtos) {

    const container =
        document.getElementById("listaProdutos");

    container.innerHTML = "";

    if (lista.length === 0) {

        container.innerHTML = `
            <p>
                Nenhum produto encontrado.
            </p>
        `;

        return;
    }


    lista.forEach(produto => {

        let estoqueTexto;
        let estoqueClasse;

        if (produto.estoque === 0) {

            estoqueTexto = "Produto esgotado";
            estoqueClasse = "out";

        } else if (produto.estoque <= 5) {

            estoqueTexto =
                `Últimas ${produto.estoque} unidades`;

            estoqueClasse = "low";

        } else {

            estoqueTexto =
                `${produto.estoque} unidades em estoque`;

            estoqueClasse = "available";
        }


        const card = document.createElement("article");

        card.className = "product-card";

        card.innerHTML = `

            <div class="product-image">
                ${produto.emoji}
            </div>

            <div class="product-info">

                <span class="category">
                    ${nomeCategoria(produto.categoria)}
                </span>

                <h3>
                    ${produto.nome}
                </h3>

                <p class="description">
                    ${produto.descricao}
                </p>

                <div class="price-area">

                    <div>

                        <span class="old-price">
                            ${formatarPreco(produto.precoAntigo)}
                        </span>

                        <span class="price">
                            ${formatarPreco(produto.preco)}
                        </span>

                    </div>

                </div>

                <div class="stock ${estoqueClasse}">
                    ${estoqueTexto}
                </div>

                <button
                    class="buy-button"
                    onclick="adicionarCarrinho(${produto.id})"
                    ${produto.estoque === 0 ? "disabled" : ""}
                >
                    ${
                        produto.estoque === 0
                            ? "Esgotado"
                            : "Adicionar ao carrinho"
                    }
                </button>

            </div>
        `;

        container.appendChild(card);

    });

}


/* ==================================
   NOME DAS CATEGORIAS
================================== */

function nomeCategoria(categoria) {

    const categorias = {

        face: "Face",

        olhos: "Olhos",

        labios: "Lábios"

    };

    return categorias[categoria] || categoria;
}


/* ==================================
   FILTRO
================================== */

function filtrarProdutos() {

    const categoria =
        document.getElementById("filtroCategoria").value;


    if (categoria === "todos") {

        mostrarProdutos(produtos);

        return;
    }


    const filtrados =
        produtos.filter(produto =>
            produto.categoria === categoria
        );


    mostrarProdutos(filtrados);

}


/* ==================================
   ADICIONAR AO CARRINHO
================================== */

function adicionarCarrinho(id) {

    const produto =
        produtos.find(item => item.id === id);


    if (!produto || produto.estoque <= 0) {

        alert("Este produto está esgotado.");

        return;
    }


    const itemCarrinho =
        carrinho.find(item => item.id === id);


    if (itemCarrinho) {

        if (itemCarrinho.quantidade >= produto.estoque) {

            alert(
                "Você atingiu o limite disponível em estoque."
            );

            return;
        }

        itemCarrinho.quantidade++;

    } else {

        carrinho.push({

            id: produto.id,

            nome: produto.nome,

            preco: produto.preco,

            quantidade: 1

        });

    }


    atualizarCarrinho();

    alert(`${produto.nome} foi adicionado ao carrinho!`);

}


/* ==================================
   ATUALIZAR CARRINHO
================================== */

function atualizarCarrinho() {

    const container =
        document.getElementById("itensCarrinho");

    const contador =
        document.getElementById("contadorCarrinho");

    const total =
        document.getElementById("totalCarrinho");


    container.innerHTML = "";


    let quantidadeTotal = 0;

    let valorTotal = 0;


    if (carrinho.length === 0) {

        container.innerHTML = `
            <div class="empty-cart">
                Seu carrinho está vazio 🛍️
            </div>
        `;

    }


    carrinho.forEach(item => {

        quantidadeTotal += item.quantidade;

        valorTotal +=
            item.preco * item.quantidade;


        const elemento =
            document.createElement("div");

        elemento.className = "cart-item";


        elemento.innerHTML = `

            <div class="cart-item-info">

                <strong>
                    ${item.nome}
                </strong>

                <span>
                    ${item.quantidade}x
                    ${formatarPreco(item.preco)}
                </span>

            </div>

            <button
                class="remove-button"
                onclick="removerCarrinho(${item.id})"
            >
                ×
            </button>

        `;


        container.appendChild(elemento);

    });


    contador.textContent = quantidadeTotal;

    total.textContent =
        formatarPreco(valorTotal);

}


/* ==================================
   REMOVER DO CARRINHO
================================== */

function removerCarrinho(id) {

    const item =
        carrinho.find(item => item.id === id);


    if (!item) return;


    if (item.quantidade > 1) {

        item.quantidade--;

    } else {

        carrinho =
            carrinho.filter(item => item.id !== id);

    }


    atualizarCarrinho();

}


/* ==================================
   ABRIR CARRINHO
================================== */

function abrirCarrinho() {

    document
        .getElementById("modalCarrinho")
        .classList.add("active");

}


/* ==================================
   FECHAR CARRINHO
================================== */

function fecharCarrinho() {

    document
        .getElementById("modalCarrinho")
        .classList.remove("active");

}


/* ==================================
   FINALIZAR COMPRA
================================== */

function finalizarCompra() {

    if (carrinho.length === 0) {

        alert(
            "Seu carrinho está vazio!"
        );

        return;
    }


    let total = 0;


    carrinho.forEach(item => {

        total +=
            item.preco * item.quantidade;

    });


    alert(
        `Compra realizada com sucesso!\n\n` +
        `Total: ${formatarPreco(total)}\n\n` +
        `Obrigado por comprar na Bella Glow! 💄`
    );


    /* Atualiza o estoque */

    carrinho.forEach(item => {

        const produto =
            produtos.find(p => p.id === item.id);


        if (produto) {

            produto.estoque -= item.quantidade;

        }

    });


    carrinho = [];


    atualizarCarrinho();

    mostrarProdutos();


    fecharCarrinho();

}


/* ==================================
   FECHAR MODAL CLICANDO FORA
================================== */

document
    .getElementById("modalCarrinho")
    .addEventListener("click", function(event) {

        if (event.target === this) {

            fecharCarrinho();

        }

    });


/* ==================================
   INICIALIZAÇÃO
================================== */