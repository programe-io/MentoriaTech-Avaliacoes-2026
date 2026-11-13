
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

function salvar() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}

function cadastrar() {
    let codigo = prompt("Digite o código:");

    if (codigo === null || codigo.trim() === "") return;

    codigo = codigo.trim();

    if (produtos.some(p => p.codigo === codigo)) {
        alert("Código já cadastrado!");
        return;
    }

    let descricao = prompt("Digite a descrição:");

    if (descricao === null || descricao.trim() === "") {
        alert("Descrição inválida!");
        return;
    }

    let quantidade = Number(prompt("Digite a quantidade:"));
    let valor = Number(prompt("Digite o valor:"));

    if (!Number.isInteger(quantidade) || quantidade < 0 ||
        !Number.isFinite(valor) || valor < 0) {
        alert("Quantidade ou valor inválido!");
        return;
    }

    produtos.push({
        codigo: codigo,
        descricao: descricao.trim(),
        quantidade: quantidade,
        valor: valor
    });

    salvar();
    listar();

    alert("Produto cadastrado com sucesso!");
}

function listar() {
    let resultado = document.getElementById("resultado");

    if (produtos.length === 0) {
        resultado.textContent = "Nenhum produto cadastrado.";
        return;
    }

    resultado.replaceChildren();

    produtos.forEach(p => {
        let card = document.createElement("div");
        card.className = "produto";

        let dados = [
            "Código: " + p.codigo,
            "Descrição: " + p.descricao,
            "Quantidade: " + p.quantidade,
            "Valor: R$ " + p.valor.toFixed(2)
        ];

        dados.forEach(dado => {
            let linha = document.createElement("p");
            linha.textContent = dado;
            card.appendChild(linha);
        });

        resultado.appendChild(card);
    });
}

function alterarValor() {
    let codigo = prompt("Digite o código do produto:");

    if (codigo === null) return;

    let produto = produtos.find(
        p => p.codigo === codigo.trim()
    );

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    let novoValor = prompt("Digite o novo valor:");

    if (novoValor === null || novoValor.trim() === "") return;

    novoValor = Number(novoValor);

    if (!Number.isFinite(novoValor) || novoValor < 0) {
        alert("Valor inválido!");
        return;
    }

    produto.valor = novoValor;

    salvar();
    listar();

    alert("Valor alterado com sucesso!");
}

function alterarQuantidade() {
    let codigo = prompt("Digite o código do produto:");

    if (codigo === null) return;

    let produto = produtos.find(
        p => p.codigo === codigo.trim()
    );

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    let novaQuantidade = prompt("Digite a nova quantidade:");

    if (novaQuantidade === null || novaQuantidade.trim() === "") return;

    novaQuantidade = Number(novaQuantidade);

    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 0) {
        alert("Quantidade inválida!");
        return;
    }

    produto.quantidade = novaQuantidade;

    salvar();
    listar();

    alert("Quantidade alterada com sucesso!");
}

// Mostra os produtos ao abrir a página
listar();

