
// Lista (Array) de Produtos
let produtos = [];
let proximoCodigo = 1;

// Função para validar produto
function validarProduto(descricao, quantidade, valor) {
    if (descricao.trim().length < 5) {
        throw new Error("Descricao deve ter no minimo cinco caracteres");
    }

    if (quantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero");
    }

    if (valor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
    }
}

// Função para cadastrar produto
function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);

    let novoProduto = {
        "codigo": proximoCodigo++,
        "descricao": descricao,
        "quantidade": quantidade,
        "valor": valor
    };

    produtos.push(novoProduto);

    console.log("Produto cadastrado com sucesso!");
    return novoProduto;
}

// Função para listar produtos
function listarProdutos() {
    if (produtos.length === 0) {
        console.log("Nenhum produto cadastrado.");
        return;
    }

    console.log("LISTA DE PRODUTOS:");

    produtos.forEach(function(produto) {
        console.log(
            "Código: " + produto.codigo +
            " | Descrição: " + produto.descricao +
            " | Quantidade: " + produto.quantidade +
            " | Valor: R$ " + produto.valor.toFixed(2)
        );
    });
}

// Função para buscar produto pelo código
function buscarProduto(codigo) {
    let produto = produtos.find(function(item) {
        return item.codigo === codigo;
    });

    if (!produto) {
        console.log("Produto não encontrado!");
        return null;
    }

    console.log("Produto encontrado:", produto);
    return produto;
}

// Função para atualizar produto
function atualizarProduto(codigo, descricao, quantidade, valor) {
    let produto = buscarProduto(codigo);

    if (!produto) {
        return;
    }

    validarProduto(descricao, quantidade, valor);

    produto.descricao = descricao;
    produto.quantidade = quantidade;
    produto.valor = valor;

    console.log("Produto atualizado com sucesso!");
}

// Função para remover produto
function removerProduto(codigo) {
    let indice = produtos.findIndex(function(item) {
        return item.codigo === codigo;
    });

    if (indice === -1) {
        console.log("Produto não encontrado!");
        return;
    }

    produtos.splice(indice, 1);

    console.log("Produto removido com sucesso!");
}

// Função para calcular o valor total do estoque
function calcularValorEstoque() {
    let total = 0;

    produtos.forEach(function(produto) {
        total += produto.quantidade * produto.valor;
    });

    console.log("Valor total do estoque: R$ " + total.toFixed(2));

    return total;
}

// Função para verificar produtos com estoque baixo
function verificarEstoqueBaixo() {
    let estoqueBaixo = produtos.filter(function(produto) {
        return produto.quantidade <= 5;
    });

    console.log("PRODUTOS COM ESTOQUE BAIXO:");

    if (estoqueBaixo.length === 0) {
        console.log("Nenhum produto com estoque baixo.");
        return;
    }

    estoqueBaixo.forEach(function(produto) {
        console.log(produto.descricao + " - Quantidade: " + produto.quantidade);
    });
}

// Exemplos de utilização

cadastrarProduto("Teclado Gamer", 10, 120);
cadastrarProduto("Mouse USB", 4, 50);
cadastrarProduto("Monitor LED", 8, 750);

// Listar produtos
listarProdutos();

// Buscar produto
buscarProduto(1);

// Atualizar produto
atualizarProduto(1, "Teclado Mecanico", 15, 180);

// Remover produto
removerProduto(2);

// Calcular valor do estoque
calcularValorEstoque();

// Verificar estoque baixo
verificarEstoqueBaixo();

// Listar novamente
listarProdutos();
