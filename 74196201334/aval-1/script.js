let produtos = [];

function errorCheck(desc, quant, valor) {
    if (desc.length <5 ) {
        throw new Error ("Descrição inválida. Min; 5 Caracteres");
    }
    if (quant < 0) {
        throw new Error ("Quantidade invalida. Quantidade Min: 0");
    }
    if (valor < 0) {
        throw new Error ("Valor inválido. Valor Min: 0");
    }
}

function cadastrarProd(desc, quant, valor) {
    errorCheck(desc, quant, valor);
    let novoProd = {
        "codigo": produtos.length + 1,
        "desc": desc,
        "quant": quant,
        "valor": valor
    }
    produtos.push(novoProd);
}

function listarProd() {
    console.log(produtos);
}

function updateValor(codigoProd, novoValor) {
    if (novoValor < 0) {
        throw new Error ("Valor inválido. Valor Min: 0");
    }

    const produto = produtos.find(prod => prod.codigo === codigoProd);

    if (produto) {
        produto.valor = novoValor;
    } else {
        throw new Error ("Produto não encontrado");
    }
}

function updateQuant (codigoProd, novaQuant) {
    if (novaQuant < 0) {
        throw new Error ("Quantidade invalida, Quantidade Min: 0");
    }

    const produto = produtos.find(prod => prod.codigo === codigoProd);

    if (produto) {
        produto.quant = quant + novaQuant;
    }
    else {
        throw new Error ("Produto não encontrado"); 
    }
}
cadastrarProd("ULTRAKILL", 100, 49,99);
cadastrarProd("Cyberpunk 2077", 215, 174,90);
cadastrarProd("Signalis", 90, 44,99);
cadastrarProd("BloonsTD 6", 85, 34,90);
listarProd();
updateValor(2, 149,99);
listarProd();