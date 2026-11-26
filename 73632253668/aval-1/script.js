
let produtos = [];

function cadastrar() {
    let descricao = document.getElementById("descricao").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    if (descricao.length < 5 || quantidade < 1 || valor < 0 ||
        document.getElementById("valor").value === "") {
        alert("Dados inválidos!");
        return;
    }

    produtos.push({
        codigo: produtos.length + 1,
        descricao,
        quantidade,
        valor
    });

    listar();
}

function listar() {
    document.getElementById("lista").innerHTML = "";

    produtos.forEach(p => {
        document.getElementById("lista").innerHTML +=
        `<li>${p.codigo} - ${p.descricao} | Qtd: ${p.quantidade} | R$ ${p.valor}
        <button onclick="atualizar(${p.codigo})">Atualizar</button></li>`;
    });
}

function atualizar(codigo) {
    let produto = produtos.find(p => p.codigo === codigo);

    let valor = Number(prompt("Novo valor:"));
    if (valor >= 0) produto.valor = valor;

    listar();
}
