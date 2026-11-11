
// SISTEMA DE ESTOQUE

let produtos = [];

// CADASTRAR PRODUTO
function cadastrarProduto(codigo, nome, quantidade, valor) {
    if (produtos.find(prod => prod.codigo === codigo)) {
        throw new Error("Produto já cadastrado");
    }

    if (quantidade < 0 || valor < 0) {
        throw new Error("Quantidade e valor devem ser positivos");
    }

    const produto = {
        codigo: codigo,
        nome: nome,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    console.log("Produto cadastrado com sucesso!");
}

// LISTAR PRODUTOS
function listarProdutos() {
    console.log("===== ESTOQUE =====");

    if (produtos.length === 0) {
        console.log("Estoque vazio");
        return;
    }

    produtos.forEach(produto => {
        console.log(
            "Código:", produto.codigo,
            "| Nome:", produto.nome,
            "| Quantidade:", produto.quantidade,
            "| Valor: R$", produto.valor
        );
    });
}

// ATUALIZAR VALOR
function atualizarValor(codigoProduto, novoValor) {
    if (novoValor < 0) {
        throw new Error("O valor não pode ser negativo");
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (produto) {
        produto.valor = novoValor;
        console.log("Valor atualizado com sucesso!");
    } else {
        throw new Error("Produto não encontrado");
    }
}

// ATUALIZAR QUANTIDADE
function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (novaQuantidade < 0) {
        throw new Error("Quantidade deve ser maior ou igual a zero");
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (produto) {
        produto.quantidade = novaQuantidade;
        console.log("Quantidade atualizada com sucesso!");
    } else {
        throw new Error("Produto não encontrado");
    }
}

// EXCLUIR PRODUTO
function excluirProduto(codigoProduto) {
    const indice = produtos.findIndex(
        prod => prod.codigo === codigoProduto
    );

    if (indice !== -1) {
        produtos.splice(indice, 1);
        console.log("Produto excluído com sucesso!");
    } else {
        throw new Error("Produto não encontrado");
    }
}

// CONSULTAR PRODUTO
function consultarProduto(codigoProduto) {
    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (produto) {
        console.log("===== PRODUTO ENCONTRADO =====");
        console.log("Código:", produto.codigo);
        console.log("Nome:", produto.nome);
        console.log("Quantidade:", produto.quantidade);
        console.log("Valor: R$", produto.valor);
    } else {
        throw new Error("Produto não encontrado");
    }
}

// CALCULAR VALOR TOTAL DO ESTOQUE
function calcularEstoque() {
    let total = 0;

    produtos.forEach(produto => {
        total += produto.quantidade * produto.valor;
    });

    console.log("Valor total do estoque: R$", total.toFixed(2));
}

// EXEMPLOS DE UTILIZAÇÃO

cadastrarProduto(1, "Cadeira Gamer", 12, 699.00);
cadastrarProduto(2, "Mouse Logitech", 38, 99.00);
cadastrarProduto(3, "Teclado Mecânico", 15, 199.00);

listarProdutos();

atualizarValor(2, 97.00);

atualizarQuantidade(1, 3);

listarProdutos();

consultarProduto(1);

calcularEstoque();

excluirProduto(3);

listarProdutos();
