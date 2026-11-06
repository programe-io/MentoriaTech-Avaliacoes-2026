
// Estoque de uma loja de informática

// Lista de produtos cadastrados
let estoque = [
    {
        descricao: "Mouse Gamer",
        quantidade: 15,
        valor: 80
    },
    {
        descricao: "Teclado Mecanico",
        quantidade: 10,
        valor: 150
    },
    {
        descricao: "Headset Gamer",
        quantidade: 8,
        valor: 120
    }
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
        throw new Error("O preço do produto não pode ser negativo.");
    }
}

// Função para cadastrar um novo produto
function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);

    let produto = {
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    estoque.push(produto);

    console.log("Produto cadastrado com sucesso!");
}

// Função para listar os produtos do estoque
function listarProdutos() {
    console.log("===== ESTOQUE DA LOJA DE INFORMÁTICA =====");

    if (estoque.length === 0) {
        console.log("O estoque está vazio.");
    } else {
        console.log(estoque);
    }
}

// Função para atualizar o valor de um produto
function atualizarValor(descricao, novoValor) {
    if (novoValor < 0) {
        throw new Error("O novo preço não pode ser negativo.");
    }

    let produtoEncontrado = estoque.find(
        (item) => item.descricao === descricao
    );

    if (produtoEncontrado) {
        produtoEncontrado.valor = novoValor;
        console.log("Preço atualizado com sucesso!");
    } else {
        throw new Error("Produto não encontrado no estoque.");
    }
}

// Função para atualizar a quantidade de um produto
function atualizarQuantidade(descricao, novaQuantidade) {
    if (novaQuantidade < 0) {
        throw new Error("A quantidade adicionada não pode ser negativa.");
    }

    let produtoEncontrado = estoque.find(
        (item) => item.descricao === descricao
    );

    if (produtoEncontrado) {
        produtoEncontrado.quantidade += novaQuantidade;
        console.log("Quantidade atualizada com sucesso!");
    } else {
        throw new Error("Não foi possível encontrar esse produto.");
    }
}

// Testando as funções do estoque

listarProdutos();

cadastrarProduto("Monitor Gamer", 5, 900);

atualizarValor("Mouse Gamer", 95);

atualizarQuantidade("Teclado Mecanico", 5);

listarProdutos();
