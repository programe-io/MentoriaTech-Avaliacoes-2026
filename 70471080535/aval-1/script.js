
let produtos = [];

// CADASTRAR PRODUTO
function cadastrarProduto(codigo, descricao, quantidade, valor) {
    if (quantidade < 0 || valor < 0) {
        throw new Error("Quantidade e valor devem ser maiores ou iguais a zero");
    }

    const existe = produtos.find(prod => prod.codigo === codigo);

    if (existe) {
        throw new Error("Produto ja cadastrado");
    }

    const novoProduto = {
        "codigo": codigo,
        "descricao": descricao,
        "quantidade": quantidade,
        "valor": valor
    };

    produtos.push(novoProduto);
}

// LISTAR PRODUTOS
function listarProdutos() {
    console.log("===== LISTA DE PRODUTOS =====");

    if (produtos.length === 0) {
        console.log("Estoque vazio");
        return;
    }

    console.log(produtos);
}

// CONSULTAR PRODUTO
function consultarProduto(codigoProduto) {
    const produto = produtos.find(prod => prod.codigo === codigoProduto);

    if (produto) {
        console.log("===== PRODUTO ENCONTRADO =====");
        console.log(produto);
    } else {
        throw new Error("Produto nao encontrado");
    }
}

// ATUALIZAR VALOR
function atualizarValor(codigoProduto, novoValor) {
    if (novoValor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
    }

    const produto = produtos.find(prod => prod.codigo === codigoProduto);

    if (produto) {
        produto.valor = novoValor;
    } else {
        throw new Error("Produto nao encontrado");
    }
}

// ATUALIZAR QUANTIDADE
function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (novaQuantidade < 0) {
        throw new Error("Quantidade deve ser maior ou igual a zero");
    }

    const produto = produtos.find(prod => prod.codigo === codigoProduto);

    if (produto) {
        produto.quantidade = novaQuantidade;
    } else {
        throw new Error("Produto nao encontrado");
    }
}

// ENTRADA DE ESTOQUE
function entradaEstoque(codigoProduto, quantidade) {
    if (quantidade <= 0) {
        throw new Error("Quantidade deve ser maior que zero");
    }

    const produto = produtos.find(prod => prod.codigo === codigoProduto);

    if (produto) {
        produto.quantidade += quantidade;
        console.log("Entrada realizada com sucesso!");
    } else {
        throw new Error("Produto nao encontrado");
    }
}

// SAIDA DE ESTOQUE
function saidaEstoque(codigoProduto, quantidade) {
    if (quantidade <= 0) {
        throw new Error("Quantidade deve ser maior que zero");
    }

    const produto = produtos.find(prod => prod.codigo === codigoProduto);

    if (produto) {
        if (produto.quantidade < quantidade) {
            throw new Error("Estoque insuficiente");
        }

        produto.quantidade -= quantidade;
        console.log("Saida realizada com sucesso!");
    } else {
        throw new Error("Produto nao encontrado");
    }
}

// REMOVER PRODUTO
function removerProduto(codigoProduto) {
    const indice = produtos.findIndex(prod => prod.codigo === codigoProduto);

    if (indice !== -1) {
        produtos.splice(indice, 1);
        console.log("Produto removido com sucesso!");
    } else {
        throw new Error("Produto nao encontrado");
    }
}

// CALCULAR VALOR TOTAL DO ESTOQUE
function calcularEstoque() {
    let total = 0;

    produtos.forEach(produto => {
        total += produto.quantidade * produto.valor;
    });

    console.log("Valor total do estoque: R$ " + total.toFixed(2));

    return total;
}

// LISTAR PRODUTOS COM ESTOQUE BAIXO
function estoqueBaixo(limite) {
    console.log("===== PRODUTOS COM ESTOQUE BAIXO =====");

    produtos.forEach(produto => {
        if (produto.quantidade <= limite) {
            console.log(produto);
        }
    });
}

// EXEMPLO DE UTILIZACAO DO SISTEMA

cadastrarProduto(1, "Cadeira Gamer", 12, 699);
cadastrarProduto(2, "Mouse Logi", 38, 99);
cadastrarProduto(3, "Teclado Mecanico", 5, 250);

listarProdutos();

atualizarValor(2, 97);

entradaEstoque(1, 5);

saidaEstoque(2, 3);

atualizarQuantidade(3, 10);

consultarProduto(1);

calcularEstoque();

estoqueBaixo(10);

listarProdutos();
