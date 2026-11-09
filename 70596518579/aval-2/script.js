// 1. Estrutura de dados (Array para armazenar os produtos)
const estoque = [];

/**
 * Função para cadastrar um novo produto.
 * @param {string} codigo 
 * @param {string} descricao 
 * @param {number} quantidade 
 * @param {number} valor 
 */
function cadastrarProduto(codigo, descricao, quantidade, valor) {
    // Validação de entrada básica
    if (!codigo || !descricao || quantidade < 0 || valor < 0) {
        console.log('❌ Erro: Dados inválidos. Preencha todos os campos corretamente.');
        return false;
    }

    // Verifica se já existe um produto com o mesmo código
    const produtoExiste = estoque.some(produto => produto.codigo === codigo);
    if (produtoExiste) {
        console.log(`❌ Erro: Já existe um produto cadastrado com o código "${codigo}".`);
        return false;
    }

    // Cria o objeto produto e adiciona ao estoque
    const novoProduto = {
        codigo: codigo.trim(),
        descricao: descricao.trim(),
        quantidade: Number(quantidade),
        valor: Number(valor)
    };

    estoque.push(novoProduto);
    console.log(`✓ Produto "${descricao}" cadastrado com sucesso!`);
    return true;
}

/**
 * Função para listar todos os produtos cadastrados.
 */
function listarProdutos() {
    console.log('\n--- LISTA DE PRODUTOS NO ESTOQUE ---');
    
    if (estoque.length === 0) {
        console.log('Nenhum produto cadastrado no momento.');
        return;
    }

    // Retorna uma cópia formatada com subtotal calculado
    const listaFormatada = estoque.map(p => ({
        Código: p.codigo,
        Descrição: p.descricao,
        Quantidade: p.quantidade,
        'Valor Unitário': `R$ ${p.valor.toFixed(2)}`,
        'Total em Estoque': `R$ ${(p.quantidade * p.valor).toFixed(2)}`
    }));

    console.table(listaFormatada);
    return listaFormatada;
}

/**
 * Função para alterar o valor de um produto existente.
 * @param {string} codigo 
 * @param {number} novoValor 
 */
function alterarValor(codigo, novoValor) {
    const produto = estoque.find(p => p.codigo === codigo);

    if (!produto) {
        console.log(`❌ Erro: Produto com código "${codigo}" não encontrado.`);
        return false;
    }

    if (isNaN(novoValor) || novoValor < 0) {
        console.log('❌ Erro: Insira um valor numérico válido maior ou igual a zero.');
        return false;
    }

    produto.valor = Number(novoValor);
    console.log(`✓ Valor do produto "${produto.descricao}" atualizado para R$ ${produto.valor.toFixed(2)}.`);
    return true;
}

/**
 * Função para alterar a quantidade de um produto existente.
 * @param {string} codigo 
 * @param {number} novaQuantidade 
 */
function alterarQuantidade(codigo, novaQuantidade) {
    const produto = estoque.find(p => p.codigo === codigo);

    if (!produto) {
        console.log(`❌ Erro: Produto com código "${codigo}" não encontrado.`);
        return false;
    }

    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 0) {
        console.log('❌ Erro: A quantidade deve ser um número inteiro válido (>= 0).');
        return false;
    }

    produto.quantidade = Number(novaQuantidade);
    console.log(`✓ Quantidade do produto "${produto.descricao}" atualizada para ${produto.quantidade} unidades.`);
    return true;
}

// ==========================================
// DEMONSTRAÇÃO DE USO / TESTES DO ALGORITMO
// ==========================================

console.log('--- 1. Cadastrando produtos ---');
cadastrarProduto('P001', 'Teclado Mecânico', 15, 250.00);
cadastrarProduto('P002', 'Mouse Optico', 30, 80.50);
cadastrarProduto('P003', 'Monitor 24"', 8, 899.90);

console.log('\n--- 2. Listando produtos cadastrados ---');
listarProdutos();

console.log('\n--- 3. Alterando valor de um produto ---');
alterarValor('P002', 75.00); // Altera valor do Mouse

console.log('\n--- 4. Alterando quantidade de um produto ---');
alterarQuantidade('P001', 20); // Altera quantidade do Teclado

console.log('\n--- 5. Listando estoque atualizado ---');
listarProdutos();