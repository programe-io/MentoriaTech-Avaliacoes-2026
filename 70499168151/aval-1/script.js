
let produtos = [];

function cadastrar() {
    let codigo = Number(document.getElementById("codigo").value);
    let descricao = document.getElementById("descricao").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    if (!codigo || !descricao.trim() ||
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

    if (produtos.length === 0) {
        lista.innerHTML = "<p>Nenhum produto cadastrado.</p>";
        return;
    }

    produtos.forEach(p => {
        lista.innerHTML += `
            <div class="produto">
                <p><strong>Código:</strong> ${p.codigo}</p>
                <p><strong>Descrição:</strong> ${p.descricao}</p>
                <p><strong>Quantidade:</strong> ${p.quantidade}</p>
                <p><strong>Valor:</strong> R$ ${p.valor.toFixed(2)}</p>

                <button onclick="alterarValor(${p.codigo})">
                    Alterar Valor
                </button>

                <button onclick="alterarQuantidade(${p.codigo})">
                    Alterar Quantidade
                </button>
            </div>
        `;
    });
}

function alterarValor(codigo) {
    let produto = produtos.find(p => p.codigo === codigo);

    let novoValor = prompt("Digite o novo valor:");

    if (novoValor === null || novoValor.trim() === "") return;

    novoValor = Number(novoValor);

    if (!Number.isFinite(novoValor) || novoValor < 0) {
        alert("Digite um valor válido!");
        return;
    }

    produto.valor = novoValor;
    listar();

    alert("Valor alterado com sucesso!");
}

function alterarQuantidade(codigo) {
    let produto = produtos.find(p => p.codigo === codigo);

    let novaQuantidade = prompt("Digite a nova quantidade:");

    if (novaQuantidade === null || novaQuantidade.trim() === "") return;

    novaQuantidade = Number(novaQuantidade);

    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 0) {
        alert("Digite uma quantidade inteira válida!");
        return;
    }

    produto.quantidade = novaQuantidade;
    listar();

    alert("Quantidade alterada com sucesso!");
}

listar();
