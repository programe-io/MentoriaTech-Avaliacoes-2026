const produtos = [

    {
        id: 1,
        nome: "Guitarra Elétrica",
        categoria: "cordas",
        preco: 1299.90,
        imagem: "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02"
    },

    {
        id: 2,
        nome: "Violão Acústico",
        categoria: "cordas",
        preco: 799.90,
        imagem: "https://images.unsplash.com/photo-1525201548942-d8732f6617a0"
    },

    {
        id: 3,
        nome: "Teclado Musical",
        categoria: "teclas",
        preco: 1599.90,
        imagem: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0"
    },

    {
        id: 4,
        nome: "Bateria Completa",
        categoria: "bateria",
        preco: 2499.90,
        imagem: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7"
    },

    {
        id: 5,
        nome: "Saxofone",
        categoria: "sopro",
        preco: 1899.90,
        imagem: "https://images.unsplash.com/photo-1573871669414-010dbf7dffb6"
    },

    {
        id: 6,
        nome: "Baixo Elétrico",
        categoria: "cordas",
        preco: 1399.90,
        imagem: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce"
    },

    {
        id: 7,
        nome: "Piano Digital",
        categoria: "teclas",
        preco: 3299.90,
        imagem: "https://images.unsplash.com/photo-1552422535-c45813c61732"
    },

    {
        id: 8,
        nome: "Cajón",
        categoria: "bateria",
        preco: 399.90,
        imagem: "https://images.unsplash.com/photo-1516280440614-37939bbacd81"
    }

];


let carrinho = [];


// MOSTRAR PRODUTOS

function mostrarProdutos(lista = produtos) {

    const container =
        document.getElementById("listaProdutos");

    container.innerHTML = "";

    if (lista.length === 0) {

        container.innerHTML = `
            <p style="text-align:center;">
                Nenhum instrumento encontrado.
            </p>
        `;

        return;
    }


    lista.forEach(produto => {

        container.innerHTML += `

            <article class="produto">

                <img
                    src="${produto.imagem}"
                    alt="${produto.nome}"
                >

                <div class="produto-info">

                    <span class="categoria">
                        ${produto.categoria}
                    </span>

                    <h3>
                        ${produto.nome}
                    </h3>

                    <p class="preco">
                        R$ ${formatarPreco(produto.preco)}
                    </p>

                    <button
                        class="comprar"
                        onclick="adicionarCarrinho(${produto.id})"
                    >
                        🛒 Adicionar ao carrinho
                    </button>

                </div>

            </article>

        `;

    });

}


// FORMATAR PREÇO

function formatarPreco(valor) {

    return valor
        .toFixed(2)
        .replace(".", ",");

}


// ADICIONAR

function adicionarCarrinho(id) {

    const produto =
        produtos.find(item => item.id === id);

    carrinho.push(produto);

    atualizarCarrinho();

}


// ATUALIZAR CARRINHO

function atualizarCarrinho() {

    const container =
        document.getElementById("itensCarrinho");

    const contador =
        document.getElementById("contador");

    const totalElemento =
        document.getElementById("total");


    container.innerHTML = "";

    let total = 0;


    carrinho.forEach((produto, index) => {

        total += produto.preco;


        container.innerHTML += `

            <div class="item-carrinho">

                <div>

                    <strong>
                        ${produto.nome}
                    </strong>

                    <br>

                    R$ ${formatarPreco(produto.preco)}

                </div>

                <button
                    class="remover"
                    onclick="removerProduto(${index})"
                >
                    Remover
                </button>

            </div>

        `;

    });


    contador.textContent = carrinho.length;

    totalElemento.textContent =
        formatarPreco(total);

}


// REMOVER

function removerProduto(index) {

    carrinho.splice(index, 1);

    atualizarCarrinho();

}


// ABRIR CARRINHO

function abrirCarrinho() {

    document.getElementById("carrinho")
        .style.display = "block";

}


// FECHAR CARRINHO

function fecharCarrinho() {

    document.getElementById("carrinho")
        .style.display = "none";

}


// FILTRAR

function filtrar(categoria) {

    if (categoria === "todos") {

        mostrarProdutos(produtos);

        return;
    }


    const resultado =
        produtos.filter(
            produto => produto.categoria === categoria
        );


    mostrarProdutos(resultado);

}


// PESQUISAR

function pesquisar() {

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
        );


    mostrarProdutos(resultado);

}


// FINALIZAR

function finalizarCompra() {

    if (carrinho.length === 0) {

        alert("Seu carrinho está vazio!");

        return;
    }


    alert(
        "🎉 Obrigado pela compra!\n\n" +
        "Seu pedido foi recebido com sucesso."
    );


    carrinho = [];

    atualizarCarrinho();

    fecharCarrinho();

}


// INICIALIZAR

mostrarProdutos();