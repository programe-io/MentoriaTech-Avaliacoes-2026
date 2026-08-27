let produtos = [];

function validarProduto(descricao, quantidade, valor){ 
    if (descricao.length < 5){ 
        throw new Error("Descrição deve ter no mínimo cinco caracteres"); 
    } 
    if(quantidade < 1){ 
        throw new Error("Quantidade deve ser maior que zero"); 
    } 
    if(valor < 0){ 
        throw new Error("Valor deve ser maior igual a zero"); 
    } 
}

function cadastrarProduto(descricao, quantidade, valor){ 
    validarProduto(descricao, quantidade, valor); 
    let novoProduto = { 
        "codigo": produtos.length + 1, 
        "descricao": descricao, 
        "quantidade": quantidade, 
        "valor": valor, 
    }; 
    produtos.push(novoProduto); 
}

function listarProdutos(){ 
    console.log(produtos); 
}

function atualizarValor(codigoProduto, novoValor){ 
    if(novoValor < 0){ 
        throw new Error("Valor deve ser maior igual a zero"); 
    } 
    const produto = produtos.find(prod => prod.codigo === codigoProduto); 
    if(produto){ 
        produto.valor = novoValor; 
    } else { 
        throw new Error("Produto não encontrado"); 
    } 
}

function atualizarQuantidade(codigoProduto, novaQuantidade){ 
    if(novaQuantidade < 1){ 
        throw new Error("Quantidade deve ser maior que zero"); 
    } 
    const produto = produtos.find(prod => prod.codigo === codigoProduto); 
    if(produto){ 
        
        produto.quantidade = novaQuantidade; 
    } else { 
        throw new Error("Produto não encontrado"); 
    } 
}


listarProdutos(); 

cadastrarProduto("Ferrari 250 GTO (1962)", 36, 250000000.00); 
cadastrarProduto("McLaren F1 LM (1995)", 5, 100000000.00); 
cadastrarProduto("Bugatti La Voiture Noire (2019)", 40, 55000000.00); 
cadastrarProduto("Aston Martin DBR1 (1956)", 5, 1100000000.00); 
cadastrarProduto("Porsche 911 GT3 RS", 40, 360000000.00); 

listarProdutos(); 

atualizarValor(2, 97.00); 
listarProdutos(); 

atualizarQuantidade(1, 3); 
listarProdutos();
      