// ===============================
// LISTA DE PRODUTOS
// ===============================

const produtos = [

    {
        id: 1,
        nome: "Notebook Pro",
        categoria: "computador",
        preco: 3500,
        imagem: "💻"
    },

    {
        id: 2,
        nome: "PC Gamer",
        categoria: "computador",
        preco: 5200,
        imagem: "🖥️"
    },

    {
        id: 3,
        nome: "Smartphone X",
        categoria: "celular",
        preco: 2200,
        imagem: "📱"
    },

    {
        id: 4,
        nome: "Smartphone Pro",
        categoria: "celular",
        preco: 3200,
        imagem: "📱"
    },

    {
        id: 5,
        nome: "Fone Bluetooth",
        categoria: "acessorio",
        preco: 250,
        imagem: "🎧"
    },

    {
        id: 6,
        nome: "Teclado Mecânico",
        categoria: "acessorio",
        preco: 350,
        imagem: "⌨️"
    },

    {
        id: 7,
        nome: "Mouse Gamer",
        categoria: "acessorio",
        preco: 180,
        imagem: "🖱️"
    },

    {
        id: 8,
        nome: "Tablet Pro",
        categoria: "celular",
        preco: 1800,
        imagem: "📲"
    }

];


// ===============================
// CARRINHO
// ===============================

let carrinho = [];


// ===============================
// ELEMENTOS HTML
// ===============================

const listaProdutos =
    document.getElementById("listaProdutos");

const pesquisa =
    document.getElementById("pesquisa");

const categoria =
    document.getElementById("categoria");

const contador =
    document.getElementById("contador");

const modal =
    document.getElementById("modalCarrinho");

const itensCarrinho =
    document.getElementById("itensCarrinho");

const total =
    document.getElementById("total");


// ===============================
// MOSTRAR PRODUTOS
// ===============================

function mostrarProdutos(lista) {

    listaProdutos.innerHTML = "";

    if (lista.length === 0) {

        listaProdutos.innerHTML =
            "<p>Nenhum produto encontrado.</p>";

        return;
    }


    lista.forEach(function(produto) {

        const card =
            document.createElement("article");

        card.classList.add("produto");


        card.innerHTML = `

            <div class="produto-imagem">
                ${produto.imagem}
            </div>

            <h3>
                ${produto.nome}
            </h3>

            <p>
                Categoria:
                ${produto.categoria}
            </p>

            <div class="preco">
                R$ ${produto.preco.toFixed(2)}
            </div>

            <button
                onclick="adicionarCarrinho(${produto.id})">
                Adicionar ao carrinho
            </button>

        `;


        listaProdutos.appendChild(card);

    });

}


// Mostrar produtos inicialmente

mostrarProdutos(produtos);


// ===============================
// ADICIONAR AO CARRINHO
// ===============================

function adicionarCarrinho(id) {

    const produto =
        produtos.find(function(item) {

            return item.id === id;

        });


    carrinho.push(produto);

    atualizarCarrinho();

}


// ===============================
// ATUALIZAR CARRINHO
// ===============================

function atualizarCarrinho() {

    contador.textContent =
        carrinho.length;


    if (carrinho.length === 0) {

        itensCarrinho.innerHTML =
            "<p>Seu carrinho está vazio.</p>";

        total.textContent = "0,00";

        return;
    }


    itensCarrinho.innerHTML = "";


    let valorTotal = 0;


    carrinho.forEach(function(produto, index) {

        valorTotal += produto.preco;


        const item =
            document.createElement("div");

        item.classList.add("item-carrinho");


        item.innerHTML = `

            <span>
                ${produto.imagem}
                ${produto.nome}
            </span>

            <strong>
                R$ ${produto.preco.toFixed(2)}
            </strong>

            <button
                onclick="removerCarrinho(${index})">
                X
            </button>

        `;


        itensCarrinho.appendChild(item);

    });


    total.textContent =
        valorTotal.toFixed(2);

}


// ===============================
// REMOVER PRODUTO
// ===============================

function removerCarrinho(index) {

    carrinho.splice(index, 1);

    atualizarCarrinho();

}


// ===============================
// PESQUISA
// ===============================

function filtrarProdutos() {

    const texto =
        pesquisa.value.toLowerCase();

    const categoriaSelecionada =
        categoria.value;


    const resultado =
        produtos.filter(function(produto) {

            const correspondeNome =
                produto.nome
                    .toLowerCase()
                    .includes(texto);


            const correspondeCategoria =
                categoriaSelecionada === "todos" ||
                produto.categoria ===
                categoriaSelecionada;


            return
                correspondeNome &&
                correspondeCategoria;

        });


    mostrarProdutos(resultado);

}


pesquisa.addEventListener(
    "input",
    filtrarProdutos
);


categoria.addEventListener(
    "change",
    filtrarProdutos
);


// ===============================
// ABRIR CARRINHO
// ===============================

document
    .getElementById("carrinhoBtn")
    .addEventListener("click", function() {

        modal.classList.add("ativo");

    });


// ===============================
// FECHAR CARRINHO
// ===============================

document
    .getElementById("fecharCarrinho")
    .addEventListener("click", function() {

        modal.classList.remove("ativo");

    });


// ===============================
// FINALIZAR COMPRA
// ===============================

document
    .getElementById("finalizar")
    .addEventListener("click", function() {

        if (carrinho.length === 0) {

            alert(
                "Seu carrinho está vazio!"
            );

            return;
        }


        alert(
            "Compra realizada com sucesso!"
        );


        carrinho = [];

        atualizarCarrinho();

        modal.classList.remove("ativo");

    });


// ===============================
// MODO ESCURO
// ===============================

document
    .getElementById("temaBtn")
    .addEventListener("click", function() {

        document.body.classList.toggle("escuro");

        if (
            document.body.classList.contains("escuro")
        ) {

            this.textContent = "☀️";

        } else {

            this.textContent = "🌙";

        }

    });


// ===============================
// FORMULÁRIO
// ===============================

document
    .getElementById("formulario")
    .addEventListener("submit", function(evento) {

        evento.preventDefault();


        const nome =
            document.getElementById("nome").value;


        document.getElementById("resultado")
            .textContent =
            `Obrigado pelo contato, ${nome}!`;


        this.reset();

    });
