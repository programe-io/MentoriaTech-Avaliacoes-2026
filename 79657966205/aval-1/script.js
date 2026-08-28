```javascript
// ============================================
// TURBO TOYS
// Loja de Carros de Brinquedo
// JavaScript
// ============================================

// PRODUTOS DA LOJA

const produtos = [
    {
        id: 1,
        nome: "Carro Esportivo Vermelho",
        categoria: "Esportivo",
        preco: 49.90,
        imagem: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 2,
        nome: "Carro de Polícia",
        categoria: "Polícia",
        preco: 39.90,
        imagem: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 3,
        nome: "Carro de Corrida",
        categoria: "Corrida",
        preco: 59.90,
        imagem: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 4,
        nome: "Jipe Off-Road",
        categoria: "Off-Road",
        preco: 54.90,
        imagem: "https://images.unsplash.com/photo-1519245659620-e859806a8d3b?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 5,
        nome: "Carro Esportivo Azul",
        categoria: "Esportivo",
        preco: 44.90,
        imagem: "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 6,
        nome: "Super Carro",
        categoria: "Corrida",
        preco: 69.90,
        imagem: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 7,
        nome: "Jipe Aventura",
        categoria: "Off-Road",
        preco: 47.90,
        imagem: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 8,
        nome: "Viatura Especial",
        categoria: "Polícia",
        preco: 42.90,
        imagem: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=700&q=80"
    }
];


// CARRINHO

let carrinho = [];


// FORMATAÇÃO DO PREÇO

function formatarPreco(valor) {

    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}


// MOSTRAR PRODUTOS

function mostrarProdutos() {

    const lista = document.getElementById("listaProdutos");

    if (!lista) {
        return;
    }

    const campoPesquisa =
        document.getElementById("pesquisa");

    const campoCategoria =
        document.getElementById("categoria");

    const pesquisa =
        campoPesquisa
        ? campoPesquisa.value.toLowerCase()
        : "";

    const categoria =
        campoCategoria
        ? campoCategoria.value
        : "todos";


    lista.innerHTML = "";


    const produtosFiltrados = produtos.filter(produto => {

        const nomeEncontrado =
            produto.nome
            .toLowerCase()
            .includes(pesquisa);

        const categoriaEncontrada =
            categoria === "todos" ||
            produto.categoria.toLowerCase() ===
            categoria.toLowerCase();

        return nomeEncontrado && categoriaEncontrada;

    });


    produtosFiltrados.forEach(produto => {

        const card = document.createElement("div");

        card.className = "produto";


        card.innerHTML = `

            <img
                class="produto-imagem"
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
                    ${formatarPreco(produto.preco)}
                </p>

                <button
                    class="botao-comprar"
                    onclick="adicionarCarrinho(${produto.id})"
                >
                    🛒 Comprar
                </button>

            </div>
        `;


        lista.appendChild(card);

    });


    if (produtosFiltrados.length === 0) {

        lista.innerHTML = `
            <div style="
                grid-column:1/-1;
                text-align:center;
                padding:40px;
            ">
                <h2>😕 Produto não encontrado</h2>

                <p>
                    Tente procurar outro carrinho.
                </p>
            </div>
        `;

    }

}


// ADICIONAR AO CARRINHO

function adicionarCarrinho(id) {

    const produto =
        produtos.find(item => item.id === id);


    if (!produto) {
        return;
    }


    const produtoCarrinho =
        carrinho.find(item => item.id === id);


    if (produtoCarrinho) {

        produtoCarrinho.quantidade++;

    } else {

        carrinho.push({
            ...produto,
            quantidade: 1
        });

    }


    atualizarCarrinho();


    mostrarMensagem(
        "🚗 Carrinho adicionado!"
    );

}


// ATUALIZAR CARRINHO

function atualizarCarrinho() {

    const lista =
        document.getElementById("listaCarrinho");

    const contador =
        document.getElementById("contador");

    const totalElemento =
        document.getElementById("total");


    if (contador) {

        const quantidadeTotal =
            carrinho.reduce(
                (total, item) =>
                total + item.quantidade,
                0
            );

        contador.textContent =
            quantidadeTotal;

    }


    if (!lista) {
        return;
    }


    lista.innerHTML = "";


    if (carrinho.length === 0) {

        lista.innerHTML = `
            <div style="
                text-align:center;
                padding:30px;
            ">
                <h3>🛒 Carrinho vazio</h3>

                <p>
                    Adicione um carrinho para começar.
                </p>
            </div>
        `;

    }


    let total = 0;


    carrinho.forEach(item => {

        total +=
            item.preco * item.quantidade;


        const div =
            document.createElement("div");


        div.className =
            "item-carrinho";


        div.innerHTML = `

            <img
                src="${item.imagem}"
                alt="${item.nome}"
            >

            <div class="item-carrinho-info">

                <strong>
                    ${item.nome}
                </strong>

                <p>
                    ${formatarPreco(item.preco)}
                </p>

            </div>

            <div class="quantidade">

                <button
                    onclick="alterarQuantidade(${item.id}, -1)"
                >
                    −
                </button>

                <span>
                    ${item.quantidade}
                </span>

                <button
                    onclick="alterarQuantidade(${item.id}, 1)"
                >
                    +
                </button>

            </div>

            <button
                onclick="removerProduto(${item.id})"
                title="Remover"
            >
                🗑️
            </button>
        `;


        lista.appendChild(div);

    });


    if (totalElemento) {

        totalElemento.textContent =
            formatarPreco(total);

    }

}


// ALTERAR QUANTIDADE

function alterarQuantidade(id, valor) {

    const item =
        carrinho.find(produto => produto.id === id);


    if (!item) {
        return;
    }


    item.quantidade += valor;


    if (item.quantidade <= 0) {

        carrinho =
            carrinho.filter(
                produto => produto.id !== id
            );

    }


    atualizarCarrinho();

}


// REMOVER PRODUTO

function removerProduto(id) {

    carrinho =
        carrinho.filter(
            produto => produto.id !== id
        );


    atualizarCarrinho();

}


// LIMPAR CARRINHO

function limparCarrinho() {

    if (carrinho.length === 0) {

        mostrarMensagem(
            "O carrinho já está vazio."
        );

        return;
    }


    const confirmar =
        confirm(
            "Deseja realmente limpar o carrinho?"
        );


    if (confirmar) {

        carrinho = [];

        atualizarCarrinho();

        mostrarMensagem(
            "🗑️ Carrinho limpo!"
        );

    }

}


// ABRIR CARRINHO

function abrirCarrinho() {

    const modal =
        document.getElementById("modalCarrinho");


    if (modal) {

        modal.classList.add("ativo");

        modal.style.display = "flex";

    }


    atualizarCarrinho();

}


// FECHAR CARRINHO

function fecharCarrinho() {

    const modal =
        document.getElementById("modalCarrinho");


    if (modal) {

        modal.classList.remove("ativo");

        modal.style.display = "none";

    }

}


// ABRIR CHECKOUT

function abrirCheckout() {

    if (carrinho.length === 0) {

        alert(
            "🛒 Seu carrinho está vazio!"
        );

        return;
    }


    const checkout =
        document.getElementById("checkout");


    if (checkout) {

        checkout.style.display =
            "block";

        checkout.scrollIntoView({
            behavior: "smooth"
        });

    }

}


// FINALIZAR COMPRA

function finalizarCompra() {

    if (carrinho.length === 0) {

        alert(
            "Adicione algum produto ao carrinho."
        );

        return;
    }


    const nome =
        document.getElementById("nome")?.value.trim();

    const telefone =
        document.getElementById("telefone")?.value.trim();

    const endereco =
        document.getElementById("endereco")?.value.trim();

    const cidade =
        document.getElementById("cidade")?.value.trim();

    const pagamento =
        document.getElementById("pagamento")?.value;


    if (!nome ||
        !telefone ||
        !endereco ||
        !cidade ||
        !pagamento) {

        alert(
            "⚠️ Preencha todos os campos."
        );

        return;
    }


    const numeroPedido =
        Math.floor(
            100000 +
            Math.random() * 900000
        );


    const total =
        carrinho.reduce(
            (soma, item) =>
            soma +
            item.preco * item.quantidade,
            0
        );


    alert(

        "🎉 PEDIDO REALIZADO!\n\n" +

        "Pedido: #" +
        numeroPedido +
        "\n" +

        "Cliente: " +
        nome +
        "\n" +

        "Telefone: " +
        telefone +
        "\n" +

        "Cidade: " +
        cidade +
        "\n" +

        "Pagamento: " +
        pagamento +
        "\n\n" +

        "Total: " +
        formatarPreco(total) +
        "\n\n" +

        "🚗 Obrigado por comprar na Turbo Toys!"

    );


    carrinho = [];

    atualizarCarrinho();

    fecharCarrinho();

}


// MENSAGEM TEMPORÁRIA

function mostrarMensagem(texto) {

    const mensagem =
        document.createElement("div");


    mensagem.textContent = texto;


    mensagem.style.position =
        "fixed";

    mensagem.style.bottom =
        "100px";

    mensagem.style.left =
        "50%";

    mensagem.style.transform =
        "translateX(-50%)";

    mensagem.style.background =
        "#111";

    mensagem.style.color =
        "white";

    mensagem.style.padding =
        "15px 25px";

    mensagem.style.borderRadius =
        "10px";

    mensagem.style.zIndex =
        "9999";

    mensagem.style.fontWeight =
        "bold";


    document.body.appendChild(
        mensagem
    );


    setTimeout(() => {

        mensagem.remove();

    }, 2000);

}


// PESQUISA

document.addEventListener(
    "input",
    function(event) {

        if (
            event.target.id ===
            "pesquisa"
        ) {

            mostrarProdutos();

        }

    }
);


// FILTRO

document.addEventListener(
    "change",
    function(event) {

        if (
            event.target.id ===
            "categoria"
        ) {

            mostrarProdutos();

        }

    }
);


// FECHAR MODAL CLICANDO FORA

window.addEventListener(
    "click",
    function(event) {

        const modal =
            document.getElementById(
                "modalCarrinho"
            );


        if (
            modal &&
            event.target === modal
        ) {

            fecharCarrinho();

        }

    }
);


// INICIAR A LOJA

document.addEventListener(
    "DOMContentLoaded",
    function() {

        mostrarProdutos();

        atualizarCarrinho();

    }
);
```
