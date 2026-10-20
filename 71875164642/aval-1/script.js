/* ==========================================================================
   3. Estrutura dos dados do produto
   ========================================================================== */
// Array global que funcionará como nosso banco de dados (Tópico 4 e 13)
let listaDeProdutos = [];

// Contador para simular o ID autoincrementável (Tópico 12)
let proximoId = 1;

/* ==========================================================================
   6. Função para validar produto
   ========================================================================== */
function validarProduto(descricao, quantidade, valor) {
    // 7. Validação da descrição (não pode ser vazia ou apenas espaços)
    if (!descricao || descricao.trim() === "") {
        console.error("Erro: A descrição do produto é obrigatória.");
        return false;
    }

    // 8. Validação da quantidade (deve ser um número maior que zero)
    if (typeof quantidade !== "number" || isNaN(quantidade) || quantidade <= 0) {
        console.error("Erro: A quantidade deve ser um número maior que zero.");
        return false;
    }

    // 9. Validação do valor (deve ser um número maior que zero)
    if (typeof valor !== "number" || isNaN(valor) || valor <= 0) {
        console.error("Erro: O valor deve ser um número maior que zero.");
        return false;
    }

    return true; // Produto válido
}

/* ==========================================================================
   10. Função para cadastrar produto
   ========================================================================== */
function cadastrarProduto(descricao, quantidade, valor) {
    // Executa a validação antes de avançar
    if (!validarProduto(descricao, quantidade, valor)) {
        return null; 
    }

    // 11. Criação do objeto produto & 12. Geração automática do código
    const novoProduto = {
        codigo: proximoId++, // Atribui o ID atual e incrementa para o próximo
        descricao: descricao.trim(),
        quantidade: quantidade,
        valor: valor
    };

    // 13. Adição de produtos ao array
    listaDeProdutos.push(novoProduto);
    return novoProduto;
}

/* ==========================================================================
   14. Função para listar produtos
   ========================================================================== */
function listarProdutos() {
    if (listaDeProdutos.length === 0) {
        console.log("A lista de produtos está vazia.");
        return [];
    }

    console.log("\n--- LISTA DE PRODUTOS CADASTRADOS ---");
    listaDeProdutos.forEach(prod => {
        console.log(`Código: ${prod.codigo} | ${prod.descricao} | Qtd: ${prod.quantidade} | Preço: R$ ${prod.valor.toFixed(2)}`);
    });
    return listaDeProdutos;
}

/* ==========================================================================
   16. Função para atualizar o valor do produto (e Tópico 17 com find)
   ========================================================================== */
function atualizarValorProduto(codigo, novoValor) {
    if (typeof novoValor !== "number" || isNaN(novoValor) || novoValor <= 0) {
        console.error("Erro: Novo valor inválido.");
        return false;
    }

    // 17. Busca de produto com find
    const produto = listaDeProdutos.find(prod => prod.codigo === codigo);

    // 18. Tratamento de produto não encontrado
    if (!produto) {
        console.warn(`Aviso: Produto com código ${codigo} não encontrado.`);
        return false;
    }

    produto.valor = novoValor;
    console.log(`Sucesso: Valor do produto ${produto.descricao} atualizado para R$ ${novoValor.toFixed(2)}`);
    return true;
}

/* ==========================================================================
   19. Função para atualizar a quantidade do produto
   ========================================================================== */
// 20. Diferença entre alterar valor e somar quantidade:
// Alterar valor define um preço fixo novo. Somar quantidade incrementa o estoque atual.
function somarQuantidadeProduto(codigo, quantidadeParaSomar) {
    if (typeof quantidadeParaSomar !== "number" || isNaN(quantidadeParaSomar) || quantidadeParaSomar <= 0) {
        console.error("Erro: Quantidade para somar inválida.");
        return false;
    }

    const produto = listaDeProdutos.find(prod => prod.codigo === codigo);

    if (!produto) {
        console.warn(`Aviso: Produto com código ${codigo} não encontrado.`);
        return false;
    }

    produto.quantidade += quantidadeParaSomar; // Soma ao estoque existente
    console.log(`Sucesso: Adicionadas ${quantidadeParaSomar} unidades ao produto ${produto.descricao}. Total atual: ${produto.quantidade}`);
    return true;
}

/* ==========================================================================
   15. Testando o cadastro e a listagem (Simulação)
   ========================================================================== */
console.log("Iniciando testes do sistema...");

// Tentativas de cadastro com dados inválidos (Validações agindo)
cadastrarProduto("", 10, 5.0);        // Deve falhar por descrição vazia
cadastrarProduto("Teclado", -2, 150); // Deve falhar por quantidade negativa

// Cadastros válidos
cadastrarProduto("Notebook Dell", 5, 3500.00);
cadastrarProduto("Mouse Gamer", 15, 120.50);
cadastrarProduto("Monitor 24'", 8, 899.90);

// Exibindo a lista inicial
listarProdutos();

// Atualizando valor (Tópicos 16, 17)
atualizarValorProduto(2, 110.00); // Muda o preço do mouse para 110.00

// Incrementando estoque (Tópicos 19, 20)
somarQuantidadeProduto(1, 3); // Adiciona 3 notebooks ao estoque (total deve virar 8)

// Testando erro de busca (Tópico 18)
atualizarValorProduto(99, 50.00); // Código inexistente

// Exibindo a lista final atualizada
listarProdutos();
