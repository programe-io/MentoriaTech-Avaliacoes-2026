
let produtos = [];

document.getElementById("form").onsubmit = function(e) {
    e.preventDefault();

    let codigo = document.getElementById("codigo").value.trim();

    if (produtos.some(p => p.codigo === codigo)) {
        alert("Código já cadastrado!");
        return;
    }

    produtos.push({
        codigo,
        descricao: document.getElementById("descricao").value,
        quantidade: Number(document.getElementById("quantidade").value),
        valor: Number(document.getElementById("valor").value)
    });

    this.reset();
    listar();
};

function listar() {
    document.getElementById("lista").innerHTML = produtos.map((p, i) => `
        <tr>
            <td>${p.codigo}</td>
            <td>${p.descricao}</td>
            <td>${p.quantidade}</td>
            <td>R$ ${p.valor.toFixed(2)}</td>
            <td>
                <button onclick="alterar(${i}, 'valor')">Valor</button>
                <button onclick="alterar(${i}, 'quantidade')">Quantidade</button>
            </td>
        </tr>
    `).join("");
}

function alterar(i, campo) {
    let novo = prompt("Digite o novo " + campo + ":");

    if (novo === null || novo.trim() === "") return;

    novo = Number(novo);

    if (!Number.isFinite(novo) || novo < 0 ||
        (campo === "quantidade" && !Number.isInteger(novo))) {
        alert("Valor inválido!");
        return;
    }

    produtos[i][campo] = novo;
    listar();
}
