// Produtos cadastrados inicialmente
let produtos = [
{
codigo: "001",
descricao: "Teclado",
quantidade: 10,
valor: 89.90
},

{
    codigo: "002",
    descricao: "Mouse",
    quantidade: 15,
    valor: 49.90
},

{
    codigo: "003",
    descricao: "Monitor 24 polegadas",
    quantidade: 5,
    valor: 799.90
},

{
    codigo: "004",
    descricao: "Headset",
    quantidade: 8,
    valor: 129.90
},

{
    codigo: "005",
    descricao: "Webcam",
    quantidade: 12,
    valor: 159.90
}


];

// Cadastrar produto
function cadastrarProduto() {

let codigo = document.getElementById("codigo").value;
let descricao = document.getElementById("descricao").value;
let quantidade = Number(
    document.getElementById("quantidade").value
);
let valor = Number(
    document.getElementById("valor").value
);

// Verificar se os campos foram preenchidos
if (
    codigo === "" ||
    descricao === "" ||
    quantidade < 0 ||
    valor < 0
) {
    alert("Preencha todos os campos corretamente!");
    return;
}

// Verificar se o código já existe
let produtoExistente = produtos.find(function(produto) {
    return produto.codigo === codigo;
});

if (produtoExistente) {
    alert("Já existe um produto com esse código!");
    return;
}

// Criar novo produto
let produto = {
    codigo: codigo,
    descricao: descricao,
    quantidade: quantidade,
    valor: valor
};

// Adicionar produto
produtos.push(produto);

alert("Produto cadastrado com sucesso!");

// Limpar os campos
limparCampos();

// Atualizar tabela
listarProdutos();


}

// Listar produtos
function listarProdutos() {

let tabela = document.getElementById("listaProdutos");

// Limpar tabela
tabela.innerHTML = "";

// Percorrer produtos
produtos.forEach(function(produto) {

    let linha = `
        <tr>
            <td>${produto.codigo}</td>
            <td>${produto.descricao}</td>
            <td>${produto.quantidade}</td>
            <td>R$ ${produto.valor.toFixed(2)}</td>
        </tr>
    `;

    tabela.innerHTML += linha;
});


}

// Alterar valor
function alterarValor() {

let codigo = document.getElementById("codigoAlterar").value;

let novoValor = Number(
    document.getElementById("novoValor").value
);

// Procurar produto
let produto = produtos.find(function(produto) {
    return produto.codigo === codigo;
});

if (!produto) {
    alert("Produto não encontrado!");
    return;
}

if (novoValor < 0 || isNaN(novoValor)) {
    alert("Digite um valor válido!");
    return;
}

// Alterar valor
produto.valor = novoValor;

alert("Valor alterado com sucesso!");

document.getElementById("novoValor").value = "";

listarProdutos();


}

// Alterar quantidade
function alterarQuantidade() {

let codigo = document.getElementById("codigoAlterar").value;

let novaQuantidade = Number(
    document.getElementById("novaQuantidade").value
);

// Procurar produto
let produto = produtos.find(function(produto) {
    return produto.codigo === codigo;
});

if (!produto) {
    alert("Produto não encontrado!");
    return;
}

if (novaQuantidade < 0 || isNaN(novaQuantidade)) {
    alert("Digite uma quantidade válida!");
    return;
}

// Alterar quantidade
produto.quantidade = novaQuantidade;

alert("Quantidade alterada com sucesso!");

document.getElementById("novaQuantidade").value = "";

listarProdutos();


}

// Limpar campos do cadastro
function limparCampos() {

document.getElementById("codigo").value = "";
document.getElementById("descricao").value = "";
document.getElementById("quantidade").value = "";
document.getElementById("valor").value = "";


}

// Mostrar os produtos assim que abrir a página
listarProdutos();