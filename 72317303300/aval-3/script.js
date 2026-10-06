// ==========================================
// PRODUTOS
// ==========================================

const produtos = [

    {
        id: 1,

        nome: "Bolo de Chocolate",

        categoria: "bolos",

        preco: 59.90,

        descricao: "Bolo de chocolate com cobertura cremosa.",

        imagem:
            "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=80",

        destaque: true
    },

    {
        id: 2,

        nome: "Bolo de Morango",

        categoria: "bolos",

        preco: 69.90,

        descricao: "Massa fofinha com creme e morangos.",

        imagem:
            "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=700&q=80",

        destaque: false
    },

    {
        id: 3,

        nome: "Brigadeiro Gourmet",

        categoria: "brigadeiros",

        preco: 24.90,

        descricao: "Caixa com 12 brigadeiros gourmet.",

        imagem:
            "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=700&q=80",

        destaque: true
    },

    {
        id: 4,

        nome: "Brigadeiro de Morango",

        categoria: "brigadeiros",

        preco: 27.90,

        descricao: "12 unidades de brigadeiro de morango.",

        imagem:
            "https://images.unsplash.com/photo-1575377427642-087cf684f29d?auto=format&fit=crop&w=700&q=80",

        destaque: false
    },

    {
        id: 5,

        nome: "Torta de Chocolate",

        categoria: "tortas",

        preco: 79.90,

        descricao: "Torta cremosa de chocolate belga.",

        imagem:
            "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=700&q=80",

        destaque: true
    },

    {
        id: 6,

        nome: "Cheesecake de Frutas",

        categoria: "tortas",

        preco: 74.90,

        descricao: "Cheesecake cremoso com frutas vermelhas.",

        imagem:
            "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=700&q=80",

        destaque: false
    },

    {
        id: 7,

        nome: "Cupcake de Baunilha",

        categoria: "doces",

        preco: 9.90,

        descricao: "Cupcake fofinho com cobertura especial.",

        imagem:
            "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=700&q=80",

        destaque: false
    },

    {
        id: 8,

        nome: "Donuts Gourmet",

        categoria: "doces",

        preco: 12.90,

        descricao: "Donuts com cobertura de chocolate.",

        imagem:
            "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=700&q=80",

        destaque: true
    }

];


// ==========================================
// CARRINHO
// ==========================================

let carrinho = [];


// ==========================================
// FORMATAR PREÇO
// ==========================================

function formatarPreco(valor) {

    return valor.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


// ==========================================
// MOSTRAR PRODUTOS
// ==========================================

function mostrarProdutos(lista = produtos) {

    const container =
        document.getElementById(
            "listaProdutos"
        );

    container.innerHTML = "";


    if (lista.length === 0) {

        container.innerHTML = `

            <p style="
                grid-column: 1/-1;
                text-align:center;
                padding:50px;
                color:#8b7777;
            ">

                😢 Nenhum doce encontrado.

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

                        `
                        <span class="tag">
                            MAIS VENDIDO
                        </span>
                        `

                        :

                        ""
                    }

                </div>


                <div class="produto-info">

                    <span class="categoria">

                        ${produto.categoria}

                    </span>


                    <h3>

                        ${produto.nome}

                    </h3>


                    <p class="descricao">

                        ${produto.descricao}

                    </p>


                    <div class="preco">

                        ${formatarPreco(
                            produto.preco
                        )}

                    </div>


                    <button
                        class="add"
                        onclick="
                            adicionarCarrinho(
                                ${produto.id}
                            )
                        "
                    >

                        Adicionar ao carrinho 🛒

                    </button>

                </div>

            </article>

        `;

    });

}


// ==========================================
// FILTRAR
// ==========================================

function filtrar(categoria) {

    if (categoria === "todos") {

        mostrarProdutos();

        return;
    }


    const resultado =
        produtos.filter(
            produto =>
                produto.categoria === categoria
        );


    mostrarProdutos(resultado);

}


// ==========================================
// PESQUISAR
// ==========================================

function pesquisar() {

    const texto =
        document
            .getElementById(
                "campoPesquisa"
            )
            .value
            .toLowerCase();


    const resultado =
        produtos.filter(
            produto =>

                produto.nome
                    .toLowerCase()
                    .includes(texto)

                ||

                produto.categoria
                    .toLowerCase()
                    .includes(texto)
        );


    mostrarProdutos(resultado);

}


// ==========================================
// ADICIONAR AO CARRINHO
// ==========================================

function adicionarCarrinho(id) {

    const produto =
        produtos.find(
            item => item.id === id
        );


    if (!produto) return;


    carrinho.push(produto);


    atualizarCarrinho();


    abrirCarrinho();

}


// ==========================================
// REMOVER DO CARRINHO
// ==========================================

function remover(index) {

    carrinho.splice(index, 1);

    atualizarCarrinho();

}


// ==========================================
// ATUALIZAR CARRINHO
// ==========================================

function atualizarCarrinho() {

    const container =
        document.getElementById(
            "itensCarrinho"
        );


    const contador =
        document.getElementById(
            "contador"
        );


    const subtotalElement =
        document.getElementById(
            "subtotal"
        );


    const freteElement =
        document.getElementById(
            "frete"
        );


    const totalElement =
        document.getElementById(
            "total"
        );


    contador.textContent =
        carrinho.length;


    container.innerHTML = "";


    let subtotal = 0;


    carrinho.forEach(
        (produto, index) => {

            subtotal += produto.preco;


            container.innerHTML += `

                <div class="item">

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
                            onclick="
                                remover(${index})
                            "
                        >

                            Remover

                        </button>

                    </div>

                </div>

            `;

        }
    );


    // Frete grátis acima de R$ 100

    let frete = 0;


    if (
        subtotal > 0 &&
        subtotal < 100
    ) {

        frete = 9.90;

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


// ==========================================
// ABRIR CARRINHO
// ==========================================

function abrirCarrinho() {

    document
        .getElementById("carrinho")
        .classList
        .add("aberto");

}


// ==========================================
// FECHAR CARRINHO
// ==========================================

function fecharCarrinho() {

    document
        .getElementById("carrinho")
        .classList
        .remove("aberto");

}


// ==========================================
// FINALIZAR PEDIDO
// ==========================================

function finalizarPedido() {

    if (carrinho.length === 0) {

        alert(
            "🍰 Seu carrinho está vazio!"
        );

        return;

    }


    const subtotal =
        carrinho.reduce(
            (total, produto) =>
                total + produto.preco,
            0
        );


    const frete =
        subtotal >= 100
            ? 0
            : 9.90;


    const total =
        subtotal + frete;


    alert(

        "🎉 Pedido realizado!\n\n" +

        "Total: " +

        formatarPreco(total) +

        "\n\n" +

        "Obrigado por escolher a Doce Encanto! 💕"

    );


    carrinho = [];


    atualizarCarrinho();


    fecharCarrinho();

}


// ==========================================
// CUPOM
// ==========================================

function aplicarCupom() {

    alert(

        "🎉 CUPOM LIBERADO!\n\n" +

        "Use o código:\n\n" +

        "DOCE15\n\n" +

        "e ganhe 15% OFF na primeira compra."

    );

}


// ==========================================
// INICIAR
// ==========================================

mostrarProdutos();

atualizarCarrinho();