// 4. Criação da lista de produtos (Array vazio)
let produtos = [];

// 6. Função para validar o produto (descrição, quantidade e valor)
function validarProduto(descricao, quantidade, valor) {
    if (descricao.length < 5) {
        throw new Error("A descrição deve ter, no mínimo, cinco caracteres.");
    }
    if (quantidade < 1) {
        throw new Error("A quantidade deve ser maior que zero.");
    }
    if (valor < 0) {
        throw new Error("O valor deve ser maior ou igual a zero.");
    }
}

// 10. Função para cadastrar um novo produto
function cadastrarProduto(descricao, quantidade, valor) {
    // Valida os dados antes de prosseguir
    validarProduto(descricao, quantidade, valor);

    // 11 e 12. Criação do objeto produto e geração automática do código
    let novoProduto = {
        codigo: produtos.length + 1,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    // 13. Adição do produto ao array usando push
    produtos.push(novoProduto);
    console.log(`Produto "${descricao}" cadastrado com sucesso!`);
}

// 14. Função para listar todos os produtos
function listarProdutos() {
    console.log("--- LISTA DE PRODUTOS NO ESTOQUE ---");
    console.log(produtos);
}

// 16 e 17. Função para atualizar o valor de um produto (substitui o valor antigo)
function atualizarValor(codigoProduto, novoValor) {
    if (novoValor < 0) {
        throw new Error("O valor deve ser maior ou igual a zero.");
    }

    // Busca o produto pelo código usando o método find
    const produto = produtos.find((prod) => prod.codigo === codigoProduto);

    // 18. Tratamento para produto encontrado ou não
    if (produto) {
        produto.valor = novoValor;
        console.log(`O valor do produto código ${codigoProduto} foi atualizado para R$ ${novoValor}.`);
    } else {
        throw new Error("Produto não encontrado.");
    }
}

// 19 e 20. Função para atualizar a quantidade (soma ao estoque existente)
function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (novaQuantidade < 1) {
        throw new Error("A quantidade a adicionar deve ser maior que zero.");
    }

    const produto = produtos.find((prod) => prod.codigo === codigoProduto);

    if (produto) {
        // Soma a nova quantidade à quantidade já existente
        produto.quantidade = produto.quantidade + novaQuantidade;
        console.log(`Estoque do produto código ${codigoProduto} atualizado. Nova quantidade: ${produto.quantidade}.`);
    } else {
        throw new Error("Produto não encontrado.");
    }
}

// ==========================================
// 15. TESTANDO O SISTEMA
// ==========================================

try {
    // Cadastrando produtos
    cadastrarProduto("Cadeira gamer", 12, 699);
    cadastrarProduto("Mouse Logitech", 38, 99);

    // Listando o estoque atual
    listarProdutos();

    // Atualizando o valor de um produto (Código 2)
    atualizarValor(2, 89);

    // Adicionando mais unidades ao estoque (Código 1 - somando 3 unidades)
    atualizarQuantidade(1, 3);

    // Listando novamente para ver as alterações
    listarProdutos();

} catch (erro) {
    console.error("Erro capturado:", erro.message);
}
