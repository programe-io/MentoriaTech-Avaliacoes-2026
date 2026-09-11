// Recupera os produtos salvos no navegador
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

const form = document.getElementById("produtoForm");
const nome = document.getElementById("nome");
const categoria = document.getElementById("categoria");
const preco = document.getElementById("preco");
const quantidade = document.getElementById("quantidade");
const produtoId = document.getElementById("produtoId");

const listaProdutos = document.getElementById("listaProdutos");
const pesquisa = document.getElementById("pesquisa");

const totalProdutos = document.getElementById("totalProdutos");
const totalEstoque = document.getElementById("totalEstoque");
const valorEstoque = document.getElementById("valorEstoque");
const contador = document.getElementById("contador");
const mensagemVazia = document.getElementById("mensagemVazia");

const btnSalvar = document.getElementById("btnSalvar");
const btnCancelar = document.getElementById("btnCancelar");


// Salvar produtos no localStorage
function salvarNoStorage() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}


// Formatação de moeda
function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}


// Cadastrar ou editar produto
form.addEventListener("submit", function (event) {

    event.preventDefault();

    const nomeProduto = nome.value.trim();
    const categoriaProduto = categoria.value;
    const precoProduto = Number(preco.value);
    const quantidadeProduto = Number(quantidade.value);

    if (
        !nomeProduto ||
        !categoriaProduto ||
        precoProduto < 0 ||
        quantidadeProduto < 0
    ) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    // Verifica se estamos editando
    if (produtoId.value) {

        const id = Number(produtoId.value);

        const produto = produtos.find(
            produto => produto.id === id
        );

        if (produto) {
            produto.nome = nomeProduto;
            produto.categoria = categoriaProduto;
            produto.preco = precoProduto;
            produto.quantidade = quantidadeProduto;
        }

        alert("Produto atualizado com sucesso!");

    } else {

        const novoProduto = {
            id: Date.now(),
            nome: nomeProduto,
            categoria: categoriaProduto,
            preco: precoProduto,
            quantidade: quantidadeProduto
        };

        produtos.push(novoProduto);

        alert("Produto cadastrado com sucesso!");
    }

    salvarNoStorage();

    form.reset();

    produtoId.value = "";

    btnSalvar.textContent = "Cadastrar Produto";
    btnCancelar.style.display = "none";

    renderizarProdutos();
});


// Renderizar produtos na tabela
function renderizarProdutos() {

    const termo = pesquisa.value.toLowerCase().trim();

    const produtosFiltrados = produtos.filter(produto =>
        produto.nome.toLowerCase().includes(termo) ||
        produto.categoria.toLowerCase().includes(termo)
    );

    listaProdutos.innerHTML = "";

    if (produtosFiltrados.length === 0) {
        mensagemVazia.style.display = "block";
    } else {
        mensagemVazia.style.display = "none";
    }

    produtosFiltrados.forEach(produto => {

        const tr = document.createElement("tr");

        const total = produto.preco * produto.quantidade;

        tr.innerHTML = `
            <td>${produto.nome}</td>

            <td>${produto.categoria}</td>

            <td>${formatarMoeda(produto.preco)}</td>

            <td>${produto.quantidade}</td>

            <td>${formatarMoeda(total)}</td>

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

    atualizarResumo();
}


// Editar produto
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

    btnSalvar.textContent = "Salvar Alterações";
    btnCancelar.style.display = "block";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// Cancelar edição
function cancelarEdicao() {

    form.reset();

    produtoId.value = "";

    btnSalvar.textContent = "Cadastrar Produto";
    btnCancelar.style.display = "none";
}


// Excluir produto
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

    salvarNoStorage();

    renderizarProdutos();
}


// Atualizar resumo
function atualizarResumo() {

    const quantidadeTotal = produtos.reduce(
        (total, produto) =>
            total + produto.quantidade,
        0
    );

    const valorTotal = produtos.reduce(
        (total, produto) =>
            total + (produto.preco * produto.quantidade),
        0
    );

    totalProdutos.textContent = produtos.length;

    totalEstoque.textContent = quantidadeTotal;

    valorEstoque.textContent = formatarMoeda(valorTotal);

    contador.textContent =
        produtos.length === 1
            ? "1 produto"
            : `${produtos.length} produtos`;
}


// Pesquisa
pesquisa.addEventListener("input", renderizarProdutos);


// Inicializar aplicação
renderizarProdutos();
