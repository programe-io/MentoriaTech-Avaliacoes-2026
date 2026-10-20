// ==========================================
// 3. Estrutura dos dados do produto
// (Definição dos campos: id, descricao, quantidade, valor)
// ==========================================

// 4. Criação da lista de produtos
const listaProdutos = [];

// 5. Organização do projeto em funções
// 6. Função para validar produto
function validarProduto(descricao, quantidade, valor) {
    // 7. Validação da descrição
    if (typeof descricao !== 'string' || descricao.trim().length === 0) {
        throw new Error("Descrição inválida: o nome do produto é obrigatório.");
    }
    // 8. Validação da quantidade
    if (typeof quantidade !== 'number' || quantidade < 0) {
        throw new Error("Quantidade inválida: deve ser um número maior ou igual a zero.");
    }
    // 9. Validação do valor
    if (typeof valor !== 'number' || valor <= 0) {
        throw new Error("Valor inválido: deve ser um número maior que zero.");
    }
    return true;
}

// 10. Função para cadastrar produto
function cadastrarProduto(descricao, quantidade, valor) {
    try {
        validarProduto(descricao, quantidade, valor);

        // 11. Criação do objeto produto
        // 12. Geração automática do código do produto (proximoId++)
        const novoProduto = {
            id: proximoId++, 
            descricao: descricao.trim(),
            quantidade: quantidade,
            valor: valor
        };

        // 13. Adição de produtos ao array
        listaProdutos.push(novoProduto);
        console.log(`✅ Produto "${descricao}" cadastrado! ID: ${novoProduto.id}`);
    } catch (erro) {
        // 18. Tratamento de erro (usado aqui para capturar falhas no cadastro)
        console.error(`❌ Erro no cadastro: ${erro.message}`);
    }
}

// Variável auxiliar necessária para o item 12 (id automático)
let proximoId = 1; 

// 14. Função para listar produtos
function listarProdutos() {
    if (listaProdutos.length === 0) {
        console.log("📦 O estoque está vazio.");
        return;
    }
    console.log("\n--- 📋 LISTA DE PRODUTOS ---");
    listaProdutos.forEach(p => {
        console.log(`ID: ${p.id} | ${p.descricao} | Qtd: ${p.quantidade} | Preço: R$ ${p.valor.toFixed(2)}`);
    });
}

// 15. Testando o cadastro e a listagem (Primeira carga de testes)
console.log("--- 🚀 15. TESTANDO CADASTRO E LISTAGEM ---");
cadastrarProduto("Notebook Dell", 10, 4500.00);
cadastrarProduto("Mouse Sem Fio", 50, 89.90);
listarProdutos();

// 16. Função para atualizar o valor do produto
function atualizarValorProduto(id, novoValor) {
    if (typeof novoValor !== 'number' || novoValor <= 0) {
        console.error("❌ Erro: Novo valor inserido é inválido.");
        return;
    }
    
    const produto = buscarProdutoPorId(id);
    if (produto) {
        produto.valor = novoValor; // Altera substituindo o valor antigo
        console.log(`💰 Valor do produto ID ${id} alterado para R$ ${novoValor.toFixed(2)}`);
    }
}

// 17. Busca de produto com find
function buscarProdutoPorId(id) {
    const produto = listaProdutos.find(p => p.id === id);
    // 18. Tratamento de produto não encontrado
    if (!produto) {
        console.log(`⚠️ Produto com ID ${id} não foi encontrado.`);
        return null;
    }
    return produto;
}

// 19. Função para atualizar a quantidade do produto
function atualizarQuantidadeProduto(id, quantidadeParaAdicionar) {
    if (typeof quantidadeParaAdicionar !== 'number' || quantidadeParaAdicionar <= 0) {
        console.error("❌ Erro: Quantidade para adicionar deve ser maior que zero.");
        return;
    }

    const produto = buscarProdutoPorId(id);
    if (produto) {
        // 20. Diferença entre alterar valor (substituição =) e somar quantidade (acumulador +=)
        produto.quantidade += quantidadeParaAdicionar; 
        console.log(`📦 Estoque atualizado! ID ${id} recebeu +${quantidadeParaAdicionar} unidades.`);
    }
}

// 21. Possibilidades de melhoria (Implementando uma função de exclusão)
function deletarProduto(id) {
    const index = listaProdutos.findIndex(p => p.id === id);
    if (index !== -1) {
        const removido = listaProdutos.splice(index, 1);
        console.log(`🗑️ Melhoria: Produto "${removido[0].descricao}" excluído com sucesso.`);
    } else {
        console.log(`⚠️ Melhoria: Não foi possível deletar o ID ${id}.`);
    }
}

// 22. Conclusão (Execução final dos testes para validar o fluxo de ponta a ponta)
console.log("\n--- 🏁 22. CONCLUSÃO (TESTES DOS ITENS 16 ATÉ 21) ---");

// Testando item 16 e 17
atualizarValorProduto(2, 79.90); 

// Testando item 19 e 20
atualizarQuantidadeProduto(1, 5); 

// Testando erro do item 18
buscarProdutoPorId(99); 

// Testando melhoria do item 21
deletarProduto(2); 

// Listagem final mostrando o resultado do CRUD completo
listarProdutos();
