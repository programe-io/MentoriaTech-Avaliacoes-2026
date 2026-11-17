// ==========================================
// SISTEMA DE CONTROLE DE ESTOQUE
// ==========================================
// 1. Lista de produtos
let produtos = [];

// 2. Função para validar os dados do produto
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

// 3. Função para cadastrar produto
function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);

    let novoProduto = {
        codigo: produtos.length + 1,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);

    console.log("Produto cadastrado com sucesso!");
    console.log(novoProduto);
}

// 4. Função para listar produtos
function listarProdutos() {
    console.log("\n===== PRODUTOS CADASTRADOS =====");

    if (produtos.length === 0) {
        console.log("Nenhum produto cadastrado.");
        return;
    }

    console.log(produtos);
}

// 5. Função para buscar produto pelo código
function buscarProdutoPorCodigo(codigoProduto) {
    return produtos.find((prod) => prod.codigo === codigoProduto);
}

// 6. Função para atualizar o valor
function atualizarValor(codigoProduto, novoValor) {
    if (novoValor < 0) {
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

// 7. Função para atualizar a quantidade
function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (novaQuantidade < 1) {
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



// ==========================================
// 8. TESTES DO SISTEMA
// ==========================================
try {
    // Cadastrar produtos
    cadastrarProduto("carro", 46, 699);
    cadastrarProduto("moto", 25, 99);
    cadastrarProduto("porta", 30, 150);
    cadastrarProduto("cadeira", 15, 850);

    // Listar produtos
    listarProdutos();

    // Atualizar valor do produto de código 2
    atualizarValor(2, 97);

    // Adicionar 3 unidades ao produto de código 1
    atualizarQuantidade(1, 3);

    // Mostrar lista atualizada
    listarProdutos();

} catch (erro) {
    console.log("ERRO: " + erro.message);
}
