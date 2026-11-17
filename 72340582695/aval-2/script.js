
// Recupera os produtos salvos no navegador
let produtos = JSON.parse(
    localStorage.getItem("produtos")
) || [];

// Elementos HTML
const form = document.getElementById("formProduto");
const lista = document.getElementById("listaProdutos");
const pesquisa = document.getElementById("pesquisa");

// Formatação de moeda
function formatarMoeda(valor) {
    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Salvar produtos no navegador
function salvar() {
    localStorage.setItem(
        "produtos",
        JSON.stringify(produtos)
    );
}

// CADASTRAR PRODUTO
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const codigo = document.getElementById("codigo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    // Verificar código duplicado
    if (produtos.some(p => p.codigo.toLowerCase() === codigo.toLowerCase())) {
        alert("Já existe um produto com esse código!");
        return;
    }

    // Validar dados
    if (
        !codigo ||
        !descricao ||
        !Number.isSafeInteger(quantidade) ||
        quantidade < 0 ||
        !Number.isFinite(valor) ||
        valor < 0
    ) {
        alert("Preencha os campos corretamente!");
        return;
    }

    const produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    salvar();
    listarProdutos();
    form.reset();

    alert("Produto cadastrado com sucesso!");
});

// LISTAR PRODUTOS
function listarProdutos(filtro = "") {

    lista.innerHTML = "";

    const encontrados = produtos.filter(produto =>
        produto.codigo.toLowerCase().includes(filtro.toLowerCase()) ||
        produto.descricao.toLowerCase().includes(filtro.toLowerCase())
    );

    document.getElementById("mensagemVazia").style.display =
        encontrados.length === 0 ? "block" : "none";

    encontrados.forEach(produto => {

        const tr = document.createElement("tr");

        const tdCodigo = document.createElement("td");
        tdCodigo.className = "code";
        tdCodigo.textContent = produto.codigo;

        const tdDescricao = document.createElement("td");
        tdDescricao.textContent = produto.descricao;

        const tdQuantidade = document.createElement("td");
        const badge = document.createElement("span");
        badge.className = "badge-quantidade";
        badge.textContent = produto.quantidade;
        tdQuantidade.appendChild(badge);

        const tdValor = document.createElement("td");
        tdValor.textContent = formatarMoeda(produto.valor);

        const tdTotal = document.createElement("td");
        tdTotal.textContent = formatarMoeda(
            produto.quantidade * produto.valor
        );

        const tdAcoes = document.createElement("td");
        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const btnValor = document.createElement("button");
        btnValor.className = "btn-edit";
        btnValor.textContent = "💰 Valor";
        btnValor.title = "Alterar valor";
        btnValor.addEventListener("click", () => alterarValor(produto.codigo));

        const btnQuantidade = document.createElement("button");
        btnQuantidade.className = "btn-edit";
        btnQuantidade.textContent = "📦 Qtd.";
        btnQuantidade.title = "Alterar quantidade";
        btnQuantidade.addEventListener("click", () => alterarQuantidade(produto.codigo));

        const btnExcluir = document.createElement("button");
        btnExcluir.className = "btn-delete";
        btnExcluir.textContent = "🗑️";
        btnExcluir.title = "Excluir produto";
        btnExcluir.addEventListener("click", () => excluirProduto(produto.codigo));

        acoes.append(btnValor, btnQuantidade, btnExcluir);
        tdAcoes.appendChild(acoes);

        tr.append(
            tdCodigo,
            tdDescricao,
            tdQuantidade,
            tdValor,
            tdTotal,
            tdAcoes
        );

        lista.appendChild(tr);
    });

    atualizarDashboard();
}

// ALTERAR VALOR DO PRODUTO
function alterarValor(codigo) {

    const produto = produtos.find(p => p.codigo === codigo);

    const novoValor = prompt(
        "Digite o novo valor do produto:",
        produto.valor
    );

    if (novoValor === null || novoValor.trim() === "") return;

    const valor = Number(novoValor);

    if (!Number.isFinite(valor) || valor < 0) {
        alert("Digite um valor válido!");
        return;
    }

    produto.valor = valor;

    salvar();
    listarProdutos(pesquisa.value);

    alert("Valor alterado com sucesso!");
}

// ALTERAR QUANTIDADE DO PRODUTO
function alterarQuantidade(codigo) {

    const produto = produtos.find(p => p.codigo === codigo);

    const novaQuantidade = prompt(
        "Digite a nova quantidade:",
        produto.quantidade
    );

    if (novaQuantidade === null || novaQuantidade.trim() === "") return;

    const quantidade = Number(novaQuantidade);

    if (!Number.isSafeInteger(quantidade) || quantidade < 0) {
        alert("Digite uma quantidade inteira válida!");
        return;
    }

    produto.quantidade = quantidade;

    salvar();
    listarProdutos(pesquisa.value);

    alert("Quantidade alterada com sucesso!");
}

// EXCLUIR PRODUTO
function excluirProduto(codigo) {

    const confirmar = confirm(
        "Deseja realmente excluir este produto?"
    );

    if (!confirmar) return;

    produtos = produtos.filter(p => p.codigo !== codigo);

    salvar();
    listarProdutos(pesquisa.value);

    alert("Produto excluído com sucesso!");
}

// PESQUISAR PRODUTOS
pesquisa.addEventListener("input", function() {
    listarProdutos(this.value);
});

// ATUALIZAR DASHBOARD
function atualizarDashboard() {

    const totalProdutos = produtos.length;

    const quantidadeTotal = produtos.reduce(
        (total, p) => total + p.quantidade, 0
    );

    const valorEstoque = produtos.reduce(
        (total, p) => total + (p.quantidade * p.valor), 0
    );

    document.getElementById("totalProdutos").textContent =
        totalProdutos;

    document.getElementById("quantidadeTotal").textContent =
        quantidadeTotal;

    document.getElementById("valorEstoque").textContent =
        formatarMoeda(valorEstoque);
}

// Inicializar sistema
listarProdutos();
