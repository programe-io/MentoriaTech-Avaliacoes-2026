// ==========================================
// 1. DADOS DE EXEMPLO (Lista de Objetos)
// ==========================================
const produtos = [
    { id: 1, nome: "Teclado Mecânico", preco: 250, categoria: "Periféricos", estoque: 15 },
    { id: 2, nome: "Mouse Gamer", preco: 120, categoria: "Periféricos", estoque: 8 },
    { id: 3, nome: "Monitor 144Hz", preco: 1100, categoria: "Monitores", estoque: 3 },
    { id: 4, nome: "Cadeira Gamer", preco: 850, categoria: "Móveis", estoque: 0 },
    { id: 5, nome: "Headset 7.1", preco: 300, categoria: "Áudio", estoque: 5 }
];

// ==========================================
// 2. FUNÇÕES DE PROCESSAMENTO DE DADOS
// ==========================================

// Filtrar produtos em estoque
function obterProdutosDisponiveis(lista) {
    return lista.filter(produto => produto.estoque > 0);
}

// Calcular o valor total em estoque
function calcularValorTotalEstoque(lista) {
    return lista.reduce((total, produto) => {
        return total + (produto.preco * produto.estoque);
    }, 0);
}

// Buscar produto por nome
const buscarProduto = (lista, termo) => {
    return lista.find(p => p.nome.toLowerCase().includes(termo.toLowerCase()));
};

// SIMULAÇÃO DE PROCESSO ASSÍNCRONO (Como buscar dados em uma API)
async function processarPedido(idProduto, quantidade) {
    console.log("\n⏳ Processando pedido...");

    // Simula um tempo de espera de 1.5 segundos
    await new Promise(resolve => setTimeout(resolve, 1500));

    const produto = produtos.find(p => p.id === idProduto);

    if (!produto) {
        return "❌ Erro: Produto não encontrado!";
    }

    if (produto.estoque < quantidade) {
        return `❌ Erro: Estoque insuficiente de "${produto.nome}". Disponível: ${produto.estoque}`;
    }

    produto.estoque -= quantidade;
    const totalPagar = produto.preco * quantidade;

    return `✅ Pedido confirmado! ${quantidade}x "${produto.nome}" | Total: R$ ${totalPagar.toFixed(2)}`;
}

// ==========================================
// 3. EXECUÇÃO / TESTES
// ==========================================

console.log("=== RELATÓRIO DA LOJA ===");

// 1. Produtos disponíveis
const emEstoque = obterProdutosDisponiveis(produtos);
console.log("\n📦 Produtos em estoque:", emEstoque.map(p => p.nome));

// 2. Valor total dos itens guardados
const valorTotal = calcularValorTotalEstoque(produtos);
console.log(`\n💰 Valor total do estoque atual: R$ ${valorTotal.toLocaleString('pt-BR')}`);

// 3. Busca de produto
const busca = buscarProduto(produtos, "mouse");
console.log("\n🔍 Resultado da busca por 'mouse':", busca);

// 4. Testando a função assíncrona (com async/await)
(async () => {
    const resultado1 = await processarPedido(2, 2); // Comprar 2 Mouses
    console.log(resultado1);

    const resultado2 = await processarPedido(4, 1); // Tentar comprar Cadeira sem estoque
    console.log(resultado2);
})();