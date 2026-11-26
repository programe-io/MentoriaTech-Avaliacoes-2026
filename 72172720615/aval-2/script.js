
let produtos = [];

function cadastrar() {
    let nome = document.getElementById("nome").value;
    let qtd = Number(document.getElementById("qtd").value);

    if (nome.length < 5 || qtd < 1) {
        alert("Dados inválidos!");
        return;
    }

    produtos.push({ nome, qtd });
    listar();
}

function listar() {
    document.getElementById("lista").innerHTML =
        produtos.map(p => `<li>${p.nome} - ${p.qtd} unidades</li>`).join("");
}
