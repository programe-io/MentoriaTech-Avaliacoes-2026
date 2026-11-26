
let produtos = [];

// Função para validar os dados do produto
function validarProduto(descricao, quantidade, valor) {
    if (typeof descricao !== "string" || descricao.trim().length < 5) {
        throw new Error("A descrição deve ter pelo menos 5 caracteres.");
    }

    if (!Number.isInteger(quantidade) || quantidade < 1) {
        throw new Error("A quantidade deve ser um número inteiro maior que zero.");
    }

    if (typeof valor !== "number" || !Number.isFinite(valor) || valor < 0) {
        throw new Error("O valor deve ser maior ou igual a zero.");
    }
}

// Função para cadastrar produto
function cadastrarProduto(descricao, quantidade, valor) {
    try {
        validarProduto(descricao, quantidade, valor);

        let novoProduto = {
            codigo: produtos.length + 1,
            descricao: descricao.trim(),
            quantidade: quantidade,
            valor: valor
        };

        produtos.push(novoProduto);

        console.log("Produto cadastrado com sucesso!");
        return novoProduto;

    } catch (erro) {
        console.log("Erro: " + erro.message);
    }
}

// Função para listar produtos
function listarProdutos() {
    console.log("\n===== LISTA DE PRODUTOS =====");

    if (produtos.length === 0) {
        console.log("Nenhum produto cadastrado.");
        return;
    }

    produtos.forEach(produto => {
        console.log(
            `Código: ${produto.codigo} | ` +
            `Descrição: ${produto.descricao} | ` +
            `Quantidade: ${produto.quantidade} | ` +
            `Valor: R$ ${produto.valor.toFixed(2)}`
        );
    });
}

// Função para buscar produto
function buscarProdutoPorCodigo(codigoProduto) {
    return produtos.find(prod => prod.codigo === codigoProduto);
}

// Função para atualizar valor
function atualizarValor(codigoProduto, novoValor) {
    if (typeof novoValor !== "number" || !Number.isFinite(novoValor) || novoValor < 0) {
        console.log("Valor inválido.");
        return;
    }

    let produto = buscarProdutoPorCodigo(codigoProduto);

    if (produto) {
        produto.valor = novoValor;
        console.log("Valor atualizado com sucesso!");
    } else {
        console.log("Produto não encontrado.");
    }
}

// Função para atualizar quantidade
function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 1) {
        console.log("Quantidade inválida.");
        return;
    }

    let produto = buscarProdutoPorCodigo(codigoProduto);

    if (produto) {
        produto.quantidade += novaQuantidade;
        console.log("Estoque atualizado com sucesso!");
    } else {
        console.log("Produto não encontrado.");
    }
}

// Função para excluir produto
function excluirProduto(codigoProduto) {
    let indice = produtos.findIndex(prod => prod.codigo === codigoProduto);

    if (indice !== -1) {
        produtos.splice(indice, 1);
        console.log("Produto excluído com sucesso!");
    } else {
        console.log("Produto não encontrado.");
    }
}

// Função para calcular o valor total do estoque
function calcularEstoque() {
    let total = produtos.reduce((soma, produto) => {
        return soma + (produto.quantidade * produto.valor);
    }, 0);

    console.log(`Valor total do estoque: R$ ${total.toFixed(2)}`);
}

// ===== TESTES DO SISTEMA =====

cadastrarProduto("Cadeira Gamer", 12, 699.90);
cadastrarProduto("Mouse Logitech", 38, 99.90);
cadastrarProduto("Teclado Mecanico", 15, 189.90);
cadastrarProduto("Monitor LED", 8, 899.90);

listarProdutos();

atualizarValor(2, 89.90);

atualizarQuantidade(1, 5);

console.log("\n===== PRODUTOS APÓS ATUALIZAÇÕES =====");
listarProdutos();

calcularEstoque();

// Exemplo de exclusão:
// excluirProduto(3);
// listarProdutos();
