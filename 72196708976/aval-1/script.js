
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
    alert("Agora a função foi implementada!");
}

function Excluir(){
    alert("Agora a função foi implementada!");
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
