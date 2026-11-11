
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

// Salvar produtos no navegador
function salvarProdutos() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}

// Cadastrar produto
document.getElementById("formProduto").addEventListener("submit", function(event) {

    event.preventDefault();

    let codigo = Number(document.getElementById("codigo").value);
    let descricao = document.getElementById("descricao").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);

    if (codigo <= 0 || quantidade < 0 || valor < 0) {
        alert("Informe valores válidos!");
        return;
    }

    let existe = produtos.find(p => p.codigo === codigo);

    if (existe) {
        alert("Já existe um produto com esse código!");
        return;
    }

    let produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    salvarProdutos();
    listarProdutos();

    document.getElementById("formProduto").reset();

    alert("Produto cadastrado com sucesso!");
});

// Listar produtos
function listarProdutos() {

    let tabela = document.getElementById("listaProdutos");
    let mensagem = document.getElementById("mensagemVazia");

    tabela.innerHTML = "";

    mensagem.style.display = produtos.length === 0 ? "block" : "none";

    produtos.forEach((produto, indice) => {

        let linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${produto.codigo}</td>
            <td></td>
            <td>${produto.quantidade}</td>
            <td>${produto.valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            })}</td>
            <td>
                <button class="btn-valor"
                    onclick="alterarValor(${indice})">
                    Alterar Valor
                </button>

                <button class="btn-quantidade"
                    onclick="alterarQuantidade(${indice})">
                    Alterar Quantidade
                </button>

                <button class="btn-excluir"
                    onclick="excluirProduto(${indice})">
                    Excluir
                </button>
            </td>
        `;

        linha.children[1].textContent = produto.descricao;

        tabela.appendChild(linha);
    });
}

// Alterar valor
function alterarValor(indice) {

    let novoValor = prompt("Digite o novo valor do produto:");

    if (novoValor === null || novoValor.trim() === "") {
        return;
    }

    novoValor = Number(novoValor);

    if (!Number.isFinite(novoValor) || novoValor < 0) {
        alert("Digite um valor válido!");
        return;
    }

    produtos[indice].valor = novoValor;

    salvarProdutos();
    listarProdutos();

    alert("Valor alterado com sucesso!");
}

// Alterar quantidade
function alterarQuantidade(indice) {

    let novaQuantidade = prompt("Digite a nova quantidade:");

    if (novaQuantidade === null || novaQuantidade.trim() === "") {
        return;
    }

    novaQuantidade = Number(novaQuantidade);

    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 0) {
        alert("Digite uma quantidade inteira válida!");
        return;
    }

    produtos[indice].quantidade = novaQuantidade;

    salvarProdutos();
    listarProdutos();

    alert("Quantidade alterada com sucesso!");
}

// Excluir produto
function excluirProduto(indice) {

    let confirmar = confirm("Deseja realmente excluir este produto?");

    if (confirmar) {
        produtos.splice(indice, 1);

        salvarProdutos();
        listarProdutos();

        alert("Produto excluído com sucesso!");
    }
}

// Mostrar produtos ao abrir o sistema
listarProdutos();
