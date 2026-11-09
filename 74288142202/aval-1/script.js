// Array que funcionará como o banco de dados do nosso estoque
const estoque = [];

/**
 * 1. CADASTRAR UM NOVO PRODUTO
 * Verifica se o código já existe para evitar duplicidade.
 */
function cadastrarProduto(codigo, descricao, quantidade, valor) {
    // Validação básica para garantir que o código é único
    const produtoExiste = estoque.find(p => p.codigo === codigo);
    if (produtoExiste) {
        console.log(`❌ Erro: Já existe um produto cadastrado com o código \${codigo\}.`);
        return false;
    \}

    const novoProduto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: parseInt(quantidade),
        valor: parseFloat(valor)
    \};
$0estoque.push(novoProduto);
    console.log(`✅ Produto "\${descricao\}" cadastrado com sucesso!`);
    return true;
\}

/**
 * 2. LISTAR OS PRODUTOS CADASTRADOS
 * Exibe os produtos em formato de tabela no console se houver itens.
 */
function listarProdutos() {
    if (estoque.length === 0) {
        console.log("\\n📭 O estoque está completamente vazio.");
        return;
    \}

    console.log("\\n📦 --- LISTA DE PRODUTOS NO ESTOQUE ---");
    // console.table exibe os objetos de forma organizada e escaneável
    console.table(estoque);
\}

/**
 * 3. ALTERAR O VALOR DE UM PRODUTO
 * Localiza o produto pelo código e atualiza o preço.
 */
function alterarValorProduto(codigo, novoValor) {
    const produto = estoque.find(p => p.codigo === codigo);

    if (!produto) {
        console.log(`❌ Erro: Produto com o código \${codigo\} não foi encontrado.`);
        return false;
    \}

    const valorAntigo = produto.valor;
    produto.valor = parseFloat(novoValor);
    console.log(`💰 Valor do produto "\${produto.descricao\}" alterado de R\$ \${valorAntigo.toFixed(2)\} para R\$ \${produto.valor.toFixed(2)\}.`);
    return true;
\}

/**
 * 4. ALTERAR A QUANTIDADE DE UM PRODUTO
 * Localiza o produto pelo código e atualiza o saldo em estoque.
 */
function alterarQuantidadeProduto(codigo, novaQuantidade) {
    const produto = estoque.find(p => p.codigo === codigo);
$0