let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

const form = document.getElementById("produtoForm");

const codigo = document.getElementById("codigo");
const nome = document.getElementById("nome");
const categoria = document.getElementById("categoria");
const quantidade = document.getElementById("quantidade");
const estoqueMinimo = document.getElementById("estoqueMinimo");
const preco = document.getElementById("preco");
const produtoId = document.getElementById("produtoId");

const tabela = document.getElementById("tabelaProdutos");
const busca = document.getElementById("busca");

const btnSalvar = document.getElementById("btnSalvar");
const btnCancelar = document.getElementById("btnCancelar");

// Salvar produtos
function salvarLocalStorage() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}

// Cadastro / edição
form.addEventListener("submit", function(event) {

    event.preventDefault();

    const produto = {
        codigo: codigo.value.trim(),
        nome: nome.value.trim(),
        categoria: categoria.value.trim(),
        quantidade: Number(quantidade.value),
        estoqueMinimo: Number(estoqueMinimo.value),
        preco: Number(preco.value)
    };

    if (produtoId.value) {

        const index = produtos.findIndex(
            p => p.id == produtoId.value
        );

        if (index !== -1) {
            produtos[index] = {
                ...produtos[index],
                ...produto
            };
        }

    } else {

        produto.id = Date.now();

        produtos.push(produto);
    }

    salvarLocalStorage();

    form.reset();

    produtoId.value = "";

    btnSalvar.textContent = "Cadastrar produto";

    btnCancelar.classList.add("hidden");

    atualizarTabela();
    atualizarDashboard();

});

// Atualizar tabela
function atualizarTabela() {

    const textoBusca = busca.value.toLowerCase();

    tabela.innerHTML = "";

    const produtosFiltrados = produtos.filter(produto => {

        return (
            produto.nome.toLowerCase().includes(textoBusca) ||
            produto.codigo.toLowerCase().includes(textoBusca) ||
            produto.categoria.toLowerCase().includes(textoBusca)
        );

    });

    if (produtosFiltrados.length === 0) {

        tabela.innerHTML = `
            <tr>
                <td colspan="8" style="text-align:center">
                    Nenhum produto encontrado.
                </td>
            </tr>
        `;

        return;
    }

    produtosFiltrados.forEach(produto => {

        let status = "";
        let classeStatus = "";

        if (produto.quantidade === 0) {

            status = "Esgotado";
            classeStatus = "status-esgotado";

        } else if (produto.quantidade <= produto.estoqueMinimo) {

            status = "Estoque baixo";
            classeStatus = "status-baixo";

        } else {

            status = "Normal";
            classeStatus = "status-ok";
        }

        const total = produto.quantidade * produto.preco;

        const linha = document.createElement("tr");

        linha.innerHTML = `

            <td>${produto.codigo}</td>

            <td>${produto.nome}</td>

            <td>${produto.categoria}</td>

            <td>${produto.quantidade}</td>

            <td>${formatarMoeda(produto.preco)}</td>

            <td>${formatarMoeda(total)}</td>

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
}

// Editar
function editarProduto(id) {

    const produto = produtos.find(p => p.id === id);

    if (!produto) return;

    produtoId.value = produto.id;

    codigo.value = produto.codigo;
    nome.value = produto.nome;
    categoria.value = produto.categoria;
    quantidade.value = produto.quantidade;
    estoqueMinimo.value = produto.estoqueMinimo;
    preco.value = produto.preco;

    btnSalvar.textContent = "Salvar alterações";

    btnCancelar.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Cancelar edição
btnCancelar.addEventListener("click", function() {

    form.reset();

    produtoId.value = "";

    btnSalvar.textContent = "Cadastrar produto";

    btnCancelar.classList.add("hidden");

});

// Excluir
function excluirProduto(id) {

    const produto = produtos.find(p => p.id === id);

    if (!produto) return;

    const confirmar = confirm(
        `Deseja realmente excluir o produto "${produto.nome}"?`
    );

    if (!confirmar) return;

    produtos = produtos.filter(p => p.id !== id);

    salvarLocalStorage();

    atualizarTabela();
    atualizarDashboard();
}

// Dashboard
function atualizarDashboard() {

    const totalProdutos = produtos.length;

    const totalItens = produtos.reduce(
        (total, produto) =>
            total + produto.quantidade,
        0
    );

    const produtosBaixos = produtos.filter(
        produto =>
            produto.quantidade <= produto.estoqueMinimo
    ).length;

    const valorTotal = produtos.reduce(
        (total, produto) =>
            total + (produto.quantidade * produto.preco),
        0
    );

    document.getElementById("totalProdutos").textContent =
        totalProdutos;

    document.getElementById("totalItens").textContent =
        totalItens;

    document.getElementById("estoqueBaixo").textContent =
        produtosBaixos;

    document.getElementById("valorEstoque").textContent =
        formatarMoeda(valorTotal);
}

// Formatação de moeda
function formatarMoeda(valor) {

    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}

// Busca
busca.addEventListener("input", atualizarTabela);

// Inicialização
atualizarTabela();
atualizarDashboard();