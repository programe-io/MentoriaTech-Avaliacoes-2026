/* ==========================================================================
   3. Estrutura dos dados do produto & 4. Criação da lista de produtos (Array)
   ========================================================================== */
// Array global que armazenará todos os objetos de produtos
const listaProdutos = [];

// Controle de autoincremento para o ID (12. Geração automática do código)
let proximoCodigo = 1001;


/* ==========================================================================
   5. Organização do projeto em funções: 
   6. Função para validar produto (7, 8 e 9)
   ========================================================================== */

/**
 * 7. Validação da descrição
 * @param {string} descricao - Nome/descrição do produto
 * @returns {boolean} - Retorna true se for válida (mínimo 3 caracteres não vazios)
 */
function validarDescricao(descricao) {
    return typeof descricao === 'string' && descricao.trim().length >= 3;
}

/**
 * 8. Validação da quantidade
 * @param {number} quantidade - Quantidade em estoque
 * @returns {boolean} - Retorna true se for um número inteiro maior ou igual a zero
 */
function validarQuantidade(quantidade) {
    const qtdNum = Number(quantidade);
    return !isNaN(qtdNum) && Number.isInteger(qtdNum) && qtdNum >= 0;
}

/**
 * 9. Validação do valor
 * @param {number} valor - Preço unitário do produto
 * @returns {boolean} - Retorna true se for um número válido e maior que zero
 */
function validarValor(valor) {
    const valorNum = Number(valor);
    return !isNaN(valorNum) && valorNum > 0;
}

/**
 * 6. Função agregadora para validar o produto completo
 */
function validarProdutoCompleto(descricao, quantidade, valor) {
    const erros = [];

    if (!validarDescricao(descricao)) erros.push("Descrição inválida (mínimo 3 caracteres).");
    if (!validarQuantidade(quantidade)) erros.push("Quantidade inválida (deve ser um número inteiro maior ou igual a zero).");
    if (!validarValor(valor)) erros.push("Valor inválida (deve ser maior que zero).");

    return {
        valido: erros.length === 0,
        erros: erros
    };
}


/* ==========================================================================
   10. Função para cadastrar produto (11, 12 e 13)
   ========================================================================== */

/**
 * Cadastra um novo produto na lista após passar pelas validações
 */
function cadastrarProduto(descricao, quantidade, valor) {
    // Executa as validações do produto
    const validacao = validarProdutoCompleto(descricao, quantidade, valor);

    if (!validacao.valido) {
        console.error("⚠️ Erro no cadastro:", validacao.erros.join(" | "));
        return { sucesso: false, erros: validacao.erros };
    }

    // 11. Criação do objeto produto & 12. Geração automática do código do produto
    const novoProduto = {
        codigo: proximoCodigo++, // Atribui o código atual e incrementa para o próximo
        descricao: descricao.trim(),
        quantidade: parseInt(quantidade),
        valor: parseFloat(valor)
    };

    // 13. Adição de produtos ao array
    listaProdutos.push(novoProduto);
    
    console.log(`✅ Produto "#${novoProduto.codigo} - ${novoProduto.descricao}" cadastrado com sucesso!`);
    return { sucesso: true, produto: novoProduto };
}


/* ==========================================================================
   14. Função para listar produtos
   ========================================================================== */

/**
 * Exibe todos os produtos cadastrados de forma organizada
 */
function listarProdutos() {
    console.log("\n=================== 14. LISTA DE PRODUTOS ===================");
    
    if (listaProdutos.length === 0) {
        console.log("Nenhum produto cadastrado no sistema.");
        console.log("=============================================================");
        return;
    }

    listaProdutos.forEach(produto => {
        const totalEstoque = (produto.quantidade * produto.valor).toFixed(2);
        console.log(
            `Cód: #${produto.codigo} | ` +
            `Prod: ${produto.descricao.padEnd(20, ' ')} | ` +
            `Qtd: ${String(produto.quantidade).padStart(4, ' ')} | ` +
            `Preço: R$ ${produto.valor.toFixed(2).padStart(8, ' ')} | ` +
            `Total: R$ ${totalEstoque}`
        );
    });
    console.log("=============================================================");
}


/* ==========================================================================
   17. Busca de produto com find & 18. Tratamento de produto não encontrado
   ========================================================================== */

/**
 * Busca um produto específico utilizando o método find do Array
 * @param {number} codigo - Código gerado automaticamente
 */
function buscarProdutoPorCodigo(codigo) {
    const codProcurado = parseInt(codigo);
    
    // 17. Busca de produto com find
    const produtoEncontrado = listaProdutos.find(p => p.codigo === codProcurado);

    // 18. Tratamento de produto não encontrado
    if (!produtoEncontrado) {
        console.warn(`❌ Erro: Produto com o código #${codigo} não foi encontrado.`);
        return null;
    }

    return produtoEncontrado;
}


/* ==========================================================================
   16, 19 e 20. Funções de Atualização e Diferenças de Lógica
   ========================================================================== */

/**
 * 16. Função para atualizar o valor do produto
 * Regra: Substitui completamente o valor antigo pelo novo.
 */
function atualizarValorProduto(codigo, novoValor) {
    if (!validarValor(novoValor)) {
        console.error("⚠️ Erro: Novo preço inválido.");
        return false;
    }

    const produto = buscarProdutoPorCodigo(codigo);
    
    if (produto) {
        const valorAntigo = produto.valor;
        // 20. Diferença: Aqui ocorre uma ATRIBUIÇÃO DIRETA (substituição)
        produto.valor = parseFloat(novoValor); 
        console.log(`🔄 Preço atualizado (#${codigo}): De R$ ${valorAntigo.toFixed(2)} para R$ ${produto.valor.toFixed(2)}`);
        return true;
    }
    return false;
}

/**
 * 19. Função para atualizar a quantidade do produto
 * Regra: Soma uma nova quantidade ao estoque já existente.
 */
function somarQuantidadeEstoque(codigo, quantidadeParaAdicionar) {
    const qtdSoma = parseInt(quantidadeParaAdicionar);
    
    if (isNaN(qtdSoma) || qtdSoma <= 0) {
        console.error("⚠️ Erro: A quantidade para somar deve ser um número inteiro positivo.");
        return false;
    }

    const produto = buscarProdutoPorCodigo(codigo);

    if (produto) {
        const qtdAntiga = produto.quantidade;
        // 20. Diferença: Aqui ocorre uma OPERAÇÃO ADITIVA (+=), preservando e somando ao estoque antigo
        produto.quantidade += qtdSoma; 
        console.log(`📦 Estoque atualizado (#${codigo}): Adicionado +${qtdSoma}. Total foi de ${qtdAntiga} para ${produto.quantidade} unidades.`);
        return true;
    }
    return false;
}


/* ==========================================================================
   15. Testando o cadastro e a listagem (Ambiente de Testes)
   ========================================================================== */
function executarTestesDoSistema() {
    console.log("🚀 Iniciando testes do sistema de produtos...");

    // 1. Testando Cadastros Válidos
    cadastrarProduto("Notebook Pro 15", 10, 4500.00);
    cadastrarProduto("Mouse Sem Fio", 50, 89.90);
    cadastrarProduto("Monitor UltraWide", 5, 1299.00);

    // 2. Testando Validações (Devem falhar e disparar erros controlados)
    cadastrarProduto("Ab", 5, 10.00);        // Descrição curta demais (Erro tópico 7)
    cadastrarProduto("Teclado", -2, 150.00);  // Quantidade negativa (Erro tópico 8)
    cadastrarProduto("Webcam", 10, 0);        // Preço zero (Erro tópico 9)

    // 3. Listagem Inicial
    listarProdutos();

    // 4. Testando Busca com Find bem-sucedida e Tratamento de Erro
    console.log("\n🔍 Testando buscas:");
    const prodExistente = buscarProdutoPorCodigo(1001); // Deve achar o Notebook
    const prodInexistente = buscarProdutoPorCodigo(9999); // Não deve achar nada

    // 5. Testando Atualizações (Demonstrando a diferença do Tópico 20)
    console.log("\n⚡ Testando atualizações:");
    atualizarValorProduto(1001, 4299.90);      // Altera o preço de 4500.00 para 4299.90
    somarQuantidadeEstoque(1001, 5);           // Soma +5 às 10 unidades existentes (Total = 15)

    // 6. Listagem Final com dados modificados
    listarProdutos();
}

// Executa a rotina automática de testes ao carregar o script
executarTestesDoSistema();
