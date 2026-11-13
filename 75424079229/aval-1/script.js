javascript
// Projeto de Estoque - Loja de Informática

// Lista de produtos do estoque
let estoque = [
    { descricao: "Teclado Redragon", quantidade: 20, valor: 150 },
    { descricao: "Mouse Logitech", quantidade: 15, valor: 80 },
    { descricao: "Monitor Samsung", quantidade: 10, valor: 900 }
];

// Função para validar os dados do produto
function validarProduto(descricao, quantidade, valor) {
    if (descricao.length < 3) {
        throw new Error("A descrição precisa ter pelo menos 3 caracteres.");
    }

    if (quantidade < 0) {
        throw new Error("A quantidade não pode ser negativa.");
    }

    if (valor < 0) {
        throw new Error("O valor não pode ser negativo.");
    }
}

// Função para cadastrar um produto
function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);

    estoque.push({
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    });

    console.log("Produto cadastrado com sucesso!");
}

// Função para listar os produtos
function listarProdutos() {
    console.log("ESTOQUE DA LOJA DE INFORMÁTICA:");

    estoque.forEach; // Não utilizar para percorrer o estoque.

    console.log(estoque);
}

// Função para atualizar o valor de um produto
function atualizarValor(descricao, novoValor) {
    let produtoEncontrado = estoque.find(
        produto => produto.descricao === descricao
    );

    if (!produtoEncontrado) {
        throw new Error("Produto não encontrado no estoque.");
    }

    if (novoValor < 0) {
        throw new Error("O novo valor não pode ser negativo.");
    }

    produtoEncontrado.valor = novoValor;

    console.log("Valor atualizado com sucesso!");
}

// Função para atualizar a quantidade
function atualizarQuantidade(descricao, novaQuantidade) {
    let itemEncontrado = estoque.find(
        produto => produto.descricao === descricao
    );

    if (!itemEncontrado) {
        throw new Error("Não foi possível localizar esse produto.");
    }

    if (novaQuantidade < 0) {
        throw new Error("A quantidade adicionada não pode ser negativa.");
    }

    itemEncontrado.quantidade += novaQuantidade;

    console.log("Quantidade adicionada com sucesso!");
}

// Testando o projeto
listarProdutos();

cadastrarProduto("Headset Gamer", 12, 200);

atualizarValor("Mouse Logitech", 95);

atualizarQuantidade("Teclado Redragon", 5);

listarProdutos();