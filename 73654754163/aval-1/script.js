
let produtos = [];

function cadastrar() {

    let codigo = document.getElementById("codigo").value;
    let descricao = document.getElementById("descricao").value;
    let quantidade = document.getElementById("quantidade").value;
    let valor = document.getElementById("valor").value;

    let produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    listar();

    alert("Produto cadastrado!");

}

function listar() {

    let texto = "";

    for (let i = 0; i < produtos.length; i++) {

        texto +=
            "Código: " + produtos[i].codigo + "<br>" +
            "Descrição: " + produtos[i].descricao + "<br>" +
            "Quantidade: " + produtos[i].quantidade + "<br>" +
            "Valor: R$ " + produtos[i].valor + "<br>" +

            "<button onclick='alterarValor(" + i + ")'>Alterar Valor</button> " +

            "<button onclick='alterarQuantidade(" + i + ")'>Alterar Quantidade</button><hr>";

    }

    document.getElementById("lista").innerHTML = texto;

}

function alterarValor(i) {

    let novoValor = prompt("Digite o novo valor:");

    produtos[i].valor = novoValor;

    listar();

}

function alterarQuantidade(i) {

    let novaQuantidade = prompt("Digite a nova quantidade:");

    produtos[i].quantidade = novaQuantidade;

    listar();

}

let produtos = [];

function cadastrar() {

    let codigo = document.getElementById("codigo").value;
    let descricao = document.getElementById("descricao").value;
    let quantidade = document.getElementById("quantidade").value;
    let valor = document.getElementById("valor").value;

    let produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    listar();

    alert("Produto cadastrado!");

}

function listar() {

    let texto = "";

    for (let i = 0; i < produtos.length; i++) {

        texto +=
            "Código: " + produtos[i].codigo + "<br>" +
            "Descrição: " + produtos[i].descricao + "<br>" +
            "Quantidade: " + produtos[i].quantidade + "<br>" +
            "Valor: R$ " + produtos[i].valor + "<br>" +

            "<button onclick='alterarValor(" + i + ")'>Alterar Valor</button> " +

            "<button onclick='alterarQuantidade(" + i + ")'>Alterar Quantidade</button><hr>";

    }

    document.getElementById("lista").innerHTML = texto;

}

function alterarValor(i) {

    let novoValor = prompt("Digite o novo valor:");

    produtos[i].valor = novoValor;

    listar();

}

function alterarQuantidade(i) {

    let novaQuantidade = prompt("Digite a nova quantidade:");

    produtos[i].quantidade = novaQuantidade;

    listar();

}

let produtos = [];

function cadastrar() {

    let codigo = document.getElementById("codigo").value;
    let descricao = document.getElementById("descricao").value;
    let quantidade = document.getElementById("quantidade").value;
    let valor = document.getElementById("valor").value;

    let produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    listar();

    alert("Produto cadastrado!");

}

function listar() {

    let texto = "";

    for (let i = 0; i < produtos.length; i++) {

        texto +=
            "Código: " + produtos[i].codigo + "<br>" +
            "Descrição: " + produtos[i].descricao + "<br>" +
            "Quantidade: " + produtos[i].quantidade + "<br>" +
            "Valor: R$ " + produtos[i].valor + "<br>" +

            "<button onclick='alterarValor(" + i + ")'>Alterar Valor</button> " +

            "<button onclick='alterarQuantidade(" + i + ")'>Alterar Quantidade</button><hr>";

    }

    document.getElementById("lista").innerHTML = texto;

}

function alterarValor(i) {

    let novoValor = prompt("Digite o novo valor:");

    produtos[i].valor = novoValor;

    listar();

}

function alterarQuantidade(i) {

    let novaQuantidade = prompt("Digite a nova quantidade:");

    produtos[i].quantidade = novaQuantidade;

    listar();

}

let produtos = [];

function cadastrar() {

    let codigo = document.getElementById("codigo").value;
    let descricao = document.getElementById("descricao").value;
    let quantidade = document.getElementById("quantidade").value;
    let valor = document.getElementById("valor").value;

    let produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    listar();

    alert("Produto cadastrado!");

}

function listar() {

    let texto = "";

    for (let i = 0; i < produtos.length; i++) {

        texto +=
            "Código: " + produtos[i].codigo + "<br>" +
            "Descrição: " + produtos[i].descricao + "<br>" +
            "Quantidade: " + produtos[i].quantidade + "<br>" +
            "Valor: R$ " + produtos[i].valor + "<br>" +

            "<button onclick='alterarValor(" + i + ")'>Alterar Valor</button> " +

            "<button onclick='alterarQuantidade(" + i + ")'>Alterar Quantidade</button><hr>";

    }

    document.getElementById("lista").innerHTML = texto;

}

function alterarValor(i) {

    let novoValor = prompt("Digite o novo valor:");

    produtos[i].valor = novoValor;

    listar();

}

function alterarQuantidade(i) {

    let novaQuantidade = prompt("Digite a nova quantidade:");

    produtos[i].quantidade = novaQuantidade;

    listar();

}

let produtos = [];

function cadastrar() {

    let codigo = document.getElementById("codigo").value;
    let descricao = document.getElementById("descricao").value;
    let quantidade = document.getElementById("quantidade").value;
    let valor = document.getElementById("valor").value;

    let produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    listar();

    alert("Produto cadastrado!");

}

function listar() {

    let texto = "";

    for (let i = 0; i < produtos.length; i++) {

        texto +=
            "Código: " + produtos[i].codigo + "<br>" +
            "Descrição: " + produtos[i].descricao + "<br>" +
            "Quantidade: " + produtos[i].quantidade + "<br>" +
            "Valor: R$ " + produtos[i].valor + "<br>" +

            "<button onclick='alterarValor(" + i + ")'>Alterar Valor</button> " +

            "<button onclick='alterarQuantidade(" + i + ")'>Alterar Quantidade</button><hr>";

    }

    document.getElementById("lista").innerHTML = texto;

}

function alterarValor(i) {

    let novoValor = prompt("Digite o novo valor:");

    produtos[i].valor = novoValor;

    listar();

}

function alterarQuantidade(i) {

    let novaQuantidade = prompt("Digite a nova quantidade:");

    produtos[i].quantidade = novaQuantidade;

    listar();

}

let produtos = [];

function cadastrar() {

    let codigo = document.getElementById("codigo").value;
    let descricao = document.getElementById("descricao").value;
    let quantidade = document.getElementById("quantidade").value;
    let valor = document.getElementById("valor").value;

    let produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    listar();

    alert("Produto cadastrado!");

}

function listar() {

    let texto = "";

    for (let i = 0; i < produtos.length; i++) {

        texto +=
            "Código: " + produtos[i].codigo + "<br>" +
            "Descrição: " + produtos[i].descricao + "<br>" +
            "Quantidade: " + produtos[i].quantidade + "<br>" +
            "Valor: R$ " + produtos[i].valor + "<br>" +

            "<button onclick='alterarValor(" + i + ")'>Alterar Valor</button> " +

            "<button onclick='alterarQuantidade(" + i + ")'>Alterar Quantidade</button><hr>";

    }

    document.getElementById("lista").innerHTML = texto;

}

function alterarValor(i) {

    let novoValor = prompt("Digite o novo valor:");

    produtos[i].valor = novoValor;

    listar();

}

function alterarQuantidade(i) {

    let novaQuantidade = prompt("Digite a nova quantidade:");

    produtos[i].quantidade = novaQuantidade;

    listar();

}

let produtos = [];

function cadastrar() {

    let codigo = document.getElementById("codigo").value;
    let descricao = document.getElementById("descricao").value;
    let quantidade = document.getElementById("quantidade").value;
    let valor = document.getElementById("valor").value;

    let produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    listar();

    alert("Produto cadastrado!");

}

function listar() {

    let texto = "";

    for (let i = 0; i < produtos.length; i++) {

        texto +=
            "Código: " + produtos[i].codigo + "<br>" +
            "Descrição: " + produtos[i].descricao + "<br>" +
            "Quantidade: " + produtos[i].quantidade + "<br>" +
            "Valor: R$ " + produtos[i].valor + "<br>" +

            "<button onclick='alterarValor(" + i + ")'>Alterar Valor</button> " +

            "<button onclick='alterarQuantidade(" + i + ")'>Alterar Quantidade</button><hr>";

    }

    document.getElementById("lista").innerHTML = texto;

}

function alterarValor(i) {

    let novoValor = prompt("Digite o novo valor:");

    produtos[i].valor = novoValor;

    listar();

}

function alterarQuantidade(i) {

    let novaQuantidade = prompt("Digite a nova quantidade:");

    produtos[i].quantidade = novaQuantidade;

    listar();

}
