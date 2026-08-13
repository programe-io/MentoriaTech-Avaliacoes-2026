let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

const form = document.getElementById("produto-form");
const tabela = document.getElementById("tabela-produtos");
const pesquisa = document.getElementById("pesquisa");

const nome = document.getElementById("nome");
const categoria = document.getElementById("categoria");
const preco = document.getElementById("preco");
const quantidade = document.getElementById("quantidade");
const produtoId = document.getElementById("produto-id");

const formTitle = document.getElementById("form-title");
const btnSalvar = document.getElementById("btn-salvar");
const btnCancelar = document.getElementById("btn-cancelar");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const id = produtoId.value;

    const produto = {
        id: id ? Number(id) : Date.now(),
        nome: nome.value.trim(),
        categoria: categoria.value.trim(),
        preco: Number(preco.value),
        quantidade: Number(quantidade.value)
    };

    if (id) {
        const index = produtos.findIndex(
            produto => produto.id === Number(id)
        );

        if (index !== -1) {
            produtos[index] = produto;
        }
    } else {
        produtos.push(produto);
    }

    salvarProdutos();
    renderizarProdutos();
    limparFormulario();
});

function salvarProdutos() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}

function renderizarProdutos(lista = produtos) {

    tabela.innerHTML = "";

    const semProdutos = document.getElementById("sem-produtos");

    if (lista.length === 0) {
        semProdutos.style.display = "block";
    } else {
        semProdutos.style.display = "none";
    }

    lista.forEach(produto => {

        const tr = document.createElement("tr");

        let status;
        let classeStatus;

        if (produto.quantidade === 0) {
            status = "Esgotado";
            classeStatus = "status-esgotado";
        } else if (produto.quantidade <= 5) {
            status = "Estoque baixo";
            classeStatus = "status-baixo";
        } else {
            status = "Disponível";
            classeStatus = "status-ok";
        }

        tr.innerHTML = `
            <td>${produto.id}</td>

            <td>
                <strong>${produto.nome}</strong>
            </td>

            <td>${produto.categoria}</td>

            <td>
                ${formatarMoeda(produto.preco)}
            </td>

            <td>
                ${produto.quantidade}
            </td>

            <td>
                <span class="status ${classeStatus}">
                    ${status}
                </span>
            </td>

            <td>
                <div class="acoes">

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

                </div>
            </td>
        `;

        tabela.appendChild(tr);
    });

    atualizarDashboard();
}

function editarProduto(id) {

    const produto = produtos.find(
        produto => produto.id === id
    );

    if (!produto) return;

    produtoId.value = produto.id;
    nome.value = produto.nome;
    categoria.value = produto.categoria;
    preco.value = produto.preco;
    quantidade.value = produto.quantidade;

    formTitle.textContent = "Editar Produto";
    btnSalvar.textContent = "Salvar Alterações";
    btnCancelar.hidden = false;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function excluirProduto(id) {

    const produto = produtos.find(
        produto => produto.id === id
    );

    if (!produto) return;

    const confirmar = confirm(
        `Deseja realmente excluir "${produto.nome}"?`
    );

    if (!confirmar) return;

    produtos = produtos.filter(
        produto => produto.id !== id
    );

    salvarProdutos();
    renderizarProdutos();
}

function cancelarEdicao() {
    limparFormulario();
}

function limparFormulario() {

    form.reset();

    produtoId.value = "";

    formTitle.textContent = "Cadastrar Produto";
    btnSalvar.textContent = "Cadastrar";
    btnCancelar.hidden = true;
}

function atualizarDashboard() {

    const totalProdutos = produtos.length;

    const quantidadeEstoque = produtos.reduce(
        (total, produto) => total + produto.quantidade,
        0
    );

    const estoqueBaixo = produtos.filter(
        produto => produto.quantidade <= 5
    ).length;

    const valorEstoque = produtos.reduce(
        (total, produto) =>
            total + produto.preco * produto.quantidade,
        0
    );

    document.getElementById("card-produtos").textContent =
        totalProdutos;

    document.getElementById("card-estoque").textContent =
        quantidadeEstoque;

    document.getElementById("card-baixo").textContent =
        estoqueBaixo;

    document.getElementById("card-valor").textContent =
        formatarMoeda(valorEstoque);

    document.getElementById("total-produtos").textContent =
        totalProdutos === 1
            ? "1 produto cadastrado"
            : `${totalProdutos} produtos cadastrados`;
}

function formatarMoeda(valor) {

    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

pesquisa.addEventListener("input", function () {

    const termo = pesquisa.value.toLowerCase();

    const resultados = produtos.filter(produto =>
        produto.nome.toLowerCase().includes(termo) ||
        produto.categoria.toLowerCase().includes(termo)
    );

    renderizarProdutos(resultados);
});

renderizarProdutos();