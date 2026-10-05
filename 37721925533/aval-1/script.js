// Banco de dados simplificado
let estoque = [];

// 1. Cadastrar um novo produto
function cadastrar(codigo, descricao, quantidade, valor) {
    let produto = { codigo, descricao, quantidade, valor };
    estoque.push(produto);
}

// 2. Listar os produtos cadastrados
function listar() {
    for (let produto of estoque) {
        console.log(produto.codigo + " - " + produto.descricao + " | Qtd: " + produto.quantidade + " | R$: " + produto.valor);
    }
}

// 3. Alterar o valor de um produto
function alterarValor(codigo, novoValor) {
    for (let produto of estoque) {
        if (produto.codigo === codigo) {
            produto.valor = novoValor;
        }
    }
}

// 4. Alterar a quantidade de um produto
function alterarQuantidade(codigo, novaQuantidade) {
    for (let produto of estoque) {
        if (produto.codigo === codigo) {
            produto.quantidade = novaQuantidade;
        }
    }
}

// --- Testando o sistema no console ---
cadastrar(1, "Arroz", 10, 5.50);
cadastrar(2, "Feijão", 20, 8.00);

alterarValor(1, 6.00);
alterarQuantidade(2, 15);

listar();
