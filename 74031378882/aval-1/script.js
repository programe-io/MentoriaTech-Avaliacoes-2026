// 4. Criação da lista de produtos (Array Global)
let produtos = [];

// ==========================================
// 21. FUNÇÕES DE SUPORTE (Melhorias sugeridas)
// ==========================================

// Valida individualmente a descrição
function validarDescricao(descricao) {
    if (!descricao || descricao.length < 5) {
        throw new Error("Descrição deve ter, no mínimo, cinco caracteres.");
    }
}

// Valida individualmente a quantidade
function validarQuantidade(quantidade) {
    if (quantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero.");
    }
}

// Valida individualmente o valor
function validarValor(valor) {
    if (valor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero.");
    }
}

// 6. Função agregadora para validar produto
function validarProduto(descricao, quantidade, valor) {
    validarDescricao(descricao);
    validarQuantidade(quantidade);
    validarValor(valor);
}

// 17 & 21. Função específica para buscar produto por código
function buscarProdutoPorCodigo(codigoProduto) {
    return produtos.find((prod) => prod.codigo === codigoProduto);
}


// ==========================================
// FUNÇÕES PRINCIPAIS DO SISTEMA (CRUD)
// ==========================================

// 10. Função para cadastrar produto
function cadastrarProduto(descricao, quantity, valor) {
    // Executa as validações antes de qualquer ação
    validarProduto(descricao, quantity, valor);

    // 11 & 12. Criação do objeto produto com geração automática de código
    let novoProduto = {
        codigo: produtos.length + 1,
        descricao: descricao,
        quantidade: quantity,
        valor: valor
    };

    // 13. Adição do produto ao array
    produtos.push(novoProduto);
    console.log(`Sucesso: Produto "${descricao}" cadastrado com código ${novoProduto.codigo}.`);
}

// 14. Função para listar produtos
function listarProdutos() {
    console.log("\n--- LISTA DE PRODUTOS NO ESTOQUE ---");
    if (produtos.length === 0) {
        console.log("O estoque está vazio.");
    } else {
        console.log(produtos);
    }
    console.log("------------------------------------\n");
}

// 16. Função para atualizar o valor do produto (Substitui o valor antigo)
function atualizarValor(codigoProduto, novoValor) {
    // Valida o novo valor informado
    validarValor(novoValor);

    // Busca o produto usando a função de suporte
    const produto = buscarProdutoPorCodigo(codigoProduto);

    // 18. Tratamento de produto não encontrado
    if (produto) {
        produto.valor = novoValor;
        console.log(`Sucesso: Valor do produto código ${codigoProduto} atualizado para R$ ${novoValor}.`);
    } else {
        throw new Error("Produto não encontrado.");
    }
}

// 19 & 20. Função para atualizar a quantidade (Soma ao estoque existente)
function atualizarQuantidade(codigoProduto, novaQuantidade) {
    // Valida a quantidade informada
    validarQuantidade(novaQuantidade);

    // Busca o produto
    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (produto) {
        // Diferença: aqui nós somamos à quantidade atual
        produto.quantidade = produto.quantidade + novaQuantidade;
        console.log(`Sucesso: Foram adicionadas ${novaQuantidade} unidades ao produto código ${codigoProduto}. Novo total: ${produto.quantidade}.`);
    } else {
        throw new Error("Produto não encontrado.");
    }
}


// ==========================================
// 15. SEÇÃO DE TESTES E EXECUÇÃO
// ==========================================

try {
    console.log("--- Testando Cadastros Válidos ---");
    cadastrarProduto("Cadeira gamer", 12, 699);
    cadastrarProduto("Mouse Logitech", 38, 99);
    
    // Exibe a lista após os cadastros
    listarProdutos();

    console.log("--- Testando Atualizações ---");
    // Atualizando o valor do Mouse (código 2) de 99 para 97
    atualizarValor(2, 97);
    
    // Adicionando mais 3 unidades à Cadeira Gamer (código 1) -> deve ir para 15
    atualizarQuantidade(1, 3);
    
    // Exibe a lista para checar as alterações
    listarProdutos();

    console.log("--- Testando Validações (Gatilhando Erros de Propósito) ---");
    // Remova as barras '//' de uma linha por vez abaixo para testar os erros no Programiz:
    
    // cadastrarProduto("TV", 5, 1200); // Erro: Descrição menor que 5 caracteres
    // cadastrarProduto("Teclado Mek", 0, 150); // Erro: Quantidade menor que 1
    // atualizarValor(1, -50); // Erro: Valor negativo
    // atualizarQuantidade(99, 5); // Erro: Produto não encontrado

} catch (erro) {
    // Captura qualquer erro lançado pelos "throw new Error" e exibe no console de forma limpa
    console.error(`[ERRO NO SISTEMA]: ${erro.message}`);
}
