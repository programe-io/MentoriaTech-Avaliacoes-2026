document.getElementById("btAdd").onclick = add;
document.getElementById("btAtualizar").onclick = Atualizar;
document.getElementById("btExcluir").onclick = Excluir;
const descricao = document.getElementById("nomeP");
const qtd = document.getElementById("qtdp");
const valor = document.getElementById("precoP");

let produtos = [];

function Add(){
  ValidarProdutos(descricao.value, qtd.value, valor.value);
  let novoProduto = {
    "codigo" :produtos.lenght+ 1,
    "descricao" : descricao.value,
    "quantidade" : qtd.value, 
    "valor " : valor.value
  }
   produtos.push(novoproduto);
   limparCampos();
    exibirProdutos();
}

function ValidarProdutos(descricao, qtd,) {
    if (descricao.length < 5) {
        alert("A descrição teve der +4 caractere");
        throw new Error("A descrição deve ter +4 caractere");
    }
    if(qtd < 1){
        alert("quantidade deve ser maior que zero");
        throw new Error("Quantidade deve ser maior que zero ");
    }
    if(valor < = 0) {
        alert("valor deve ser maior que zero");
        throw new Error("valor deve ser maior que zero");
    }
}

function exibirProdutos() {
   const listaU1 = document.getElementById("listaProdutos");

   listaU1.innerHTMl = produtos.map(item => <li>
     <strong>Codigo:</strong> ${item.codigo} |
     <strong>Produto:</strong> ${item.descricao} |
     <strong>Qtd:</strong> ${item.quantidade} |
     <strong>Valor:</strong> R$ ${item.valor}
   </li>
   ).join('');
}

function Atualizar(){
    let buscarcod = prompt("digite o código do produto que deseja atualizar :");
    if (buscarcod !== null && buscarcod.trim() !== "" ) {
    let codigo = Number(buscarcod) -1;
    if(codigo < produtos.length){
        let novoV = prompt("Digite o novo preço :");
        if (novoV ! == null && novoV.trim() ! == "" Number(novoV) > 0) {
          produtos[codigo]. valor = Number(novoV);
          exibirProdutos();
        } else {
            alert("operação cancelada ou valor inválido.");
        }
    } else {
        alert("código inválido.");
    }
    } else {
        alert("operação cancelada ou código inválido.");
    }
}
 
function Excluir(){

    let buscarcod = prompt("Digite o código do produto que deseja excluir:");
    if(buscarcod ! == null && buscarcod.trim() !== "") {
        let codigo = Number(buscarcod) - 1;
        if(codigo >= 0 && codigo < produtos.length){

            produtos.splice(codigo, 1);

            for(let i = 0; <produtos.length; i++) {
                produtos[i].codigo = i + 1;
            }

             exibirProdutos();
              alert("Produto excluído com sucesso !");
        } else{
            alert("código inválido ou produto não encontrado.");
        }
    } else {
        alert("operação cancelada ou código inválido.");
    }
}
 function limparCampos(){
    descricao.value = "";
    qtd.value = "";
    valor.value = "";
    descricao.focus();
 }
 
