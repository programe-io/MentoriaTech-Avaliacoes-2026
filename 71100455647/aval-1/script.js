// Lista principal que armazena os produtos em memória
const produtos = [];

// 1. Cadastrar novo produto
function cadastrarProduto(codigo, nome, valor, quantidade) {
    if (!codigo || !nome) {
        throw new Error("Código e nome são obrigatórios");
    }
    if (valor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
    }
    if (quantidade < 0) {
        throw new Error("Quantidade não pode ser negativa");
    }

    const produtoExistente = produtos.find(prod => prod.codigo === codigo);
    if (produtoExistente) {
        throw new Error("Já existe um produto cadastrado com este código");
    }

    const novoProduto = {
        codigo: codigo,
        nome: nome,
        valor: valor,
        quantidade: quantidade
    };

    produtos.push(novoProduto);
    return novoProduto;
}

// 2. Atualizar valor do produto (conforme a imagem)
function atualizarValor(codigoProduto, novoValor) {
    if (novoValor < 0) {
        throw new Error("Valor deve maior igual a zero");
    }
    const produto = produtos.find(prod => prod.codigo === codigoProduto);
    if (produto) {
        produto.valor = novoValor;
    } else {
        throw new Error("Produto não encontrado");
    }
}

// 3. Atualizar quantidade do produto (continuação da imagem)
function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (novaQuantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero");
    }
    // Atenção: na imagem o cursor estava digitando prod.quantidade, mas o correto é comparar prod.codigo
    const produto = produtos.find(prod => prod.codigo === codigoProduto);
    if (produto) {
        produto.quantidade = novaQuantidade;
    } else {
        throw new Error("Produto não encontrado");
    }
}

// 4. Remover produto do estoque
function removerProduto(codigoProduto) {
    const indice = produtos.findIndex(prod => prod.codigo === codigoProduto);
    if (indice !== -1) {
        produtos.splice(indice, 1);
    } else {
        throw new Error("Produto não encontrado");
    }
}

// 5. Buscar um produto específico pelo código
function buscarProduto(codigoProduto) {
    const produto = produtos.find(prod => prod.codigo === codigoProduto);
    if (!produto) {
        throw new Error("Produto não encontrado");
    }
    return produto;
}

// 6. Listar todos os produtos do estoque
function listarProdutos() {
    return produtos;
}

// --------------------------------------------------
// Exemplo de uso e testes (usando try/catch para capturar os erros)
// --------------------------------------------------
try {
    cadastrarProduto(101, "Teclado Mecânico", 250.00, 15);
    cadastrarProduto(102, "Mouse Gamer", 120.50, 30);

    atualizarValor(101, 230.00);
    atualizarQuantidade(102, 25);

    console.log("Estoque atual:", listarProdutos());

    removerProduto(101);
    console.log("Após remoção:", listarProdutos());
} catch (erro) {
    console.error("Erro no sistema:", erro.message);
}