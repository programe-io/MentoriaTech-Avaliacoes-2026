
// BANCO DE DADOS LOCAL

let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
let movimentacoes = JSON.parse(localStorage.getItem("movimentacoes")) || [];

// SALVAR DADOS

function salvarDados() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
    localStorage.setItem("movimentacoes", JSON.stringify(movimentacoes));
}

// FORMATAÇÃO DE MOEDA

function moeda(valor) {
    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// NAVEGAÇÃO ENTRE ABAS

function mostrarAba(aba) {
    document.querySelectorAll(".aba").forEach(el => {
        el.classList.remove("ativa");
    });

    document.getElementById(aba).classList.add("ativa");

    atualizarSistema();
}

// CADASTRAR E EDITAR PRODUTO

document.getElementById("formProduto").addEventListener("submit", function(e) {

    e.preventDefault();

    const id = document.getElementById("produtoId").value;

    const codigo = document.getElementById("codigo").value.trim();

    const existente = produtos.find(p =>
        p.codigo.toLowerCase() === codigo.toLowerCase() &&
        p.id !== Number(id)
    );

    if (existente) {
        alert("Este código já está cadastrado!");
        return;
    }

    const produto = {
        id: id ? Number(id) : Date.now(),
        nome: document.getElementById("nome").value.trim(),
        codigo: codigo,
        categoria: document.getElementById("categoria").value,
        quantidade: Number(document.getElementById("quantidade").value),
        minimo: Number(document.getElementById("minimo").value),
        preco: Number(document.getElementById("preco").value),
        fornecedor: document.getElementById("fornecedor").value.trim()
    };

    if (
        !produto.nome ||
        !produto.codigo ||
        produto.quantidade < 0 ||
        produto.minimo < 0 ||
        produto.preco < 0 ||
        !Number.isFinite(produto.preco)
    ) {
        alert("Confira os dados informados.");
        return;
    }

    if (id) {
        const index = produtos.findIndex(p => p.id === Number(id));

        if (index !== -1) {
            produtos[index] = produto;
        }
    } else {
        produtos.push(produto);
    }

    salvarDados();
    limparFormulario();
    atualizarSistema();

    alert("Produto salvo com sucesso!");

});

// LIMPAR FORMULÁRIO

function limparFormulario() {
    document.getElementById("formProduto").reset();
    document.getElementById("produtoId").value = "";
    document.getElementById("btnSalvar").textContent =
        "Cadastrar Produto";
}

// LISTAR PRODUTOS

function listarProdutos() {

    const busca = document.getElementById("pesquisa")
        .value.toLowerCase();

    const tabela = document.getElementById("tabelaProdutos");

    tabela.innerHTML = "";

    produtos
        .filter(p =>
            p.nome.toLowerCase().includes(busca) ||
            p.codigo.toLowerCase().includes(busca)
        )
        .forEach(p => {

            const status = p.quantidade <= p.minimo
                ? '<span class="baixo">Estoque Baixo</span>'
                : '<span class="normal">Normal</span>';

            tabela.innerHTML += `
                <tr>
                    <td>${escapar(p.nome)}</td>
                    <td>${escapar(p.codigo)}</td>
                    <td>${escapar(p.categoria)}</td>
                    <td>${p.quantidade}</td>
                    <td>${moeda(p.preco)}</td>
                    <td>${status}</td>
                    <td>
                        <button class="btn-editar"
                            onclick="editarProduto(${p.id})">
                            Editar
                        </button>

                        <button class="btn-excluir"
                            onclick="excluirProduto(${p.id})">
                            Excluir
                        </button>
                    </td>
                </tr>
            `;
        });
}

// PROTEGER TEXTO EXIBIDO NA TABELA

function escapar(texto) {
    return String(texto).replace(/[&<>"']/g, caractere => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[caractere]);
}

// EDITAR PRODUTO

function editarProduto(id) {

    const p = produtos.find(item => item.id === id);

    if (!p) return;

    document.getElementById("produtoId").value = p.id;
    document.getElementById("nome").value = p.nome;
    document.getElementById("codigo").value = p.codigo;
    document.getElementById("categoria").value = p.categoria;
    document.getElementById("quantidade").value = p.quantidade;
    document.getElementById("minimo").value = p.minimo;
    document.getElementById("preco").value = p.preco;
    document.getElementById("fornecedor").value = p.fornecedor;

    document.getElementById("btnSalvar").textContent =
        "Atualizar Produto";

    mostrarAba("produtos");

    window.scrollTo(0, 0);
}

// EXCLUIR PRODUTO

function excluirProduto(id) {

    const confirmar = confirm(
        "Deseja realmente excluir este produto?"
    );

    if (!confirmar) return;

    produtos = produtos.filter(p => p.id !== id);

    salvarDados();
    atualizarSistema();
}

// ATUALIZAR SELECT DE PRODUTOS

function atualizarSelect() {

    const select = document.getElementById("produtoMovimento");

    select.innerHTML = '<option value="">Selecione um produto</option>';

    produtos.forEach(p => {

        select.innerHTML += `
            <option value="${p.id}">
                ${escapar(p.nome)} - ${escapar(p.codigo)}
            </option>
        `;
    });
}

// REGISTRAR MOVIMENTAÇÃO

document.getElementById("formMovimentacao")
.addEventListener("submit", function(e) {

    e.preventDefault();

    const id = Number(
        document.getElementById("produtoMovimento").value
    );

    const tipo = document.getElementById("tipoMovimento").value;

    const quantidade = Number(
        document.getElementById("qtdMovimento").value
    );

    const observacao = document.getElementById("observacao").value.trim();

    const produto = produtos.find(p => p.id === id);

    if (!produto || !Number.isInteger(quantidade) || quantidade <= 0) {
        alert("Informe um produto e uma quantidade válida.");
        return;
    }

    if (tipo === "saida" && produto.quantidade < quantidade) {
        alert("Estoque insuficiente!");
        return;
    }

    if (tipo === "entrada") {
        produto.quantidade += quantidade;
    } else {
        produto.quantidade -= quantidade;
    }

    movimentacoes.unshift({
        id: Date.now(),
        data: new Date().toLocaleString("pt-BR"),
        produto: produto.nome,
        codigo: produto.codigo,
        tipo: tipo,
        quantidade: quantidade,
        observacao: observacao
    });

    salvarDados();

    document.getElementById("formMovimentacao").reset();

    atualizarSistema();

    alert("Movimentação registrada com sucesso!");

});

// HISTÓRICO DE MOVIMENTAÇÕES

function listarMovimentacoes() {

    const tabela = document.getElementById("tabelaMovimentacoes");

    tabela.innerHTML = "";

    movimentacoes.forEach(m => {

        const cor = m.tipo === "entrada"
            ? "normal"
            : "baixo";

        tabela.innerHTML += `
            <tr>
                <td>${escapar(m.data)}</td>
                <td>${escapar(m.produto)}</td>
                <td class="${cor}">
                    ${m.tipo.toUpperCase()}
                </td>
                <td>${m.quantidade}</td>
                <td>${escapar(m.observacao)}</td>
            </tr>
        `;
    });
}

// ATUALIZAR DASHBOARD

function atualizarDashboard() {

    const totalProdutos = produtos.length;

    const totalItens = produtos.reduce(
        (total, p) => total + p.quantidade, 0
    );

    const estoqueBaixo = produtos.filter(
        p => p.quantidade <= p.minimo
    );

    const valorEstoque = produtos.reduce(
        (total, p) => total + (p.quantidade * p.preco), 0
    );

    document.getElementById("totalProdutos").textContent =
        totalProdutos;

    document.getElementById("totalItens").textContent =
        totalItens;

    document.getElementById("estoqueBaixo").textContent =
        estoqueBaixo.length;

    document.getElementById("valorEstoque").textContent =
        moeda(valorEstoque);

    const tabela = document.getElementById("tabelaBaixo");

    tabela.innerHTML = "";

    estoqueBaixo.forEach(p => {

        tabela.innerHTML += `
            <tr>
                <td>${escapar(p.nome)}</td>
                <td>${escapar(p.codigo)}</td>
                <td class="baixo">${p.quantidade}</td>
            </tr>
        `;
    });
}

// ATUALIZAR TODO O SISTEMA

function atualizarSistema() {

    atualizarDashboard();
    listarProdutos();
    listarMovimentacoes();
    atualizarSelect();
}

// INICIALIZAÇÃO

atualizarSistema();
