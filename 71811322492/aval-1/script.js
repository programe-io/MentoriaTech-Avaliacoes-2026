// ==========================================
// CRUD DE PRODUTOS
// ==========================================

// Carrega os produtos do localStorage
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];


// Elementos do HTML
const form = document.getElementById("produtoForm");
const tabela = document.getElementById("tabelaProdutos");
const pesquisa = document.getElementById("pesquisa");

const totalProdutos = document.getElementById("totalProdutos");
const totalEstoque = document.getElementById("totalEstoque");
const estoqueBaixo = document.getElementById("estoqueBaixo");

const tituloFormulario = document.getElementById("tituloFormulario");
const produtoId = document.getElementById("produtoId");
const nome = document.getElementById("nome");
const categoria = document.getElementById("categoria");
const preco = document.getElementById("preco");
const quantidade = document.getElementById("quantidade");


// ==========================================
// SALVAR NO LOCAL STORAGE
// ==========================================

function salvarLocalStorage() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}


// ==========================================
// CADASTRAR / EDITAR
// ==========================================

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

    // EDITAR
    if (id) {

        const index = produtos.findIndex(
            item => item.id === Number(id)
        );

        if (index !== -1) {
            produtos[index] = produto;
        }

    } 
    
    // CADASTRAR
    else {
        produtos.push(produto);
    }

    salvarLocalStorage();

    atualizarTabela();
    atualizarDashboard();

    cancelarEdicao();

});


// ==========================================
// MOSTRAR PRODUTOS
// ==========================================

function atualizarTabela(lista = produtos) {

    tabela.innerHTML = "";

    const semProdutos = document.getElementById("semProdutos");

    if (lista.length === 0) {
        semProdutos.style.display = "block";
        return;
    }

    semProdutos.style.display = "none";

    lista.forEach(produto => {

        let status = "";
        let classeStatus = "";

        if (produto.quantidade === 0) {

            status = "Sem estoque";
            classeStatus = "zero";

        } else if (produto.quantidade <= 5) {

            status = "Estoque baixo";
            classeStatus = "baixo";

        } else {

            status = "Disponível";
            classeStatus = "ok";

        }

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${produto.id}</td>

            <td>
                <strong>${escapeHTML(produto.nome)}</strong>
            </td>

            <td>${escapeHTML(produto.categoria)}</td>

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
                        class="btn btn-editar"
                        onclick="editarProduto(${produto.id})"
                    >
                        Editar
                    </button>

                    <button
                        class="btn btn-excluir"
                        onclick="excluirProduto(${produto.id})"
                    >
                        Excluir
                    </button>

                </div>
            </td>
        `;

        tabela.appendChild(linha);
    });
}


// ==========================================
// EDITAR PRODUTO
// ==========================================

function editarProduto(id) {

    const produto = produtos.find(
        item => item.id === id
    );

    if (!produto) {
        return;
    }

    produtoId.value = produto.id;
    nome.value = produto.nome;
    categoria.value = produto.categoria;
    preco.value = produto.preco;
    quantidade.value = produto.quantidade;

    tituloFormulario.textContent = "Editar produto";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ==========================================
// EXCLUIR PRODUTO
// ==========================================

function excluirProduto(id) {

    const produto = produtos.find(
        item => item.id === id
    );

    if (!produto) {
        return;
    }

    const confirmar = confirm(
        `Deseja realmente excluir "${produto.nome}"?`
    );

    if (!confirmar) {
        return;
    }

    produtos = produtos.filter(
        item => item.id !== id
    );

    salvarLocalStorage();

    atualizarTabela();
    atualizarDashboard();
}


// ==========================================
// CANCELAR EDIÇÃO
// ==========================================

function cancelarEdicao() {

    form.reset();

    produtoId.value = "";

    tituloFormulario.textContent = "Cadastrar produto";
}


// ==========================================
// DASHBOARD
// ==========================================

function atualizarDashboard() {

    // Total de produtos
    totalProdutos.textContent = produtos.length;

    // Soma do estoque
    const estoque = produtos.reduce(
        (total, produto) => total + produto.quantidade,
        0
    );

    totalEstoque.textContent = estoque;

    // Produtos com estoque baixo
    const baixo = produtos.filter(
        produto =>
            produto.quantidade > 0 &&
            produto.quantidade <= 5
    ).length;

    estoqueBaixo.textContent = baixo;
}


// ==========================================
// PESQUISA
// ==========================================

pesquisa.addEventListener("input", function () {

    const termo = pesquisa.value.toLowerCase().trim();

    const resultado = produtos.filter(produto => {

        return (
            produto.nome.toLowerCase().includes(termo) ||
            produto.categoria.toLowerCase().includes(termo)
        );

    });

    atualizarTabela(resultado);
});


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
// SEGURANÇA PARA TEXTO HTML
// ==========================================

function escapeHTML(texto) {

    return String(texto)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


// ==========================================
// INICIALIZAÇÃO
// ==========================================

atualizarTabela();
atualizarDashboard();