
const btAdd = document.getElementById("btAdd");
const btAtualizar = document.getElementById("btAtualizar");
const btExcluir = document.getElementById("btExcluir");

const descricao = document.getElementById("nomeP");
const qtd = document.getElementById("qtdP");
const valor = document.getElementById("valorP");

let produtos = [];

// Eventos dos botões
btAdd.onclick = Add;
btAtualizar.onclick = Atualizar;
btExcluir.onclick = Excluir;

// Adicionar produto
function Add() {

    if (!ValidarProdutos(descricao.value, qtd.value, valor.value)) {
        return;
    }

    let novoProduto = {
        codigo: produtos.length > 0
            ? Math.max(...produtos.map(p => p.codigo)) + 1
            : 1,
        descricao: descricao.value.trim(),
        quantidade: Number(qtd.value),
        valor: Number(valor.value)
    };

    produtos.push(novoProduto);

    limparCampos();
    exibirProdutos();

    alert("Produto adicionado com sucesso!");
}

// Limpar campos
function limparCampos() {
    descricao.value = "";
    qtd.value = "";
    valor.value = "";
    descricao.focus();
}

// Exibir produtos
function exibirProdutos() {

    const listaUL = document.getElementById("listaProdutos");

    listaUL.innerHTML = produtos.map(item => `
        <li class="item-produto">
            <strong>Código:</strong> ${item.codigo} |
            <strong>Produto:</strong> ${item.descricao} |
            <strong>Qtd:</strong> ${item.quantidade} |
            <strong>Valor:</strong> R$ ${item.valor.toFixed(2)}
        </li>
    `).join("");
}

// Atualizar produto
function Atualizar() {

    let codigo = Number(prompt("Digite o código do produto que deseja atualizar:"));

    if (!codigo || !produtos.some(p => p.codigo === codigo)) {
        alert("Produto não encontrado!");
        return;
    }

    let produto = produtos.find(p => p.codigo === codigo);

    let novaDescricao = prompt("Digite o novo nome:", produto.descricao);
    if (novaDescricao === null) return;

    let novaQtd = prompt("Digite a nova quantidade:", produto.quantidade);
    if (novaQtd === null) return;

    let novoValor = prompt("Digite o novo valor:", produto.valor);
    if (novoValor === null) return;

    if (!ValidarProdutos(novaDescricao, novaQtd, novoValor)) {
        return;
    }

    produto.descricao = novaDescricao.trim();
    produto.quantidade = Number(novaQtd);
    produto.valor = Number(novoValor);

    exibirProdutos();

    alert("Produto atualizado com sucesso!");
}

// Excluir produto
function Excluir() {

    let codigo = Number(prompt("Digite o código do produto que deseja excluir:"));

    let indice = produtos.findIndex(p => p.codigo === codigo);

    if (indice === -1 || !codigo) {
        alert("Produto não encontrado!");
        return;
    }

    let confirmar = confirm("Deseja realmente excluir este produto?");

    if (confirmar) {
        produtos.splice(indice, 1);
        exibirProdutos();

        alert("Produto excluído com sucesso!");
    }
}

// Validar produtos
function ValidarProdutos(descricao, qtd, valor) {

    if (descricao.trim().length < 5) {
        alert("A descrição deve ter mais de 4 caracteres.");
        return false;
    }

    if (qtd.trim() === "" || !Number.isFinite(Number(qtd)) || Number(qtd) < 1) {
        alert("A quantidade deve ser um número maior que zero.");
        return false;
    }

    if (valor.trim() === "" || !Number.isFinite(Number(valor)) || Number(valor) <= 0) {
        alert("O valor deve ser um número maior que zero.");
        return false;
    }

    return true;
}
