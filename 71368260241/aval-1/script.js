
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

let historico = JSON.parse(localStorage.getItem("historico")) || [];

const formProduto = document.getElementById("formProduto");
const formMovimentacao = document.getElementById("formMovimentacao");

function salvarDados() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
    localStorage.setItem("historico", JSON.stringify(historico));
}

function atualizarSistema() {
    atualizarResumo();
    listarProdutos();
    atualizarSelect();
    listarHistorico();
}

// RESUMO DO ESTOQUE

function atualizarResumo() {
    document.getElementById("totalProdutos").textContent =
        produtos.length;

    let unidades = produtos.reduce(
        (total, produto) => total + produto.quantidade, 0
    );

    document.getElementById("totalUnidades").textContent = unidades;

    let baixos = produtos.filter(
        produto => produto.quantidade <= produto.minimo
    ).length;

    document.getElementById("estoqueBaixo").textContent = baixos;
}

// CADASTRO DE PRODUTOS

formProduto.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const categoria = document.getElementById("categoria").value.trim();
    const preco = Number(document.getElementById("preco").value);
    const quantidade = Number(document.getElementById("quantidade").value);
    const minimo = Number(document.getElementById("minimo").value);

    if (!nome || !categoria ||
        !Number.isFinite(preco) || preco < 0 ||
        !Number.isSafeInteger(quantidade) || quantidade < 0 ||
        !Number.isSafeInteger(minimo) || minimo < 0) {
        alert("Preencha os campos corretamente!");
        return;
    }

    const produto = {
        id: Date.now(),
        nome: nome,
        categoria: categoria,
        preco: preco,
        quantidade: quantidade,
        minimo: minimo
    };

    produtos.push(produto);

    salvarDados();
    atualizarSistema();

    formProduto.reset();
    document.getElementById("minimo").value = 5;

    alert("Produto cadastrado com sucesso!");
});

// LISTAGEM DE PRODUTOS

function listarProdutos(filtro = "") {
    const tabela = document.getElementById("listaProdutos");

    tabela.innerHTML = "";

    const encontrados = produtos.filter(produto =>
        produto.nome.toLowerCase().includes(filtro.toLowerCase())
    );

    encontrados.forEach(produto => {

        const status = produto.quantidade <= produto.minimo
            ? '<span class="status-baixo">Estoque baixo</span>'
            : '<span class="status-ok">Disponível</span>';

        const linha = document.createElement("tr");

        const valores = [
            produto.id,
            produto.nome,
            produto.categoria,
            produto.preco.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            }),
            produto.quantidade
        ];

        valores.forEach(valor => {
            const celula = document.createElement("td");
            celula.textContent = valor;
            linha.appendChild(celula);
        });

        const celulaStatus = document.createElement("td");
        celulaStatus.innerHTML = status;
        linha.appendChild(celulaStatus);

        const celulaAcao = document.createElement("td");
        const botao = document.createElement("button");

        botao.textContent = "Excluir";
        botao.className = "excluir";

        botao.addEventListener("click", () => {
            excluirProduto(produto.id);
        });

        celulaAcao.appendChild(botao);
        linha.appendChild(celulaAcao);

        tabela.appendChild(linha);
    });
}

// PESQUISA

document.getElementById("pesquisa").addEventListener("input", function() {
    listarProdutos(this.value);
});

// SELEÇÃO DE PRODUTOS

function atualizarSelect() {
    const select = document.getElementById("produtoMovimentacao");

    select.innerHTML =
        '<option value="">Selecione um produto</option>';

    produtos.forEach(produto => {
        const opcao = document.createElement("option");

        opcao.value = produto.id;
        opcao.textContent = produto.nome;

        select.appendChild(opcao);
    });
}

// ENTRADA E SAÍDA DE MERCADORIAS

formMovimentacao.addEventListener("submit", function(event) {
    event.preventDefault();

    const id = Number(
        document.getElementById("produtoMovimentacao").value
    );

    const tipo = document.getElementById("tipoMovimentacao").value;

    const quantidade = Number(
        document.getElementById("quantidadeMovimentacao").value
    );

    const produto = produtos.find(item => item.id === id);

    if (!produto || !Number.isSafeInteger(quantidade) || quantidade <= 0) {
        alert("Selecione um produto e informe uma quantidade válida!");
        return;
    }

    if (tipo === "saida" && quantidade > produto.quantidade) {
        alert("Estoque insuficiente!");
        return;
    }

    if (tipo === "entrada") {
        if (!Number.isSafeInteger(produto.quantidade + quantidade)) {
            alert("Quantidade final excede o limite permitido!");
            return;
        }

        produto.quantidade += quantidade;
    } else {
        produto.quantidade -= quantidade;
    }

    historico.unshift({
        data: new Date().toLocaleString("pt-BR"),
        produto: produto.nome,
        tipo: tipo === "entrada" ? "Entrada" : "Saída",
        quantidade: quantidade
    });

    salvarDados();
    atualizarSistema();

    formMovimentacao.reset();

    alert("Movimentação realizada com sucesso!");
});

// HISTÓRICO

function listarHistorico() {
    const tabela = document.getElementById("listaHistorico");

    tabela.innerHTML = "";

    historico.forEach(item => {
        const linha = document.createElement("tr");

        [
            item.data,
            item.produto,
            item.tipo,
            item.quantidade
        ].forEach(valor => {
            const celula = document.createElement("td");
            celula.textContent = valor;
            linha.appendChild(celula);
        });

        tabela.appendChild(linha);
    });
}

// EXCLUSÃO DE PRODUTOS

function excluirProduto(id) {
    const confirmar = confirm(
        "Deseja realmente excluir este produto?"
    );

    if (!confirmar) return;

    produtos = produtos.filter(produto => produto.id !== id);

    salvarDados();
    atualizarSistema();
}

// INICIALIZAÇÃO

atualizarSistema();
