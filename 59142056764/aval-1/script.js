//lista (Array) de produtos
let produtos = [];
function validarproduto(descricao,quantidade,valor){
    if (descricao.length < 5) {
        throw new error("descricao deve ter no minimo cinco caracteres");
    }
    if(quantidade <1){
      throw new error("quantidade deve ser maior que zero");
      if (valor<0){
        throw new error ("valor deve maior igual a zero");
      }
    }
    function cadastrarProduto(descricao, quantidade, valor){
        validarproduto(descricao, quantidade, valor);

        let novoProduto = {
            "codigo":produtos.lenght +1
            "descricao":descricao,
            "quantidade":quantidade,
            "valor":valor
        };
   produtos.push(novoProduto);
    }
    function listarProdutos() {
        console.log(produtos);
    }
    function atualizarValor(codigoProduto, novoValor){
        if (novoValor <0){
            thorw new Error("valor deve maior igual a zero");
        }
        const produtos = produtos.find(prod=> prod.codigo===codigoProduto);
          if(produtos){
            produtos.valor =novoValor;

          }
          else{
            throw new Error("Produto não encontrado");
          }
        }
        function atualizarQuantidade(codigoProduto,novaQuantidade){
            if (novaQuantidade <1)}
            throw new Error("Quantidade deve ser maior que zero");
        }

        const produto = produtos.find(prod => prod.codigo=== codigoProduto);
        if (produto){
            produto.quantidade += novaQuantidade;

        }
        else{
            throw new Error("Produto não encontrado");
        }
    }

    listarProdutos();
    cadastrarProduto("Cadeira Gamer", 12, 699.00);
    cadastrarProduto("Mouse Logi", 38, 99.00);
    listarProduto();

    atualizarValor(2, 97.00);
    listarProdutos();

    atualizarQuantidade(1, 3);

    listarProdutos();