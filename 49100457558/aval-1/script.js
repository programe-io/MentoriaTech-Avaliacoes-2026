// 1. Estrutura de dados: Um array para armazenar nossos objetos de produtos
const estoque = [];

// ==========================================
// FUNÇÕES DO SISTEMA
// ==========================================

/**
 * 🟢 Cadastrar um novo produto
 * Cada produto precisa de: código, descrição, quantidade e valor.
 */
function cadastrarProduto(codigo, descricao, quantidade, valor) {
    // Validação básica para evitar códigos duplicados
    const produtoExiste = estoque.find(p => p.codigo === codigo);
    if (produtoExiste) {
        console.log(`❌ Erro: Já existe um produto cadastrado com o código ${codigo}.`);
        return;
    }

    const novoProduto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: Number(quantidade),
        valor: Number(valor)
    };

    estoque.push(novoProduto);
    console.log(`✅ Produto "${descricao}" cadastrado com sucesso!`);
}

/**
 * 🔵 Listar os produtos cadastrados
 * Mostra todos os produtos de forma organizada em formato de tabela.
 */
function listarProdutos() {
    if (estoque.length === 0) {
        console.log("⚠️ O estoque está vazio.");
        return;
    }
    
    console.log("\n📋 --- PRODUTOS EM ESTOQUE ---");
    console.table(estoque); // Renderiza uma tabela visual incrível no console
}

/**
 * 🟡 Alterar o valor de um produto
 * Busca o produto pelo código e atualiza seu preço.
 */
function alterarValor(codigo, novoValor) {
    const produto = estoque.find(p => p.codigo === codigo);
    
    if (!produto) {
        console.log(`❌ Erro: Produto com o código ${codigo} não foi encontrado.`);
        return;
    }

    const valorAntigo = produto.valor;
    produto.valor = Number(novoValor);
    console.log(`💲 Valor do produto "${produto.descricao}" atualizado: de R$ ${valorAntigo.toFixed(2)} para R$ ${produto.valor.toFixed(2)}`);
}

/**
 * 🟠 Alterar a quantidade de um produto
 * Busca o produto pelo código e atualiza a quantidade em estoque.
 */
function alterarQuantidade(codigo, novaQuantidade) {
    const produto = estoque.find(p => p.codigo === codigo);
    
    if (!produto) {
        console.log(`❌ Erro: Produto com o código ${codigo} não foi encontrado.`);
        return;
    }

    const quantidadeAntiga = produto.quantidade;
    produto.quantidade = Number(novaQuantidade);
    console.log(`📦 Quantidade de "${produto.descricao}" atualizada: de ${quantidadeAntiga} para ${produto.quantidade} unidades.`);
}

// ==========================================
// SIMULAÇÃO DO USO DO SISTEMA (TESTE)
// ==========================================

console.log("🚀 Iniciando Simulação do Sistema de Estoque...\n");

// 1. Cadastrando produtos
cadastrarProduto(101, "Teclado Mecânico", 15, 250.00);
cadastrarProduto(102, "Mouse Gamer", 30, 120.00);
cadastrarProduto(103, "Monitor 24 polegadas", 5, 899.90);

// 2. Listando para ver como ficou
listarProdutos();

// 3. Alterando o valor de um produto (Mouse Gamer foi para 135.00)
alterarValor(102, 135.00);

// 4. Alterando a quantidade de um produto (Chegaram mais Monitores)
alterarQuantidade(103, 12);

// 5. Listando novamente para confirmar as alterações finais
listarProdutos();