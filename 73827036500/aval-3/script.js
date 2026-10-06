```javascript
const produtos = [

    {
        id: 1,
        nome: "Bolsa Pink Fashion",
        preco: 149.90,
        estoque: 8,
        categoria: "media",
        avaliacao: 5,
        imagem: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=85"
    },

    {
        id: 2,
        nome: "Bolsa Rosa Elegance",
        preco: 189.90,
        estoque: 5,
        categoria: "grande",
        avaliacao: 5,
        imagem: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=700&q=85"
    },

    {
        id: 3,
        nome: "Bolsa Fashion Lux",
        preco: 169.90,
        estoque: 12,
        categoria: "media",
        avaliacao: 4,
        imagem: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=700&q=85"
    },

    {
        id: 4,
        nome: "Bolsa Moderna",
        preco: 219.90,
        estoque: 3,
        categoria: "grande",
        avaliacao: 5,
        imagem: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=85"
    },

    {
        id: 5,
        nome: "Bolsa Casual Chic",
        preco: 139.90,
        estoque: 10,
        categoria: "media",
        avaliacao: 5,
        imagem: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=700&q=85"
    },

    {
        id: 6,
        nome: "Bolsa Premium",
        preco: 249.90,
        estoque: 6,
        categoria: "grande",
        avaliacao: 5,
        imagem: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=700&q=85"
    },

    {
        id: 7,
        nome: "Bolsa Mini Glam",
        preco: 119.90,
        estoque: 4,
        categoria: "pequena",
        avaliacao: 4,
        imagem: "https://images.unsplash.com/photo-1566150902887-9679aa9a7b3f?auto=format&fit=crop&w=700&q=85"
    },

    {
        id: 8,
        nome: "Bolsa Urbana",
        preco: 159.90,
        estoque: 9,
        categoria: "media",
        avaliacao: 5,
        imagem: "https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&w=700&q=85"
    },

    {
        id: 9,
        nome: "Bolsa Fashion Black",
        preco: 199.90,
        estoque: 7,
        categoria: "grande",
        avaliacao: 5,
        imagem: "https://images.unsplash.com/photo-1585488439951-4d1c8f9c7e9f?auto=format&fit=crop&w=700&q=85"
    },

    {
        id: 10,
        nome: "Bolsa Lux Color",
        preco: 179.90,
        estoque: 2,
        categoria: "pequena",
        avaliacao: 5,
        imagem: "https://images.unsplash.com/photo-1575032617751-6ddec2089882?auto=format&fit=crop&w=700&q=85"
    }

];

let carrinho = [];


/* MOSTRAR PRODUTOS */

function mostrarProdutos(lista = produtos) {

    const container =
        document.getElementById("listaProdutos");

    container.innerHTML = "";

    lista.forEach(produto => {

        const estrelas =
            "★".repeat(produto.avaliacao);

        let estoqueTexto;
        let classeEstoque;

        if (produto.estoque <= 3) {

            estoqueTexto =
                `⚠️ Últimas ${produto.estoque} unidades`;

            classeEstoque =
                "estoque-baixo";

        } else {

            estoqueTexto =
                `✓ ${produto.estoque} unidades em estoque`;

            classeEstoque =
                "estoque";
        }

        container.innerHTML += `

            <article class="produto">

                <div class="produto-img">

                    <img
                        src="${produto.imagem}"
                        alt="${produto.nome}"
                        loading="lazy">

                </div>

                <div class="produto-info">

                    <h3>
                        ${produto.nome}
                    </h3>

                    <div class="estrelas">
                        ${estrelas}
                    </div>

                    <p class="${classeEstoque}">
                        ${estoqueTexto}
                    </p>

                    <div class="preco">
                        R$ ${produto.preco
                            .toFixed(2)
                            .replace(".", ",")}
                    </div>

                    <button
                        class="comprar"
                        onclick="adicionarCarrinho(${produto.id})">

                        🛒 Adicionar ao carrinho

                    </button>

                </div>

            </article>
        `;
    });
}


/* FILTROS */

function filtrar(categoria) {

    if (categoria === "todos") {

        mostrarProdutos(produtos);

        return;
    }

    const filtrados =
        produtos.filter(
            produto =>
                produto.categoria === categoria
        );

    mostrarProdutos(filtrados);
}


/* ADICIONAR AO CARRINHO */

function adicionarCarrinho(id) {

    const produto =
        produtos.find(
            produto => produto.id === id
        );

    const item =
        carrinho.find(
            item => item.id === id
        );

    if (item) {

        if (item.quantidade < produto.estoque) {

            item.quantidade++;

        } else {

            alert(
                "Você atingiu o limite do estoque!"
            );

            return;
        }

    } else {

        carrinho.push({
            ...produto,
            quantidade: 1
        });
    }

    atualizarCarrinho();
}


/* REMOVER */

function removerCarrinho(id) {

    const item =
        carrinho.find(
            item => item.id === id
        );

    if (!item) return;

    if (item.quantidade > 1) {

        item.quantidade--;

    } else {

        carrinho =
            carrinho.filter(
                item => item.id !== id
            );
    }

    atualizarCarrinho();
}


/* ATUALIZAR CARRINHO */

function atualizarCarrinho() {

    const container =
        document.getElementById(
            "itensCarrinho"
        );

    const contador =
        document.getElementById(
            "contador"
        );

    const totalElemento =
        document.getElementById(
            "total"
        );

    const quantidade =
        carrinho.reduce(
            (total, item) =>
                total + item.quantidade,
            0
        );

    contador.textContent =
        quantidade;

    if (carrinho.length === 0) {

        container.innerHTML =
            "<p>Seu carrinho está vazio.</p>";

        totalElemento.textContent =
            "0,00";

        return;
    }

    container.innerHTML = "";

    let total = 0;

    carrinho.forEach(item => {

        total +=
            item.preco *
            item.quantidade;

        container.innerHTML += `

            <div class="item-carrinho">

                <div>

                    <strong>
                        ${item.nome}
                    </strong>

                    <br>

                    ${item.quantidade}x
                    R$ ${item.preco
                        .toFixed(2)
                        .replace(".", ",")}

                </div>

                <button
                    class="remover"
                    onclick="removerCarrinho(${item.id})">

                    −

                </button>

            </div>
        `;
    });

    totalElemento.textContent =
        total.toFixed(2).replace(".", ",");
}


/* ABRIR CARRINHO */

function abrirCarrinho() {

    document.getElementById(
        "modalCarrinho"
    ).style.display = "flex";
}


/* FECHAR CARRINHO */

function fecharCarrinho() {

    document.getElementById(
        "modalCarrinho"
    ).style.display = "none";
}


/* FINALIZAR PELO WHATSAPP */

function finalizarCompra() {

    if (carrinho.length === 0) {

        alert(
            "Seu carrinho está vazio!"
        );

        return;
    }

    let mensagem =
        "Olá! Quero comprar na Bella Bolsas:%0A%0A";

    carrinho.forEach(item => {

        mensagem +=
            "• " +
            item.nome +
            " - " +
            item.quantidade +
            " unidade(s)%0A";
    });

    mensagem +=
        "%0AGostaria de finalizar meu pedido!";

    window.open(
        "https://wa.me/5586999998888?text="
        + mensagem,
        "_blank"
    );
}


/* INICIAR SITE */

mostrarProdutos();

atualizarCarrinho();
```
