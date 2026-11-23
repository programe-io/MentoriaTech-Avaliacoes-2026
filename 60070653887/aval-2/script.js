
let produtos = [];

function validarProduto(descricao, quantidade, valor) {
    if (descricao.length < 5) {
        throw new Error("Erro: A descrição deve ter no mínimo 5 caracteres.");
    }
   
    if (quantidade < 0) {
        throw new Error("Erro: A quantidade não pode ser menor do que zero.");
    }
    if (valor < 0) {
        throw new Error("Erro: O valor deve ser maior ou igual a zero.");
    }
}

function cadastrarProduto(descricao, quantidade, valor) {
   
    validarProduto(descricao, quantidade, valor);

    const novoProduto = {
        codigo: produtos.length + 1,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };
    produtos.push(novoProduto);
    console.log(`Produto "${descricao}" cadastrado com sucesso! Código: ${novoProduto.codigo}`);
}

function listarProdutos() {
    return produtos;
}
function alterarValor(codigo, novoValor) {
    if (novoValor < 0) {
        throw new Error("Erro: O novo valor não pode ser menor do que zero.");
    }

    
    const produto = produtos.find(prod => prod.codigo === codigo);

    if (produto) {
        produto.valor = novoValor; 
        console.log(`Valor do produto de código ${codigo} atualizado para R$ ${novoValor}.`);
    } else {
        throw new Error("Erro: Produto não encontrado.");
    }
}


function atualizarQuantidade(codigo, novaQuantidade) {
    if (novaQuantidade < 0) {
        throw new Error("Erro: A nova quantidade não pode ser menor do que zero.");
    }

    const produto = produtos.find(prod => prod.codigo === codigo);

    if (produto) {
    
        produto.quantidade = produto.quantidade + novaQuantidade; 
        console.log(`Quantidade do produto ${codigo} atualizada. Nova quantidade: ${produto.quantidade}.`);
    } else {
        throw new Error("Erro: Produto não encontrado.");
    }
}

console.log("--- Iniciando o Sistema de Estoque ---");
cadastrarProduto("Cadeira gamer", 12, 699.00);
cadastrarProduto("Mouse da Logitech", 38, 99.00);

console.log("Estoque Inicial:", listarProdutos());

alterarValor(2, 97.00);

atualizarQuantidade(1, 3);

console.log("Estoque Atualizado:", listarProdutos());