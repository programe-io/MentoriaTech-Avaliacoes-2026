// =========================================================================
// 4. Criação da lista de produtos (Array global)
// =========================================================================
const listaProdutos = [];
let proximoId = 1; // Para o item 12 (Geração automática do código)

// =========================================================================
// 6, 7, 8, 9. Funções para validar produto
// =========================================================================
function validarDescricao(descricao) {
    // Verifica se a descrição existe e não está em branco
    return typeof descricao === 'string' && descricao.trim().length > 0;
}

function validarQuantidade(quantidade) {
    // Quantidade deve ser um número inteiro maior ou igual a zero
    return Number.isInteger(quantidade) && quantidade >= 0;
}

function validarValor(valor) {
    // Valor deve ser um número maior que zero
    return typeof valor === 'number' && valor > 0;
}

function validarProduto(descricao, quantidade, valor) {
    if (!validarDescricao(descricao)) {
        throw new Error("Erro de Validação: Descrição inválida ou vazia.");
    }
    if (!validarQuantidade(quantidade)) {
        throw new Error("Erro de Validação: Quantidade deve ser um número inteiro não-negativo.");
    }
    if (!validarValor(valor)) {
        throw new Error("Erro de Validação: O valor do produto deve ser maior que zero.");
    }
    return true;
}

// =========================================================================
// 10, 11, 12, 13. Função para cadastrar produto
// =========================================================================
function cadastrarProduto(descricao, quantidade, valor) {
    try {
        // Valida antes de criar o objeto
        validarProduto(descricao, quantidade, valor);

        // 11 e 12. Criação do objeto produto com geração automática do código
        const novoProduto = {
            codigo: proximoId++, // Atribui o ID atual e incrementa para o próximo
            descricao: descricao.trim(),
            quantidade: quantidade,
            valor: valor
        };

        // 13. Adição de produtos ao array
        listaProdutos.push(novoProduto);
        console.log(`✅ Produto "${novoProduto.descricao}" cadastrado com sucesso! ID: ${novoProduto.codigo}`);
        return novoProduto;

    } catch (error) {
        console.error(`❌ Não foi possível cadastrar: ${error.message}`);
        return null;
    }
}

// =========================================================================
// 14. Função para listar produtos
// =========================================================================
function listarProdutos() {
    console.log("\n--- LISTA DE PRODUTOS ---");
    if (listaProdutos.length === 0) {
        console.log("Nenhum produto cadastrado no sistema.");
        return;
    }
    listaProdutos.forEach(prod => {
        console.log(`ID: ${prod.codigo} | ${prod.descricao} | Qtd: ${prod.quantidade} | Preço: R$ ${prod.valor.toFixed(2)}`);
    });
    console.log("-------------------------\n");
}

// =========================================================================
// 17 e 18. Busca de produto com find e Tratamento de produto não encontrado
// =========================================================================
function buscarProdutoPorId(id) {
    const produtoEncontrado = listaProdutos.find(prod => prod.codigo === id);
    
    if (!produtoEncontrado) {
        throw new Error(`Produto com o código ${id} não foi encontrado.`);
    }
    
    return produtoEncontrado;
}

// =========================================================================
// 16. Função para atualizar o valor do produto
// =========================================================================
function atualizarValorProduto(id, novoValor) {
    try {
        if (!validarValor(novoValor)) {
            throw new Error("O novo valor deve ser maior que zero.");
        }

        const produto = buscarProdutoPorId(id);
        produto.valor = novoValor;
        console.log(`💲 Valor do produto ID ${id} atualizado para R$ ${novoValor.toFixed(2)}`);

    } catch (error) {
        console.error(`❌ Erro ao atualizar valor: ${error.message}`);
    }
}

// =========================================================================
// 19 e 20. Função para atualizar a quantidade do produto e Diferença entre alterar e somar
// =========================================================================
function atualizarQuantidadeProduto(id, quantidadeNova, somar = false) {
    try {
        const produto = buscarProdutoPorId(id);

        if (somar) {
            // Se 'somar' for true, incrementa o estoque atual (ex: entrada de mercadoria)
            const novaQtdCalculada = produto.quantidade + quantidadeNova;
            if (!validarQuantidade(novaQtdCalculada)) {
                throw new Error("A quantidade resultante da soma é inválida.");
            }
            produto.quantidade = novaQtdCalculada;
            console.log(`📦 Adicionadas ${quantidadeNova} unidades ao produto ID ${id}. Novo estoque: ${produto.quantidade}`);
        } else {
            // Se 'somar' for false, altera diretamente definindo um novo valor absoluto
            if (!validarQuantidade(quantidadeNova)) {
                throw new Error("A nova quantidade definida é inválida.");
            }
            produto.quantidade = quantidadeNova;
            console.log(`📦 Estoque do produto ID ${id} alterado diretamente para: ${produto.quantidade}`);
        }

    } catch (error) {
        console.error(`❌ Erro ao atualizar quantidade: ${error.message}`);
    }
}

// =========================================================================
// 15. Testando o cadastro e a listagem (Execução do fluxo)
// =========================================================================
console.log("--- INICIANDO TESTES ---");

// Testando cadastros válidos
cadastrarProduto("Notebook Gamer", 10, 4500.00);
cadastrarProduto("Mouse Sem Fio", 50, 89.90);
cadastrarProduto("Teclado Mecânico", 25, 250.00);

// Testando validações (deve exibir erros no console)
cadastrarProduto("", 5, 10.00);          // Erro: Descrição vazia
cadastrarProduto("Monitor 4K", -2, 1200); // Erro: Quantidade negativa
cadastrarProduto("Cabo HDMI", 10, 0);     // Erro: Valor zero

// Listando produtos cadastrados
listarProdutos();

// Testando atualizações de preço e estoque
atualizarValorProduto(2, 79.90); // Altera preço do Mouse

// Testando a diferença do item 20 (alterar valor vs somar quantidade)
atualizarQuantidadeProduto(3, 40, false); // Altera o estoque do Teclado DIRETAMENTE para 40
atualizarQuantidadeProduto(3, 10, true);  // SOMA 10 unidades ao estoque atual (vai para 50)

// Testando busca e tratamento de erro (Item 18)
try {
    console.log("\nBuscando produto existente...");
    const p = buscarProdutoPorId(1);
    console.log(`Encontrado: ${p.descricao}`);
    
    console.log("\nBuscando produto que NÃO existe...");
    buscarProdutoPorId(99); // Vai disparar o erro do item 18
} catch (error) {
    console.error(`❌ Capturado no fluxo principal: ${error.message}`);
}

// Listagem final para conferir os dados alterados
listarProdutos();
