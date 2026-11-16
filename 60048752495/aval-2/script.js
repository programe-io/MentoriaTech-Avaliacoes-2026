// 1. Lista inicial de produtos (Array vazio)
let produtos = [];

// 2. Função para validar os dados antes do cadastro
function validarProduto(descricao, quantidade, valor) {
    if (descricao.length < 5) {
        throw new Error("Descrição deve ter, no mínimo, cinco caracteres");
    }

    if (quantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero");
    }

    if (valor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
    }
}

// 3. Função para cadastrar um novo produto
function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);

    let novoProduto = {
        codigo: produtos.length + 1,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);
}

// 4. Função para listar todos os produtos cadastrados
function listarProdutos() {
    console.log(produtos);
}

// 5. Função para atualizar o valor (preço) de um produto
function atualizarValor(codigoProduto, novoValor) {
    if (novoValor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
    }

    const produto = produtos.find((prod) => prod.codigo === codigoProduto);

    if (produto) {
        produto.valor = novoValor;
    } else {
        throw new Error("Produto não encontrado");
    }
}

// 6. Função para somar uma nova quantidade ao estoque do produto
function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (novaQuantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero");
    }

    const produto = produtos.find((prod) => prod.codigo === codigoProduto);

    if (produto) {
        produto.quantidade = produto.quantidade + novaQuantidade;
    } else {
        throw new Error("Produto não encontrado");
    }
}

// ==========================================
// TESTANDO AS FUNCIONALIDADES DO SISTEMA
// ==========================================

// Cadastrando produtos válidos
cadastrarProduto("Cadeira gamer", 12, 699);
cadastrarProduto("Mouse Logitech", 38, 99);

console.log("--- Lista após cadastros ---");
listarProdutos();

// Atualizando o valor do Mouse (código 2) de 99 para 97
atualizarValor(2, 97);

// Adicionando 3 unidades à Cadeira gamer (código 1) -> vai de 12 para 15
atualizarQuantidade(1, 3);

console.log("--- Lista após atualizações ---");
listarProdutos();
