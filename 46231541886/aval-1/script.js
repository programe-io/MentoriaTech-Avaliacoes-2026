
// Array para armazenar os produtos
let produtos = [];

// Elementos HTML
const formulario = document.getElementById("formProduto");
const listaProdutos = document.getElementById("listaProdutos");

// Cadastrar produto
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const preco = Number(document.getElementById("preco").value);
    const quantidade = Number(document.getElementById("quantidade").value);

    if (!nome || !Number.isFinite(preco) || preco < 0 ||
        !Number.isInteger(quantidade) || quantidade < 0) {
        alert("Preencha os dados corretamente!");
        return;
    }

    const produto = {
        codigo: produtos.length > 0
            ? Math.max(...produtos.map(p => p.codigo)) + 1
            : 1,
        nome: nome,
        preco: preco,
        quantidade: quantidade
    };

    produtos.push(produto);

    formulario.reset();

    listarProdutos();

    alert("Produto cadastrado com sucesso!");
});

// Listar produtos
function listarProdutos() {

    listaProdutos.innerHTML = "";

    produtos.forEach(function(produto) {

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${produto.codigo}</td>
            <td>${produto.nome}</td>
            <td>R$ ${produto.preco.toFixed(2).replace(".", ",")}</td>
            <td>${produto.quantidade}</td>
            <td>
                <button class="btn-editar"
                    onclick="alterarPreco(${produto.codigo})">
                    Alterar preço
                </button>

                <button class="btn-quantidade"
                    onclick="alterarQuantidade(${produto.codigo})">
                    Alterar quantidade
                </button>

                <button class="btn-excluir"
                    onclick="excluirProduto(${produto.codigo})">
                    Excluir
                </button>
            </td>
        `;

        listaProdutos.appendChild(linha);
    });
}

// Alterar preço
function alterarPreco(codigo) {

    const produto = produtos.find(p => p.codigo === codigo);

    if (!produto) return;

    const novoPreco = prompt("Digite o novo preço:");

    if (novoPreco === null || novoPreco.trim() === "") return;

    const valor = Number(novoPreco);

    if (!Number.isFinite(valor) || valor < 0) {
        alert("Preço inválido!");
        return;
    }

    produto.preco = valor;

    listarProdutos();

    alert("Preço alterado com sucesso!");
}

// Alterar quantidade
function alterarQuantidade(codigo) {

    const produto = produtos.find(p => p.codigo === codigo);

    if (!produto) return;

    const novaQuantidade = prompt("Digite a nova quantidade:");

    if (novaQuantidade === null || novaQuantidade.trim() === "") return;

    const quantidade = Number(novaQuantidade);

    if (!Number.isInteger(quantidade) || quantidade < 0) {
        alert("Quantidade inválida!");
        return;
    }

    produto.quantidade = quantidade;

    listarProdutos();

    alert("Quantidade alterada com sucesso!");
}

// Excluir produto
function excluirProduto(codigo) {

    const confirmar = confirm("Deseja realmente excluir este produto?");

    if (confirmar) {

        produtos = produtos.filter(p => p.codigo !== codigo);

        listarProdutos();

        alert("Produto excluído com sucesso!");
    }
}
