
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

// Cadastrar produto
document.getElementById("formProduto").addEventListener("submit", function(event) {

    event.preventDefault();

    let codigo = Number(document.getElementById("codigo").value);
    let descricao = document.getElementById("descricao").value.trim();
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    if (!Number.isSafeInteger(codigo) || codigo <= 0 ||
        !descricao || !Number.isInteger(quantidade) ||
        quantidade < 0 || !Number.isFinite(valor) || valor < 0) {
        alert("Preencha os campos corretamente!");
        return;
    }

    if (produtos.some(p => p.codigo === codigo)) {
        alert("Esse código já está cadastrado!");
        return;
    }

    let produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    salvarDados();
    listarProdutos();

    document.getElementById("formProduto").reset();

    alert("Produto cadastrado com sucesso!");
});

// Listar produtos
function listarProdutos() {

    let tabela = document.getElementById("listaProdutos");

    tabela.innerHTML = "";

    produtos.forEach((produto, index) => {

        let linha = document.createElement("tr");

        let codigo = document.createElement("td");
        codigo.textContent = produto.codigo;

        let descricao = document.createElement("td");
        descricao.textContent = produto.descricao;

        let quantidade = document.createElement("td");
        quantidade.textContent = produto.quantidade;

        let valor = document.createElement("td");
        valor.textContent = produto.valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

        let acoes = document.createElement("td");

        let botaoValor = document.createElement("button");
        botaoValor.textContent = "Alterar valor";
        botaoValor.className = "editar";
        botaoValor.onclick = () => alterarValor(index);

        let botaoQuantidade = document.createElement("button");
        botaoQuantidade.textContent = "Alterar quantidade";
        botaoQuantidade.className = "editar";
        botaoQuantidade.onclick = () => alterarQuantidade(index);

        let botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.className = "excluir";
        botaoExcluir.onclick = () => excluirProduto(index);

        acoes.append(botaoValor, botaoQuantidade, botaoExcluir);

        linha.append(codigo, descricao, quantidade, valor, acoes);

        tabela.appendChild(linha);
    });

    document.getElementById("totalProdutos").textContent = produtos.length;
}

// Alterar valor
function alterarValor(index) {

    let novoValor = prompt("Digite o novo valor do produto:");

    if (novoValor === null || novoValor.trim() === "") return;

    novoValor = Number(novoValor.replace(",", "."));

    if (!Number.isFinite(novoValor) || novoValor < 0) {
        alert("Valor inválido!");
        return;
    }

    produtos[index].valor = novoValor;

    salvarDados();
    listarProdutos();

    alert("Valor alterado com sucesso!");
}

// Alterar quantidade
function alterarQuantidade(index) {

    let novaQuantidade = prompt("Digite a nova quantidade:");

    if (novaQuantidade === null || novaQuantidade.trim() === "") return;

    novaQuantidade = Number(novaQuantidade);

    if (!Number.isSafeInteger(novaQuantidade) || novaQuantidade < 0) {
        alert("Quantidade inválida!");
        return;
    }

    produtos[index].quantidade = novaQuantidade;

    salvarDados();
    listarProdutos();

    alert("Quantidade alterada com sucesso!");
}

// Excluir produto
function excluirProduto(index) {

    let confirmar = confirm("Deseja realmente excluir este produto?");

    if (confirmar) {
        produtos.splice(index, 1);

        salvarDados();
        listarProdutos();

        alert("Produto excluído!");
    }
}

// Salvar dados no navegador
function salvarDados() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}

// Mostrar produtos ao abrir a página
listarProdutos();
