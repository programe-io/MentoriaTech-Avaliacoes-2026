
let produtos = [];

const formulario = document.getElementById("formProduto");
const listaProdutos = document.getElementById("listaProdutos");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const codigo = Number(document.getElementById("codigo").value);
    const descricao = document.getElementById("descricao").value.trim();
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    if (produtos.some(p => p.codigo === codigo)) {
        alert("Este código já está cadastrado!");
        return;
    }

    if (
        !Number.isSafeInteger(codigo) ||
        codigo <= 0 ||
        !descricao ||
        !Number.isSafeInteger(quantidade) ||
        quantidade < 0 ||
        !Number.isFinite(valor) ||
        valor < 0
    ) {
        alert("Preencha os campos com dados válidos!");
        return;
    }

    produtos.push({
        codigo,
        descricao,
        quantidade,
        valor
    });

    formulario.reset();
    listarProdutos();

    alert("Produto cadastrado com sucesso!");
});

function listarProdutos() {
    listaProdutos.innerHTML = "";

    produtos.forEach(function(produto) {
        const linha = document.createElement("tr");

        const dados = [
            produto.codigo,
            produto.descricao,
            produto.quantidade,
            produto.valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            })
        ];

        dados.forEach(function(dado) {
            const celula = document.createElement("td");
            celula.textContent = dado;
            linha.appendChild(celula);
        });

        const acoes = document.createElement("td");

        const botaoValor = document.createElement("button");
        botaoValor.textContent = "Alterar valor";
        botaoValor.className = "editar";

        botaoValor.addEventListener("click", function() {
            alterarValor(produto.codigo);
        });

        const botaoQuantidade = document.createElement("button");
        botaoQuantidade.textContent = "Alterar quantidade";
        botaoQuantidade.className = "editar";

        botaoQuantidade.addEventListener("click", function() {
            alterarQuantidade(produto.codigo);
        });

        acoes.append(botaoValor, botaoQuantidade);
        linha.appendChild(acoes);
        listaProdutos.appendChild(linha);
    });
}

function alterarValor(codigo) {
    const produto = produtos.find(p => p.codigo === codigo);

    const novoValor = prompt(
        "Digite o novo valor do produto:",
        produto.valor
    );

    if (novoValor === null || novoValor.trim() === "") {
        return;
    }

    const valor = Number(novoValor);

    if (!Number.isFinite(valor) || valor < 0) {
        alert("Digite um valor válido!");
        return;
    }

    produto.valor = valor;
    listarProdutos();

    alert("Valor alterado com sucesso!");
}

function alterarQuantidade(codigo) {
    const produto = produtos.find(p => p.codigo === codigo);

    const novaQuantidade = prompt(
        "Digite a nova quantidade:",
        produto.quantidade
    );

    if (novaQuantidade === null || novaQuantidade.trim() === "") {
        return;
    }

    const quantidade = Number(novaQuantidade);

    if (!Number.isSafeInteger(quantidade) || quantidade < 0) {
        alert("Digite uma quantidade inteira válida!");
        return;
    }

    produto.quantidade = quantidade;
    listarProdutos();

    alert("Quantidade alterada com sucesso!");
}
