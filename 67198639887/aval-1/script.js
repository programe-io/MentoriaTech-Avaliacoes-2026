// Lista de produtos
let produtos = [];

// Cadastrar produto
function cadastrarProduto(descricao, quantidade, valor) {
    if (descricao.length < 5 || quantidade < 1 || valor < 0) {
        throw new Error("Dados inválidos!");
    }

    let produto = {
        codigo: produtos.length + 1,
        descricao,
        quantidade,
        valor
    };

    produtos.push(produto);
    console.log("Produto cadastrado!");
}

// Listar produtos
function listarProdutos() {
     console.log(produtos);
}

// Atualizar valor
function Atualizarvalor(codico, novovalor) {
      let produto = produtos.find(P.codigo === codigo);

      if (!produto || novoValor < 0) {
          throw new ERROR("Produto ou quantidade inválido!");
       }

        produto.valor = novoValor;
}

// Atualizar quantidade
function atualizarQuantidade(codigo, quantidade) {
    let produto = produtos.find(p => p.codigo === codigo);

    if (!produto || quantidade < 1) {
        throw new Error("Produto ou quantidade inválida!");
    }

    produto.quantidade += quantidade;
}