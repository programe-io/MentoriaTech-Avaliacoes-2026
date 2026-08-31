// Produtos que já começam cadastrados
let produtos = [
    {
        codigo: 1,
        descricao: "Arroz 5kg",
        quantidade: 20,
        valor: 25.90
    },
    {
        codigo: 2,
        descricao: "Feijão 1kg",
        quantidade: 15,
        valor: 8.50
    },
    {
        codigo: 3,
        descricao: "Macarrão 500g",
        quantidade: 30,
        valor: 5.99
    },
    {
        codigo: 4,
        descricao: "Óleo de Soja 900ml",
        quantidade: 12,
        valor: 7.49
    },
    {
        codigo: 5,
        descricao: "Açúcar 1kg",
        quantidade: 25,
        valor: 4.99
    }
];


// Cadastrar novo produto
function cadastrarProduto() {

    let codigo = Number(document.getElementById("codigo").value);
    let descricao = document.getElementById("descricao").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    if (!codigo || !descricao || !quantidade || !valor) {
        alert("Preencha todos os campos!");
        return;
    }

    let produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    alert("Produto cadastrado com sucesso!");

    // Limpar os campos
    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";

    listarProdutos();
}


// Listar produtos
function listarProdutos() {

    let tabela = document.getElementById("tabelaProdutos");

    tabela.innerHTML = "";

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

    let codigo = Number(
        document.getElementById("codigoAlteracao").value
    );

    let novoValor = Number(
        document.getElementById("novoValor").value
    );

    let produto = produtos.find(function(produto) {
        return produto.codigo === codigo;
    });

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    if (!novoValor) {
        alert("Digite um novo valor!");
        return;
    }

    produto.valor = novoValor;

    alert("Valor alterado com sucesso!");

    document.getElementById("codigoAlteracao").value = "";
    document.getElementById("novoValor").value = "";

    listarProdutos();
}


// Alterar quantidade
function alterarQuantidade() {

    let codigo = Number(
        document.getElementById("codigoAlteracao").value
    );

    let novaQuantidade = Number(
        document.getElementById("novaQuantidade").value
    );

    let produto = produtos.find(function(produto) {
        return produto.codigo === codigo;
    });

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    if (!novaQuantidade) {
        alert("Digite uma nova quantidade!");
        return;
    }

    produto.quantidade = novaQuantidade;

    alert("Quantidade alterada com sucesso!");

    document.getElementById("codigoAlteracao").value = "";
    document.getElementById("novaQuantidade").value = "";

    listarProdutos();
}


// Mostrar os produtos assim que a página abrir
listarProdutos();
