
var produtos = [];

// FUNÇÃO PARA CADASTRAR PRODUTOS
function cadastrarProduto() {

    var codigo = document.getElementById("codigo").value.trim();
    var descricao = document.getElementById("descricao").value.trim();

    var quantidadeTexto = document.getElementById("quantidade").value;
    var valorTexto = document.getElementById("valor").value;

    var quantidade = Number(quantidadeTexto);
    var valor = Number(valorTexto);

    // Verificar campos
    if (codigo === "" || descricao === "" ||
        quantidadeTexto === "" || valorTexto === "") {

        alert("Preencha todos os campos!");
        return;
    }

    if (!Number.isInteger(quantidade) || quantidade < 0 ||
        !Number.isFinite(valor) || valor < 0) {

        alert("Digite valores válidos!");
        return;
    }

    // Verificar código repetido
    for (var i = 0; i < produtos.length; i++) {

        if (produtos[i].codigo === codigo) {
            alert("Este código já está cadastrado!");
            return;
        }
    }

    // Criar produto
    var produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    // Limpar formulário
    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";

    // Atualizar tabela
    listarProdutos();

    alert("Produto cadastrado com sucesso!");
}


// FORMATAR VALORES EM REAIS
function formatarMoeda(valor) {

    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}


// LISTAR PRODUTOS
function listarProdutos() {

    var tabela = document.getElementById("listaProdutos");

    tabela.innerHTML = "";

    var totalEstoque = 0;

    for (var i = 0; i < produtos.length; i++) {

        var produto = produtos[i];

        var total = produto.quantidade * produto.valor;

        totalEstoque += total;

        var linha = document.createElement("tr");

        var colunaCodigo = document.createElement("td");
        colunaCodigo.textContent = produto.codigo;

        var colunaDescricao = document.createElement("td");
        colunaDescricao.textContent = produto.descricao;

        var colunaQuantidade = document.createElement("td");
        colunaQuantidade.textContent = produto.quantidade;

        var colunaValor = document.createElement("td");
        colunaValor.textContent = formatarMoeda(produto.valor);

        var colunaTotal = document.createElement("td");
        colunaTotal.textContent = formatarMoeda(total);

        var colunaAcoes = document.createElement("td");

        var botaoValor = document.createElement("button");
        botaoValor.textContent = "Alterar valor";
        botaoValor.className = "alterar";
        botaoValor.onclick = criarAcaoAlterarValor(i);

        var botaoQuantidade = document.createElement("button");
        botaoQuantidade.textContent = "Alterar quantidade";
        botaoQuantidade.className = "alterar";
        botaoQuantidade.onclick = criarAcaoAlterarQuantidade(i);

        var botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.className = "excluir";
        botaoExcluir.onclick = criarAcaoExcluir(i);

        colunaAcoes.appendChild(botaoValor);
        colunaAcoes.appendChild(botaoQuantidade);
        colunaAcoes.appendChild(botaoExcluir);

        linha.appendChild(colunaCodigo);
        linha.appendChild(colunaDescricao);
        linha.appendChild(colunaQuantidade);
        linha.appendChild(colunaValor);
        linha.appendChild(colunaTotal);
        linha.appendChild(colunaAcoes);

        tabela.appendChild(linha);
    }

    document.getElementById("totalEstoque").textContent =
        "Valor total do estoque: " + formatarMoeda(totalEstoque);
}


// CRIAR AÇÃO PARA ALTERAR VALOR
function criarAcaoAlterarValor(indice) {

    return function() {
        alterarValor(indice);
    };
}


// ALTERAR VALOR
function alterarValor(indice) {

    var novoValor = prompt("Digite o novo valor do produto:");

    if (novoValor === null || novoValor.trim() === "") {
        return;
    }

    var valor = Number(novoValor.replace(",", "."));

    if (!Number.isFinite(valor) || valor < 0) {
        alert("Valor inválido!");
        return;
    }

    produtos[indice].valor = valor;

    listarProdutos();

    alert("Valor alterado com sucesso!");
}


// CRIAR AÇÃO PARA ALTERAR QUANTIDADE
function criarAcaoAlterarQuantidade(indice) {

    return function() {
        alterarQuantidade(indice);
    };
}


// ALTERAR QUANTIDADE
function alterarQuantidade(indice) {

    var novaQuantidade = prompt("Digite a nova quantidade:");

    if (novaQuantidade === null || novaQuantidade.trim() === "") {
        return;
    }

    var quantidade = Number(novaQuantidade);

    if (!Number.isInteger(quantidade) || quantidade < 0) {
        alert("Quantidade inválida!");
        return;
    }

    produtos[indice].quantidade = quantidade;

    listarProdutos();

    alert("Quantidade alterada com sucesso!");
}


// CRIAR AÇÃO PARA EXCLUIR
function criarAcaoExcluir(indice) {

    return function() {
        excluirProduto(indice);
    };
}


// EXCLUIR PRODUTO
function excluirProduto(indice) {

    var confirmar = confirm("Deseja realmente excluir este produto?");

    if (confirmar) {

        produtos.splice(indice, 1);

        listarProdutos();

        alert("Produto excluído com sucesso!");
    }
}


// INICIAR SISTEMA
listarProdutos();
