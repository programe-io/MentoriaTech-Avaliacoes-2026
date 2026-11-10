// Array que servirá como banco de dados do sistema de estoque
const estoque = [];

// 1. Função para Cadastrar um novo produto
function cadastrarProduto(codigo, descricao, quantidade, valor) {
    // Verifica se já existe um produto com o mesmo código
    const produtoExiste = estoque.find(p => p.codigo === codigo);
    if (produtoExiste) {
        console.log(`Erro: Já existe um produto com o código ${codigo}.`);
        return;
    }

    const novoProduto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: parseInt(quantidade),
        valor: parseFloat(valor)
    };

    estoque.push(novoProduto);
    console.log(`Produto "${descricao}" cadastrado com sucesso!`);
}

// 2. Função para Listar os produtos cadastrados
function listarProdutos() {
    if (estoque.length === 0) {
        console.log("O estoque está vazio.");
        return;
    }

    console.log("\n--- LISTA DE PRODUTOS NO ESTOQUE ---");
    estoque.forEach(produto => {
        console.log(`Código: ${produto.codigo} | Descrição: ${produto.descricao} | Qtd: ${produto.quantidade} | Valor: R$ ${produto.valor.toFixed(2)}`);
    });
    console.log("------------------------------------\n");
}

// 3. Função para Alterar o valor (preço) de um produto
function alterarValor(codigo, novoValor) {
    const produto = estoque.find(p => p.codigo === codigo);
    
    if (!produto) {
        console.log(`Erro: Produto com o código ${codigo} não foi encontrado.`);
        return;
    }

    produto.valor = parseFloat(novoValor);
    console.log(`Valor do produto "${produto.descricao}" atualizado para R$ ${produto.valor.toFixed(2)}.`);
}

// 4. Função para Alterar a quantidade de um produto
function alterarQuantidade(codigo, novaQuantidade) {
    const produto = estoque.find(p => p.codigo === codigo);

    if (!produto) {
        console.log(`Erro: Produto com o código ${codigo} não foi encontrado.`);
        return;
    }

    produto.quantidade = parseInt(novaQuantidade);
    console.log(`Quantidade do produto "${produto.descricao}" atualizada para ${produto.quantidade} unidades.`);
}

// ==========================================
// EXEMPLO PRÁTICO DE USO DAS FUNÇÕES:
// ==========================================

// Cadastrando produtos
cadastrarProduto(101, "Teclado Mecânico", 15, 250.00);
cadastrarProduto(102, "Mouse Gamer", 30, 120.50);
cadastrarProduto(103, "Monitor 24 polegadas", 5, 899.90);

// Listando para ver o estado inicial
listarProdutos();

// Alterando o valor do Mouse Gamer (código 102)
alterarValor(102, 135.00);

// Alterando a quantidade do Monitor (código 103)
alterarQuantidade(103, 8);

// Listando novamente para verificar as atualizações
listarProdutos();
