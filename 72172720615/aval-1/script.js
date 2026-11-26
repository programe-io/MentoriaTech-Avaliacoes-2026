let produtos = [];

function cadastrar() {
    let nome = document.getElementById("nome").value;
    let qtd = Number(document.getElementById("qtd").value);
    let valor = Number(document.getElementById("valor").value);

    if (nome.length < 5 || qtd < 1 || valor < 0) {
        alert("Dados inválidos!");
        return;
    }

    produtos.push({ nome, qtd, valor });
    listar();
}

function listar() {
    document.getElementById("lista").innerHTML =
        produtos.map(p =>
            `<li>${p.nome} - ${p.qtd} unidades - R$ ${p.valor}</li>`
        ).join("");
}