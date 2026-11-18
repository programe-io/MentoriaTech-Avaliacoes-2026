
document.getElementById("btAdd").onclick = Add;
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
        "valor": valor.value
    }

    produtos.push(novoProduto);
    limparCampos();
    exibirProdutos();
}

function ValidarProdutos(descricao, qtd, valor){
    if (descricao.length < 5){
        alert("A descrição deve ter +4 caracteres");
        throw new Error("A descrição deve ter +4 caracteres");
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

function exibirProdutos() {
    const listaUl = document.getElementById("listaProdutos");

    listaUl.innerHTML = produtos.map(item =>
        `<li>
            <strong>Código:</strong> ${item.codigo} |
            <strong>Produto:</strong> ${item.descricao} |
            <strong>Qtd:</strong> ${item.quantidade} |
            <strong>Valor:</strong> R$ ${item.valor}
        </li>`
    ).join('');
}

function Atualizar(){

    let buscarcod = prompt("Digite o código do produto que deseja atualizar:");

    if (buscarcod !== null && buscarcod.trim() !== "") {

        let codigo = Number(buscarcod) - 1;

        if(codigo < produtos.length){
            let novoV = prompt("Digite o novo Preço:");

            if (novoV !== null && novoV.trim() !== "" && Number(novoV) > 0) {
                produtos[codigo].valor = Number(novoV);
                exibirProdutos();
            } else {
                alert("Operação cancelada ou valor inválido.");
            }
        } else {
            alert("Código inválido.");
        }
    } else {
        alert("Operação cancelada ou código inválido.");
    }
}

function Excluir(){

    let buscarcod = prompt("Digite o código do produto que deseja excluir:");

    if (buscarcod !== null && buscarcod.trim() !== "") {

        let codigo = Number(buscarcod) - 1;

        if(codigo >= 0 && codigo < produtos.length){

            produtos.splice(codigo, 1);

            for (let i = 0; i < produtos.length; i++) {
                produtos[i].codigo = i + 1;
            }

            exibirProdutos();
            alert("Produto excluído com sucesso!");
        } else {
            alert("Código inválido ou produto não encontrado.");
        }
    } else {
        alert("Operação cancelada ou código inválido.");
    }
}

function limparCampos(){
    descricao.value = "";
    qtd.value = "";
    valor.value = "";
    descricao.focus();
}
