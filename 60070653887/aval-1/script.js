
let produtos = [];


function validarProduto(descricao, quantidade, valor) {
    if (descricao.length < 5) {
        throw new Error("Erro: A descrição deve ter no mínimo 5 caracteres.");
    }
    
    if (quantidade < 0) {
        throw new Error("Erro: A quantidade não pode ser negativa.");
    }
    
    if (valor < 0) {
        throw new Error("Erro: O valor não pode ser negativo.");
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
        throw new Error("Erro: O novo valor não pode ser negativo.");
    }

  
    const produto = produtos.find(p => p.codigo === codigo);

    if (produto) {
        produto.valor = novoValor; 
        console.log(`Valor do produto de código ${codigo} atualizado para R$ ${novoValor}.`);
    } else {
        throw new Error("Erro: Produto não encontrado.");
    }
}


function atualizarQuantidade(codigo, novaQuantidade) {
    if (novaQuantidade < 0) {
        throw new Error("Erro: A nova quantidade não pode ser negativa.");
    }

    const produto = produtos.find(p => p.codigo === codigo);

    if (produto) {
       
        produto.quantidade += novaQuantidade; 
        console.log(`Quantidade do produto de código ${codigo} atualizada. Nova quantidade: ${produto.quantidade}.`);
    } else {
        throw new Error("Erro: Produto não encontrado.");
    }
}

console.log("--- Iniciando Testes do Sistema ---");

cadastrarProduto("Cadeira Gamer", 12, 699.00);
cadastrarProduto("Mouse Logitech", 38, 99.00);
console.log("Estoque atual:", listarProdutos());


alterarValor(2, 97.00);

atualizarQuantidade(1, 3);


console.log("Estoque atualizado:", listarProdutos());

