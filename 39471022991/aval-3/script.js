// ====================================
// SISTEMA DE ESTOQUE
// ====================================


// CARREGAR PRODUTOS

let produtos =
    JSON.parse(localStorage.getItem("produtos")) || [];


// ELEMENTOS

const formulario =
    document.getElementById("formProduto");

const nome =
    document.getElementById("nome");

const quantidade =
    document.getElementById("quantidade");

const preco =
    document.getElementById("preco");

const pesquisa =
    document.getElementById("pesquisa");

const lista =
    document.getElementById("listaProdutos");

const totalProdutos =
    document.getElementById("totalProdutos");

const totalItens =
    document.getElementById("totalItens");

const estoqueBaixo =
    document.getElementById("estoqueBaixo");


// ====================================
// ADICIONAR PRODUTO
// ====================================

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const novoProduto = {

        id: Date.now(),

        nome: nome.value,

        quantidade:
            Number(quantidade.value),

        preco:
            Number(preco.value)

    };


    produtos.push(novoProduto);


    salvar();


    formulario.reset();


    mostrarProdutos();

});


// ====================================
// SALVAR
// ====================================

function salvar() {

    localStorage.setItem(
        "produtos",
        JSON.stringify(produtos)
    );

}


// ====================================
// MOSTRAR PRODUTOS
// ====================================

function mostrarProdutos(listaFiltrada = produtos) {

    lista.innerHTML = "";


    if (listaFiltrada.length === 0) {

        lista.innerHTML = `
            <tr>
                <td colspan="5">
                    Nenhum produto encontrado.
                </td>
            </tr>
        `;

        atualizarPainel();

        return;
    }


    listaFiltrada.forEach(function(produto) {

        let status;

        let classe;


        if (produto.quantidade <= 5) {

            status = "Estoque baixo";

            classe = "baixo";

        } else {

            status = "Normal";

            classe = "normal";

        }


        const linha =
            document.createElement("tr");


        linha.innerHTML = `

            <td>
                ${produto.nome}
            </td>

            <td>
                ${produto.quantidade}
            </td>

            <td>
                R$ ${produto.preco
                    .toFixed(2)
                    .replace(".", ",")}
            </td>

            <td>

                <span class="status ${classe}">
                    ${status}
                </span>

            </td>

            <td>

                <button
                    class="editar"
                    onclick="editar(${produto.id})">

                    Editar

                </button>


                <button
                    class="excluir"
                    onclick="excluir(${produto.id})">

                    Excluir

                </button>

            </td>

        `;


        lista.appendChild(linha);

    });


    atualizarPainel();

}


// ====================================
// EDITAR
// ====================================

function editar(id) {

    const produto =
        produtos.find(function(item) {

            return item.id === id;

        });


    if (!produto) return;


    const novoNome =
        prompt(
            "Nome do produto:",
            produto.nome
        );


    if (!novoNome) return;


    const novaQuantidade =
        prompt(
            "Quantidade:",
            produto.quantidade
        );


    if (
        novaQuantidade === null ||
        Number(novaQuantidade) < 0
    ) {
        return;
    }


    const novoPreco =
        prompt(
            "Preço:",
            produto.preco
        );


    if (
        novoPreco === null ||
        Number(novoPreco) < 0
    ) {
        return;
    }


    produto.nome =
        novoNome;

    produto.quantidade =
        Number(novaQuantidade);

    produto.preco =
        Number(novoPreco);


    salvar();

    mostrarProdutos();

}


// ====================================
// EXCLUIR
// ====================================

function excluir(id) {

    const produto =
        produtos.find(function(item) {

            return item.id === id;

        });


    if (!produto) return;


    const confirmar =
        confirm(
            "Deseja excluir " +
            produto.nome +
            "?"
        );


    if (!confirmar) return;


    produtos =
        produtos.filter(function(item) {

            return item.id !== id;

        });


    salvar();

    mostrarProdutos();

}


// ====================================
// PESQUISAR
// ====================================

pesquisa.addEventListener(
    "input",
    function() {

        const texto =
            pesquisa.value
                .toLowerCase();


        const resultados =
            produtos.filter(function(produto) {

                return produto.nome
                    .toLowerCase()
                    .includes(texto);

            });


        mostrarProdutos(resultados);

    }
);


// ====================================
// ATUALIZAR PAINEL
// ====================================

function atualizarPainel() {

    // TOTAL DE PRODUTOS

    totalProdutos.textContent =
        produtos.length;


    // TOTAL DE ITENS

    let quantidadeTotal = 0;


    produtos.forEach(function(produto) {

        quantidadeTotal +=
            produto.quantidade;

    });


    totalItens.textContent =
        quantidadeTotal;


    // ESTOQUE BAIXO

    const baixos =
        produtos.filter(function(produto) {

            return produto.quantidade <= 5;

        });


    estoqueBaixo.textContent =
        baixos.length;

}


// ====================================
// INICIAR
// ====================================

mostrarProdutos();