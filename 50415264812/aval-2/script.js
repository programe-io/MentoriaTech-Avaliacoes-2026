
let produtos = [];

function cadastrar() {
    let codigo = document.getElementById("codigo").value.trim();
    let descricao = document.getElementById("descricao").value.trim();
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    if (!codigo || !descricao ||
        document.getElementById("quantidade").value === "" ||
        document.getElementById("valor").value === "" ||
        quantidade < 0 || valor < 0) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    if (produtos.some(p => p.codigo === codigo)) {
        alert("Esse código já está cadastrado!");
        return;
    }

    produtos.push({ codigo, descricao, quantidade, valor });

    listar();

    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";

    alert("Produto cadastrado!");
}

function listar() {
    let lista = document.getElementById("lista");
    lista.innerHTML = "";

    produtos.forEach((produto, index) => {
        lista.innerHTML += `
            <tr>
                <td>${produto.codigo}</td>
                <td>${produto.descricao}</td>
                <td>${produto.quantidade}</td>
                <td>R$ ${produto.valor.toFixed(2)}</td>
                <td>
                    <button onclick="alterarValor(${index})">Alterar valor</button>
                    <button onclick="alterarQuantidade(${index})">Alterar quantidade</button>
                </td>
            </tr>
        `;
    });
}

function alterarValor(index) {
    let novoValor = prompt("Digite o novo valor:");

    if (novoValor !== null && novoValor.trim() !== "" &&
        Number.isFinite(Number(novoValor)) && Number(novoValor) >= 0) {
        produtos[index].valor = Number(novoValor);
        listar();
    } else if (novoValor !== null) {
        alert("Digite um valor válido!");
    }
}

function alterarQuantidade(index) {
    let novaQuantidade = prompt("Digite a nova quantidade:");

    if (novaQuantidade !== null && novaQuantidade.trim() !== "" &&
        Number.isInteger(Number(novaQuantidade)) && Number(novaQuantidade) >= 0) {
        produtos[index].quantidade = Number(novaQuantidade);
        listar();
    } else if (novaQuantidade !== null) {
        alert("Digite uma quantidade válida!");
    }
}
