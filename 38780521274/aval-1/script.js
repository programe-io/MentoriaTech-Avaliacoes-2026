
// Lista de produtos
let produtos = [];

// Função para cadastrar produtos
function cadastrarProduto() {

    let nome = document.getElementById("nome").value.trim();
    let preco = Number(document.getElementById("preco").value);
    let quantidade = Number(document.getElementById("quantidade").value);

    if (
        nome === "" ||
        document.getElementById("preco").value === "" ||
        document.getElementById("quantidade").value === "" ||
        !Number.isFinite(preco) ||
        !Number.isInteger(quantidade) ||
        preco < 0 ||
        quantidade < 0
    ) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    let produto = {
        nome: nome,
        preco: preco,
        quantidade: quantidade
    };

    produtos.push(produto);

    alert("Produto cadastrado com sucesso!");

    document.getElementById("nome").value = "";
    document.getElementById("preco").value = "";
    document.getElementById("quantidade").value = "";

    listarProdutos();
}

// Função para listar produtos
function listarProdutos() {

    let tabela = document.getElementById("listaProdutos");

    tabela.innerHTML = "";

    produtos.forEach((produto, index) => {

        tabela.innerHTML += `
            <tr>
                <td>${escaparHTML(produto.nome)}</td>

                <td>
                    ${produto.preco.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    })}
                </td>

                <td>${produto.quantidade}</td>

                <td>
                    <button class="editar"
                        onclick="alterarPreco(${index})">
                        Alterar Preço
                    </button>

                    <button
                        onclick="alterarQuantidade(${index})">
                        Alterar Quantidade
                    </button>

                    <button class="excluir"
                        onclick="excluirProduto(${index})">
                        Excluir
                    </button>
                </td>
            </tr>
        `;
    });

    document.getElementById("total").innerHTML =
        "Total de produtos cadastrados: " + produtos.length;
}

// Função para alterar preço
function alterarPreco(index) {

    let novoPreco = prompt("Digite o novo preço do produto:");

    if (novoPreco === null || novoPreco.trim() === "") {
        return;
    }

    let valor = Number(novoPreco.replace(",", "."));

    if (!Number.isFinite(valor) || valor < 0) {
        alert("Digite um preço válido!");
        return;
    }

    produtos[index].preco = valor;

    alert("Preço alterado com sucesso!");

    listarProdutos();
}

// Função para alterar quantidade
function alterarQuantidade(index) {

    let novaQuantidade = prompt("Digite a nova quantidade:");

    if (novaQuantidade === null || novaQuantidade.trim() === "") {
        return;
    }

    let quantidade = Number(novaQuantidade);

    if (!Number.isInteger(quantidade) || quantidade < 0) {
        alert("Digite uma quantidade inteira válida!");
        return;
    }

    produtos[index].quantidade = quantidade;

    alert("Quantidade alterada com sucesso!");

    listarProdutos();
}

// Função para excluir produtos
function excluirProduto(index) {

    let confirmar = confirm("Deseja excluir este produto?");

    if (confirmar) {

        produtos.splice(index, 1);

        alert("Produto excluído com sucesso!");

        listarProdutos();
    }
}

// Evita inserir HTML pelo nome do produto
function escaparHTML(texto) {

    return texto.replace(/[&<>"']/g, caractere => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[caractere]);
}
