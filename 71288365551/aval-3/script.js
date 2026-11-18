
document.getElementById("btAdd").onclick = Add;
document.getElementById("btAtualizar").onclick = Atualizar;
document.getElementById("btExcluir").onclick = Excluir;

const descricao = document.getElementById("nomeP");
const qtd = document.getElementById("qtdP");
const valor = document.getElementById("precoP");

let produtos = [];

function Add(){

    ValidarProdutos(descricao.value, Number(qtd.value), Number(valor.value));

    let novoProduto = {
        codigo: produtos.length + 1,
        descricao: descricao.value,
        quantidade: Number(qtd.value),
        valor: Number(valor.value)
    };

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
        <li class="item-produto">
            <strong>Código:</strong> ${item.codigo} |
            <strong>Produto:</strong> ${item.descricao} |
            <strong>Qtd:</strong> ${item.quantidade} |
            <strong>Valor:</strong> R$ ${item.valor.toFixed(2)}
        </li>
    `).join('');
}

function Atualizar(){
    alert("Agora a função foi implementada!");
}

function Excluir(){
    alert("Agora a função foi implementada!");
}

function ValidarProdutos(descricao, qtd, valorr){

    if (descricao.trim().length < 5){
        alert("A descrição deve ter pelo menos 5 caracteres");
        throw new Error("Descrição inválida");
    }

    if(qtd < 1 || !Number.isFinite(qtd)){
        alert("Quantidade deve ser maior que zero");
        throw new Error("Quantidade inválida");
    }

    if(valorr <= 0 || !Number.isFinite(valorr)){
        alert("Valor deve ser maior que zero");
        throw new Error("Valor inválido");
    }
}
