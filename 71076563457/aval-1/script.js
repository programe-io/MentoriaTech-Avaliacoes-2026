
// Lista inicial de produtos
let produtos = [];

// Função para validar os dados do produto
function validarProduto(descricao, quantidade, valor) {
    if (typeof descricao !== "string" || descricao.trim().length < 5) {
        throw new Error("Descrição deve ter no mínimo cinco caracteres.");
    }

    if (!Number.isInteger(quantidade) || quantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero.");
    }

    if (typeof valor !== "number" || valor < 0 || !Number.isFinite(valor)) {
        throw new Error("Valor deve ser maior ou igual a zero.");
    }
}

// Função para cadastrar produto
function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);

    let novoProduto = {
        codigo: produtos.length > 0
            ? Math.max(...produtos.map(p => p.codigo)) + 1
            : 1,
        descricao: descricao.trim(),
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);

    console.log("Produto cadastrado com sucesso!");
}

// Função para listar produtos
function listarProdutos() {
    if (produtos.length === 0) {
        console.log("Nenhum produto cadastrado.");
        return;
    }

    console.log("===== LISTA DE PRODUTOS =====");

    produtos.forEach(produto => {
        console.log("----------------------------");
        console.log("Código:", produto.codigo);
        console.log("Descrição:", produto.descricao);
        console.log("Quantidade:", produto.quantidade);
        console.log("Valor: R$", produto.valor.toFixed(2));
    });
}

// Função para buscar produto pelo código
function buscarProduto(codigo) {
    let produto = produtos.find(p => p.codigo === codigo);

    if (!produto) {
        console.log("Produto não encontrado.");
        return null;
    }

    return produto;
}

// Função para atualizar produto
function atualizarProduto(codigo, descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);

    let produto = buscarProduto(codigo);

    if (!produto) return;

    produto.descricao = descricao.trim();
    produto.quantidade = quantidade;
    produto.valor = valor;

    console.log("Produto atualizado com sucesso!");
}

// Função para excluir produto
function excluirProduto(codigo) {
    let indice = produtos.findIndex(p => p.codigo === codigo);

    if (indice === -1) {
        console.log("Produto não encontrado.");
        return;
    }

    produtos.splice(indice, 1);

    console.log("Produto excluído com sucesso!");
}

// Exemplos de utilização

cadastrarProduto("Teclado Gamer", 10, 150.00);
cadastrarProduto("Mouse Óptico", 20, 75.50);
cadastrarProduto("Monitor LED", 5, 899.90);

// Listar todos os produtos
listarProdutos();

// Buscar produto
console.log("Produto encontrado:", buscarProduto(1));

// Atualizar produto
atualizarProduto(1, "Teclado Mecânico", 8, 250.00);

// Excluir produto
excluirProduto(2);

// Listar novamente
listarProdutos();
