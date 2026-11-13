
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
let movimentacoes = JSON.parse(localStorage.getItem("movimentacoes")) || [];

function salvarDados() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
    localStorage.setItem("movimentacoes", JSON.stringify(movimentacoes));
}

function toggleMenu() {
    document.getElementById("sidebar").classList.toggle("active");
}

function abrirModal(id = null) {
    const modal = document.getElementById("modalProduto");
    const form = document.getElementById("formProduto");

    form.reset();
    document.getElementById("produtoId").value = "";

    if (id !== null) {
        const produto = produtos.find(p => p.id === id);

        if (!produto) return;

        document.getElementById("tituloModal").textContent = "Editar produto";
        document.getElementById("produtoId").value = produto.id;
        document.getElementById("nome").value = produto.nome;
        document.getElementById("categoria").value = produto.categoria;
        document.getElementById("quantidade").value = produto.quantidade;
        document.getElementById("preco").value = produto.preco;
        document.getElementById("minimo").value = produto.minimo;
    } else {
        document.getElementById("tituloModal").textContent = "Cadastrar produto";
        document.getElementById("minimo").value = 5;
    }

    modal.style.display = "flex";
}

function fecharModal() {
    document.getElementById("modalProduto").style.display = "none";
}

document.getElementById("formProduto").addEventListener("submit", function(e) {
    e.preventDefault();

    const id = document.getElementById("produtoId").value;

    const dados = {
        nome: document.getElementById("nome").value.trim(),
        categoria: document.getElementById("categoria").value.trim(),
        quantidade: Number(document.getElementById("quantidade").value),
        preco: Number(document.getElementById("preco").value),
        minimo: Number(document.getElementById("minimo").value)
    };

    if (!dados.nome || !dados.categoria ||
        !Number.isFinite(dados.quantidade) ||
        !Number.isFinite(dados.preco) ||
        !Number.isFinite(dados.minimo) ||
        dados.quantidade < 0 || dados.preco < 0 || dados.minimo < 0) {
        alert("Preencha os campos com valores válidos.");
        return;
    }

    if (id) {
        const indice = produtos.findIndex(p => p.id === Number(id));

        if (indice !== -1) {
            produtos[indice] = {
                ...produtos[indice],
                ...dados
            };
        }
    } else {
        produtos.push({
            id: Date.now(),
            ...dados
        });
    }

    salvarDados();
    fecharModal();
    atualizarSistema();
});

function excluirProduto(id) {
    const produto = produtos.find(p => p.id === id);

    if (!produto) return;

    if (confirm(`Deseja excluir ${produto.nome}?`)) {
        produtos = produtos.filter(p => p.id !== id);
        salvarDados();
        atualizarSistema();
    }
}

function abrirMovimento(id) {
    const produto = produtos.find(p => p.id === id);

    if (!produto) return;

    document.getElementById("movimentoId").value = id;
    document.getElementById("formMovimento").reset();

    document.getElementById("movimentoId").value = id;
    document.getElementById("modalMovimento").style.display = "flex";
}

function fecharMovimento() {
    document.getElementById("modalMovimento").style.display = "none";
}

document.getElementById("formMovimento").addEventListener("submit", function(e) {
    e.preventDefault();

    const id = Number(document.getElementById("movimentoId").value);
    const tipo = document.getElementById("tipoMovimento").value;
    const quantidade = Number(document.getElementById("quantidadeMovimento").value);

    const produto = produtos.find(p => p.id === id);

    if (!produto || !Number.isInteger(quantidade) || quantidade <= 0) {
        alert("Informe uma quantidade válida.");
        return;
    }

    if (tipo === "saida" && quantidade > produto.quantidade) {
        alert("Estoque insuficiente!");
        return;
    }

    if (tipo === "entrada") {
        produto.quantidade += quantidade;
    } else {
        produto.quantidade -= quantidade;
    }

    movimentacoes.unshift({
        produto: produto.nome,
        tipo: tipo,
        quantidade: quantidade,
        data: new Date().toLocaleString("pt-BR")
    });

    salvarDados();
    fecharMovimento();
    atualizarSistema();
    alert("Movimentação realizada com sucesso!");
});

function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function renderizarProdutos() {
    const tabela = document.getElementById("listaProdutos");
    const pesquisa = document.getElementById("pesquisa").value.toLowerCase();
    const filtro = document.getElementById("filtro").value;

    tabela.innerHTML = "";

    const filtrados = produtos.filter(p => {
        const combina = p.nome.toLowerCase().includes(pesquisa) ||
                        p.categoria.toLowerCase().includes(pesquisa);

        const baixo = p.quantidade <= p.minimo;

        return combina &&
            (filtro === "todos" ||
             (filtro === "baixo" && baixo) ||
             (filtro === "normal" && !baixo));
    });

    document.getElementById("mensagemVazia").style.display =
        filtrados.length ? "none" : "block";

    filtrados.forEach(p => {
        const baixo = p.quantidade <= p.minimo;

        const linha = document.createElement("tr");

        const colunas = [
            p.nome,
            p.categoria,
            p.quantidade,
            formatarMoeda(p.preco),
        ];

        colunas.forEach(valor => {
            const td = document.createElement("td");
            td.textContent = valor;
            linha.appendChild(td);
        });

        const status = document.createElement("td");
        const etiqueta = document.createElement("span");

        etiqueta.className = `status ${baixo ? "baixo" : "normal"}`;
        etiqueta.textContent = baixo ? "Estoque baixo" : "Normal";
        status.appendChild(etiqueta);
        linha.appendChild(status);

        const acoes = document.createElement("td");

        const botaoEditar = document.createElement("button");
        botaoEditar.className = "action-btn edit";
        botaoEditar.textContent = "✏️";
        botaoEditar.title = "Editar produto";
        botaoEditar.onclick = () => abrirModal(p.id);

        const botaoMover = document.createElement("button");
        botaoMover.className = "action-btn move";
        botaoMover.textContent = "🔄";
        botaoMover.title = "Movimentar estoque";
        botaoMover.onclick = () => abrirMovimento(p.id);

        const botaoExcluir = document.createElement("button");
        botaoExcluir.className = "action-btn delete";
        botaoExcluir.textContent = "🗑️";
        botaoExcluir.title = "Excluir produto";
        botaoExcluir.onclick = () => excluirProduto(p.id);

        acoes.append(botaoEditar, botaoMover, botaoExcluir);
        linha.appendChild(acoes);

        tabela.appendChild(linha);
    });
}

function renderizarMovimentacoes() {
    const tabela = document.getElementById("listaMovimentacoes");

    tabela.innerHTML = "";

    movimentacoes.forEach(m => {
        const linha = document.createElement("tr");

        const dados = [
            m.produto,
            m.tipo === "entrada" ? "📥 Entrada" : "📤 Saída",
            m.quantidade,
            m.data
        ];

        dados.forEach(valor => {
            const td = document.createElement("td");
            td.textContent = valor;
            linha.appendChild(td);
        });

        tabela.appendChild(linha);
    });
}

function atualizarDashboard() {
    const totalProdutos = produtos.length;

    const totalUnidades = produtos.reduce(
        (total, p) => total + p.quantidade, 0
    );

    const estoqueBaixo = produtos.filter(
        p => p.quantidade <= p.minimo
    ).length;

    const valorEstoque = produtos.reduce(
        (total, p) => total + (p.quantidade * p.preco), 0
    );

    document.getElementById("totalProdutos").textContent = totalProdutos;

    document.getElementById("totalUnidades").textContent = totalUnidades;

    document.getElementById("estoqueBaixo").textContent = estoqueBaixo;

    document.getElementById("valorEstoque").textContent =
        formatarMoeda(valorEstoque);
}

function atualizarSistema() {
    atualizarDashboard();
    renderizarProdutos();
    renderizarMovimentacoes();
}

atualizarSistema();
