// ==============================
// PRODUTOS
// ==============================

const produtos = [

    {
        id: 1,
        nome: "iPhone 15 Pro",
        marca: "Apple",
        preco: 6999.90,
        categoria: "Apple",
        descricao: "256GB • 5G • Câmera Pro",
        imagem: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=700&q=80",
        destaque: true
    },

    {
        id: 2,
        nome: "iPhone 15",
        marca: "Apple",
        preco: 5299.90,
        categoria: "Apple",
        descricao: "128GB • 5G • Câmera dupla",
        imagem: "https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&w=700&q=80",
        destaque: false
    },

    {
        id: 3,
        nome: "Galaxy S24 Ultra",
        marca: "Samsung",
        preco: 6799.90,
        categoria: "Samsung",
        descricao: "512GB • 5G • Câmera 200MP",
        imagem: "https://images.unsplash.com/photo-1707230337410-df2b7a1b6a7d?auto=format&fit=crop&w=700&q=80",
        destaque: true
    },

    {
        id: 4,
        nome: "Galaxy S24",
        marca: "Samsung",
        preco: 4299.90,
        categoria: "Samsung",
        descricao: "256GB • 5G • AMOLED",
        imagem: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=700&q=80",
        destaque: false
    },

    {
        id: 5,
        nome: "Redmi Note 13 Pro",
        marca: "Xiaomi",
        preco: 2199.90,
        categoria: "Xiaomi",
        descricao: "256GB • 200MP • AMOLED",
        imagem: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=700&q=80",
        destaque: true
    },

    {
        id: 6,
        nome: "Xiaomi 14",
        marca: "Xiaomi",
        preco: 3999.90,
        categoria: "Xiaomi",
        descricao: "512GB • Snapdragon • 5G",
        imagem: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=700&q=80",
        destaque: false
    },

    {
        id: 7,
        nome: "Motorola Edge 50",
        marca: "Motorola",
        preco: 2999.90,
        categoria: "Motorola",
        descricao: "256GB • 5G • OLED",
        imagem: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=700&q=80",
        destaque: true
    },

    {
        id: 8,
        nome: "Moto G84",
        marca: "Motorola",
        preco: 1699.90,
        categoria: "Motorola",
        descricao: "256GB • 5G • 120Hz",
        imagem: "https://images.unsplash.com/photo-1598327106026-d9521da673d5?auto=format&fit=crop&w=700&q=80",
        destaque: false
    }

];


// ==============================
// CARRINHO
// ==============================

let carrinho = [];


// ==============================
// MOSTRAR PRODUTOS
// ==============================

function mostrarProdutos(lista = produtos) {

    const container =
        document.getElementById("listaProdutos");

    container.innerHTML = "";

    if (lista.length === 0) {

        container.innerHTML = `
            <p style="
                grid-column: 1/-1;
                text-align:center;
                padding:50px;
                color:#6b7280;
            ">
                Nenhum celular encontrado.
            </p>
        `;

        return;
    }


    lista.forEach(produto => {

        container.innerHTML += `

            <article class="produto">

                <div class="produto-imagem">

                    <img
                        src="${produto.imagem}"
                        alt="${produto.nome}"
                    >

                    ${
                        produto.destaque
                        ?
                        `<span class="tag">
                            DESTAQUE
                        </span>`
                        :
                        ""
                    }

                </div>


                <div class="produto-info">

                    <span class="marca">
                        ${produto.marca}
                    </span>

                    <h3>
                        ${produto.nome}
                    </h3>

                    <p class="descricao">
                        ${produto.descricao}
                    </p>

                    <div class="preco">
                        ${formatarPreco(produto.preco)}
                    </div>

                    <button
                        class="add-carrinho"
                        onclick="adicionarCarrinho(${produto.id})"
                    >
                        Adicionar ao carrinho
                    </button>

                </div>

            </article>

        `;

    });

}


// ==============================
// FORMATAÇÃO DE PREÇO
// ==============================

function formatarPreco(valor) {

    return valor.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


// ==============================
// FILTRAR POR MARCA
// ==============================

function filtrarProdutos(marca) {

    if (marca === "todos") {

        mostrarProdutos(produtos);

        return;
    }


    const resultado =
        produtos.filter(
            produto =>
                produto.marca === marca
        );


    mostrarProdutos(resultado);

}


// ==============================
// PESQUISA
// ==============================

function pesquisarProdutos() {

    const texto =
        document
            .getElementById("pesquisa")
            .value
            .toLowerCase();


    const resultado =
        produtos.filter(produto =>

            produto.nome
                .toLowerCase()
                .includes(texto)

            ||

            produto.marca
                .toLowerCase()
                .includes(texto)

        );


    mostrarProdutos(resultado);

}


// ==============================
// ADICIONAR AO CARRINHO
// ==============================

function adicionarCarrinho(id) {

    const produto =
        produtos.find(
            produto => produto.id === id
        );


    if (!produto) return;


    carrinho.push(produto);


    atualizarCarrinho();


    abrirCarrinho();

}


// ==============================
// REMOVER
// ==============================

function removerCarrinho(index) {

    carrinho.splice(index, 1);

    atualizarCarrinho();

}


// ==============================
// ATUALIZAR CARRINHO
// ==============================

function atualizarCarrinho() {

    const container =
        document.getElementById("itensCarrinho");


    const contador =
        document.getElementById("contador");


    const subtotalElement =
        document.getElementById("subtotal");


    const freteElement =
        document.getElementById("frete");


    const totalElement =
        document.getElementById("total");


    contador.textContent =
        carrinho.length;


    container.innerHTML = "";


    let subtotal = 0;


    carrinho.forEach(
        (produto, index) => {

            subtotal += produto.preco;


            container.innerHTML += `

                <div class="item-carrinho">

                    <img
                        src="${produto.imagem}"
                        alt="${produto.nome}"
                    >

                    <div class="item-info">

                        <h4>
                            ${produto.nome}
                        </h4>

                        <p>
                            ${formatarPreco(
                                produto.preco
                            )}
                        </p>

                        <button
                            class="remover"
                            onclick="removerCarrinho(${index})"
                        >
                            Remover
                        </button>

                    </div>

                </div>

            `;

        }
    );


    let frete = 0;


    if (subtotal > 0 && subtotal < 500) {

        frete = 29.90;

    }


    const total =
        subtotal + frete;


    subtotalElement.textContent =
        formatarPreco(subtotal);


    freteElement.textContent =
        formatarPreco(frete);


    totalElement.textContent =
        formatarPreco(total);

}


// ==============================
// ABRIR CARRINHO
// ==============================

function abrirCarrinho() {

    document
        .getElementById("carrinho")
        .classList.add("aberto");

}


// ==============================
// FECHAR CARRINHO
// ==============================

function fecharCarrinho() {

    document
        .getElementById("carrinho")
        .classList.remove("aberto");

}


// ==============================
// FINALIZAR COMPRA
// ==============================

function finalizarCompra() {

    if (carrinho.length === 0) {

        alert(
            "Seu carrinho está vazio."
        );

        return;

    }


    const total =
        carrinho.reduce(
            (soma, produto) =>
                soma + produto.preco,
            0
        );


    alert(
        "Pedido realizado com sucesso!\n\n" +
        "Total: " +
        formatarPreco(total) +
        "\n\nObrigado por comprar na TechStore!"
    );


    carrinho = [];


    atualizarCarrinho();


    fecharCarrinho();

}


// ==============================
// OFERTA
// ==============================

function mostrarOferta() {

    alert(
        "🎉 Oferta especial!\n\n" +
        "Use o cupom TECH30 e ganhe até 30% OFF."
    );

}


// ==============================
// INICIAR SITE
// ==============================

mostrarProdutos();

atualizarCarrinho();