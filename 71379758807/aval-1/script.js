let produtos = [];

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

function cadastrarProdutos(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);

    let novoProduto = {
        codigo: produtos.length + 1,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor,
    };

    produtos.push(novoProduto);
}

function atualizarValor(codigoProduto, novoValor) {
    if (novoValor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
    }

    const produto = produtos.find((prod) => prod.codigo === codigoProduto);

    if (produto) {
        produto.valor = novoValor;
    } else {
        throw new Error("Produto não encontrado");
    }
}

function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (novaQuantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero");
    }

    const produto = produtos.find((prod) => prod.codigo === codigoProduto);

    if (produto) {
        produto.quantidade += novaQuantidade;
    } else {
        throw new Error("Produto não encontrado");
    }
}

function listarProdutos() {
    console.log("Lista de produtos:");
    produtos.forEach((p) => {
        console.log(`Código: ${p.codigo}, Descrição: ${p.descricao}, Quantidade: ${p.quantidade}, Valor: ${p.valor}`);
    });
}

// Teste
try {
    console.log("--- 1. Cadastrar produtos ---");
    cadastrarProdutos("Cadeira gamer", 12, 699);
    cadastrarProdutos("Mouse logitech", 38, 99);
    listarProdutos();

    console.log("\n--- 2. Atualizando Valor e Quantidade ---");
    atualizarValor(1, 750);
    atualizarQuantidade(1, 3);
    listarProdutos();

  console.log("\n--- 3. Atualizando Quantidade---")
  atualizarQuantidade(1, 3);
  listarProdutoa();

} catch (erro) {
    console.error("Erro capturado:", erro.message);
}
