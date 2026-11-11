
// Lista inicial de Produtos
let produtos = [];

// Validar Produto
function validarProduto(descricao, quantidade, valor) {
    if (typeof descricao !== "string" || descricao.trim().length < 5) {
        throw new Error("Descricao deve ter no minimo cinco caracteres");
    }

    if (quantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero");
    }

    if (valor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
    }
}

// Cadastrar Produto
function cadastrarProduto(descricao, quantidade, valor) {
    try {
        validarProduto(descricao, quantidade, valor);

        let novoProduto = {
            codigo: produtos.length + 1,
            descricao: descricao,
            quantidade: quantidade,
            valor: valor
        };

        produtos.push(novoProduto);

        console.log("Produto cadastrado com sucesso!");
    } catch (erro) {
        console.log("Erro:", erro.message);
    }
}

// Listar Produtos
function listarProdutos() {
    if (produtos.length === 0) {
        console.log("Nenhum produto cadastrado.");
        return;
    }

    console.log("===== LISTA DE PRODUTOS =====");

    produtos.forEach(function(produto) {
        console.log("----------------------------");
        console.log("Código:", produto.codigo);
        console.log("Descrição:", produto.descricao);
        console.log("Quantidade:", produto.quantidade);
        console.log("Valor: R$", produto.valor);
    });
}

// Buscar Produto
function buscarProduto(codigo) {
    let produto = produtos.find(function(p) {
        return p.codigo === codigo;
    });

    if (produto) {
        console.log("Produto encontrado:", produto);
        return produto;
    } else {
        console.log("Produto não encontrado.");
        return null;
    }
}

// Atualizar Produto
function atualizarProduto(codigo, descricao, quantidade, valor) {
    try {
        validarProduto(descricao, quantidade, valor);

        let produto = produtos.find(function(p) {
            return p.codigo === codigo;
        });

        if (!produto) {
            console.log("Produto não encontrado.");
            return;
        }

        produto.descricao = descricao;
        produto.quantidade = quantidade;
        produto.valor = valor;

        console.log("Produto atualizado com sucesso!");
    } catch (erro) {
        console.log("Erro:", erro.message);
    }
}

// Excluir Produto
function excluirProduto(codigo) {
    let indice = produtos.findIndex(function(p) {
        return p.codigo === codigo;
    });

    if (indice === -1) {
        console.log("Produto não encontrado.");
        return;
    }

    produtos.splice(indice, 1);

    console.log("Produto excluído com sucesso!");
}

// Calcular valor total do estoque
function calcularEstoque() {
    let total = 0;

    produtos.forEach(function(produto) {
        total += produto.quantidade * produto.valor;
    });

    console.log("Valor total do estoque: R$", total.toFixed(2));
}

// ================================
// TESTANDO O SISTEMA
// ================================

// Cadastrar produtos
cadastrarProduto("Teclado Gamer", 10, 150);
cadastrarProduto("Mouse Optico", 20, 75);
cadastrarProduto("Monitor LED", 5, 900);

// Listar produtos
listarProdutos();

// Buscar produto
buscarProduto(1);

// Atualizar produto
atualizarProduto(1, "Teclado Mecanico", 8, 250);

// Excluir produto
excluirProduto(2);

// Calcular estoque
calcularEstoque();

// Listar produtos novamente
listarProdutos();
