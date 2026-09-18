const produtoForm = document.getElementById("produtoForm");
const listaProdutos = document.getElementById("listaProdutos");
const busca = document.getElementById("busca");

const nome = document.getElementById("nome");
const categoria = document.getElementById("categoria");
const quantidade = document.getElementById("quantidade");
const minimo = document.getElementById("minimo");
const preco = document.getElementById("preco");
const produtoId = document.getElementById("produtoId");

const btnSalvar = document.getElementById("btnSalvar");
const btnCancelar = document.getElementById("btnCancelar");
const formTitulo = document.getElementById("formTitulo");

let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

// ------------------------------------
// Salvar no localStorage
// ------------------------------------

function salvarProdutos() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}

// ------------------------------------
// Formatar dinheiro
// ------------------------------------

function formatarPreco(valor) {
    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// ------------------------------------
// Status do estoque
// ------------------------------------

function obterStatus(produto) {

    if (produto.quantidade === 0) {
        return {
            texto: "Esgotado",
            classe: "esgotado"
        };
    }

    if (produto.quantidade <= produto.minimo) {
        return {
            texto: "Estoque baixo",
            classe: "baixo"
        };
    }

    return {
        texto: "Normal",
        classe: "normal"
    };
}

// ------------------------------------
// Renderizar produtos
// ------------------------------------

function renderizarProdutos(filtro = "") {

    listaProdutos.innerHTML = "";

    const termo = filtro.toLowerCase().trim();

    const produtosFiltrados = produtos.filter(produto =>
        produto.nome.toLowerCase().includes(termo) ||
        produto.categoria.toLowerCase().includes(termo)
    );

    document.getElementById("semProdutos").style.display =
        produtosFiltrados.length === 0 ? "block" : "none";

    produtosFiltrados.forEach(produto => {

        const status = obterStatus(produto);

        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>
                <strong>${escaparHTML(produto.nome)}</strong>
            </td>

            <td>
                ${escaparHTML(produto.categoria)}
            </td>

            <td>
                ${produto.quantidade}
            </td>

            <td>
                ${formatarPreco(produto.preco)}
            </td>

            <td>
                <span class="status ${status.classe}">
                    ${status.texto}
                </span>
            </td>

            <td>
                <div class="acoes">

                    <button
                        class="btn-edit"
                        onclick="editarProduto('${produto.id}')"
                    >
                        Editar
                    </button>

                    <button
                        class="btn-delete"
                        onclick="excluirProduto('${produto.id}')"
                    >
                        Excluir
                    </button>

                </div>
            </td>
        `;

        listaProdutos.appendChild(tr);
    });

    atualizarDashboard();
}

// ------------------------------------
// Evitar HTML injection
// ------------------------------------

function escaparHTML(texto) {
    const div = document.createElement("div");
    div.textContent = texto;
    return div.innerHTML;
}

// ------------------------------------
// Dashboard
// ------------------------------------

function atualizarDashboard() {

    const totalProdutos = produtos.length;

    const totalItens = produtos.reduce(
        (total, produto) => total + Number(produto.quantidade),
        0
    );

    const estoqueBaixo = produtos.filter(
        produto =>
            produto.quantidade > 0 &&
            produto.quantidade <= produto.minimo
    ).length;

    const semEstoque = produtos.filter(
        produto => produto.quantidade === 0
    ).length;

    document.getElementById("totalProdutos").textContent = totalProdutos;
    document.getElementById("totalItens").textContent = totalItens;
    document.getElementById("estoqueBaixo").textContent = estoqueBaixo;
    document.getElementById("semEstoque").textContent = semEstoque;
}

// ------------------------------------
// Cadastrar / editar
// ------------------------------------

produtoForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const id = produtoId.value;

    const produto = {
        id: id || crypto.randomUUID(),
        nome: nome.value.trim(),
        categoria: categoria.value.trim(),
        quantidade: Number(quantidade.value),
        minimo: Number(minimo.value),
        preco: Number(preco.value)
    };

    if (id) {

        const index = produtos.findIndex(
            item => item.id === id
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

// ------------------------------------
// Editar produto
// ------------------------------------

function editarProduto(id) {

    const produto = produtos.find(
        item => item.id === id
    );

    if (!produto) return;

    produtoId.value = produto.id;
    nome.value = produto.nome;
    categoria.value = produto.categoria;
    quantidade.value = produto.quantidade;
    minimo.value = produto.minimo;
    preco.value = produto.preco;

    formTitulo.textContent = "Editar produto";
    btnSalvar.textContent = "Salvar alterações";
    btnCancelar.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// ------------------------------------
// Excluir produto
// ------------------------------------

function excluirProduto(id) {

    const produto = produtos.find(
        item => item.id === id
    );

    if (!produto) return;

    const confirmar = confirm(
        `Deseja excluir o produto "${produto.nome}"?`
    );

    if (!confirmar) return;

    produtos = produtos.filter(
        item => item.id !== id
    );

    salvarProdutos();
    renderizarProdutos();

    if (produtoId.value === id) {
        limparFormulario();
    }
}

// ------------------------------------
// Limpar formulário
// ------------------------------------

function limparFormulario() {

    produtoForm.reset();

    produtoId.value = "";

    minimo.value = 5;

    formTitulo.textContent = "Cadastrar produto";

    btnSalvar.textContent = "Cadastrar produto";

    btnCancelar.classList.add("hidden");
}

// ------------------------------------
// Cancelar edição
// ------------------------------------

btnCancelar.addEventListener("click", limparFormulario);

// ------------------------------------
// Busca
// ------------------------------------

busca.addEventListener("input", function () {
    renderizarProdutos(this.value);
});

// ------------------------------------
// Inicialização
// ------------------------------------

renderizarProdutos();
