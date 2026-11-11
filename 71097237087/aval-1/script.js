

---------- Forwarded message ---------
De: Ester Emanoelly <esteremanoelly1@gmail.com>
Date: sex., 6 de nov. de 2026 às 16:29
Subject: Fwd:
To: <luzivan.pessoa@aluno.edu.pi.gov.br>


luzivan.pessoa@aluno.edu.pi.gov.br

---------- Forwarded message ---------
De: Ana Joyce da Cruz Silva <ana.joyce.2009@aluno.edu.pi.gov.br>
Date: sex., 6 de nov. de 2026 às 16:23
Subject: Fwd:
To: esteremanoelly1@gmail.com <esteremanoelly1@gmail.com>, edilsongoncalves620@gmail.com <edilsongoncalves620@gmail.com>




---------- Forwarded message ---------
De: Yasmin Pessoa de Moura <yasmin.pessoa@aluno.edu.pi.gov.br>
Date: sex., 6 de nov. de 2026 às 16:19
Subject:
To: <cleidiane.jesus@aluno.edu.pi.gov.br>, <ana.joyce.2009@aluno.edu.pi.gov.br>, <maria.giselle.2009@aluno.edu.pi.gov.br>


// Lista (Array) de Produtos
let produtos = [];

function validarProduto(descricao, quantidade, valor) {
    if (descricao.length < 5) {
        throw new Error("Descricao deve ter no minimo cinco caracteres");
    }
    if (quantidade <= 0) {
        throw new Error("Quantidade deve ser valor maior que zero");
    }
    if (valor < 0) {
        throw new Error("Valor deve ser maior igual a zero");
    }
}

function cadastrarProduto(descricao, quantidade, valor) {
    validarProduto(descricao, quantidade, valor);
    let novoProduto = {
        "codigo": produtos.length + 1,
        "descricao": descricao,
        "quantidade": quantidade,
        "valor": valor
    };
    produtos.push(novoProduto);
}

function listarProdutos() {
    console.log(produtos);
}

function atualizarValor(codigoProduto, novoValor) {
    if (novoValor < 0) {
        throw new Error("Valor deve ser maior igual a zero");
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
        produto.quantidade += novaQuantidade;
    } else {
        throw new Error("Produto não encontrado");
    }
}

// .............................................
listarProdutos();

cadastrarProduto("Cadeira Gamer", 12, 599.00);
cadastrarProduto("Mouse Logi", 10, 99.00);

listarProdutos();

atualizarValor(2, 97.00);

listarProdutos();

atualizarQuantidade(1, 5);

listarProdutos();