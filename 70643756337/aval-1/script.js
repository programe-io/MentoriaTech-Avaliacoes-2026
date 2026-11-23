
const formulario = document.getElementById("produtoForm");
const listaProdutos = document.getElementById("listaProdutos");
const pesquisa = document.getElementById("pesquisa");

let produtos = JSON.parse(
    localStorage.getItem("estoqueProdutos") || "[]"
);

let editandoId = null;

// Formatação de moeda
function moeda(valor) {
    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Salvar dados
function salvarDados() {
    localStorage.setItem(
        "estoqueProdutos",
        JSON.stringify(produtos)
    );
}

// Cadastro e edição
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const codigo = document.getElementById("codigo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    if (!codigo || !descricao ||
        !Number.isInteger(quantidade) || quantidade < 0 ||
        !Number.isFinite(valor) || valor < 0) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    // Verificar código duplicado
    const duplicado = produtos.find(p =>
        p.codigo.toLowerCase() === codigo.toLowerCase() &&
        p.id !== editandoId
    );

    if (duplicado) {
        alert("Já existe um produto com esse código!");
        return;
    }

    if (editandoId !== null) {

        const produto = produtos.find(p => p.id === editandoId);

        produto.codigo = codigo;
        produto.descricao = descricao;
        produto.quantidade = quantidade;
        produto.valor = valor;

        alert("Produto atualizado com sucesso!");

    } else {

        produtos.push({
            id: Date.now(),
            codigo,
            descricao,
            quantidade,
            valor
        });

        alert("Produto cadastrado com sucesso!");
    }

    salvarDados();
    listarProdutos();
    atualizarDashboard();
    cancelarEdicao();
});

// Listar produtos
function listarProdutos() {

    const termo = pesquisa.value.toLowerCase();

    listaProdutos.innerHTML = "";

    const filtrados = produtos.filter(p =>
        p.codigo.toLowerCase().includes(termo) ||
        p.descricao.toLowerCase().includes(termo)
    );

    filtrados.forEach(produto => {

        const total = produto.quantidade * produto.valor;

        const status = produto.quantidade <= 5
            ? '<span class="status-baixo">Estoque baixo</span>'
            : '<span class="status-normal">Normal</span>';

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${escaparHTML(produto.codigo)}</td>
            <td>${escaparHTML(produto.descricao)}</td>
            <td>${produto.quantidade}</td>
            <td>${moeda(produto.valor)}</td>
            <td>${moeda(total)}</td>
            <td>${status}</td>
            <td>
                <div class="acoes">
                    <button class="btn-editar"
                        onclick="editarProduto(${produto.id})">
                        Editar
                    </button>

                    <button class="btn-excluir"
                        onclick="excluirProduto(${produto.id})">
                        Excluir
                    </button>
                </div>
            </td>
        `;

        listaProdutos.appendChild(linha);
    });

    document.getElementById("mensagemVazia").hidden =
        filtrados.length > 0;
}

// Proteger campos de texto
function escaparHTML(texto) {
    return texto.replace(/[&<>"']/g, c => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[c]);
}

// Editar produto
function editarProduto(id) {

    const produto = produtos.find(p => p.id === id);

    if (!produto) return;

    document.getElementById("codigo").value = produto.codigo;
    document.getElementById("descricao").value = produto.descricao;
    document.getElementById("quantidade").value = produto.quantidade;
    document.getElementById("valor").value = produto.valor;

    editandoId = id;

    document.getElementById("tituloFormulario").textContent =
        "Editar Produto";

    document.getElementById("btnSalvar").textContent =
        "Salvar Alterações";

    document.getElementById("btnCancelar").hidden = false;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Cancelar edição
function cancelarEdicao() {

    editandoId = null;

    formulario.reset();

    document.getElementById("tituloFormulario").textContent =
        "Cadastrar Produto";

    document.getElementById("btnSalvar").textContent =
        "Cadastrar Produto";

    document.getElementById("btnCancelar").hidden = true;
}

// Excluir produto
function excluirProduto(id) {

    if (confirm("Deseja realmente excluir este produto?")) {

        produtos = produtos.filter(p => p.id !== id);

        salvarDados();
        listarProdutos();
        atualizarDashboard();

        if (editandoId === id) {
            cancelarEdicao();
        }
    }
}

// Atualizar indicadores
function atualizarDashboard() {

    const totalProdutos = produtos.length;

    const quantidadeTotal = produtos.reduce(
        (soma, p) => soma + p.quantidade, 0
    );

    const valorTotal = produtos.reduce(
        (soma, p) => soma + p.quantidade * p.valor, 0
    );

    const estoqueBaixo = produtos.filter(
        p => p.quantidade <= 5
    ).length;

    document.getElementById("totalProdutos").textContent =
        totalProdutos;

    document.getElementById("quantidadeEstoque").textContent =
        quantidadeTotal;

    document.getElementById("valorEstoque").textContent =
        moeda(valorTotal);

    document.getElementById("estoqueBaixo").textContent =
        estoqueBaixo;
}

// Pesquisa
pesquisa.addEventListener("input", listarProdutos);

// Inicialização
listarProdutos();
atualizarDashboard();
