
document.getElementById("btAdd").onclick = Add;
document.getElementById("btAtualizar").onclick = Atualizar;
document.getElementById("btExcluir").onclick = Excluir;

const descricao = document.getElementById("nomeP");
const qtd = document.getElementById("qtdP");
const valor = document.getElementById("precoP");

let produtos = [];

function Add() {

    ValidarProdutos(descricao.value, qtd.value, valor.value);

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

function limparCampos() {
    descricao.value = "";
    qtd.value = "";
    valor.value = "";
    descricao.focus();
}

function exibirProdutos() {

    const listaUL = document.getElementById("listaProdutos");

    listaUL.innerHTML = produtos.map(item => `
        <li>
            <strong>Código:</strong> ${item.codigo} |
            <strong>Produto:</strong> ${item.descricao} |
            <strong>Qtd:</strong> ${item.quantidade} |
            <strong>Valor:</strong> R$ ${item.valor.toFixed(2)}
        </li>
    `).join('');
}

function Atualizar() {
    alert("Agora a função foi implementada!");
}

function Excluir() {
    alert("Agora a função foi implementada!");
}

function ValidarProdutos(descricao, qtd, valor) {

    if (descricao.trim().length < 5) {
        alert("A descrição deve ter mais de 4 caracteres.");
        throw new Error("Descrição inválida.");
    }

    if (qtd === "" || Number(qtd) < 1) {
        alert("Quantidade deve ser maior que zero.");
        throw new Error("Quantidade inválida.");
    }

    if (valor === "" || Number(valor) <= 0) {
        alert("Valor deve ser maior que zero.");
        throw new Error("Valor inválido.");
    }

    if (!Number.isFinite(Number(qtd)) || !Number.isFinite(Number(valor))) {
        alert("Informe valores numéricos válidos.");
        throw new Error("Valor numérico inválido.");
    }
}
