
// Array que armazena os produtos
let produtos = JSON.parse(
    localStorage.getItem("produtos")
) || [];

// Gerador de códigos
let geradorDeCodigo = Number(
    localStorage.getItem("geradorDeCodigo")
) || 1;

// Formatar valores em reais
function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Salvar dados no navegador
function salvarDados() {
    localStorage.setItem(
        "produtos",
        JSON.stringify(produtos)
    );

    localStorage.setItem(
        "geradorDeCodigo",
        geradorDeCodigo
    );
}

// Buscar produto pelo código
function buscarProduto(codigo) {
    return produtos.find(
        produto => produto.codigo === codigo
    );
}

// Cadastrar produto
document.getElementById("formCadastro")
.addEventListener("submit", function(event) {

    event.preventDefault();

    let descricao = document
        .getElementById("descricao").value.trim();

    let quantidade = Number(
        document.getElementById("quantidade").value
    );

    let valor = Number(
        document.getElementById("valor").value
    );

    if (descricao.length < 5) {
        alert("A descrição deve ter pelo menos 5 caracteres.");
        return;
    }

    if (
        !Number.isInteger(quantidade) ||
        quantidade < 0 ||
        !Number.isFinite(valor) ||
        valor <= 0
    ) {
        alert("Informe dados válidos.");
        return;
    }

    let novoProduto = {
        codigo: geradorDeCodigo++,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);

    salvarDados();
    listarProdutos();

    document.getElementById("mensagemCadastro")
        .textContent = "Produto cadastrado com sucesso!";

    this.reset();
});

// Alterar valor
function alterarValor() {

    let codigo = Number(
        document.getElementById("codigoValor").value
    );

    let novoValor = Number(
        document.getElementById("novoValor").value
    );

    let produto = buscarProduto(codigo);

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    if (!Number.isFinite(novoValor) || novoValor <= 0) {
        alert("Informe um valor maior que zero.");
        return;
    }

    produto.valor = novoValor;

    salvarDados();
    listarProdutos();

    document.getElementById("mensagemValor")
        .textContent = "Valor atualizado com sucesso!";

    document.getElementById("novoValor").value = "";
}

// Alterar quantidade
function alterarQuantidade() {

    let codigo = Number(
        document.getElementById("codigoQuantidade").value
    );

    let novaQuantidade = Number(
        document.getElementById("novaQuantidade").value
    );

    let produto = buscarProduto(codigo);

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    if (
        !Number.isInteger(novaQuantidade) ||
        novaQuantidade < 0
    ) {
        alert("Informe uma quantidade válida.");
        return;
    }

    produto.quantidade += novaQuantidade;

    salvarDados();
    listarProdutos();

    document.getElementById("mensagemQuantidade")
        .textContent = "Quantidade atualizada com sucesso!";

    document.getElementById("novaQuantidade").value = "";
}

// Listar produtos
function listarProdutos() {

    let lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";

    if (produtos.length === 0) {
        lista.innerHTML = `
            <tr>
                <td colspan="6" class="vazio">
                    Nenhum produto cadastrado.
                </td>
            </tr>
        `;
    }

    produtos.forEach(produto => {

        let linha = document.createElement("tr");

        let celulas = [
            produto.codigo,
            produto.descricao,
            produto.quantidade,
            formatarMoeda(produto.valor),
            formatarMoeda(
                produto.quantidade * produto.valor
            )
        ];

        celulas.forEach(texto => {
            let td = document.createElement("td");
            td.textContent = texto;
            linha.appendChild(td);
        });

        let tdAcao = document.createElement("td");

        let botao = document.createElement("button");
        botao.textContent = "Excluir";
        botao.className = "btn-excluir";

        botao.onclick = function() {
            excluirProduto(produto.codigo);
        };

        tdAcao.appendChild(botao);
        linha.appendChild(tdAcao);

        lista.appendChild(linha);
    });

    atualizarResumo();
}

// Excluir produto
function excluirProduto(codigo) {

    if (!confirm("Deseja realmente excluir este produto?")) {
        return;
    }

    produtos = produtos.filter(
        produto => produto.codigo !== codigo
    );

    salvarDados();
    listarProdutos();
}

// Atualizar resumo
function atualizarResumo() {

    let totalProdutos = produtos.length;

    let totalItens = produtos.reduce(
        (total, produto) =>
            total + produto.quantidade, 0
    );

    let valorEstoque = produtos.reduce(
        (total, produto) =>
            total + produto.quantidade * produto.valor, 0
    );

    document.getElementById("totalProdutos")
        .textContent = totalProdutos;

    document.getElementById("totalItens")
        .textContent = totalItens;

    document.getElementById("valorEstoque")
        .textContent = formatarMoeda(valorEstoque);
}

// Carregar produtos ao abrir a página
listarProdutos();
