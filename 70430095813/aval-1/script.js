document.getElementById("btAdd").onclick = Add;
document.getElementById("btAtualizar").onclick = atualizar;
document.getElementById("btExcluir").onclick = excluir;

const descricao = document.getElementById("nomeP");
const quantidade = document.getElementById("qtdP");
const valor = document.getElementById("precoP");


let produtos = [];

function validarprodutos(descricao, qtd, valor) {
    if (descricao.length < 5) {
        alert("A descriçao deve ter +4 caractere");
        throw new Error("A descriçao deve ter +4 caracteres");
    }
    if (descricao.length < 5) {
        throw new Error("Descrição deve ter no mínimo 5 caracteres");
    }

    if (qtd < 1) {
        alert("valor deve ser maior que zero");
        throw new Error("Quantidade deve ser maior que zero");
    }

    if (valor <= 0) {
        alert("valor deve ser maior que zero");
        throw new Error("Valor deve ser maior ou igual a zero");
    }
}

function Add() {

    validarprodutos(descricao.value, quantidade.value, valor.value);
    
    let novoProduto={ 
        "codigo": produtos.length + 1,
        "descricao": descricao.value,
        "quantidade":quantidade.value,
        "valor":valor.value,
    }
    produtos.push(novoProduto);
    limparCampos();
    exibirprodutos();
}
function validarprodutos(descricao, qtd, valor) {
    if (descricao.length < 5) {
        alert("A descriçao deve ter +4 caractere");
        throw new Error("A descricao deve ter +4 caracteres");
    }
    if (qtd < 1) {
        alert("Quantidade deve ser maior que zero");
        throw new Error("Quandidade deve ser maior que zero");
    }
    if (valor <= 0) {
        alert("valor deve ser maior que zero");
        throw new Error("valor deve ser maior que zero");
    }
}
function exibirprodutos() {
    const listaU1 = document.getElementById("listaprodutos");

    lista.innerHTML = produtos.map(item => `
        <li>
            <strong>Código:</strong> ${item.codigo} |
            <strong>Produto:</strong> ${item.descricao} |
            <strong>Qtd:</strong> ${item.quantidade}
            <strong>Valor:</strong> R$ ${item.valor}
        </li>
    `).join('');
}
function atualizar() {
    let buscarcod = prompt("digite o codigo do produto que deseja atualizar:");
    if (buscarcod !== null && buscarcod.trim() !== !"") {
        let codigo = Number(buscarcod) - 1;
        if (codigo < produtos.length) {
            let novoV = prompt("Digite o novo preco:");
            if (novoV !== null && novoV.trim() !== "" && Number(novoV) > 0) {
                produtos[codigo].valor = Number(novoV);
                exibirprodutos();
            } else {
                alert("operacao cancelada ou valor invalido.");

            }
        } else {
            alert("codigo ivalido");

        }

    } else {
        alert("operacao cancelada ou codigo invalido.");
    }
}

function excluir() {
    let buscarcod = prompt("digite o codigo do produto que deseja excluir:");
    if (buscarcod !== null && buscarcod.trim() !== "") {
        let codigo = Number(buscarcod) - 1;
        if (codigo >= 0 && codigo < produtos.length) {

            produtos.splice(codigo, 1);

            for (let i = 0; i < produtos.length; i++) {
                produtos[i].codigo = i + 1;
            }
            exibirprodutos();
            alert("produto excluido com sucesso!");
        } else {
            alert("codigo invalido ou produto nao encontrado");
        }
    } else {
        alert("operacao cancelada ou codigo invalido.");

    }
}

function limparCampos() {
    descricao.value = "";
    qtd.value = "";
    valor.value = "";
    descricao.focus();
}



