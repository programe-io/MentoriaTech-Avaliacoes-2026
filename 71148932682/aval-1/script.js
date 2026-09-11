```javascript
// ========================================
// SISTEMA DE ESTOQUE
// ========================================

// Recupera os produtos salvos no navegador
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];


// ========================================
// ELEMENTOS DO HTML
// ========================================

const formProduto = document.getElementById("formProduto");
const descricao = document.getElementById("descricao");
const categoria = document.getElementById("categoria");
const quantidade = document.getElementById("quantidade");
const preco = document.getElementById("preco");

const produtoId = document.getElementById("produtoId");

const listaProdutos = document.getElementById("listaProdutos");
const mensagemVazia = document.getElementById("mensagemVazia");

const pesquisa = document.getElementById("pesquisa");

const totalProdutos = document.getElementById("totalProdutos");
const quantidadeEstoque = document.getElementById("quantidadeEstoque");
const valorEstoque = document.getElementById("valorEstoque");

const btnSalvar = document.getElementById("btnSalvar");
const btnCancelar = document.getElementById("btnCancelar");


// ========================================
// SALVAR NO LOCALSTORAGE
// ========================================

function salvarDados() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}


// ========================================
// GERAR CÓDIGO DO PRODUTO
// ========================================

function gerarCodigo() {

    if (produtos.length === 0) {
        return 1;
    }

    return Math.max(...produtos.map(produto => produto.codigo)) + 1;
}


// ========================================
// VALIDAR PRODUTO
// ========================================

function validarProduto() {

    if (descricao.value.trim().length < 5) {
        alert("A descrição deve ter pelo menos 5 caracteres.");
        descricao.focus();
        return false;
    }

    if (categoria.value.trim() === "") {
        alert("Informe a categoria do produto.");
        categoria.focus();
        return false;
    }

    if (quantidade.value < 0 || quantidade.value === "") {
        alert("Informe uma quantidade válida.");
        quantidade.focus();
        return false;
    }

    if (preco.value < 0 || preco.value === "") {
        alert("Informe um preço válido.");
        preco.focus();
        return false;
    }

    return true;
}


// ========================================
// CADASTRAR OU EDITAR
// ========================================

formProduto.addEventListener("submit", function(event) {

    event.preventDefault();

    if (!validarProduto()) {
        return;
    }

    const id = produtoId.value;

    // EDITAR
    if (id !== "") {

        const produto = produtos.find(
            produto => produto.id == id
        );

        produto.descricao = descricao.value.trim();
        produto.categoria = categoria.value.trim();
        produto.quantidade = Number(quantidade.value);
        produto.preco = Number(preco.value);

        alert("Produto atualizado com sucesso!");

    }

    // CADASTRAR
    else {

        const novoProduto = {

            id: Date.now(),

            codigo: gerarCodigo(),

            descricao: descricao.value.trim(),

            categoria: categoria.value.trim(),

            quantidade: Number(quantidade.value),

            preco: Number(preco.value)

        };

        produtos.push(novoProduto);

        alert("Produto cadastrado com sucesso!");
    }

    salvarDados();

    formProduto.reset();

    produtoId.value = "";

    btnSalvar.textContent = "Cadastrar Produto";

    btnCancelar.style.display = "none";

    document.getElementById("tituloFormulario").textContent =
        "Cadastrar Produto";

    mostrarProdutos();

});


// ========================================
// MOSTRAR PRODUTOS
// ========================================

function mostrarProdutos(lista = produtos) {

    listaProdutos.innerHTML = "";

    if (lista.length === 0) {

        mensagemVazia.style.display = "block";

        atualizarResumo();

        return;
    }

    mensagemVazia.style.display = "none";


    lista.forEach(produto => {

        const tr = document.createElement("tr");

        const total = produto.quantidade * produto.preco;

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

            <td>#${produto.codigo}</td>

            <td>${produto.descricao}</td>

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


// ========================================
// EDITAR PRODUTO
// ========================================

function editarProduto(id) {

    const produto = produtos.find(
        produto => produto.id === id
    );

    if (!produto) {
        return;
    }

    produtoId.value = produto.id;

    descricao.value = produto.descricao;

    categoria.value = produto.categoria;

    quantidade.value = produto.quantidade;

    preco.value = produto.preco;

    document.getElementById("tituloFormulario").textContent =
        "Editar Produto";

    btnSalvar.textContent = "Salvar Alterações";

    btnCancelar.style.display = "block";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ========================================
// CANCELAR EDIÇÃO
// ========================================

function cancelarEdicao() {

    formProduto.reset();

    produtoId.value = "";

    btnSalvar.textContent = "Cadastrar Produto";

    btnCancelar.style.display = "none";

    document.getElementById("tituloFormulario").textContent =
        "Cadastrar Produto";
}


// ========================================
// EXCLUIR PRODUTO
// ========================================

function excluirProduto(id) {

    const produto = produtos.find(
        produto => produto.id === id
    );

    if (!produto) {
        return;
    }

    const confirmar = confirm(
        `Deseja realmente excluir o produto "${produto.descricao}"?`
    );

    if (!confirmar) {
        return;
    }

    produtos = produtos.filter(
        produto => produto.id !== id
    );

    salvarDados();

    mostrarProdutos();

}


// ========================================
// PESQUISAR PRODUTOS
// ========================================

pesquisa.addEventListener("input", function() {

    const texto = pesquisa.value.toLowerCase().trim();

    const resultados = produtos.filter(produto =>

        produto.descricao.toLowerCase().includes(texto) ||

        produto.categoria.toLowerCase().includes(texto) ||

        produto.codigo.toString().includes(texto)

    );

    mostrarProdutos(resultados);
});


// ========================================
// ATUALIZAR RESUMO
// ========================================

function atualizarResumo() {

    totalProdutos.textContent = produtos.length;


    const quantidadeTotal = produtos.reduce(
        (total, produto) =>
            total + produto.quantidade,
        0
    );

    quantidadeEstoque.textContent = quantidadeTotal;


    const valorTotal = produtos.reduce(
        (total, produto) =>
            total + (produto.quantidade * produto.preco),
        0
    );

    valorEstoque.textContent =
        formatarMoeda(valorTotal);
}


// ========================================
// FORMATAR MOEDA
// ========================================

function formatarMoeda(valor) {

    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}


// ========================================
// INICIAR SISTEMA
// ========================================

mostrarProdutos();
```
