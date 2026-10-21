No se seleccionó ningún elemento

Ir al contenido
Cómo usar Gmail con lectores de pantalla
in:sent 
1 de 21
projeto 2 comopleto

Raika Saousa <raikasaousa@gmail.com>
1:54 p.m. (hace 2 horas)
para Kayo

let produtos = [];

function validarProduto(descricao, quantidade, valor) {
    if (descricao.length < 5) {
        throw new Error("Descrição deve conter no mínimo 5 caracteres");
    }

    if (quantidade < 1) {
        throw new Error("Quantidade deve ser maior que zero");
    }

    if (valor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
    }
}

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

function listarProdutos() {
    console.log(produtos);
}

function atualizarValor(codigoProduto, novoValor) {
    if (novoValor < 0) {
        throw new Error("Valor deve ser maior ou igual a zero");
    }

    const produto = produtos.find(prod => prod.codigo === codigoProduto);

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

    const produto = produtos.find(prod => prod.codigo === codigoProduto);

    if (produto) {
        produto.quantidade = novaQuantidade;
    } else {
        throw new Error("Produto não encontrado");
    }
}

listarProdutos();

cadastrarProduto("Cadeira Gamer", 12, 699);
cadastrarProduto("Mouse Logi", 38, 99);

listarProdutos();

atualizarValor(2, 97);

listarProdutos();

atualizarQuantidade(1, 15);

listarProdutos();
kayocesar099@gmail.com. Presiona Tab para insertar la sugerencia.