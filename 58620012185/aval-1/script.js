
let produtos = [];

// Cadastrar produto
function cadastrar() {
    let codigo = document.getElementById("codigo").value;
    let descricao = document.getElementById("descricao").value;
    let quantidade = document.getElementById("quantidade").value;
    let valor = document.getElementById("valor").value;

    if (codigo === "" || descricao === "" ||
        quantidade === "" || valor === "") {
        alert("Preencha todos os campos!");
        return;
    }

    if (produtos.some(p => p.codigo === codigo)) {
        alert("Código já cadastrado!");
        return;
    }

    if (Number(quantidade) < 0 || Number(valor) < 0) {
        alert("Quantidade e valor não podem ser negativos!");
        return;
    }

    let produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: Number(quantidade),
        valor: Number(valor)
    };

    produtos.push(produto);

    alert("Produto cadastrado com sucesso!");

    listar();
}

// Listar produtos
function listar() {
    let resultado = document.getElementById("resultado");

    if (produtos.length === 0) {
        resultado.innerHTML = "<p>Nenhum produto cadastrado.</p>";
        return;
    }

    let tabela = `
        <table>
            <tr>
                <th>Código</th>
                <th>Descrição</th>
                <th>Quantidade</th>
                <th>Valor</th>
            </tr>
    `;

    produtos.forEach(function(p) {
        tabela += `
            <tr>
                <td>${p.codigo}</td>
                <td>${p.descricao}</td>
                <td>${p.quantidade}</td>
                <td>R$ ${p.valor.toFixed(2)}</td>
            </tr>
        `;
    });

    tabela += "</table>";

    resultado.innerHTML = tabela;
}

// Alterar valor
function alterarValor() {
    let codigo = document.getElementById("codigoAlterar").value;
    let novoValor = document.getElementById("novoValor").value;

    let produto = produtos.find(p => p.codigo === codigo);

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    if (novoValor === "" || Number(novoValor) < 0) {
        alert("Digite um valor válido!");
        return;
    }

    produto.valor = Number(novoValor);

    alert("Valor alterado com sucesso!");

    listar();
}

// Alterar quantidade
function alterarQuantidade() {
    let codigo = document.getElementById("codigoAlterar").value;
    let novaQuantidade = document.getElementById("novaQuantidade").value;

    let produto = produtos.find(p => p.codigo === codigo);

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    if (novaQuantidade === "" || Number(novaQuantidade) < 0) {
        alert("Digite uma quantidade válida!");
        return;
    }

    produto.quantidade = Number(novaQuantidade);

    alert("Quantidade alterada com sucesso!");

    listar();
}
