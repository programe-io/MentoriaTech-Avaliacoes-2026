// 4. Criação da lista de produtos (Array global)
const listaProdutos = [];
let proximoId = 1; // 12. Geração automática do código do produto

// 6. Funções para validar produto (7, 8, 9)
function validarDescricao(descricao) {
    return typeof descricao === 'string' && descricao.trim().length > 0;
}

function validarQuantidade(quantidade) {
    return typeof quantidade === 'number' && quantidade >= 0;
}

function validarValor(valor) {
    return typeof valor === 'number' && valor > 0;
}

function validarProduto(descricao, quantidade, valor) {
    if (!validarDescricao(descricao)) {
        throw new Error("Descrição inválida: o nome do produto é obrigatório.");
    }
    if (!validarQuantidade(quantidade)) {
        throw new Error("Quantidade inválida: deve ser um número maior ou igual a zero.");
    }
    if (!validarValor(valor)) {
        throw new Error("Valor inválido: deve ser um número maior que zero.");
    }
    return true;
}

// 10. Função para cadastrar produto
function cadastrarProduto(descricao, quantidade, valor) {
    try {
        // Valida antes de criar o objeto
        validarProduto(descricao, quantidade, valor);

        // 3 e 11. Estrutura e criação do objeto produto
        const novoProduto = {
            id: proximoId++, // Incrementa o ID automaticamente
            descricao: descricao.trim(),
            quantidade: quantidade,
            valor: valor
        };

        // 13. Adição de produtos ao array
        listaProdutos.push(novoProduto);
        console.log(`✅ Produto "${descricao}" cadastrado com sucesso! ID: ${novoProduto.id}`);
    } catch (erro) {
        // 18. Tratamento de produto não encontrado e exceções
        console.error(`❌ Erro ao cadastrar: ${erro.message}`);
    }
}

// 14. Função para listar produtos
function listarProdutos() {
    if (listaProdutos.length === 0) {
        console.log("📦 O estoque está vazio.");
        return;
    }
    console.log("\n--- 📋 LISTA DE PRODUTOS NO ESTOQUE ---");
    listaProdutos.forEach(p => {
        console.log(`ID: ${p.id} | ${p.descricao} | Qtd: ${p.quantidade} | Preço: R$ ${p.valor.toFixed(2)}`);
    });
}

// 17. Busca de produto com find
function buscarProdutoPorId(id) {
    const produto = listaProdutos.find(p => p.id === id);
    if (!produto) {
        // 18. Tratamento de produto não encontrado
        console.log(`⚠️ Produto com ID ${id} não foi encontrado.`);
        return null;
    }
    return produto;
}

// 16. Função para atualizar o valor do produto
function atualizarValorProduto(id, novoValor) {
    if (!validarValor(novoValor)) {
        console.error("❌ Erro: Novo valor inserido é inválido.");
        return;
    }
    
    const produto = buscarProdutoPorId(id);
    if (produto) {
        produto.valor = novoValor; // Altera o valor diretamente (substituição)
        console.log(`💰 Valor do produto ID ${id} atualizado para R$ ${novoValor.toFixed(2)}`);
    }
}

// 19. Função para atualizar a quantidade do produto
// 20. Diferença entre alterar valor e somar quantidade
function somarQuantidadeProduto(id, quantidadeParaAdicionar) {
    if (typeof quantidadeParaAdicionar !== 'number' || quantidadeParaAdicionar <= 0) {
        console.error("❌ Erro: Quantidade para adicionar deve ser um número maior que zero.");
        return;
    }

    const produto = buscarProdutoPorId(id);
    if (produto) {
        // Diferença: em vez de apenas substituir (=), nós somamos (+=) ao estoque atual (acumulador)
        produto.quantidade += quantidadeParaAdicionar;
        console.log(`📦 Estoque atualizado! ID ${id} agora possui ${produto.quantidade} unidades.`);
    }
}

// 21. Possibilidades de melhoria (Exemplo: Função para Deletar Produto)
function deletarProduto(id) {
    const index = listaProdutos.findIndex(p => p.id === id);
    if (index !== -1) {
        const removido = listaProdutos.splice(index, 1);
        console.log(`🗑️ Produto "${removido[0].descricao}" removido do estoque.`);
    } else {
        console.log(`⚠️ Não foi possível deletar: ID ${id} não encontrado.`);
    }
}

// 15. Testando o cadastro e a listagem diretamente no console
console.log("--- 🚀 INICIANDO TESTES DO PROJETO ---");

cadastrarProduto("Notebook Dell", 10, 4500.00);
cadastrarProduto("Mouse Sem Fio", 50, 89.90);
cadastrarProduto("Teclado Mecânico", 25, 250.00);

// Teste de validação (vai gerar erro no console propositalmente)
cadastrarProduto("", 5, -10); 

listarProdutos();

// Testes de Alteração e Atualização
console.log("\n--- 🔧 EXECUTANDO ATUALIZAÇÕES ---");
atualizarValorProduto(2, 79.90);    // 16. Modifica o valor do mouse
somarQuantidadeProduto(1, 5);      // 19 e 20. Soma 5 notebooks ao estoque atual (vai para 15)

// 21. Testando a melhoria (Remover)
deletarProduto(3); 

listarProdutos();
