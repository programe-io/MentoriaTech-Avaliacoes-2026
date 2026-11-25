
// ======================================
// FARMASTOCK - CONTROLE DE ESTOQUE
// ======================================

let produtos = [];

try {
    produtos = JSON.parse(
        localStorage.getItem("farmaProdutos")
    ) || [];
} catch {
    produtos = [];
}

let editando = null;

const form = document.getElementById("formProduto");
const lista = document.getElementById("listaProdutos");

// ======================================
// FUNÇÕES AUXILIARES
// ======================================

function moeda(valor) {
    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function salvarDados() {
    localStorage.setItem(
        "farmaProdutos",
        JSON.stringify(produtos)
    );
}

function dataHoje() {
    const agora = new Date();
    const ano = agora.getFullYear();
    const mes = String(agora.getMonth() + 1).padStart(2, "0");
    const dia = String(agora.getDate()).padStart(2, "0");

    return `${ano}-${mes}-${dia}`;
}

function formatarData(data) {
    if (!data) return "Não informada";

    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
}

function diasParaVencer(validade) {
    const hoje = new Date(dataHoje() + "T00:00:00");
    const vencimento = new Date(validade + "T00:00:00");

    return Math.round(
        (vencimento - hoje) / (1000 * 60 * 60 * 24)
    );
}

// ======================================
// CLASSIFICAÇÃO DO ESTOQUE
// ======================================

function verificarStatus(produto) {
    const dias = diasParaVencer(produto.validade);

    if (dias < 0) {
        return {
            texto: "Vencido",
            classe: "vencido",
            tipo: "vencido"
        };
    }

    if (dias <= 30) {
        return {
            texto: "Próximo do vencimento",
            classe: "proximo",
            tipo: "proximo"
        };
    }

    if (produto.quantidade <= produto.minimo) {
        return {
            texto: "Estoque baixo",
            classe: "baixo",
            tipo: "baixo"
        };
    }

    return {
        texto: "Normal",
        classe: "normal",
        tipo: "normal"
    };
}

// ======================================
// ATUALIZAR DASHBOARD
// ======================================

function atualizarDashboard() {

    const totalProdutos = produtos.length;

    const totalUnidades = produtos.reduce(
        (total, p) => total + p.quantidade, 0
    );

    const estoqueBaixo = produtos.filter(
        p => p.quantidade <= p.minimo
    ).length;

    const vencimentos = produtos.filter(p => {
        const dias = diasParaVencer(p.validade);
        return dias <= 30;
    }).length;

    const valorEstoque = produtos.reduce(
        (total, p) => total + (p.compra * p.quantidade), 0
    );

    document.getElementById("totalProdutos").textContent =
        totalProdutos;

    document.getElementById("totalUnidades").textContent =
        totalUnidades;

    document.getElementById("estoqueBaixo").textContent =
        estoqueBaixo;

    document.getElementById("vencimentos").textContent =
        vencimentos;

    document.getElementById("valorEstoque").textContent =
        moeda(valorEstoque);

    document.getElementById("contador").textContent =
        `${totalProdutos} produtos`;
}

// ======================================
// CADASTRAR MEDICAMENTO
// ======================================

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const categoria = document.getElementById("categoria").value;
    const fabricante = document.getElementById("fabricante").value.trim();
    const codigo = document.getElementById("codigo").value.trim();

    const compra = Number(document.getElementById("compra").value);
    const venda = Number(document.getElementById("venda").value);
    const quantidade = Number(document.getElementById("quantidade").value);
    const minimo = Number(document.getElementById("minimo").value);
    const validade = document.getElementById("validade").value;

    if (
        !nome ||
        !categoria ||
        !validade ||
        !Number.isFinite(compra) ||
        !Number.isFinite(venda) ||
        compra <= 0 ||
        venda <= 0 ||
        !Number.isInteger(quantidade) ||
        quantidade < 0 ||
        !Number.isInteger(minimo) ||
        minimo < 0
    ) {
        alert("Preencha todos os campos obrigatórios corretamente!");
        return;
    }

    const produto = {
        id: editando !== null
            ? produtos[editando].id
            : Date.now(),

        nome,
        categoria,
        fabricante,
        codigo,
        compra,
        venda,
        quantidade,
        minimo,
        validade
    };

    if (editando !== null) {
        produtos[editando] = produto;
        editando = null;

        document.getElementById("btnSalvar").textContent =
            "Cadastrar medicamento";

    } else {
        produtos.push(produto);
    }

    salvarDados();
    atualizarTudo();

    form.reset();

    document.getElementById("minimo").value = 5;

    alert("Medicamento salvo com sucesso!");
});

// ======================================
// RENDERIZAR PRODUTOS
// ======================================

function renderizarProdutos() {

    lista.innerHTML = "";

    const pesquisa = document.getElementById("pesquisa")
        .value.toLowerCase().trim();

    const categoria = document.getElementById("filtroCategoria").value;
    const filtroStatus = document.getElementById("filtroStatus").value;

    const encontrados = produtos.filter(p => {

        const correspondeNome =
            p.nome.toLowerCase().includes(pesquisa) ||
            p.codigo.toLowerCase().includes(pesquisa);

        const correspondeCategoria =
            !categoria || p.categoria === categoria;

        const correspondeStatus =
            !filtroStatus ||
            verificarStatus(p).tipo === filtroStatus;

        return correspondeNome &&
            correspondeCategoria &&
            correspondeStatus;
    });

    encontrados.forEach(p => {

        const indice = produtos.findIndex(
            item => item.id === p.id
        );

        const status = verificarStatus(p);

        const linha = document.createElement("tr");

        const valores = [
            p.nome,
            p.categoria,
            moeda(p.venda),
            p.quantidade,
            formatarData(p.validade)
        ];

        valores.forEach(valor => {
            const td = document.createElement("td");
            td.textContent = valor;
            linha.appendChild(td);
        });

        const tdStatus = document.createElement("td");

        const selo = document.createElement("span");
        selo.className = `status ${status.classe}`;
        selo.textContent = status.texto;

        tdStatus.appendChild(selo);
        linha.appendChild(tdStatus);

        const tdAcoes = document.createElement("td");
        tdAcoes.className = "acoes";

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.className = "btn-editar";
        btnEditar.onclick = () => editarProduto(indice);

        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";
        btnExcluir.className = "btn-excluir";
        btnExcluir.onclick = () => excluirProduto(indice);

        tdAcoes.append(btnEditar, btnExcluir);
        linha.appendChild(tdAcoes);

        lista.appendChild(linha);
    });

    document.getElementById("mensagemVazia").hidden =
        encontrados.length !== 0;
}

// ======================================
// EDITAR MEDICAMENTO
// ======================================

function editarProduto(indice) {

    const p = produtos[indice];

    document.getElementById("nome").value = p.nome;
    document.getElementById("categoria").value = p.categoria;
    document.getElementById("fabricante").value = p.fabricante;
    document.getElementById("codigo").value = p.codigo;
    document.getElementById("compra").value = p.compra;
    document.getElementById("venda").value = p.venda;
    document.getElementById("quantidade").value = p.quantidade;
    document.getElementById("minimo").value = p.minimo;
    document.getElementById("validade").value = p.validade;

    editando = indice;

    document.getElementById("btnSalvar").textContent =
        "Salvar alterações";

    form.scrollIntoView({
        behavior: "smooth"
    });
}

// ======================================
// EXCLUIR MEDICAMENTO
// ======================================

function excluirProduto(indice) {

    const confirmar = confirm(
        "Deseja realmente excluir este medicamento?"
    );

    if (confirmar) {

        produtos.splice(indice, 1);

        if (editando === indice) {
            editando = null;
            form.reset();

            document.getElementById("btnSalvar").textContent =
                "Cadastrar medicamento";

        } else if (editando !== null && indice < editando) {
            editando--;
        }

        salvarDados();
        atualizarTudo();
    }
}

// ======================================
// PESQUISA E FILTROS
// ======================================

document.getElementById("pesquisa")
    .addEventListener("input", renderizarProdutos);

document.getElementById("filtroCategoria")
    .addEventListener("change", renderizarProdutos);

document.getElementById("filtroStatus")
    .addEventListener("change", renderizarProdutos);

// ======================================
// ATUALIZAR SISTEMA
// ======================================

function atualizarTudo() {
    atualizarDashboard();
    renderizarProdutos();
}

// ======================================
// INICIALIZAÇÃO
// ======================================

document.getElementById("dataAtual").textContent =
    new Date().toLocaleDateString("pt-BR");

atualizarTudo();
