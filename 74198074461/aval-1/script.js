
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

// Salvar produtos
function salvarDados() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}

// Cadastrar produto
document.getElementById("formProduto").addEventListener("submit", function(event) {
    event.preventDefault();

    const codigo = document.getElementById("codigo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    if (!codigo || !descricao || quantidade < 0 || valor < 0 ||
        !Number.isFinite(quantidade) || !Number.isFinite(valor)) {
        alert("Preencha os campos corretamente!");
        return;
    }

    if (produtos.some(p => p.codigo.toLowerCase() === codigo.toLowerCase())) {
        alert("Este código já está cadastrado!");
        return;
    }

    const produto = {
        codigo,
        descricao,
        quantidade,
        valor
    };

    produtos.push(produto);

    salvarDados();
    listarProdutos();

    document.getElementById("formProduto").reset();

    alert("Produto cadastrado com sucesso!");
});

// Listar produtos
function listarProdutos() {
    const tabela = document.getElementById("listaProdutos");

    tabela.innerHTML = "";

    produtos.forEach((produto, index) => {

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${produto.codigo}</td>
            <td>${produto.descricao}</td>
            <td>${produto.quantidade}</td>
            <td>${formatarMoeda(produto.valor)}</td>
            <td>${formatarMoeda(produto.valor * produto.quantidade)}</td>

            <td>
                <div class="acoes">
                    <button class="btn-editar" onclick="alterarValor(${index})">
                        Valor
                    </button>

                    <button class="btn-editar" onclick="alterarQuantidade(${index})">
                        Estoque
                    </button>

                    <button class="btn-excluir" onclick="excluirProduto(${index})">
                        Excluir
                    </button>
                </div>
            </td>
        `;

        tabela.appendChild(linha);
    });

    atualizarResumo();
}

// Formatar dinheiro
function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Alterar valor do produto
function alterarValor(index) {
    const novoValor = prompt(
        "Digite o novo valor do produto:",
        produtos[index].valor
    );

    if (novoValor === null || novoValor.trim() === "") return;

    const valor = Number(novoValor.replace(",", "."));

    if (!Number.isFinite(valor) || valor < 0) {
        alert("Digite um valor válido!");
        return;
    }

    produtos[index].valor = valor;

    salvarDados();
    listarProdutos();

    alert("Valor atualizado com sucesso!");
}

// Alterar quantidade
function alterarQuantidade(index) {
    const novaQuantidade = prompt(
        "Digite a nova quantidade em estoque:",
        produtos[index].quantidade
    );

    if (novaQuantidade === null || novaQuantidade.trim() === "") return;

    const quantidade = Number(novaQuantidade);

    if (!Number.isInteger(quantidade) || quantidade < 0) {
        alert("Digite uma quantidade válida!");
        return;
    }

    produtos[index].quantidade = quantidade;

    salvarDados();
    listarProdutos();

    alert("Quantidade atualizada com sucesso!");
}

// Excluir produto
function excluirProduto(index) {
    const confirmar = confirm("Deseja realmente excluir este produto?");

    if (confirmar) {
        produtos.splice(index, 1);

        salvarDados();
        listarProdutos();

        alert("Produto excluído!");
    }
}

// Atualizar indicadores
function atualizarResumo() {
    const totalProdutos = produtos.length;

    const totalQuantidade = produtos.reduce(
        (total, produto) => total + produto.quantidade, 0
    );

    const valorEstoque = produtos.reduce(
        (total, produto) => total + produto.quantidade * produto.valor, 0
    );

    document.getElementById("totalProdutos").textContent = totalProdutos;

    document.getElementById("totalQuantidade").textContent = totalQuantidade;

    document.getElementById("valorEstoque").textContent =
        formatarMoeda(valorEstoque);
}

// Carregar produtos ao abrir a página
listarProdutos();
