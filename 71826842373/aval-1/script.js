
// =====================================
// SISTEMA DE CONTROLE DE ESTOQUE
// =====================================

// Lista de produtos
let produtos = [];
let proximoCodigo = 1;

// =====================================
// CADASTRAR PRODUTO
// =====================================

function cadastrarProduto(nome, quantidade, valor) {
    if (!nome || quantidade < 0 || valor < 0) {
        throw new Error("Dados inválidos para cadastro");
    }

    const produto = {
        codigo: proximoCodigo++,
        nome: nome,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    console.log("Produto cadastrado com sucesso!");
}

// =====================================
// LISTAR PRODUTOS
// =====================================

function listarProdutos() {
    console.log("\n===== ESTOQUE DE PRODUTOS =====");

    if (produtos.length === 0) {
        console.log("Nenhum produto cadastrado.");
        return;
    }

    produtos.forEach(produto => {
        console.log(
            `Código: ${produto.codigo} | ` +
            `Nome: ${produto.nome} | ` +
            `Quantidade: ${produto.quantidade} | ` +
            `Valor: R$ ${produto.valor.toFixed(2)}`
        );
    });

    console.log("===============================");
}

// =====================================
// BUSCAR PRODUTO
// =====================================

function buscarProduto(codigoProduto) {
    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (!produto) {
        throw new Error("Produto não encontrado");
    }

    return produto;
}

// =====================================
// ATUALIZAR VALOR
// =====================================

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

// =====================================
// ATUALIZAR QUANTIDADE
// =====================================

function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (novaQuantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero");
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (produto) {
        produto.quantidade += novaQuantidade;
        console.log("Quantidade atualizada com sucesso!");
    } else {
        throw new Error("Produto não encontrado");
    }
}

// =====================================
// RETIRAR PRODUTOS DO ESTOQUE
// =====================================

function retirarProduto(codigoProduto, quantidade) {
    if (quantidade < 1) {
        throw new Error("Quantidade inválida");
    }

    const produto = buscarProduto(codigoProduto);

    if (produto.quantidade < quantidade) {
        throw new Error("Estoque insuficiente!");
    }

    produto.quantidade -= quantidade;

    console.log("Saída de produto realizada com sucesso!");
}

// =====================================
// EXCLUIR PRODUTO
// =====================================

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

// =====================================
// CALCULAR VALOR TOTAL DO ESTOQUE
// =====================================

function calcularEstoque() {
    let total = 0;

    produtos.forEach(produto => {
        total += produto.quantidade * produto.valor;
    });

    console.log(
        "Valor total do estoque: R$ " + total.toFixed(2)
    );

    return total;
}

// =====================================
// PRODUTOS COM ESTOQUE BAIXO
// =====================================

function verificarEstoqueBaixo() {
    console.log("\n===== ESTOQUE BAIXO =====");

    const baixos = produtos.filter(
        produto => produto.quantidade <= 5
    );

    if (baixos.length === 0) {
        console.log("Nenhum produto com estoque baixo.");
        return;
    }

    baixos.forEach(produto => {
        console.log(
            `${produto.nome} - Quantidade: ${produto.quantidade}`
        );
    });
}

// =====================================
// TESTANDO O SISTEMA
// =====================================

cadastrarProduto("Cadeira Gamer", 12, 699.00);
cadastrarProduto("Mouse Logitech", 38, 99.00);
cadastrarProduto("Teclado Mecânico", 20, 199.00);
cadastrarProduto("Monitor Gamer", 10, 899.00);

listarProdutos();

// Atualizando valor do produto
atualizarValor(2, 97.00);

// Adicionando produtos ao estoque
atualizarQuantidade(4, 5);

// Retirando produtos do estoque
retirarProduto(1, 2);

// Exibindo produtos atualizados
listarProdutos();

// Calculando valor total
calcularEstoque();

// Verificando estoque baixo
verificarEstoqueBaixo();

// Excluindo produto
excluirProduto(3);

// Listagem final
listarProdutos();
