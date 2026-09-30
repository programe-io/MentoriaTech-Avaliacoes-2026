// ===============================
// SISTEMA DE ESTOQUE
// ===============================

let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

const form = document.getElementById("formProduto");
const tabela = document.getElementById("tabelaProdutos");
const pesquisa = document.getElementById("pesquisa");
const btnCancelar = document.getElementById("btnCancelar");

// ===============================
// FORMATAR MOEDA
// ===============================

function formatarMoeda(valor) {

    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}

// ===============================
// SALVAR NO LOCALSTORAGE
// ===============================

function salvarDados() {

    localStorage.setItem(
        "produtos",
        JSON.stringify(produtos)
    );

}

// ===============================
// GERAR ID
// ===============================

function gerarId() {

    return Date.now();

}

// ===============================
// CADASTRAR / EDITAR PRODUTO
// ===============================

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const id = document.getElementById("produtoId").value;

    const nome = document.getElementById("nome").value.trim();
    const categoria = document.getElementById("categoria").value.trim();
    const quantidade = Number(
        document.getElementById("quantidade").value
    );
    const preco = Number(
        document.getElementById("preco").value
    );
    const estoqueMinimo = Number(
        document.getElementById("estoqueMinimo").value
    );

    if (!nome || !categoria) {
        alert("Preencha todos os campos.");
        return;
    }

    const produto = {
        id: id ? Number(id) : gerarId(),
        nome,
        categoria,
        quantidade,
        preco,
        estoqueMinimo
    };

    if (id) {

        const index = produtos.findIndex(
            item => item.id === Number(id)
        );

        produtos[index] = produto;

        alert("Produto atualizado com sucesso!");

    } else {

        produtos.push(produto);

        alert("Produto cadastrado com sucesso!");

    }

    salvarDados();
    atualizarTela();
    limparFormulario();

});

// ===============================
// LISTAR PRODUTOS
// ===============================

function atualizarTela() {

    tabela.innerHTML = "";

    const textoPesquisa = pesquisa.value
        .toLowerCase()
        .trim();

    const produtosFiltrados = produtos.filter(produto => {

        return (
            produto.nome.toLowerCase().includes(textoPesquisa) ||
            produto.categoria.toLowerCase().includes(textoPesquisa)
        );

    });

    produtosFiltrados.forEach(produto => {

        const linha = document.createElement("tr");

        let status;
        let classeStatus;

        if (produto.quantidade === 0) {

            status = "Esgotado";
            classeStatus = "esgotado";

        } else if (
            produto.quantidade <= produto.estoqueMinimo
        ) {

            status = "Estoque baixo";
            classeStatus = "baixo";

        } else {

            status = "Normal";
            classeStatus = "normal";

        }

        const valorTotal =
            produto.quantidade * produto.preco;

        linha.innerHTML = `

            <td>${produto.nome}</td>

            <td>${produto.categoria}</td>

            <td>${produto.quantidade}</td>

            <td>${formatarMoeda(produto.preco)}</td>

            <td>${formatarMoeda(valorTotal)}</td>

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

        tabela.appendChild(linha);

    });

    atualizarResumo();

}

// ===============================
// ATUALIZAR RESUMO
// ===============================

function atualizarResumo() {

    const totalProdutos = produtos.length;

    const totalItens = produtos.reduce(
        (total, produto) =>
            total + produto.quantidade,
        0
    );

    const produtosBaixo = produtos.filter(
        produto =>
            produto.quantidade <= produto.estoqueMinimo
    ).length;

    const valorEstoque = produtos.reduce(
        (total, produto) =>
            total +
            (produto.quantidade * produto.preco),
        0
    );

    document.getElementById(
        "totalProdutos"
    ).textContent = totalProdutos;

    document.getElementById(
        "totalItens"
    ).textContent = totalItens;

    document.getElementById(
        "estoqueBaixo"
    ).textContent = produtosBaixo;

    document.getElementById(
        "valorEstoque"
    ).textContent = formatarMoeda(valorEstoque);

}

// ===============================
// EDITAR PRODUTO
// ===============================

function editarProduto(id) {

    const produto = produtos.find(
        item => item.id === id
    );

    if (!produto) return;

    document.getElementById("produtoId").value =
        produto.id;

    document.getElementById("nome").value =
        produto.nome;

    document.getElementById("categoria").value =
        produto.categoria;

    document.getElementById("quantidade").value =
        produto.quantidade;

    document.getElementById("preco").value =
        produto.preco;

    document.getElementById("estoqueMinimo").value =
        produto.estoqueMinimo;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

// ===============================
// EXCLUIR PRODUTO
// ===============================

function excluirProduto(id) {

    const produto = produtos.find(
        item => item.id === id
    );

    if (!produto) return;

    const confirmar = confirm(
        `Deseja realmente excluir o produto "${produto.nome}"?`
    );

    if (!confirmar) return;

    produtos = produtos.filter(
        item => item.id !== id
    );

    salvarDados();
    atualizarTela();

}

// ===============================
// LIMPAR FORMULÁRIO
// ===============================

function limparFormulario() {

    form.reset();

    document.getElementById(
        "produtoId"
    ).value = "";

    document.getElementById(
        "estoqueMinimo"
    ).value = 5;

}

// ===============================
// BOTÃO CANCELAR
// ===============================

btnCancelar.addEventListener(
    "click",
    limparFormulario
);

// ===============================
// PESQUISA
// ===============================

pesquisa.addEventListener(
    "input",
    atualizarTela
);

// ===============================
// INICIALIZAÇÃO
// ===============================

atualizarTela();