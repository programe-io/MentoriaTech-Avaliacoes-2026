document.getElementById("btAdd").onclick = Add;
document.getElementById("btAtualizar").onclick = Atualizar;
document.getElementById("btExcluir").onclick = Excluir;
const descricao = document.getElementById("nomeP");
const qtd = document.getElementById("qtdP");
const valor = document.getElementById("precoP");

let produtos = [];

function Add(){
    ValidarProdutos(descricao.value, qtd.value, valor.value );
    let novoProduto = {
        "codigo": produtos.length + 1,
        "descricao": descricao.value,
        "quantidade": qtd.value,
        "valor": valor.value
    }
    produtos.push(novoProduto);
    limparCampos();
    exibirProdutos();
}

function limparCampos(){
    descricao.value = "";
    qtd.value = "";
    valor.value = "";
    descricao.focus();
}

function exibirProdutos() {
    const listaUl = document.getElementById("listaProdutos");

    listaUl.innerHTML = produtos.map(item => `
        <li>
            <strong>Código:</strong> ${item.codigo} | 
            <strong>Produto:</strong> ${item.descricao} | 
            <strong>Qtd:</strong> ${item.quantidade} | 
            <strong>Valor:</strong> R$ ${item.valor}
        </li>
    `).join('');
}
function Atualizar(){
    
    let buscarcod = prompt("Digite o Codigo do produto que deseja atualizar:");
    if (buscarcod !== null && buscarcod.trim() !==""){
        let codigo = Number(buscarcod) -1;
        if(codigo < produtos.length){
            let novoV = prompt("Digite o Novo Preco:");
            if (novoV !== null && novoV.trim() !== "" && Number(novoV) > 0 ){
                produtos[codigo].valor = Number(novoV);
                exibirProdutos();
            } 
            else{
                alert("Operacao cancelada por valor invalido.");
            }
        } else{
            alert("Codigo invalido.");
        }
    } else{
        alert("Operacao cancelada ou codigo invalido.");
    }
}


function Excluir(){
   
    let buscarcod = prompt("Digite o codigo do produto que deseja excluir:");
    if (buscarcod !== null && buscarcod.trim() !== ""){
     let codigo = Number(buscarcod) -1;
     if(codigo >= 0 && codigo < produtos.length){
           
        produtos.splice(codigo, 1);
        for (let i = 0; i < produtos.length; i++){
            produtos[i].codigo = i + 1;
        }
        exibirProdutos();
        alert("Produto excluido com sucesso!");
     }else{
        alert("codigo invalido ou produto nao encontrado.");
     }
    }else{
        alert("Operecao cancelada ou codigo invalido.");
      }
    }

function ValidarProdutos(descricao, qtd, valor){
    if (descricao.length < 5){
        alert("A descrição deve ter +4 caractere"); 
        throw new Error("A descrição deve ter +4 caractere");    
    }
    if(qtd < 1){
         alert("Quantidade deve ser maior que zero");
        throw new Error("Quantidade deve ser maior que zero");   
    }
    if(valor <= 0){
        alert("valor deve ser maior que zero"); 
        throw new Error("valor deve ser maior que zero");  
    }
}
