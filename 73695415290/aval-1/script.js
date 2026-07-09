// 4. Criação da lista de produtos (Array Global)
let produtos = [];

// =========================================================================
// 21. FUNÇÕES DE SUPORTE E MELHORIAS (Validações Isoladas e Busca)
// =========================================================================

function validarDescricao(descricao) {
    if (descricao.length < 5) {
        throw new Error("Descrição deve ter, no mínimo, cinco caracteres");
    }
}

function validarQuantidade(quantidade) {
    if (quantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero");
    }
}

function validarValor(valor) {
    if (valor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
    }
}

// 6. Função principal para validar todos os dados do produto
function validarProduto(descricao, quantidade, valor) {
    validarDescricao(descricao);
    validarQuantidade(quantidade);
    validarValor(valor);
}

// 17 & 21. Função específica para buscar produto pelo código
function buscarProdutoPorCodigo(codigoProduto) {
    const produto = produtos.find((prod) => prod.codigo === codigoProduto);
    if (!produto) {
        throw new Error("Produto não encontrado");
    }
    return produto;
}

// =========================================================================
// OPERAÇÕES PRINCIPAIS DO SISTEMA (CRUD - Create, Read, Update)
// =========================================================================

// 10. Cadastrar um novo produto
function cadastrarProduto(descricao, quantidade, valor) {
    // Valida os dados antes de prosseguir
    validarProduto(descricao, quantidade, valor);
    
    // 11 & 12. Criação do objeto com geração automática de código sequencial
    let novoProduto = {
        codigo: produtos.length + 1,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };
    
    // 13. Adição do objeto ao array global
    produtos.push(novoProduto);
}

// 14. Listar os produtos cadastrados
function listarProdutos() {
    console.log("--- Lista de Produtos no Estoque ---");
    console.log(produtos);
}

// 16. Alterar o valor de um produto (Substituição)
function atualizarValor(codigoProduto, novoValor) {
    validarValor(novoValor);
    
    let produto = buscarProdutoPorCodigo(codigoProduto);
    produto.valor = novoValor; // Substitui o valor antigo
}

// 19 & 20. Alterar a quantidade de um produto (Soma/Entrada de Estoque)
function atualizarQuantidade(codigoProduto, novaQuantidade) {
    validarQuantidade(novaQuantidade);
    
    let produto = buscarProdutoPorCodigo(codigoProduto);
    produto.quantidade = produto.quantidade + novaQuantidade; // Soma ao estoque existente
}

// =========================================================================
// 15. FLUXO DE TESTES (Simulação de Execução)
// =========================================================================

try {
    console.log("--- Iniciando Cadastro de Produtos ---");
    
    // Teste de Cadastros Válidos
    cadastrarProduto("Cadeira gamer", 12, 699);
    cadastrarProduto("Mouse Logitech", 38, 99);
    listarProdutos();

    // 20. Teste de Atualizações
    console.log("\n--- Atualizando valor e quantidade do Mouse (Código 2) ---");
    atualizarValor(2, 97);             // Substitui 99 por 97
    atualizarQuantidade(2, 3);          // Soma 3 às 38 unidades existentes (Total: 41)
    listarProdutos();

    // Teste de Validação (Gatilho de Erro proposital)
    console.log("\n--- Tentando cadastrar produto inválido ---");
    cadastrarProduto("TV", 0, -10); // Vai falhar na descrição ("TV" tem menos de 5 caracteres)

} catch (error) {
    console.error("Erro capturado no sistema:", error.message);
}