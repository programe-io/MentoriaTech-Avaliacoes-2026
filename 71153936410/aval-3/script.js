2 // Lista (Array) de Produtos
3 let produtos = [];
4
5
function validar Produto(descricao, quantidade, valor){
if(descricao.length < 5){
throw new Error("Descricao deve ter no mínimo cinco caracteres");
}
9-
0
1
if(quantidade < 1){
throw new Error("Quantidade deve ser maior que zero");
6-
7
8
}
2-
3
if(valor < 0) {
throw new Error("Valor deve maior igual a zero");
4
}
5}
6
7- function cadastrar Produto(descricao, quantidade, valor){
validar Produto(descricao, quantidade, valor);
8
9
let novoProduto = {
0
"codigo":
1
"descricao": descricao,
2
"quantidade": quantidade,
3
"valor": valor
4
}
5}