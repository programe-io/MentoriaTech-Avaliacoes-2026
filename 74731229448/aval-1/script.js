// Sistema de Controle de Estoque

// Array que servirá como banco de dados para armazenar os produtos
const estoque = [];

// 1. Função para Cadastrar um novo produto
function cadastrarProduto(codigo, descricao, quantidade, valor) {
    // Verifica se o código já existe para evitar duplicidades
    const produtoExiste = estoque.find(p => p.codigo === codigo);
    if (produtoExiste) {
        console.log(`Erro: Já existe um produto cadastrado com o código ${codigo}.`);
        return;
    }

    // Cria o objeto do produto e adiciona ao estoque
    const novoProduto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: Number(quantidade),
        valor: Number(valor)
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

    console.log("\n=== PRODUTOS EM ESTOQUE ===");
    estoque.forEach(produto => {
        console.log(`Cód: ${produto.codigo} | Descrição: ${produto.descricao} | Qtd: ${produto.quantidade} | Preço: R$ ${produto.valor.toFixed(2)}`);
    });
    console.log("===========================\n");
}

// 3. Função para Alterar o valor de um produto
function alterarValor(codigo, novoValor) {
    const produto = estoque.find(p => p.codigo === codigo);

    if (!produto) {
        console.log(`Erro: Produto com o código ${codigo} não foi encontrado.`);
        return;
    }

    produto.valor = Number(novoValor);
    console.log(`Preço do produto "${produto.descricao}" atualizado para R$ ${produto.valor.toFixed(2)}.`);
}

// 4. Função para Alterar a quantidade de um produto
function alterarQuantidade(codigo, novaQuantidade) {
    const produto = estoque.find(p => p.codigo === codigo);

    if (!produto) {
        console.log(`Erro: Produto com o código ${codigo} não foi encontrado.`);
        return;
    }

    produto.quantidade = Number(novaQuantidade);
    console.log(`Quantidade do produto "${produto.descricao}" atualizada para ${produto.quantidade} unidades.`);
}


// --- EXEMPLO PRÁTICO DE USO ---

// Cadastrando produtos
cadastrarProduto(101, "Camiseta Preta", 50, 29.90);
cadastrarProduto(102, "Calça Jeans", 30, 89.90);
cadastrarProduto(103, "Tênis Esportivo", 15, 199.99);

// Listando o estoque inicial
listarProdutos();

// Alterando o valor de um produto (Camiseta Preta)
alterarValor(101, 34.90);

// Alterando a quantidade de um produto (Calça Jeans)
alterarQuantidade(102, 25);

// Listando novamente para ver as alterações aplicadas
listarProdutos();
