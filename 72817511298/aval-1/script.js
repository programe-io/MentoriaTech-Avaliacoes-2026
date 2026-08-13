// ==========================================
// CRUD DE ESTOQUE
// ==========================================

// Recupera os produtos do navegador
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];


// Elementos do HTML
const formulario = document.getElementById("form-produto");
const nome = document.getElementById("nome");
const categoria = document.getElementById("categoria");
const quantidade = document.getElementById("quantidade");
const preco = document.getElementById("preco");
const produtoId = document.getElementById("produto-id");

const listaProdutos = document.getElementById("lista-produtos");
const mensagemVazia = document.getElementById("mensagem-vazia");

const totalProdutos = document.getElementById("total-produtos");
const totalItens = document.getElementById("total-itens");
const valorEstoque = document.getElementById("valor-estoque");

const pesquisa = document.getElementById("pesquisa");

const tituloForm = document.getElementById("titulo-form");
const btnCancelar = document.getElementById("btn-cancelar");


// ==========================================
// SALVAR NO LOCALSTORAGE
// ==========================================

function salvarLocalStorage() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}


// ==========================================
// GERAR ID
// ==========================================

function gerarId() {

    if (produtos.length === 0) {
        return 1;
    }

    return Math.max(...produtos.map(produto => produto.id)) + 1;
}


// ==========================================
// CADASTRAR / EDITAR
// ==========================================

formulario.addEventListener("submit", function (event) {

    event.preventDefault();

    const nomeProduto = nome.value.trim();
    const categoriaProduto = categoria.value.trim();
    const quantidadeProduto = Number(quantidade.value);
    const precoProduto = Number(preco.value);

    if (!nomeProduto || !categoriaProduto) {
        alert("Preencha todos os campos.");
        return;
    }

    if (quantidadeProduto < 0 || precoProduto < 0) {
        alert("Quantidade e preço não podem ser negativos.");
        return;
    }


    // Se existe ID, estamos editando
    if (produtoId.value) {

        const id = Number(produtoId.value);

        const indice = produtos.findIndex(
            produto => produto.id === id
        );

        if (indice !== -1) {

            produtos[indice] = {
                id: id,
                nome: nomeProduto,
                categoria: categoriaProduto,
                quantidade: quantidadeProduto,
                preco: precoProduto
            };

        }

    } else {

        // Novo produto
        const novoProduto = {

            id: gerarId(),

            nome: nomeProduto,

            categoria: categoriaProduto,

            quantidade: quantidadeProduto,

            preco: precoProduto

        };

        produtos.push(novoProduto);
    }


    salvarLocalStorage();

    atualizarTela();

    limparFormulario();

    alert("Produto salvo com sucesso!");

});


// ==========================================
// MOSTRAR PRODUTOS
// ==========================================

function atualizarTela() {

    listaProdutos.innerHTML = "";

    const textoPesquisa = pesquisa.value.toLowerCase();

    const produtosFiltrados = produtos.filter(produto => {

        return (
            produto.nome.toLowerCase().includes(textoPesquisa) ||
            produto.categoria.toLowerCase().includes(textoPesquisa)
        );

    });


    if (produtosFiltrados.length === 0) {

        mensagemVazia.style.display = "block";

    } else {

        mensagemVazia.style.display = "none";

    }


    produtosFiltrados.forEach(produto => {

        const tr = document.createElement("tr");

        const total = produto.quantidade * produto.preco;

        const classeEstoque =
            produto.quantidade <= 5
                ? "estoque-baixo"
                : "estoque-normal";

        tr.innerHTML = `

            <td>${produto.id}</td>

            <td>
                <strong>${produto.nome}</strong>
            </td>

            <td>
                ${produto.categoria}
            </td>

            <td class="${classeEstoque}">
                ${produto.quantidade}
                ${produto.quantidade <= 5 ? " ⚠️" : ""}
            </td>

            <td>
                ${formatarMoeda(produto.preco)}
            </td>

            <td>
                ${formatarMoeda(total)}
            </td>

            <td>

                <button
                    class="btn-editar"
                    onclick="editarProduto(${produto.id})"
                >
                    Editar
                </button>

                <button
                    class="btn-excluir"
                    onclick="excluirProduto(${produto.id})"
                >
                    Excluir
                </button>

            </td>

        `;

        listaProdutos.appendChild(tr);

    });


    atualizarEstatisticas();

}


// ==========================================
// EDITAR PRODUTO
// ==========================================

function editarProduto(id) {

    const produto = produtos.find(
        produto => produto.id === id
    );

    if (!produto) {
        return;
    }


    produtoId.value = produto.id;

    nome.value = produto.nome;

    categoria.value = produto.categoria;

    quantidade.value = produto.quantidade;

    preco.value = produto.preco;


    tituloForm.textContent = "Editar Produto";

    btnCancelar.style.display = "inline-block";


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ==========================================
// CANCELAR EDIÇÃO
// ==========================================

function cancelarEdicao() {

    limparFormulario();

}


// ==========================================
// EXCLUIR PRODUTO
// ==========================================

function excluirProduto(id) {

    const produto = produtos.find(
        produto => produto.id === id
    );

    if (!produto) {
        return;
    }


    const confirmar = confirm(
        `Deseja realmente excluir o produto "${produto.nome}"?`
    );


    if (!confirmar) {
        return;
    }


    produtos = produtos.filter(
        produto => produto.id !== id
    );


    salvarLocalStorage();

    atualizarTela();

}


// ==========================================
// LIMPAR FORMULÁRIO
// ==========================================

function limparFormulario() {

    formulario.reset();

    produtoId.value = "";

    tituloForm.textContent = "Cadastrar Produto";

    btnCancelar.style.display = "none";

}


// ==========================================
// ESTATÍSTICAS
// ==========================================

function atualizarEstatisticas() {

    const quantidadeProdutos = produtos.length;

    const quantidadeItens = produtos.reduce(
        (total, produto) => total + produto.quantidade,
        0
    );


    const valorTotal = produtos.reduce(
        (total, produto) =>
            total + (produto.quantidade * produto.preco),
        0
    );


    totalProdutos.textContent = quantidadeProdutos;

    totalItens.textContent = quantidadeItens;

    valorEstoque.textContent = formatarMoeda(valorTotal);

}


// ==========================================
// FORMATAR MOEDA
// ==========================================

function formatarMoeda(valor) {

    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}


// ==========================================
// PESQUISA
// ==========================================

pesquisa.addEventListener("input", function () {

    atualizarTela();

});


// ==========================================
// INICIALIZAÇÃO
// ==========================================

atualizarTela();