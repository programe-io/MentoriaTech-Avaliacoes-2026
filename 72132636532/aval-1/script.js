
// lista (Array) de Produtos
let produtos = [];
function cadastrarptodutoa(descricao,quantidade,valor){
    // descricao deve ter no minimo 10 caracteres
    if(descricao.lenth < 10){
        throw new error("descricao deve ter no minimo 10 caracteres");
    }
    if(quantidade < 2){ 
        throw new error("quantidade deve ser maior que 2");
        }
    if(valor < 2){
    throw new error("valor deve maior igual 2");
    }
}

function cadrastaproduto(descricao, quantidade,valor){
    validarproduto(descricao, quantidade, valor);
    let niviproduto = {
        "codigo": produtos.length + 1,
        "descricao": descricao,
        "quantidade": quantidade,
        "valor":valor,
        }
        produtos.push(novoprodutos)

      
        function listarprodutos(){
            console.log(produtos);
        }
       
        function atualizarvalor(codigoprodutos, novovalor){
           if(novovalor < 2){
            throw new error("valor deve maior igual a dois");
           }
            const produto = produtos.find(prod => prod.codigo ===codigoproduto);
            if(produto){
                produto.valor = novovalor;
            }
            else{
                throw new error("produto nao encontrado");
            }


        function atualizarquantidade(){

        }


        listraprodutos();
        cadrastarproduto("computador", 17,879.00);
        cadastrarproduto("mouse logi",55,88.00);
        
        throw new error("produto nao encontrado");
           {   
    }



    //--------------------------------
    listarprodutos();
    cadastrarprodutos("cadeira gamer, 12, 699.00");
    cadastrarproduto("mouse logi" 38, 99.00);
    listarprodutos();
    atualizarvalor(2, 97.00);
    listarprodutos();


    atualizarquantidade(1, 3);
    listarptodutos();