// ==========================================
// SISTEMA DE ESTOQUE
// ==========================================

let produtos = JSON.parse(localStorage.getItem("produtos")) || [];


// ==========================================
// ELEMENTOS
// ==========================================

const formProduto = document.getElementById("formProduto");
const listaProdutos = document.getElementById("listaProdutos");
const pesquisa = document.getElementById("pesquisa");


// ==========================================
// SALVAR NO LOCAL STORAGE
// ==========================================

function salvarDados() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
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
// CADASTRAR PRODUTO
// ==========================================

formProduto.addEventListener("submit", function(event) {

    event.preventDefault();

    const codigo = document.getElementById("codigo").value.trim();
    const nome = document.getElementById("nome").value.trim();
    const categoria = document.getElementById("categoria").value.trim();
    const preco = parseFloat(document.getElementById("preco").value);
    const quantidade = parseInt(document.getElementById("quantidade").value);

    // Verificar código duplicado

    const existe = produtos.some(
        produto => produto.codigo.toLowerCase() === codigo.toLowerCase()
    );

    if (existe) {

        alert("Já existe um produto com esse código.");

        return;
    }


    const produto = {

        id: Date.now(),

        codigo: codigo,

        nome: nome,

        categoria: categoria,

        preco: preco,

        quantidade: quantidade

    };


    produtos.push(produto);

    salvarDados();

    formProduto.reset();

    atualizarTabela();

    alert("Produto cadastrado com sucesso!");

});


// ==========================================
// ATUALIZAR TABELA
// ==========================================

function atualizarTabela() {

    const termo = pesquisa.value.toLowerCase();

    listaProdutos.innerHTML = "";

    const produtosFiltrados = produtos.filter(produto =>

        produto.nome.toLowerCase().includes(termo) ||

        produto.codigo.toLowerCase().includes(termo) ||

        produto.categoria.toLowerCase().includes(termo)

    );


    document.getElementById("mensagemVazia").style.display =
        produtosFiltrados.length === 0 ? "block" : "none";


    produtosFiltrados.forEach(produto => {

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


        const linha = document.createElement("tr");


        linha.innerHTML = `

            <td>${produto.codigo}</td>

            <td>${produto.nome}</td>

            <td>${produto.categoria}</td>

            <td>${formatarMoeda(produto.preco)}</td>

            <td>${produto.quantidade}</td>

            <td>
                <span class="status ${classeStatus}">
                    ${status}
                </span>
            </td>

            <td>

                <button
                    class="btn-entrada"
                    onclick="entradaProduto(${produto.id})">
                    +
                </button>

                <button
                    class="btn-saida"
                    onclick="saidaProduto(${produto.id})">
                    -
                </button>

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


        listaProdutos.appendChild(linha);

    });


    atualizarDashboard();

}


// ==========================================
// ENTRADA DE PRODUTO
// ==========================================

function entradaProduto(id) {

    const produto = produtos.find(p => p.id === id);

    if (!produto) return;


    const quantidade = parseInt(
        prompt(
            `Quantidade de entrada para "${produto.nome}":`
        )
    );


    if (isNaN(quantidade) || quantidade <= 0) {

        alert("Digite uma quantidade válida.");

        return;
    }


    produto.quantidade += quantidade;

    salvarDados();

    atualizarTabela();

}


// ==========================================
// SAÍDA DE PRODUTO
// ==========================================

function saidaProduto(id) {

    const produto = produtos.find(p => p.id === id);

    if (!produto) return;


    const quantidade = parseInt(
        prompt(
            `Quantidade de saída para "${produto.nome}":`
        )
    );


    if (isNaN(quantidade) || quantidade <= 0) {

        alert("Digite uma quantidade válida.");

        return;
    }


    if (quantidade > produto.quantidade) {

        alert("Quantidade de saída maior que o estoque disponível.");

        return;
    }


    produto.quantidade -= quantidade;

    salvarDados();

    atualizarTabela();

}


// ==========================================
// EXCLUIR PRODUTO
// ==========================================

function excluirProduto(id) {

    const produto = produtos.find(p => p.id === id);

    if (!produto) return;


    const confirmar = confirm(
        `Deseja realmente excluir o produto "${produto.nome}"?`
    );


    if (!confirmar) return;


    produtos = produtos.filter(
        produto => produto.id !== id
    );


    salvarDados();

    atualizarTabela();

}


// ==========================================
// EDITAR PRODUTO
// ==========================================

function editarProduto(id) {

    const produto = produtos.find(p => p.id === id);

    if (!produto) return;


    document.getElementById("editarId").value = produto.id;

    document.getElementById("editarCodigo").value = produto.codigo;

    document.getElementById("editarNome").value = produto.nome;

    document.getElementById("editarCategoria").value =
        produto.categoria;

    document.getElementById("editarPreco").value =
        produto.preco;

    document.getElementById("editarQuantidade").value =
        produto.quantidade;


    document.getElementById("modal").style.display = "block";

}


// ==========================================
// SALVAR EDIÇÃO
// ==========================================

document.getElementById("formEditar")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const id = Number(
            document.getElementById("editarId").value
        );


        const produto = produtos.find(
            produto => produto.id === id
        );


        if (!produto) return;


        produto.codigo =
            document.getElementById("editarCodigo").value.trim();


        produto.nome =
            document.getElementById("editarNome").value.trim();


        produto.categoria =
            document.getElementById("editarCategoria").value.trim();


        produto.preco =
            parseFloat(
                document.getElementById("editarPreco").value
            );


        produto.quantidade =
            parseInt(
                document.getElementById("editarQuantidade").value
            );


        salvarDados();

        atualizarTabela();

        fecharModal();

    });


// ==========================================
// FECHAR MODAL
// ==========================================

function fecharModal() {

    document.getElementById("modal").style.display = "none";

}


// ==========================================
// FECHAR MODAL CLICANDO FORA
// ==========================================

window.addEventListener("click", function(event) {

    const modal = document.getElementById("modal");

    if (event.target === modal) {

        fecharModal();

    }

});


// ==========================================
// PESQUISA
// ==========================================

pesquisa.addEventListener("input", function() {

    atualizarTabela();

});


// ==========================================
// DASHBOARD
// ==========================================

function atualizarDashboard() {

    // Total de produtos

    document.getElementById("totalProdutos").textContent =
        produtos.length;


    // Quantidade total de itens

    const totalItens = produtos.reduce(
        (total, produto) =>
            total + produto.quantidade,
        0
    );


    document.getElementById("totalItens").textContent =
        totalItens;


    // Produtos com estoque baixo

    const baixo = produtos.filter(
        produto =>
            produto.quantidade > 0 &&
            produto.quantidade <= 5
    ).length;


    document.getElementById("estoqueBaixo").textContent =
        baixo;


    // Valor total do estoque

    const valor = produtos.reduce(
        (total, produto) =>
            total +
            (produto.preco * produto.quantidade),
        0
    );


    document.getElementById("valorEstoque").textContent =
        formatarMoeda(valor);

}


// ==========================================
// INICIALIZAR SISTEMA
// ==========================================

atualizarTabela();