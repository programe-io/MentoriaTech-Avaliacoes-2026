// ==========================================
// 3 e 4. Estrutura dos dados e Lista de Produtos
// ==========================================
// O array que vai armazenar todos os nossos objetos de produto
const listaProdutos = [];

// ==========================================
// 6, 7, 8 e 9. Funções para Validar Produto
// ==========================================
function validarDescricao(descricao) {
    // Verifica se a descrição existe e se não está vazia (removendo espaços em branco)
    return typeof descricao === 'string' && descricao.trim().length > 0;
}

function validarQuantidade(quantidade) {
    // Verifica se é um número, se é inteiro e se é maior ou igual a zero
    return typeof quantidade === 'number' && Number.isInteger(quantidade) && quantidade >= 0;
}

function validarValor(valor) {
    // Verifica se é um número e se é maior que zero
    return typeof valor === 'number' && valor > 0;
}

function validarProduto(descricao, quantidade, valor) {
    if (!validarDescricao(descricao)) {
        console.error("Erro: Descrição inválida. Não pode ser vazia.");
        return false;
    }
    if (!validarQuantidade(quantidade)) {
        console.error("Erro: Quantidade inválida. Deve ser um número inteiro maior ou igual a zero.");
        return false;
    }
    if (!validarValor(valor)) {
        console.error("Erro: Valor inválido. Deve ser maior que zero.");
        return false;
    }
    return true;
}

// ==========================================
// 12. Geração automática do código do produto
// ==========================================
function gerarCodigoProduto() {
    // Gera um ID simples baseado no tamanho atual da lista + 1
    return listaProdutos.length + 1;
}

// ==========================================
// 10, 11 e 13. Função para Cadastrar Produto
// ==========================================
function cadastrarProduto(descricao, quantidade, valor) {
    // Valida os dados antes de prosseguir
    if (!validarProduto(descricao, quantidade, valor)) {
        return null; 
    }

    // 11. Criação do objeto produto
    const novoProduto = {
        codigo: gerarCodigoProduto(),
        descricao: descricao.trim(),
        quantidade: quantidade,
        valor: valor
    };

    // 13. Adição de produtos ao array
    listaProdutos.push(novoProduto);
    console.log(`Sucesso: Produto "${novoProduto.descricao}" cadastrado com ID ${novoProduto.codigo}.`);
    return novoProduto;
}

// ==========================================
// 14. Função para Listar Produtos
// ==========================================
function listarProdutos() {
    if (listaProdutos.length === 0) {
        console.log("A lista de produtos está vazia.");
        return;
    }
    
    console.log("--- LISTA DE PRODUTOS ---");
    listaProdutos.forEach(prod => {
        console.log(`ID: ${prod.codigo} | ${prod.descricao} | Qtd: ${prod.quantidade} | Preço: R$ ${prod.valor.toFixed(2)}`);
    });
}

// ==========================================
// 17 e 18. Busca de produto com find e Tratamento
// ==========================================
function buscarProdutoPorId(id) {
    // Procura o produto que possui o código correspondente
    const produtoEncontrado = listaProdutos.find(prod => prod.codigo === id);

    // 18. Tratamento de produto não encontrado
    if (!produtoEncontrado) {
        console.warn(`Aviso: Produto com ID ${id} não foi encontrado.`);
        return null;
    }

    return produtoEncontrado;
}

// ==========================================
// 16. Função para atualizar o valor do produto
// ==========================================
function atualizarValorProduto(id, novoValor) {
    const produto = buscarProdutoPorId(id);
    
    if (produto) {
        if (validarValor(novoValor)) {
            produto.valor = novoValor;
            console.log(`Sucesso: Preço do produto ID ${id} atualizado para R$ ${novoValor.toFixed(2)}.`);
        } else {
            console.error("Erro: Novo valor inválido.");
        }
    }
}

// ==========================================
// 19 e 20. Atualizar quantidade (Somar quantidade)
// ==========================================
// Diferença: Alterar o valor substitui o preço antigo. 
// Somar a quantidade adiciona novos itens ao estoque atual (estoque antigo + entrada).
function somarQuantidadeProduto(id, quantidadeParaAdicionar) {
    const produto = buscarProdutoPorId(id);
    
    if (produto) {
        if (typeof quantidadeParaAdicionar === 'number' && Number.isInteger(quantidadeParaAdicionar) && quantidadeParaAdicionar > 0) {
            produto.quantidade += quantidadeParaAdicionar;
            console.log(`Sucesso: Foram adicionadas ${quantidadeParaAdicionar} unidades ao produto ID ${id}. Nova quantidade: ${produto.quantidade}.`);
        } else {
            console.error("Erro: Quantidade a ser adicionada deve ser um número inteiro positivo.");
        }
    }
}

// ==========================================
// 15. Testando o cadastro e a listagem (Console)
// ==========================================
console.log("--- INICIANDO TESTES ---");

// Cadastros válidos
cadastrarProduto("Teclado Mecânico", 10, 250.00);
cadastrarProduto("Mouse Gamer", 15, 120.50);
cadastrarProduto("Monitor 24' IPS", 5, 899.90);

// Tentativa de cadastro inválido (vai falhar na validação)
cadastrarProduto("", 5, 50); // Descrição vazia

// Listando após cadastros
listarProdutos();

// Testando atualizações
atualizarValorProduto(1, 230.00); // Muda o valor de 250 para 230
somarQuantidadeProduto(2, 5);     // Soma 5 unidades ao mouse (15 + 5 = 20)

// Buscando um produto inexistente para testar o tratamento de erro
buscarProdutoPorId(99);

// Listando o resultado final para conferir as alterações
listarProdutos();
