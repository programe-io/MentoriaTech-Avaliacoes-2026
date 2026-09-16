function adicionarProduto() {
    let nome = document.getElementById("produto").value;
    let quantidade = document.getElementById("quantidade").value;

    if (nome === "" || quantidade === "") {
        alert("Preencha todos os campos!");
        return;
    }

    let tabela = document.getElementById("listaProdutos");

    let linha = document.createElement("tr");

    linha.innerHTML = `
        <td>${nome}</td>
        <td>${quantidade}</td>
        <td>
            <button class="excluir" onclick="excluirProduto(this)">
                Excluir
            </button>
        </td>
    `;

    tabela.appendChild(linha);

    document.getElementById("produto").value = "";
    document.getElementById("quantidade").value = "";
}

function excluirProduto(botao) {
    let linha = botao.parentElement.parentElement;

    linha.remove();
}
