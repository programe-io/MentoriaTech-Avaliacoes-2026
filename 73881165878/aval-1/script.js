let produtos = [];

function cadastrar() {

    let codigo = document.getElementById("codigo").value;

    let descricao = document.getElementById("descricao").value;

    let quantidade = Number(document.getElementById("quantidade").value);

    let valor = Number(document.getElementById("valor").value);

    if (!codigo || !descricao || quantidade < 0 || !valor) {

        alert("Preencha os campos corretamente!");

        return;

    }

    produtos.push({

        codigo,

        descricao,

        quantidade,

        valor

    });

    alert("Produto cadastrado!");

    listar();

}

function listar() {

    let lista = document.getElementById("lista");

    lista.innerHTML = "";

    produtos.forEach(produto => {

        lista.innerHTML += `

            <p>

                Código: ${produto.codigo}<br>

                Descrição: ${produto.descricao}<br>

                Quantidade: ${produto.quantidade}<br>

                Valor: R$ ${produto.valor.toFixed(2)}

            </p>

            <hr>

        `;

    });

}

function alterarValor() {

    let codigo = document.getElementById("codigoAlterar").value;

    let produto = produtos.find(p => p.codigo === codigo);

    if (produto) {

        let valor = Number(document.getElementById("novoValor").value);

        if (valor <= 0) {

            alert("Digite um valor válido!");

            return;

        }

        produto.valor = valor;

        alert("Valor alterado!");

        listar();

    } else {

        alert("Produto não encontrado!");

    }

}

function alterarQuantidade() {

    let codigo = document.getElementById("codigoAlterar").value;

    let produto = produtos.find(p => p.codigo === codigo);

    if (produto) {

        let quantidade = Number(document.getElementById("novaQuantidade").value);

        if (quantidade < 0) {

            alert("Digite uma quantidade válida!");

            return;

        }

        produto.quantidade = quantidade;

        alert("Quantidade alterada!");

        listar();

    } else {

        alert("Produto não encontrado!");

    }

}