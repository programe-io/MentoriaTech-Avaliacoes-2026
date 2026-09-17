
// Lista (array) de produtos
let produtos = [];

function validarProduto(descricao, quantidade, valor){
   if(descricao.lenght < 5){
       throw new Error("Descricao deve ter no minimo cinco caracteres");
   }
   if(quantidade < 1){
        throw new Error("Quantidade deve ser maior que zero")
   }
    if(valor < 0){
        throw new Error("Valor deve maior igual a zero");
    }
}  

function cadastrarProduto(descricao, quantidade, valor){
    validarProduto(descricao, quantidade, valor);
    let novoProduto = {
        "codigo": produtos.length + 1,
        "descricao": descricao,
        "valor": valor
    }
    produtos.push(novoProduto);
}

function listarProdutos(){
    console.log(produtos);
}

function atualizarValor(codigoProduto, novoValor){
    if(novoValor < 0){
       throw new Error("Valor deve ser maior igaul a zero");
    }

    const produto = produtos.find(prod => prod.codigo ===codigoProduto);
  
  if(produto){
    produto.valor = novoValor;
  }
  else{
    throw new Error("Produto nao encontrado");
  }
}
function atualizarQuantidade(codigoProduto, novaQuantidade){
if(novaQuantidade < 1){
  throw new Error("Valor deve maior igual a zero"); 
}
  const produto = produtos.find(prod => prod.codigo ===codigoProduto);
  if(produto){
    produto.quantidade += novaQuantidade;
   }
  else{
    throw new Error("Produto nao encontrado");
  }
}




// -----------------------------
listarProdutos();
cadastrarProduto("Cadeira Gamer", 12, 699.00);
cadastrarProduto("Mouse Logi",33,99,00);
listarProdutos();
atualizarValor(1,97.00);
listarProdutos();

atualizarQuantidade(1,3);
listarProdutos();
