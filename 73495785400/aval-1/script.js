
let produtos = [];

function cadastrar() {
    let codigo = Number(document.getElementById("codigo").value);
    let descricao = document.getElementById("descricao").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    if (!codigo || !descricao || quantidade < 0 ||
        document.getElementById("quantidade").value === "" ||
        valor < 0 || document.getElementById("valor").value === "") {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    if (produtos.some(p => p.codigo === codigo)) {
        alert("Código já cadastrado!");
        return;
    }

    produtos.push({ codigo, descricao, quantidade, valor });

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

    produtos.forEach(produto => {
        lista.innerHTML += `
            <tr>
                <td>${produto.codigo}</td>
                <td>${produto.descricao}</td>
                <td>${produto.quantidade}</td>
                <td>R$ ${produto.valor.toFixed(2)}</td>
            </tr>
        `;
    });
}

function alterarValor() {
    let codigo = Number(document.getElementById("codigoAlterar").value);
    let produto = produtos.find(p => p.codigo === codigo);
    let valor = document.getElementById("novoValor").value;

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    if (valor === "" || Number(valor) < 0) {
        alert("Digite um valor válido!");
        return;
    }

    produto.valor = Number(valor);

    alert("Valor alterado com sucesso!");
    listar();
}

function alterarQuantidade() {
    let codigo = Number(document.getElementById("codigoAlterar").value);
    let produto = produtos.find(p => p.codigo === codigo);
    let quantidade = document.getElementById("novaQuantidade").value;

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    if (quantidade === "" || Number(quantidade) < 0) {
        alert("Digite uma quantidade válida!");
        return;
    }

    produto.quantidade = Number(quantidade);

    alert("Quantidade alterada com sucesso!");
    listar();
}
