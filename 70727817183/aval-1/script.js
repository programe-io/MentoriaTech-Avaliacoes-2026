```javascript
// Lista (Array) de produtos
let produtos = [];

// Função para validar os dados do produto
function validarProduto(descricao, quantidade, valor) {
    if (descricao.length < 5) {
        throw new Error("Descrição deve ter no mínimo cinco caracteres.");
    }

    if (quantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero.");
    }

    if (valor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero.");
    }
}

// Função para cadastrar produtos
function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);

    let novoProduto = {
        codigo: produtos.length + 1,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);
}

// Função para listar produtos
function listarProdutos() {
    console.log(produtos);
}

// Função para atualizar o valor de um produto
function atualizarValor(codigoProduto, novoValor) {
    if (novoValor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero.");
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (produto) {
        produto.valor = novoValor;
    } else {
        throw new Error("Produto não encontrado.");
    }
}

// Função para atualizar a quantidade de um produto
function atualizarQuantidade(codigoProduto, novaQuantidade) {
    if (novaQuantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero.");
    }

    const produto = produtos.find(
        prod => prod.codigo === codigoProduto
    );

    if (produto) {
        produto.quantidade += novaQuantidade;
    } else {
        throw new Error("Produto não encontrado.");
    }
}

// Testes das funções

// Lista inicial
listarProdutos();

// Cadastro de produtos
cadastrarProduto("Cadeira Gamer", 12, 699.00);
cadastrarProduto("Mouse Logi", 38, 99.00);

// Lista após o cadastro
listarProdutos();

// Atualização do valor do produto de código 2
atualizarValor(2, 97.00);
listarProdutos();

// Adição de 3 unidades ao produto de código 1
atualizarQuantidade(1, 3);
listarProdutos();
```