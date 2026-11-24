
// SISTEMA DE ESTOQUE - JAVASCRIPT

let estoque = [];

// Cadastrar produto
function cadastrarProduto(nome, preco, quantidade) {
    let produto = {
        id: estoque.length + 1,
        nome: nome,
        preco: preco,
        quantidade: quantidade
    };

    estoque.push(produto);
    console.log("Produto cadastrado com sucesso!");
}

// Listar produtos
function listarProdutos() {
    console.log("=== ESTOQUE ===");

    estoque.forEach(produto => {
        console.log(
            `ID: ${produto.id} | 
            Nome: ${produto.nome} | 
            Preço: R$ ${produto.preco} | 
            Quantidade: ${produto.quantidade}`
        );
    });
}

// Buscar produto
function buscarProduto(id) {
    let produto = estoque.find(item => item.id === id);

    if (produto) {
        console.log(produto);
    } else {
        console.log("Produto não encontrado!");
    }
}

// Atualizar quantidade
function atualizarEstoque(id, novaQuantidade) {
    let produto = estoque.find(item => item.id === id);

    if (produto) {
        produto.quantidade = novaQuantidade;
        console.log("Estoque atualizado!");
    } else {
        console.log("Produto não encontrado!");
    }
}

// Remover produto
function removerProduto(id) {
    estoque = estoque.filter(item => item.id !== id);
    console.log("Produto removido!");
}

// Calcular valor total
function calcularValorEstoque() {
    let total = estoque.reduce(
        (soma, produto) =>
            soma + produto.preco * produto.quantidade, 0
    );

    console.log("Valor total do estoque: R$ " + total.toFixed(2));
}

// EXEMPLOS DE USO

cadastrarProduto("Camiseta", 50, 10);
cadastrarProduto("Calça", 90, 5);
cadastrarProduto("Tênis", 150, 3);

listarProdutos();

buscarProduto(1);

atualizarEstoque(2, 8);

removerProduto(3);

calcularValorEstoque();
