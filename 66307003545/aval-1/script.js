let produtos = [];

function cadastrar() {

    let codigo = document.getElementById("codigo").value;
    let descricao = document.getElementById("descricao").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    if (codigo == "" || descricao == "" ||
        quantidade < 0 || valor < 0) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    produtos.push({
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    });

    alert("Produto cadastrado com sucesso!");

    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";
}

function listar() {

    let lista = document.getElementById("lista");

    lista.innerHTML = "";

    for (let i = 0; i < produtos.length; i++) {

        lista.innerHTML += `
            <p>
            Código: ${produtos[i].codigo}<br>
            Descrição: ${produtos[i].descricao}<br>
            Quantidade: ${produtos[i].quantidade}<br>
            Valor: R$ ${produtos[i].valor.toFixed(2)}
            </p>
            <hr>
        `;
    }

    if (produtos.length == 0) {
        lista.innerHTML = "Nenhum produto cadastrado.";
    }
}

function alterarValor() {

    let codigo = document.getElementById("codigoAlterar").value;
    let novoValor = Number(document.getElementById("novoValor").value);

    for (let i = 0; i < produtos.length; i++) {

        if (produtos[i].codigo == codigo) {

            produtos[i].valor = novoValor;

            alert("Valor alterado com sucesso!");
            listar();
            return;
        }
    }

    alert("Produto não encontrado!");
}

function alterarQuantidade() {

    let codigo = document.getElementById("codigoAlterar").value;
    let novaQuantidade = Number(document.getElementById("novaQuantidade").value);

    for (let i = 0; i < produtos.length; i++) {

        if (produtos[i].codigo == codigo) {

            produtos[i].quantidade = novaQuantidade;

            alert("Quantidade alterada com sucesso!");
            listar();
            return;
        }
    }

    alert("Produto não encontrado!");
}