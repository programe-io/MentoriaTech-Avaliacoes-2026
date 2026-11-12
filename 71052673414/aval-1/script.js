// Lista de produtos 
let produtos = [];

// Cadastrar produto 
function CadastrarProduto(descricao, quantidade, valor) {
    if (descricao.length < 5 || quantidade < 1 || valor < 0) {
    throw new Error("Dados inválidos1!");
    }
    
let produto = {
codigo: produtos.length + 1
descricao,
quantidade,
valor
}; 

produtos.push(produto);
console.log("produto cadastrado!");
}

// Listar produtos 
function Listar produtos() {
console.log(produtos);
}

//Atualizar Valor
function atualizarValor(codigo,novoValor) {
    let produto = produtos.find(p => p.codigo === codigo);

if (!produto || novoValor <0) {
    throw new Error("produto ou vaor inválido!");
}

   produto.valor = novovalor;
}

||atualizar quantidade
function atualizarQuantidade(codigo, quantidade) {
     let produto = produtos.find (p => p.codigo ===);

if (!produto || quantidade < 1) {
    throw new Error("produto ou quantidade inválida");
}

produto.quantidade += quantidade;
}
