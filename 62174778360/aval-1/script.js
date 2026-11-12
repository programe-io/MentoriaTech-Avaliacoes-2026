
// ======================================
// SISTEMA DE CONTROLE DE ESTOQUE
// ======================================

let produtos = [];

// ======================================
// CADASTRAR PRODUTO
// ======================================

function cadastrarProduto(nome, codigo, quantidade, valor) {

    if (!nome || !codigo) {
        throw new Error("Nome e código são obrigatórios");
    }

    if (quantidade < 0 || valor < 0) {
        throw new Error("Quantidade e valor não podem ser negativos");
    }

    const existe = produtos.find(prod => prod.codigo === codigo);

    if (existe) {
        throw new Error("Já existe um produto com esse código");
    }

    const produto = {
        nome: nome,
        codigo: codigo,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    console.log("Produto cadastrado com sucesso!");
}

// ======================================
// LISTAR PRODUTOS
// ======================================

function listarProdutos() {

    console.log("===== ESTOQUE DE PRODUTOS =====");

    if (produtos.length === 0) {
        console.log("Nenhum produto cadastrado.");
        return;
    }

    produtos.forEach(produto => {
        console.log("-------------------------");
        console.log("Nome:", produto.nome);
        console.log("Código:", produto.codigo);
        console.log("Quantidade:", produto.quantidade);
        console.log("Valor: R$", produto.valor.toFixed(2));
    });
}

// ======================================
// ATUALIZAR VALOR
// ======================================

function atualizarValor(codigoProduto, novoValor) {

    if (novoValor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
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

// ======================================
// ATUALIZAR QUANTIDADE
// ======================================

function atualizarQuantidade(codigoProduto, novaQuantidade) {

    if (novaQuantidade < 0) {
        throw new Error("Quantidade não pode ser negativa");
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

// ======================================
// REMOVER PRODUTO
// ======================================

function removerProduto(codigoProduto) {

    const indice = produtos.findIndex(
        prod => prod.codigo === codigoProduto
    );

    if (indice !== -1) {
        produtos.splice(indice, 1);
        console.log("Produto removido com sucesso!");
    } else {
        throw new Error("Produto não encontrado");
    }
}

// ======================================
// CALCULAR VALOR TOTAL DO ESTOQUE
// ======================================

function calcularEstoque() {

    const total = produtos.reduce((soma, produto) => {
        return soma + (produto.quantidade * produto.valor);
    }, 0);

    console.log("Valor total do estoque: R$", total.toFixed(2));

    return total;
}

// ======================================
// VERIFICAR ESTOQUE BAIXO
// ======================================

function verificarEstoqueBaixo() {

    console.log("===== PRODUTOS COM ESTOQUE BAIXO =====");

    const baixo = produtos.filter(
        produto => produto.quantidade < 5
    );

    if (baixo.length === 0) {
        console.log("Nenhum produto com estoque baixo.");
        return;
    }

    baixo.forEach(produto => {
        console.log(
            produto.nome + " - Quantidade: " + produto.quantidade
        );
    });
}

// ======================================
// TESTANDO O SISTEMA
// ======================================

cadastrarProduto("Cadeira Gamer", 12, 10, 699.00);
cadastrarProduto("Teclado Mecânico", 13, 15, 250.00);
cadastrarProduto("Mouse Gamer", 14, 3, 120.00);
cadastrarProduto("Monitor", 15, 8, 850.00);

// Listar produtos
listarProdutos();

// Atualizar preço
atualizarValor(12, 750.00);

// Atualizar quantidade
atualizarQuantidade(13, 20);

// Remover produto
// removerProduto(14);

// Calcular valor total
calcularEstoque();

// Verificar estoque baixo
verificarEstoqueBaixo();

// Listar novamente
listarProdutos();
