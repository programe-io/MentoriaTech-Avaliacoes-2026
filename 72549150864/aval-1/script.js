// Função para validar os dados do produto
function validarProduto(descricao, quantidade, valor) {
    if (descricao.length < 3) {
        throw new Error("A descrição deve possuir pelo menos 3 caracteres.");
    }

    if (quantidade <= 0) {
        throw new Error("A quantidade precisa ser maior que zero.");
    }

    if (valor <= 0) {
        throw new Error("O preço do produto precisa ser maior que zero.");
    }
}

// Função para cadastrar um produto
function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);

    const produto = {
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    estoque.push(produto);

    console.log("Produto cadastrado com sucesso!");
}

// Função para listar os produtos cadastrados
function listarProdutos() {
    console.log("=== ESTOQUE DA LOJA DE INFORMÁTICA ===");

    console.log(estoque);
}

// Função para atualizar o valor de um produto
function atualizarValor(descricao, novoValor) {
    const produtoEncontrado = estoque.find(
        produto => produto.descricao === descricao
    );

    if (!produtoEncontrado) {
        throw new Error("Não encontramos esse produto no estoque.");
    }

    if (novoValor <= 0) {
        throw new Error("Informe um preço válido para atualização.");
    }

    // O novo valor substitui o valor antigo
    produtoEncontrado.valor = novoValor;

    console.log("Preço atualizado com sucesso!");
}

// Função para atualizar a quantidade de um produto
function atualizarQuantidade(descricao, novaQuantidade) {
    const produtoEncontrado = estoque.find(
        produto => produto.descricao === descricao
    );

    if (!produtoEncontrado) {
        throw new Error("Esse produto não está cadastrado.");
    }

    if (novaQuantidade <= 0) {
        throw new Error("A quantidade adicionada deve ser maior que zero.");
    }

    // A nova quantidade é somada ao estoque existente
    produtoEncontrado.quantidade += novaQuantidade;

    console.log("Quantidade atualizada com sucesso!");
}

// Cadastro dos produtos de exemplo
cadastrarProduto("Mouse sem fio", 15, 45);
cadastrarProduto("Teclado gamer", 10, 120);
cadastrarProduto("Headset", 8, 90);

// Listagem dos produtos
listarProdutos();

// Atualização do preço
atualizarValor("Mouse sem fio", 50);

// Adição de quantidade ao estoque
atualizarQuantidade("Teclado gamer", 5);

// Listagem final do estoque atualizado
listarProdutos();d