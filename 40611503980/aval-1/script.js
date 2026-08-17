
// Lista (Array) de Produtos
let produtos = [];

function cadastrarProduto(descricao, quantidade, valor){
    // Descricao deve ter no mínimo 5 caracteres
    if(descricao.length < 5){
        throw new Error("Descrição deve ter no mínimo 5 caracteres");
    }
    if(quantidade < 1){
        throw new Error("Descrição deve ter no mínimo 5 caracteres");
    }
}
```
