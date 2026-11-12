
function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (novaQuantidade < 0) {
        throw new Error("A quantidade não pode ser negativa!");
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (produto) {
        produto.quantidade = novaQuantidade;
        console.log("Quantidade atualizada com sucesso!");
    } else {
        throw new Error("Produto não encontrado!");
    }
}

// Adicionar produto ao estoque
function adicionarProduto(novoProduto) {
    const existe = produtos.find(
        prod => prod.codigo === novoProduto.codigo
    );

    if (existe) {
        throw new Error("Esse produto já está cadastrado!");
    }

    if (
        !novoProduto.nome ||
        novoProduto.valor < 0 ||
        novoProduto.quantidade < 0
    ) {
        throw new Error("Dados do produto inválidos!");
    }

    produtos.push(novoProduto);

    console.log("Produto cadastrado com sucesso!");
}

// Remover produto do estoque
function removerProduto(codigoProduto) {
    const indice = produtos.findIndex(
        prod => prod.codigo === codigoProduto
    );

    if (indice !== -1) {
        produtos.splice(indice, 1);
        console.log("Produto removido com sucesso!");
    } else {
        throw new Error("Produto não encontrado!");
    }
}

// Buscar produto pelo código
function buscarProduto(codigoProduto) {
    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (produto) {
        console.log("Produto encontrado:", produto);
        return produto;
    }

    console.log("Produto não encontrado!");
    return null;
}

// Registrar entrada de produtos
function registrarEntrada(codigoProduto, quantidade) {
    if (quantidade <= 0) {
        throw new Error("Informe uma quantidade válida!");
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (!produto) {
        throw new Error("Produto não encontrado!");
    }

    produto.quantidade += quantidade;

    console.log("Entrada registrada com sucesso!");
}

// Registrar saída de produtos
function registrarSaida(codigoProduto, quantidade) {
    if (quantidade <= 0) {
        throw new Error("Informe uma quantidade válida!");
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (!produto) {
        throw new Error("Produto não encontrado!");
    }

    if (produto.quantidade < quantidade) {
        throw new Error("Estoque insuficiente!");
    }

    produto.quantidade -= quantidade;

    console.log("Saída registrada com sucesso!");
}

// Calcular valor total do estoque
function calcularValorEstoque() {
    const total = produtos.reduce(
        (soma, produto) =>
            soma + produto.valor * produto.quantidade,
        0
    );

    console.log("Valor total do estoque: R$", total.toFixed(2));

    return total;
}

// Listar produtos com estoque baixo
function produtosEstoqueBaixo(limite = 5) {
    const baixoEstoque = produtos.filter(
        produto => produto.quantidade <= limite
    );

    console.log("Produtos com estoque baixo:", baixoEstoque);

    return baixoEstoque;
}

// Mostrar resumo do estoque
function resumoEstoque() {
    const totalProdutos = produtos.length;

    const totalUnidades = produtos.reduce(
        (soma, produto) => soma + produto.quantidade,
        0
    );

    const valorTotal = calcularValorEstoque();

    console.log("===== RESUMO DO ESTOQUE =====");
    console.log("Tipos de produtos:", totalProdutos);
    console.log("Total de unidades:", totalUnidades);
    console.log("Valor total: R$", valorTotal.toFixed(2));
}

// Exibir todos os produtos
function exibirEstoque() {
    console.log("===== ESTOQUE COMPLETO =====");

    produtos.forEach(produto => {
        console.log(
            "Código:", produto.codigo,
            "| Nome:", produto.nome,
            "| Valor: R$", produto.valor,
            "| Quantidade:", produto.quantidade
        );
    });
}
