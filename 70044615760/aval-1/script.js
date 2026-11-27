let produtos = [];
let contadorCodigo = 0;
const formProduto = document.getElementById("formProduto");
const listaProdutos = document.getElementById("listaProdutos");
const mensagemErro = document.getElementById("erro");
function validarProduto(descricao, quantidade, valor) {
if (descricao.trim().length < 5) {
throw new Error("Descrição deve ter no mínimo cinco caracteres.");
}
if (!Number.isInteger(quantidade) || quantidade < 1) {
throw new Error("Quantidade deve ser maior que zero.");
}
if (!Number.isFinite(valor) || valor < 0) {
throw new Error("Valor deve ser maior ou igual a zero.");
}
}
function cadastrarProduto(descricao, quantidade, valor) {
validarProduto(descricao, quantidade, valor);
contadorCodigo++;
const novoProduto = {
codigo: contadorCodigo,
descricao: descricao.trim(),
quantidade: quantidade,
valor: valor
};
produtos.push(novoProduto);
listarProdutos();
}
function listarProdutos() {
listaProdutos.innerHTML = "";
produtos.forEach(produto => {
const linha = document.createElement("tr");
linha.innerHTML = `
<td>${produto.codigo}</td>
<td></td>
<td>${produto.quantidade}</td>
<td>${produto.valor.toFixed(2)}</td>
`;
linha.children[1].textContent = produto.descricao;
const acoes = document.createElement("td");
const botaoValor = document.createElement("button");
botaoValor.textContent = "Alterar valor";
botaoValor.onclick = () => {
const novoValor = Number(prompt("Digite o novo valor:"));
try {
atualizarValor(produto.codigo, novoValor);
} catch (erro) {
alert(erro.message);
}
};
const botaoQuantidade = document.createElement("button");
botaoQuantidade.textContent = "Adicionar estoque";
botaoQuantidade.onclick = () => {
const quantidade = Number(prompt("Quantidade a adicionar:"));
try {
atualizarQuantidade(produto.codigo, quantidade);
} catch (erro) {
alert(erro.message);
}
};
const botaoExcluir = document.createElement("button");
botaoExcluir.textContent = "Excluir";
botaoExcluir.className = "excluir";
botaoExcluir.onclick = () => {
produtos = produtos.filter(p => p.codigo !== produto.codigo);
listarProdutos();
};
acoes.append(botaoValor, botaoQuantidade, botaoExcluir);
linha.appendChild(acoes);
listaProdutos.appendChild(linha);
});
}
function buscarProduto(codigoProduto) {
const produto = produtos.find(
p => p.codigo === codigoProduto
);
if (!produto) {
throw new Error("Produto não encontrado.");
}
return produto;
}
function atualizarValor(codigoProduto, novoValor) {
if (!Number.isFinite(novoValor) || novoValor < 0) {
throw new Error("Valor deve ser maior ou igual a zero.");
}
const produto = buscarProduto(codigoProduto);
produto.valor = novoValor;
listarProdutos();
}
function atualizarQuantidade(codigoProduto, novaQuantidade) {
if (!Number.isInteger(novaQuantidade) || novaQuantidade < 1) {
throw new Error("Quantidade deve ser maior que zero.");
}
const produto = buscarProduto(codigoProduto);
produto.quantidade += novaQuantidade;
listarProdutos();
}
formProduto.addEventListener("submit", function(event) {
event.preventDefault();
try {
cadastrarProduto(
document.getElementById("descricao").value,
Number(document.getElementById("quantidade").value),
Number(document.getElementById("valor").value)
);
mensagemErro.hidden = true;
formProduto.reset();
} catch (erro) {
mensagemErro.textContent = erro.message;
mensagemErro.hidden = false;
}
}); 2. Gerenciador