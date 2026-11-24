// Lista de produtos
let produtos = [];

// Validar produto
function validarProduto(descricao, quantidade, valor) {
    if (descricao.length < 5) {
        throw new Error("Descrição deve ter, no mínimo, cinco caracteres");
    }
    if (quantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero");
    }
    if (valor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
    }
}

// Cadastrar produto
function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);
    
    let novoProduto = {
        codigo: produtos.length + 1,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };
    
    produtos.push(novoProduto);
    console.log("✅ Produto cadastrado:", novoProduto);
}

// Listar produtos
function listarProdutos() {
    console.log("📋 Lista de Produtos:", produtos);
}

// Atualizar valor
function atualizarValor(codigoProduto, novoValor) {
    if (novoValor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
    }
    
    const produto = produtos.find((prod) => prod.codigo === codigoProduto);
    
    if (produto) {
        produto.valor = novoValor;
        console.log("💰 Valor atualizado:", produto);
    } else {
        throw new Error("Produto não encontrado");
    }
}

// Atualizar quantidade
function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (novaQuantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero");
    }
    
    const produto = produtos.find((prod) => prod.codigo === codigoProduto);
    
    if (produto) {
        produto.quantidade = produto.quantidade + novaQuantidade;
        console.log("📦 Quantidade atualizada:", produto);
    } else {
        throw new Error("Produto não encontrado");
    }
}

// ========== EXEMPLOS DE USO ==========
console.log("=== SISTEMA DE ESTOQUE INICIADO ===");
console.log("Use no console: cadastrarProduto('Nome', quantidade, valor)");
console.log("listarProdutos() — atualizarValor(codigo, novoValor)");
console.log("atualizarQuantidade(codigo, quantidadeAdicional)");
