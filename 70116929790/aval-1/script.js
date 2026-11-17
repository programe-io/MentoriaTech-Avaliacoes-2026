
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
        "quantidade": Number(qtd.value),
        "valor": Number(valor.value)
    };

    produtos.push(novoProduto);

    limparCampos();
    exibirProdutos();
}

function ValidarProdutos(descricao, qtd, valor){

    if (descricao.trim().length < 5){
        alert("A descrição deve ter +4 caracteres");
        throw new Error("A descrição deve ter +4 caracteres");
    }

    if (qtd === "" || Number(qtd) < 1){
        alert("Quantidade deve ser maior que zero");
        throw new Error("Quantidade deve ser maior que zero");
    }

    if (valor === "" || Number(valor) <= 0){
        alert("Valor deve ser maior que zero");
        throw new Error("Valor deve ser maior que zero");
    }

    if (!Number.isFinite(Number(qtd)) || !Number.isFinite(Number(valor))){
        alert("Digite valores numéricos válidos");
        throw new Error("Valores inválidos");
    }
}

function exibirProdutos(){

    const listaUl = document.getElementById("listaProdutos");

    listaUl.innerHTML = produtos.map(item =>
        `<li class="item-produto">
            <strong>Código:</strong> ${item.codigo} |
            <strong>Produto:</strong> ${item.descricao} |
            <strong>Qtd:</strong> ${item.quantidade} |
            <strong>Valor:</strong> R$ ${item.valor.toFixed(2)}
        </li>`
    ).join('');
}

function Atualizar(){

    let buscarcod = prompt("Digite o código do produto que deseja atualizar:");

    if (buscarcod !== null && buscarcod.trim() !== ""){

        let codigo = Number(buscarcod) - 1;

        if(Number.isInteger(codigo) && codigo >= 0 && codigo < produtos.length){

            let novoV = prompt("Digite o novo Preço:");

            if (novoV !== null && novoV.trim() !== "" &&
                Number.isFinite(Number(novoV)) && Number(novoV) > 0){

                produtos[codigo].valor = Number(novoV);

                exibirProdutos();

                alert("Preço atualizado com sucesso!");

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

    if (buscarcod !== null && buscarcod.trim() !== ""){

        let codigo = Number(buscarcod) - 1;

        if(Number.isInteger(codigo) && codigo >= 0 && codigo < produtos.length){

            produtos.splice(codigo, 1);

            for (let i = 0; i < produtos.length; i++){
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
