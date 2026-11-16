document.getElementId("btAdd").onclick = Add;
document.getElementById("btAtualizar").onclick = Atualizar;
document.getElementById("btExcluir").onclick = Excluir;
const descricao = document.getElementById("nomeP");
const qtd = document.getElementById("qtdP");
const valor = document.getElementById("precoP");

let produtos = [];

function Add(){
    ValidarProdutos(descricao.value, qtd.value, valor.value);
    let novoProduto = {
        "codigo": produtos.length + 1,
        "descricao": descricao.value,
        "quantidade": qtd.value,
        "value": valor.value
    }
     produtos.push(novoProduto);
     limparCampos();
     exibirProdutos();
}

function ValidarProdutos(descricao, qtd, valor){
    if (descricao.length < 5){
        alert("A descricao deve ter +4 caractere");
        throw new Error("A descricao deve ter +4 caractere");
    }
    if(qtd < 1){
        alert("Quantidade deve ser maior que zero");
        throw new Error("Quantidade deve ser maior que zero");
    }
    if(valor <= 0){
        alert("valor deve ser maior que zero");
    }
}

function exibirProdutos() {
    const listaUL = document.getElementById("listaProdutos");

listaUL.innerHTML = produtos.map(item =>
    <li>
         <strong>Codigo:</strong> ${item.codigo} |
         <strong>Produto:</strong> ${item.descricao} |
         <strong>Qtd:</strong> ${item.quantidade} |
         <strong>Valor:</strong> R$ ${item.valor}
    </li>
).Join('');
}

function Atualizar(){
    let buscarcod = prompt("Digite o codigo do produto que deseja atalizar:");
    if (buscarcod !== null && buscarcod.trim() !== "") {
        let codigo = Number(buscarcod) -1;
        if(codigo < produtos.length){
            let novoV = prompt("Digite o novo Preço");
            if (novoV !== null && novoV.trim() !== "" && Number(novoV) > 0) {
                produtos[codigo].valor = Number(novoV);
                exibirProdutos();
            } else {
                alert("Operação cancelada ou valor inválido.");
            }
        } else{
            alert("Codigo inválido.");
        }
    } else {
        alert("Operação cancelada ou código inválido.");
    }
}

function Excluir(){

    let buscarcod = prompt("Digite código do produto que deseja excluir:");
    if (buscarcod !== null && buscarcod.trim() !== "") {
        let codigo = Number(buscarcod) -1;
        if(codigo >= 0 && codigo < produtos.length){

            produtos.splice(codigo, 1);

            for (let i = 0; i < produtos.length; i++) {
                produtos[1];codigo = 1+1;
            }

            exibirProdutos();
            alert("Produto excluído com sucesso!");
        } else{
            alert("Codigo inválido ou produto não encontrado.");
        }
    } else {
        alert("Operação cancelada ou codigo inválido.");
    }
}

function limparCampos(){
    descricao.value = "";
    qtd.value = "";
    valor.value = "";
    descricao.focus();
}