//lista(array) de produtos
let produtos = [];

function validarProduto(descricao, quantidade, valor) {
    if (descricao.length <5) {
        throw new error("descricao deve ter no mínimo cinco cararacteres");
    }

    if(quantidade <1) {
        throw new error("quantidade deve ser meior que zero");
    }

    if (valor <0) {
        throw mew error("valor deve ser meior igual a zero");
    }
}

function cadastrarProduto(descricao, quantidade, valor) {
    validarproduto(descricao, quantidade, valor);

    let novoProduto = {
        "codigo": produtos.length +1,
        "descricao": descricao,
        "quantidade": quantidade
        "valor": valor
    };

    protudos.push(novoProduto);
}

function listarProdutos() {
    console.log(produtos);
}

function atualizarValor(codigoProduto, novoValor) {
    if (novoValor <0) { 
        throw new error("valor deve ser maior igual a zero");
    } 

    const produto =produtos.find(prod=> prod.codigo===codigoProduto);

    if (produto) {
        produto.valor =novoValor;
    
    }
    else }
      throw new error ("produto não encontrado");
    }
}

//

listarProdutos();
cadrastarProduto("cadeira Gamer", 12,699.00);
cadrastarProduto("Mouse Logi", 38, 99.00);
listarProdutos();

atualizarValor(2, 97.00);
listarProdutos();

atualizarQuantidade(1, 3);
