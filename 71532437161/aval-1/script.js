
let produtos = [];

const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const codigo = Number(document.getElementById("codigo").value);
    const descricao = document.getElementById("descricao").value;
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    if (codigo <= 0 || !Number.isInteger(codigo)) {
        alert("Digite um código válido!");
        return;
    }

    if (quantidade < 0 || !Number.isInteger(quantidade)) {
        alert("Digite uma quantidade válida!");
        return;
    }

    if (valor < 0 || !Number.isFinite(valor)) {
        alert("Digite um valor válido!");
        return;
    }

    if (produtos.some(p => p.codigo === codigo)) {
        alert("Este código já existe!");
        return;
    }

    produtos.push({
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    });

    alert("Produto cadastrado com sucesso!");

    formulario.reset();

    listarProdutos();
});


function listarProdutos() {

    const tabela = document.getElementById("tabelaProdutos");

    tabela.innerHTML = "";

    produtos.forEach(function(produto) {

        const linha = document.createElement("tr");

        const codigo = document.createElement("td");
        codigo.textContent = produto.codigo;

        const descricao = document.createElement("td");
        descricao.textContent = produto.descricao;

        const quantidade = document.createElement("td");
        quantidade.textContent = produto.quantidade;

        const valor = document.createElement("td");
        valor.textContent = produto.valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

        const acoes = document.createElement("td");

        const botaoValor = document.createElement("button");
        botaoValor.textContent = "Alterar Valor";
        botaoValor.className = "alterar";

        botaoValor.addEventListener("click", function() {
            alterarValor(produto.codigo);
        });

        const botaoQuantidade = document.createElement("button");
        botaoQuantidade.textContent = "Alterar Quantidade";

        botaoQuantidade.addEventListener("click", function() {
            alterarQuantidade(produto.codigo);
        });

        acoes.appendChild(botaoValor);
        acoes.appendChild(botaoQuantidade);

        linha.appendChild(codigo);
        linha.appendChild(descricao);
        linha.appendChild(quantidade);
        linha.appendChild(valor);
        linha.appendChild(acoes);

        tabela.appendChild(linha);

    });

}


function alterarValor(codigo) {

    const produto = produtos.find(p => p.codigo === codigo);

    const novoValor = prompt("Digite o novo valor:");

    if (novoValor === null || novoValor.trim() === "") {
        return;
    }

    const valor = Number(novoValor.replace(",", "."));

    if (!Number.isFinite(valor) || valor < 0) {
        alert("Valor inválido!");
        return;
    }

    produto.valor = valor;

    alert("Valor alterado com sucesso!");

    listarProdutos();
}


function alterarQuantidade(codigo) {

    const produto = produtos.find(p => p.codigo === codigo);

    const novaQuantidade = prompt("Digite a nova quantidade:");

    if (novaQuantidade === null || novaQuantidade.trim() === "") {
        return;
    }

    const quantidade = Number(novaQuantidade);

    if (!Number.isInteger(quantidade) || quantidade < 0) {
        alert("Quantidade inválida!");
        return;
    }

    produto.quantidade = quantidade;

    alert("Quantidade alterada com sucesso!");

    listarProdutos();
}
