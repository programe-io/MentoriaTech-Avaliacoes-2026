
let produtos = [];

// Cadastrar produto
function cadastrarProduto() {

    let codigo = Number(document.getElementById("codigo").value);
    let descricao = document.getElementById("descricao").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    if (!codigo || !descricao.trim() ||
        document.getElementById("quantidade").value === "" ||
        document.getElementById("valor").value === "" ||
        quantidade < 0 || valor < 0) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    let existe = produtos.find(p => p.codigo === codigo);

    if (existe) {
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

    alert("Produto cadastrado com sucesso!");

    limparCampos();
    listarProdutos();
}

// Listar produtos
function listarProdutos() {

    let tabela = document.getElementById("tabelaProdutos");

    tabela.innerHTML = "";

    produtos.forEach(produto => {

        tabela.innerHTML += `
            <tr>
                <td>${produto.codigo}</td>
                <td>${produto.descricao}</td>
                <td>${produto.quantidade}</td>
                <td>R$ ${produto.valor.toFixed(2)}</td>
            </tr>
        `;

    });
}

// Alterar valor
function alterarValor() {

    let codigo = Number(document.getElementById("codigoAlterar").value);
    let novoValor = document.getElementById("novoValor").value;

    if (novoValor === "" || Number(novoValor) < 0) {
        alert("Digite um valor válido!");
        return;
    }

    let produto = produtos.find(p => p.codigo === codigo);

    if (produto) {

        produto.valor = Number(novoValor);

        alert("Valor alterado com sucesso!");

        listarProdutos();

    } else {
        alert("Produto não encontrado!");
    }
}

// Alterar quantidade
function alterarQuantidade() {

    let codigo = Number(document.getElementById("codigoAlterar").value);
    let novaQuantidade = document.getElementById("novaQuantidade").value;

    if (novaQuantidade === "" || Number(novaQuantidade) < 0) {
        alert("Digite uma quantidade válida!");
        return;
    }

    let produto = produtos.find(p => p.codigo === codigo);

    if (produto) {

        produto.quantidade = Number(novaQuantidade);

        alert("Quantidade alterada com sucesso!");

        listarProdutos();

    } else {
        alert("Produto não encontrado!");
    }
}

// Limpar campos do cadastro
function limparCampos() {

    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";

}
