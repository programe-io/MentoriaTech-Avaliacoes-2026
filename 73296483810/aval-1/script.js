
let produtos = [];

// 1. Função para validar os dados do produto
function validarProduto(descricao, quantidade, valor) {

    if (typeof descricao !== "string" || descricao.trim().length < 5) {
        throw new Error("Descrição deve ter, no mínimo, cinco caracteres");
    }

    if (!Number.isInteger(quantidade) || quantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero");
    }

    if (typeof valor !== "number" || !Number.isFinite(valor) || valor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
    }
}

// 2. Função para cadastrar produto
function cadastrarProduto(descricao, quantidade, valor) {

    validarProduto(descricao, quantidade, valor);

    let novoProduto = {
        codigo: produtos.length + 1,
        descricao: descricao.trim(),
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);

    console.log("Produto cadastrado com sucesso!");
    return novoProduto;
}

// 3. Função para listar produtos
function listarProdutos() {

    if (produtos.length === 0) {
        console.log("Nenhum produto cadastrado.");
        return;
    }

    console.log("===== LISTA DE PRODUTOS =====");

    produtos.forEach((produto) => {
        console.log("-------------------------");
        console.log("Código:", produto.codigo);
        console.log("Descrição:", produto.descricao);
        console.log("Quantidade:", produto.quantidade);
        console.log("Valor: R$", produto.valor.toFixed(2));
    });

    console.log("-------------------------");
}

// 4. Função para buscar produto pelo código
function buscarProdutoPorCodigo(codigoProduto) {

    return produtos.find((prod) => prod.codigo === codigoProduto);
}

// 5. Função para atualizar o valor do produto
function atualizarValor(codigoProduto, novoValor) {

    if (typeof novoValor !== "number" ||
        !Number.isFinite(novoValor) || novoValor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
    }

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (produto) {
        produto.valor = novoValor;
        console.log("Valor atualizado com sucesso!");
    } else {
        throw new Error("Produto não encontrado");
    }
}

// 6. Função para atualizar a quantidade do produto
function atualizarQuantidade(codigoProduto, novaQuantidade) {

    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero");
    }

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (produto) {
        produto.quantidade = produto.quantidade + novaQuantidade;
        console.log("Quantidade atualizada com sucesso!");
    } else {
        throw new Error("Produto não encontrado");
    }
}

// 7. TESTANDO O SISTEMA

try {

    // Cadastrando produtos
    cadastrarProduto("Cadeira gamer", 12, 699);
    cadastrarProduto("Mouse Logitech", 38, 99);
    cadastrarProduto("Teclado mecanico", 15, 250);
    cadastrarProduto("Monitor Samsung", 8, 1200);

    // Listando produtos
    listarProdutos();

    // Atualizando valor do produto de código 2
    atualizarValor(2, 97);

    // Adicionando 3 unidades ao produto de código 1
    atualizarQuantidade(1, 3);

    // Listando novamente para verificar alterações
    console.log("===== PRODUTOS ATUALIZADOS =====");
    listarProdutos();

} catch (erro) {
    console.log("Erro:", erro.message);
}
