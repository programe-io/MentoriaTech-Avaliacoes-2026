// Sistema de Estoque

let produtos = [];

// 1. Cadastrar um novo produto
function cadastrarProduto() {
    let codigo = prompt("Digite o código do produto:");
    let descricao = prompt("Digite a descrição do produto:");
    let quantidade = Number(prompt("Digite a quantidade:"));
    let valor = Number(prompt("Digite o valor do produto:"));

    // Verifica se o código já existe
    let produtoExistente = produtos.find(
        produto => produto.codigo === codigo
    );

    if (produtoExistente) {
        console.log("Erro: já existe um produto com esse código.");
        return;
    }

    if (quantidade < 0 || valor < 0 || isNaN(quantidade) || isNaN(valor)) {
        console.log("Erro: quantidade ou valor inválido.");
        return;
    }

    let produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    console.log("Produto cadastrado com sucesso!");
}


// 2. Listar os produtos cadastrados
function listarProdutos() {

    if (produtos.length === 0) {
        console.log("Nenhum produto cadastrado.");
        return;
    }

    console.log("===== PRODUTOS CADASTRADOS =====");

    produtos.forEach((produto, indice) => {
        console.log(`Produto ${indice + 1}`);
        console.log(`Código: ${produto.codigo}`);
        console.log(`Descrição: ${produto.descricao}`);
        console.log(`Quantidade: ${produto.quantidade}`);
        console.log(`Valor: R$ ${produto.valor.toFixed(2)}`);
        console.log("-----------------------------");
    });
}


// 3. Alterar o valor de um produto
function alterarValor() {

    let codigo = prompt("Digite o código do produto:");

    let produto = produtos.find(
        produto => produto.codigo === codigo
    );

    if (!produto) {
        console.log("Produto não encontrado.");
        return;
    }

    let novoValor = Number(
        prompt("Digite o novo valor:")
    );

    if (novoValor < 0 || isNaN(novoValor)) {
        console.log("Valor inválido.");
        return;
    }

    produto.valor = novoValor;

    console.log("Valor alterado com sucesso!");
}


// 4. Alterar a quantidade de um produto
function alterarQuantidade() {

    let codigo = prompt("Digite o código do produto:");

    let produto = produtos.find(
        produto => produto.codigo === codigo
    );

    if (!produto) {
        console.log("Produto não encontrado.");
        return;
    }

    let novaQuantidade = Number(
        prompt("Digite a nova quantidade:")
    );

    if (novaQuantidade < 0 || isNaN(novaQuantidade)) {
        console.log("Quantidade inválida.");
        return;
    }

    produto.quantidade = novaQuantidade;

    console.log("Quantidade alterada com sucesso!");
}