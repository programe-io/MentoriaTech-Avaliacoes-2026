
let produtos = [];

// CADASTRAR PRODUTO
function cadastrarProduto() {

    let codigo = Number(document.getElementById("codigo").value);
    let descricao = document.getElementById("descricao").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    // Verificar campos
    if (
        document.getElementById("codigo").value === "" ||
        descricao.trim() === "" ||
        document.getElementById("quantidade").value === "" ||
        document.getElementById("valor").value === "" ||
        codigo <= 0 ||
        quantidade < 0 ||
        valor < 0 ||
        !Number.isInteger(codigo) ||
        !Number.isInteger(quantidade) ||
        !Number.isFinite(valor)
    ) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    // Verificar se o código já existe
    for (let i = 0; i < produtos.length; i++) {
        if (produtos[i].codigo === codigo) {
            alert("Código já cadastrado!");
            return;
        }
    }

    // Adicionar produto
    produtos.push({
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    });

    alert("Produto cadastrado!");

    limparCampos();
    listarProdutos();
}

// LIMPAR CAMPOS
function limparCampos() {
    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";
}

// LISTAR PRODUTOS
function listarProdutos() {

    let tabela = document.getElementById("listaProdutos");

    tabela.innerHTML = "";

    if (produtos.length === 0) {
        tabela.innerHTML = "<tr><td colspan='5'>Nenhum produto cadastrado.</td></tr>";
        return;
    }

    for (let i = 0; i < produtos.length; i++) {

        let p = produtos[i];

        tabela.innerHTML += `
            <tr>
                <td>${p.codigo}</td>
                <td>${p.descricao}</td>
                <td>${p.quantidade}</td>
                <td>R$ ${p.valor.toFixed(2)}</td>
                <td>
                    <button onclick="alterarValor(${i})">Alterar Valor</button>

                    <button onclick="alterarQuantidade(${i})">Alterar Quantidade</button>

                    <button onclick="excluirProduto(${i})">Excluir</button>
                </td>
            </tr>
        `;
    }
}

// ALTERAR VALOR
function alterarValor(index) {

    let novoValor = prompt("Digite o novo valor:");

    if (novoValor === null || novoValor.trim() === "") {
        return;
    }

    novoValor = Number(novoValor);

    if (!Number.isFinite(novoValor) || novoValor < 0) {
        alert("Valor inválido!");
        return;
    }

    produtos[index].valor = novoValor;

    alert("Valor alterado!");
    listarProdutos();
}

// ALTERAR QUANTIDADE
function alterarQuantidade(index) {

    let novaQuantidade = prompt("Digite a nova quantidade:");

    if (novaQuantidade === null || novaQuantidade.trim() === "") {
        return;
    }

    novaQuantidade = Number(novaQuantidade);

    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 0) {
        alert("Quantidade inválida!");
        return;
    }

    produtos[index].quantidade = novaQuantidade;

    alert("Quantidade alterada!");
    listarProdutos();
}

// EXCLUIR PRODUTO
function excluirProduto(index) {

    if (confirm("Deseja excluir este produto?")) {

        produtos.splice(index, 1);

        alert("Produto excluído!");

        listarProdutos();
    }
}
