// ==============================
// SISTEMA DE ESTOQUE
// ==============================

// Recupera os produtos salvos no navegador
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];


// ELEMENTOS DO HTML

const form = document.getElementById("formProduto");
const nomeInput = document.getElementById("nome");
const quantidadeInput = document.getElementById("quantidade");
const precoInput = document.getElementById("preco");
const pesquisaInput = document.getElementById("pesquisa");

const listaProdutos = document.getElementById("listaProdutos");

const totalProdutos = document.getElementById("totalProdutos");
const totalItens = document.getElementById("totalItens");
const estoqueBaixo = document.getElementById("estoqueBaixo");


// ==============================
// CADASTRAR PRODUTO
// ==============================

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const nome = nomeInput.value.trim();
    const quantidade = Number(quantidadeInput.value);
    const preco = Number(precoInput.value);

    if (nome === "" || quantidade < 0 || preco < 0) {
        alert("Preencha os dados corretamente.");
        return;
    }

    const produto = {
        id: Date.now(),
        nome: nome,
        quantidade: quantidade,
        preco: preco
    };

    produtos.push(produto);

    salvarProdutos();

    form.reset();

    mostrarProdutos();

});


// ==============================
// SALVAR NO LOCALSTORAGE
// ==============================

function salvarProdutos() {

    localStorage.setItem(
        "produtos",
        JSON.stringify(produtos)
    );

}


// ==============================
// MOSTRAR PRODUTOS
// ==============================

function mostrarProdutos(lista = produtos) {

    listaProdutos.innerHTML = "";

    if (lista.length === 0) {

        listaProdutos.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center;">
                    Nenhum produto encontrado.
                </td>
            </tr>
        `;

        atualizarResumo();

        return;
    }


    lista.forEach(function(produto) {

        const tr = document.createElement("tr");

        let status;
        let classeStatus;

        if (produto.quantidade <= 5) {

            status = "Estoque baixo";
            classeStatus = "baixo";

        } else {

            status = "Normal";
            classeStatus = "normal";

        }


        tr.innerHTML = `

            <td>${produto.nome}</td>

            <td>${produto.quantidade}</td>

            <td>
                R$ ${produto.preco.toFixed(2).replace(".", ",")}
            </td>

            <td>
                <span class="status ${classeStatus}">
                    ${status}
                </span>
            </td>

            <td>

                <button 
                    class="btn-editar"
                    onclick="editarProduto(${produto.id})">
                    Editar
                </button>

                <button 
                    class="btn-excluir"
                    onclick="excluirProduto(${produto.id})">
                    Excluir
                </button>

            </td>

        `;

        listaProdutos.appendChild(tr);

    });

    atualizarResumo();

}


// ==============================
// EDITAR PRODUTO
// ==============================

function editarProduto(id) {

    const produto = produtos.find(function(item) {

        return item.id === id;

    });


    if (!produto) {
        return;
    }


    const novoNome = prompt(
        "Digite o novo nome:",
        produto.nome
    );

    if (novoNome === null || novoNome.trim() === "") {
        return;
    }


    const novaQuantidade = prompt(
        "Digite a nova quantidade:",
        produto.quantidade
    );

    if (
        novaQuantidade === null ||
        novaQuantidade === "" ||
        Number(novaQuantidade) < 0
    ) {
        return;
    }


    const novoPreco = prompt(
        "Digite o novo preço:",
        produto.preco
    );

    if (
        novoPreco === null ||
        novoPreco === "" ||
        Number(novoPreco) < 0
    ) {
        return;
    }


    produto.nome = novoNome.trim();
    produto.quantidade = Number(novaQuantidade);
    produto.preco = Number(novoPreco);


    salvarProdutos();

    mostrarProdutos();

}


// ==============================
// EXCLUIR PRODUTO
// ==============================

function excluirProduto(id) {

    const produto = produtos.find(function(item) {

        return item.id === id;

    });


    if (!produto) {
        return;
    }


    const confirmar = confirm(
        `Deseja excluir o produto "${produto.nome}"?`
    );


    if (!confirmar) {
        return;
    }


    produtos = produtos.filter(function(item) {

        return item.id !== id;

    });


    salvarProdutos();

    mostrarProdutos();

}


// ==============================
// PESQUISAR PRODUTO
// ==============================

pesquisaInput.addEventListener("input", function() {

    const texto = pesquisaInput.value
        .toLowerCase()
        .trim();


    const resultados = produtos.filter(function(produto) {

        return produto.nome
            .toLowerCase()
            .includes(texto);

    });


    mostrarProdutos(resultados);

});


// ==============================
// ATUALIZAR RESUMO
// ==============================

function atualizarResumo() {

    // Quantidade de tipos de produtos
    totalProdutos.textContent = produtos.length;


    // Soma de todas as unidades
    const quantidadeTotal = produtos.reduce(
        function(total, produto) {

            return total + produto.quantidade;

        },
        0
    );


    totalItens.textContent = quantidadeTotal;


    // Produtos com 5 unidades ou menos
    const produtosBaixos = produtos.filter(
        function(produto) {

            return produto.quantidade <= 5;

        }
    );


    estoqueBaixo.textContent = produtosBaixos.length;

}


// ==============================
// INICIAR SISTEMA
// ==============================

mostrarProdutos();