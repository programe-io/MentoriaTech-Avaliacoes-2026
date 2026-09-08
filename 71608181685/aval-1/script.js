let produtos = [];

function validarProduto(descricao, quantidade, valor) {

    if (descricao.length < 5) {
        throw new Error(
            "Descrição deve ter, no mínimo, cinco caracteres"
        );
    }

    if (quantidade < 1) {
        throw new Error(
            "Quantidade deve ser maior que 0"
        );
    }

    if (valor <= 0) {
        throw new Error(
            "Valor deve ser maior que 0"
        );
    }
}

function cadastrarProduto(descricao, quantidade, valor) {

    validarProduto(descricao, quantidade, valor);

    const produto = {
        id: produtos.length + 1,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    console.log("Produto cadastrado com sucesso!");
}

function listarProdutos() {

    console.table(produtos);
}

function atualizarValor(id, novoValor) {

    if (novoValor <= 0) {
        throw new Error(
            "O novo valor deve ser maior que 0"
        );
    }

    const produto = produtos.find(
        produto => produto.id === id
    );

    if (!produto) {
        throw new Error(
            "Produto não encontrado"
        );
    }

    produto.valor = novoValor;

    console.log("Valor atualizado com sucesso!");
}

function atualizarQuantidade(id, novaQuantidade) {

    if (novaQuantidade < 1) {
        throw new Error(
            "A quantidade deve ser maior que 0"
        );
    }

    const produto = produtos.find(
        produto => produto.id === id
    );

    if (!produto) {
        throw new Error(
            "Produto não encontrado"
        );
    }

    produto.quantidade = novaQuantidade;

    console.log("Quantidade atualizada com sucesso!");
}

try {

    console.log("--- 1. Cadastrando produtos ---");

    cadastrarProduto("Cadeira gamer", 12, 699);
    cadastrarProduto("Mouse logitech", 38, 99);

    listarProdutos();

    console.log("\n--- 2. Atualizando Valor ---");

    atualizarValor(2, 97);

    listarProdutos();

    console.log("\n--- 3. Atualizando Quantidade ---");

    atualizarQuantidade(1, 3);

    listarProdutos();

} catch (erro) {

    console.error(
        "Erro capturado:",
        erro.message
    );
}