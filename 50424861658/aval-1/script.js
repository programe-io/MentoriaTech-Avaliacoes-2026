
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

const formulario = document.getElementById("formProduto");
const listaProdutos = document.getElementById("listaProdutos");

// Salvar produtos no navegador
function salvarProdutos() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}

// Cadastrar produto
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const codigo = document.getElementById("codigo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    if (!codigo || !descricao || quantidade < 0 || valor < 0) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    // Verificar código duplicado
    if (produtos.some(p => p.codigo.toLowerCase() === codigo.toLowerCase())) {
        alert("Este código já está cadastrado!");
        return;
    }

    const produto = {
        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(produto);

    salvarProdutos();
    listarProdutos();

    formulario.reset();

    alert("Produto cadastrado com sucesso!");
});

// Listar produtos
function listarProdutos() {
    listaProdutos.innerHTML = "";

    document.getElementById("totalProdutos").textContent = produtos.length;

    const total = produtos.reduce((soma, produto) => {
        return soma + produto.quantidade;
    }, 0);

    document.getElementById("totalEstoque").textContent = total;

    document.getElementById("mensagemVazia").style.display =
        produtos.length === 0 ? "block" : "none";

    produtos.forEach((produto, index) => {

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${produto.codigo}</td>
            <td>${produto.descricao}</td>
            <td>${produto.quantidade}</td>
            <td>${produto.valor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            })}</td>

            <td class="acoes">
                <button class="btn-valor"
                    onclick="alterarValor(${index})">
                    Valor
                </button>

                <button class="btn-quantidade"
                    onclick="alterarQuantidade(${index})">
                    Quantidade
                </button>

                <button class="btn-excluir"
                    onclick="excluirProduto(${index})">
                    Excluir
                </button>
            </td>
        `;

        listaProdutos.appendChild(linha);
    });
}

// Alterar valor
function alterarValor(index) {
    const novoValor = prompt(
        "Digite o novo valor do produto:",
        produtos[index].valor
    );

    if (novoValor === null || novoValor.trim() === "") return;

    const valor = Number(novoValor);

    if (!Number.isFinite(valor) || valor < 0) {
        alert("Digite um valor válido!");
        return;
    }

    produtos[index].valor = valor;

    salvarProdutos();
    listarProdutos();

    alert("Valor alterado com sucesso!");
}

// Alterar quantidade
function alterarQuantidade(index) {
    const novaQuantidade = prompt(
        "Digite a nova quantidade:",
        produtos[index].quantidade
    );

    if (novaQuantidade === null || novaQuantidade.trim() === "") return;

    const quantidade = Number(novaQuantidade);

    if (!Number.isInteger(quantidade) || quantidade < 0) {
        alert("Digite uma quantidade inteira válida!");
        return;
    }

    produtos[index].quantidade = quantidade;

    salvarProdutos();
    listarProdutos();

    alert("Quantidade alterada com sucesso!");
}

// Excluir produto
function excluirProduto(index) {
    const confirmar = confirm(
        "Deseja realmente excluir este produto?"
    );

    if (confirmar) {
        produtos.splice(index, 1);

        salvarProdutos();
        listarProdutos();

        alert("Produto excluído!");
    }
}

// Mostrar produtos ao abrir o sistema
listarProdutos();
