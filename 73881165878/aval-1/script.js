

let produtos = [];

function cadastrar() {

    let codigo = document.getElementById("codigo").value.trim();

    let descricao = document.getElementById("descricao").value.trim();

    let quantidade = document.getElementById("quantidade").value;

    let valor = document.getElementById("valor").value;

    if (codigo === "" || descricao === "" ||

        quantidade === "" || valor === "" ||

        Number(quantidade) < 0 || Number(valor) < 0) {

        alert("Preencha todos os campos corretamente!");

        return;

    }

    if (produtos.some(p => p.codigo === codigo)) {

        alert("Código já cadastrado!");

        return;

    }

    produtos.push({

        codigo,

        descricao,

        quantidade: Number(quantidade),

        valor: Number(valor)

    });

    alert("Produto cadastrado com sucesso!");

    document.getElementById("codigo").value = "";

    document.getElementById("descricao").value = "";

    document.getElementById("quantidade").value = "";

    document.getElementById("valor").value = "";

    listar();

}

function listar() {

    let lista = document.getElementById("lista");

    lista.innerHTML = "";

    if (produtos.length === 0) {

        lista.textContent = "Nenhum produto cadastrado.";

        return;

    }

    produtos.forEach(p => {

        let div = document.createElement("div");

        div.className = "produto";

        div.textContent =

            "Código: " + p.codigo +

            " | Descrição: " + p.descricao +

            " | Quantidade: " + p.quantidade +

            " | Valor: R$ " + p.valor.toFixed(2);

        lista.appendChild(div);

    });

}

function alterarValor() {

    let codigo = document.getElementById("codigoAlterar").value.trim();

    let novoValor = document.getElementById("novoValor").value;

    let produto = produtos.find(p => p.codigo === codigo);

    if (!produto) {

        alert("Produto não encontrado!");

        return;

    }

    if (novoValor === "" || Number(novoValor) < 0) {

        alert("Digite um valor válido!");

        return;

    }

    produto.valor = Number(novoValor);

    alert("Valor alterado!");

    listar();

}

function alterarQuantidade() {

    let codigo = document.getElementById("codigoAlterar").value.trim();

    let novaQuantidade = document.getElementById("novaQuantidade").value;

    let produto = produtos.find(p => p.codigo === codigo);

    if (!produto) {

        alert("Produto não encontrado!");

        return;

    }

    if (novaQuantidade === "" || Number(novaQuantidade) < 0) {

        alert("Digite uma quantidade válida!");

        return;

    }

    produto.quantidade = Number(novaQuantidade);

    alert("Quantidade alterada!");

    listar();