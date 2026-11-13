
// Recupera os produtos armazenados no navegador
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

// Salva os produtos
function salvarProdutos() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}

// Cadastrar produto
function cadastrarProduto() {

    let codigo = Number(document.getElementById("codigo").value);
    let descricao = document.getElementById("descricao").value.trim();
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    if (
        !Number.isInteger(codigo) || codigo <= 0 ||
        descricao === "" ||
        !Number.isInteger(quantidade) || quantidade < 0 ||
        !Number.isFinite(valor) || valor < 0 ||
        document.getElementById("valor").value === ""
    ) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    // Verifica se o código já existe
    if (produtos.some(p => p.codigo === codigo)) {
        alert("Este código já está cadastrado!");
        return;
    }

    let produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    salvarProdutos();
    listarProdutos();

    alert("Produto cadastrado com sucesso!");

    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";
}

// Listar produtos
function listarProdutos() {

    let tabela = document.getElementById("listaProdutos");

    tabela.innerHTML = "";

    produtos.forEach((produto, index) => {

        let linha = tabela.insertRow();

        linha.insertCell(0).textContent = produto.codigo;
        linha.insertCell(1).textContent = produto.descricao;
        linha.insertCell(2).textContent = produto.quantidade;

        linha.insertCell(3).textContent =
            produto.valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            });

        let acoes = linha.insertCell(4);

        acoes.className = "acoes";

        let botaoValor = document.createElement("button");
        botaoValor.textContent = "Alterar Valor";
        botaoValor.className = "alterar";

        botaoValor.onclick = function() {
            alterarValor(index);
        };

        let botaoQuantidade = document.createElement("button");
        botaoQuantidade.textContent = "Alterar Quantidade";
        botaoQuantidade.className = "alterar";

        botaoQuantidade.onclick = function() {
            alterarQuantidade(index);
        };

        let botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.className = "excluir";

        botaoExcluir.onclick = function() {
            excluirProduto(index);
        };

        acoes.appendChild(botaoValor);
        acoes.appendChild(botaoQuantidade);
        acoes.appendChild(botaoExcluir);
    });
}

// Alterar valor do produto
function alterarValor(index) {

    let novoValor = prompt("Digite o novo valor do produto:");

    if (novoValor === null || novoValor.trim() === "") {
        return;
    }

    novoValor = Number(novoValor);

    if (!Number.isFinite(novoValor) || novoValor < 0) {
        alert("Digite um valor válido!");
        return;
    }

    produtos[index].valor = novoValor;

    salvarProdutos();
    listarProdutos();

    alert("Valor alterado com sucesso!");
}

// Alterar quantidade do produto
function alterarQuantidade(index) {

    let novaQuantidade = prompt("Digite a nova quantidade:");

    if (novaQuantidade === null || novaQuantidade.trim() === "") {
        return;
    }

    novaQuantidade = Number(novaQuantidade);

    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 0) {
        alert("Digite uma quantidade válida!");
        return;
    }

    produtos[index].quantidade = novaQuantidade;

    salvarProdutos();
    listarProdutos();

    alert("Quantidade alterada com sucesso!");
}

// Excluir produto
function excluirProduto(index) {

    if (confirm("Deseja realmente excluir este produto?")) {

        produtos.splice(index, 1);

        salvarProdutos();
        listarProdutos();

        alert("Produto excluído com sucesso!");
    }
}

// Exibe os produtos ao abrir o sistema
listarProdutos();
