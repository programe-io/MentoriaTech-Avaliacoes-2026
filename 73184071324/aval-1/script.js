let produtos = [];
function cadastrarProduto(codigo, descricao, quantidade, valor) {
    let existe = produtos.find(p => p.codigo === codigo);
    if (existe) {
        console.log(`Erro: Produto com código ${codigo} já existe!`);
        return;
    }
    if (isNaN(quantidade) || isNaN(valor)) {
        console.log("Erro: Quantidade e valor precisam ser números!");
        return;
    }
    let produto = {
        codigo: String(codigo),
        descricao: descricao,
        quantidade: Number(quantidade),
        valor: Number(valor)
    };
    produtos.push(produto);
    console.log(`Produto ${descricao} cadastrado com sucesso!`);
}
function listarProdutos() {
    if (produtos.length === 0) {
        console.log("Nenhum produto cadastrado.");
        return;
    }
    produtos.forEach(function(produto) {
        console.log(
            `Código: ${produto.codigo} | Descrição: ${produto.descricao} | Quantidade: ${produto.quantidade} | Valor: R$ ${produto.valor.toFixed(2)}`
        );
    });
}
function alterarValor(codigo, novoValor) {
    let produto = produtos.find(p => p.codigo === String(codigo));
    if (produto) {
        produto.valor = Number(novoValor);
        console.log(`Valor do produto ${codigo} alterado para R$ ${produto.valor.toFixed(2)} com sucesso!`);
    } else {
        console.log(`Produto com código ${codigo} não encontrado!`);
    }
}
function alterarQuantidade(codigo, novaQuantidade) {
    let produto = produtos.find(p => p.codigo === String(codigo));
    if (produto) {
        produto.quantidade = Number(novaQuantidade);
        console.log(`Quantidade do produto ${codigo} alterada para ${produto.quantidade} com sucesso!`);
    } else {
        console.log(`Produto com código ${codigo} não encontrado!`);
    }
}
cadastrarProduto("1", "Arroz 5kg", 10, 25.50);
cadastrarProduto("2", "Feijão 1kg", 15, 8.90);
cadastrarProduto("3", "Óleo de Soja", 20, 7.25);
alterarValor("1", 27.99);
alterarQuantidade("2", 30);
listarProdutos();