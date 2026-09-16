let produtos = [];

function cadastrarProduto() {

    let codigo = Number(document.getElementById("codigo").value);
    let descricao = document.getElementById("descricao").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    // Verificar se os campos foram preenchidos
    if (!codigo || !descricao || quantidade < 0 || valor < 0) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    // Verificar se o código já existe
    let existe = produtos.some(function(produto) {
        return produto.codigo === codigo;
    });

    if (existe) {
        alert("Já existe um produto com esse código!");
        return;
    }

    // Criar produto
    let produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    // Adicionar produto ao array
    produtos.push(produto);

    alert("Produto cadastrado com sucesso!");

    // Limpar os campos
    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";

    listarProdutos();
}


function listarProdutos() {

    let lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    for (let i = 0; i < produtos.length; i++) {

        lista.innerHTML += `
            <tr>
                <td>${produtos[i].codigo}</td>
                <td>${produtos[i].descricao}</td>
                <td>${produtos[i].quantidade}</td>
                <td>R$ ${produtos[i].valor.toFixed(2)}</td>

                <td>
                    <button onclick="alterarValor(${produtos[i].codigo})">
                        Alterar Valor
                    </button>

                    <button onclick="alterarQuantidade(${produtos[i].codigo})">
                        Alterar Quantidade
                    </button>
                </td>
            </tr>
        `;
    }
}


function alterarValor(codigo) {

    let produtoEncontrado = null;

    for (let i = 0; i < produtos.length; i++) {

        if (produtos[i].codigo === codigo) {
            produtoEncontrado = produtos[i];
            break;
        }
    }

    if (produtoEncontrado === null) {
        alert("Produto não encontrado!");
        return;
    }

    let novoValor = Number(
        prompt("Digite o novo valor do produto:")
    );

    if (novoValor < 0 || isNaN(novoValor)) {
        alert("Digite um valor válido!");
        return;
    }

    produtoEncontrado.valor = novoValor;

    alert("Valor alterado com sucesso!");

    listarProdutos();
}


function alterarQuantidade(codigo) {

    let produtoEncontrado = null;

    for (let i = 0; i < produtos.length; i++) {

        if (produtos[i].codigo === codigo) {
            produtoEncontrado = produtos[i];
            break;
        }
    }

    if (produtoEncontrado === null) {
        alert("Produto não encontrado!");
        return;
    }

    let novaQuantidade = Number(
        prompt("Digite a nova quantidade:")
    );

    if (novaQuantidade < 0 || isNaN(novaQuantidade)) {
        alert("Digite uma quantidade válida!");
        return;
    }

    produtoEncontrado.quantidade = novaQuantidade;

    alert("Quantidade alterada com sucesso!");

    listarProdutos();
}