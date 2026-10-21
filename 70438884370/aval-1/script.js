
let produtos = [];

function cadastrar() {
    let codigo = document.getElementById("codigo").value;
    let descricao = document.getElementById("descricao").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    if (!codigo || !descricao || quantidade < 0 || valor < 0 ||
        produtos.some(p => p.codigo === codigo)) {
        alert("Verifique os dados ou o código!");
        return;
    }

    produtos.push({ codigo, descricao, quantidade, valor });
    listar();
}

function listar() {
    document.getElementById("lista").innerHTML = produtos.map((p, i) => `
        <div class="produto">
            Código: ${p.codigo}<br>
            Descrição: ${p.descricao}<br>
            Quantidade: ${p.quantidade}<br>
            Valor: R$ ${p.valor.toFixed(2)}<br>
            <button onclick="alterar(${i}, 'valor')">Alterar valor</button>
            <button onclick="alterar(${i}, 'quantidade')">Alterar quantidade</button>
        </div>
    `).join("");
}

function alterar(i, campo) {
    let novo = Number(prompt("Digite o novo valor:"));

    if (Number.isFinite(novo) && novo >= 0 &&
        (campo === "valor" || Number.isInteger(novo))) {
        produtos[i][campo] = novo;
        listar();
    }
}
