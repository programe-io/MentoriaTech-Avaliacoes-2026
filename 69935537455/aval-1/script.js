
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

let proximoCodigo = Math.max(
    0,
    ...produtos.map(produto => produto.codigo)
) + 1;


// 1. SALVAR PRODUTOS
function salvarProdutos() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}


// 2. VALIDAR PRODUTO
function validarProduto(descricao, quantidade, valor) {

    if (descricao.trim().length < 5) {
        throw new Error(
            "A descrição deve possuir pelo menos 5 caracteres."
        );
    }

    if (!Number.isInteger(quantidade) || quantidade < 1) {
        throw new Error(
            "A quantidade deve ser um número inteiro maior que zero."
        );
    }

    if (!Number.isFinite(valor) || valor < 0) {
        throw new Error(
            "O valor deve ser maior ou igual a zero."
        );
    }
}


// 3. CADASTRAR PRODUTO
function cadastrarProduto(descricao, quantidade, valor) {

    validarProduto(descricao, quantidade, valor);

    const novoProduto = {
        codigo: proximoCodigo++,
        descricao: descricao.trim(),
        quantidade: quantidade,
        valor: valor
    };

    produtos.push(novoProduto);

    salvarProdutos();

    listarProdutos();
}


// 4. LISTAR PRODUTOS
function listarProdutos(filtro = "") {

    const tabela = document.getElementById("listaProdutos");

    tabela.innerHTML = "";

    const produtosFiltrados = produtos.filter(produto =>
        produto.descricao.toLowerCase().includes(filtro.toLowerCase())
    );

    if (produtosFiltrados.length === 0) {

        tabela.innerHTML = `
            <tr>
                <td colspan="6" class="vazio">
                    Nenhum produto encontrado.
                </td>
            </tr>
        `;

    }

    produtosFiltrados.forEach(produto => {

        const linha = document.createElement("tr");

        const codigo = document.createElement("td");
        codigo.textContent = produto.codigo;

        const descricao = document.createElement("td");
        descricao.textContent = produto.descricao;

        const quantidade = document.createElement("td");
        quantidade.textContent = produto.quantidade;

        const valor = document.createElement("td");
        valor.textContent = formatarMoeda(produto.valor);

        const total = document.createElement("td");
        total.textContent = formatarMoeda(
            produto.quantidade * produto.valor
        );

        const acoes = document.createElement("td");
        acoes.className = "acoes";

        const editar = document.createElement("button");
        editar.textContent = "Valor";
        editar.className = "btn-editar";

        editar.onclick = () => atualizarValor(produto.codigo);

        const adicionar = document.createElement("button");
        adicionar.textContent = "+ Estoque";
        adicionar.className = "btn-quantidade";

        adicionar.onclick = () => atualizarQuantidade(produto.codigo);

        const excluir = document.createElement("button");
        excluir.textContent = "Excluir";
        excluir.className = "btn-excluir";

        excluir.onclick = () => excluirProduto(produto.codigo);

        acoes.append(editar, adicionar, excluir);

        linha.append(
            codigo,
            descricao,
            quantidade,
            valor,
            total,
            acoes
        );

        tabela.appendChild(linha);

    });

    atualizarResumo();
}


// 5. ATUALIZAR RESUMO
function atualizarResumo() {

    const totalProdutos = produtos.length;

    const totalItens = produtos.reduce(
        (total, produto) => total + produto.quantidade,
        0
    );

    const valorEstoque = produtos.reduce(
        (total, produto) =>
            total + produto.quantidade * produto.valor,
        0
    );

    document.getElementById("totalProdutos").textContent =
        totalProdutos;

    document.getElementById("totalItens").textContent =
        totalItens;

    document.getElementById("valorEstoque").textContent =
        formatarMoeda(valorEstoque);
}


// 6. BUSCAR PRODUTO PELO CÓDIGO
function buscarProdutoPorCodigo(codigoProduto) {

    return produtos.find(
        produto => produto.codigo === codigoProduto
    );

}


// 7. ATUALIZAR VALOR
function atualizarValor(codigoProduto) {

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    const entrada = prompt(
        "Informe o novo valor do produto:"
    );

    if (entrada === null || entrada.trim() === "") {
        return;
    }

    const novoValor = Number(entrada.replace(",", "."));

    if (!Number.isFinite(novoValor) || novoValor < 0) {
        alert("Informe um valor válido e maior ou igual a zero.");
        return;
    }

    produto.valor = novoValor;

    salvarProdutos();

    listarProdutos();

    alert("Valor atualizado com sucesso!");
}


// 8. ATUALIZAR QUANTIDADE
function atualizarQuantidade(codigoProduto) {

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    const entrada = prompt(
        "Quantas unidades deseja adicionar ao estoque?"
    );

    if (entrada === null || entrada.trim() === "") {
        return;
    }

    const novaQuantidade = Number(entrada);

    if (!Number.isInteger(novaQuantidade) || novaQuantidade < 1) {
        alert("Informe uma quantidade inteira maior que zero.");
        return;
    }

    produto.quantidade += novaQuantidade;

    salvarProdutos();

    listarProdutos();

    alert("Estoque atualizado com sucesso!");
}


// 9. EXCLUIR PRODUTO
function excluirProduto(codigoProduto) {

    const produto = buscarProdutoPorCodigo(codigoProduto);

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    const confirmar = confirm(
        `Deseja excluir o produto ${produto.descricao}?`
    );

    if (!confirmar) {
        return;
    }

    produtos = produtos.filter(
        produto => produto.codigo !== codigoProduto
    );

    salvarProdutos();

    listarProdutos();

    alert("Produto excluído com sucesso!");
}


// 10. FORMATAR MOEDA
function formatarMoeda(valor) {

    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}


// 11. EVENTO DE CADASTRO
document.getElementById("formProduto").addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const descricao =
            document.getElementById("descricao").value;

        const quantidade =
            Number(document.getElementById("quantidade").value);

        const valor =
            Number(document.getElementById("valor").value);

        try {

            cadastrarProduto(descricao, quantidade, valor);

            this.reset();

            alert("Produto cadastrado com sucesso!");

        } catch (erro) {

            alert(erro.message);

        }

    }
);


// 12. EVENTO DE PESQUISA
document.getElementById("pesquisa").addEventListener(
    "input",
    function() {

        listarProdutos(this.value);

    }
);


// 13. INICIALIZAR SISTEMA
listarProdutos();

